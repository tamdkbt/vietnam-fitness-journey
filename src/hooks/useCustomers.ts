
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { toast } from "sonner";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      
      // Get the current authenticated user session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }
      
      // If user is not authenticated, return empty array
      if (!sessionData.session) {
        setCustomers([]);
        return;
      }
      
      // Only fetch customers that belong to the current user (RLS will enforce this)
      const { data, error } = await supabase
        .from('customers')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedCustomers = data.map(customer => ({
          id: customer.id,
          name: customer.name,
          age: customer.age || 0,
          gender: customer.email?.includes('@female') ? 'female' : 
                  customer.email?.includes('@male') ? 'male' : 'other',
          height: customer.height || 0,
          weight: customer.weight || 0,
          goal: customer.goals || 'general-health',
          activityLevel: 'moderate',
          dietType: 'balanced',
          dietDetails: '',
          preferredTime: 'morning',
          createdAt: customer.created_at,
          medicalHistory: customer.health_conditions ? 
            JSON.parse(customer.health_conditions)?.medicalHistory || {
              hasHeartIssues: false,
              hasDiabetes: false,
              hasAsthma: false,
              hasArthritis: false,
              hasHighBloodPressure: false,
              otherConditions: ""
            } : {
              hasHeartIssues: false,
              hasDiabetes: false,
              hasAsthma: false,
              hasArthritis: false,
              hasHighBloodPressure: false,
              otherConditions: ""
            },
          allergies: customer.health_conditions ? 
            JSON.parse(customer.health_conditions)?.allergies || {
              hasFoodAllergies: false,
              foodAllergies: "",
              hasMedicationAllergies: false,
              medicationAllergies: "",
              hasEnvironmentalAllergies: false,
              environmentalAllergies: ""
            } : {
              hasFoodAllergies: false,
              foodAllergies: "",
              hasMedicationAllergies: false,
              medicationAllergies: "",
              hasEnvironmentalAllergies: false,
              environmentalAllergies: ""
            }
        }));
        
        setCustomers(formattedCustomers);
      }
    } catch (error: any) {
      toast.error(`Lỗi khi tải danh sách khách hàng: ${error.message}`);
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setCustomers(customers.filter(customer => customer.id !== id));
      toast.success("Đã xóa khách hàng thành công");
    } catch (error: any) {
      toast.error(`Lỗi khi xóa khách hàng: ${error.message}`);
      console.error("Error deleting customer:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    handleDeleteCustomer,
    fetchCustomers,
    setCustomers
  };
};
