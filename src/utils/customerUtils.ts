
import { Customer } from "@/types/customer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const exportCustomers = (customers: Customer[]) => {
  const dataStr = JSON.stringify(customers, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'customers.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  
  toast.success("Đã xuất dữ liệu khách hàng thành công");
};

export const importCustomers = async (
  event: React.ChangeEvent<HTMLInputElement>, 
  fetchCustomers: () => Promise<void>
) => {
  const fileReader = new FileReader();
  fileReader.readAsText(event.target.files?.[0] as File, "UTF-8");
  fileReader.onload = async (e) => {
    try {
      const content = e.target?.result as string;
      const parsedData = JSON.parse(content);
      
      if (Array.isArray(parsedData)) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error("Bạn cần đăng nhập để nhập dữ liệu khách hàng");
          return;
        }
        
        const customerPromises = parsedData.map(async (customer) => {
          const healthConditions = JSON.stringify({
            medicalHistory: customer.medicalHistory || {
              hasHeartIssues: false,
              hasDiabetes: false,
              hasAsthma: false,
              hasArthritis: false,
              hasHighBloodPressure: false,
              otherConditions: ""
            },
            allergies: customer.allergies || {
              hasFoodAllergies: false,
              foodAllergies: "",
              hasMedicationAllergies: false,
              medicationAllergies: "",
              hasEnvironmentalAllergies: false,
              environmentalAllergies: ""
            }
          });
          
          return supabase
            .from('customers')
            .insert({
              name: customer.name,
              age: customer.age || 0,
              email: customer.gender === 'female' ? 'customer@female.com' : 
                     customer.gender === 'male' ? 'customer@male.com' : 
                     'customer@other.com',
              height: customer.height || 0,
              weight: customer.weight || 0,
              goals: customer.goal || 'general-health',
              health_conditions: healthConditions,
              user_id: session.user.id, // Ensure user_id is set to the current user's ID
            });
        });
        
        await Promise.all(customerPromises);
        
        fetchCustomers();
        toast.success("Đã nhập dữ liệu khách hàng thành công");
      } else {
        toast.error("Định dạng tệp không hợp lệ");
      }
    } catch (error: any) {
      toast.error(`Lỗi khi đọc tệp: ${error.message}`);
      console.error("Error importing customers:", error);
    }
  };
  
  event.target.value = "";
};

export const filterCustomerBySearchTerm = (customers: Customer[], searchTerm: string) => {
  return customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterCustomersByGoal = (customers: Customer[], goalFilter: string) => {
  if (goalFilter === 'all') return customers;
  return customers.filter(customer => customer.goal === goalFilter);
};

export const filterCustomersByGender = (customers: Customer[], genderFilter: string) => {
  if (genderFilter === 'all') return customers;
  return customers.filter(customer => customer.gender === genderFilter);
};

export const sortCustomers = (customers: Customer[], sortBy: string) => {
  switch (sortBy) {
    case 'name':
      return [...customers].sort((a, b) => a.name.localeCompare(b.name));
    case 'age':
      return [...customers].sort((a, b) => a.age - b.age);
    case 'created':
      return [...customers].sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    default:
      return customers;
  }
};
