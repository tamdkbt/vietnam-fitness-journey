
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Filter, 
  Search,
  SlidersHorizontal,
  FileDown,
  FileUp
} from "lucide-react";
import { toast } from "sonner";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerSearch from "../components/customers/CustomerSearch";
import EmptyCustomerState from "../components/customers/EmptyCustomerState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";

// Define MedicalHistory type
export type MedicalHistory = {
  hasHeartIssues: boolean;
  hasDiabetes: boolean;
  hasAsthma: boolean;
  hasArthritis: boolean;
  hasHighBloodPressure: boolean;
  otherConditions: string;
};

// Define Allergies type
export type Allergies = {
  hasFoodAllergies: boolean;
  foodAllergies: string;
  hasMedicationAllergies: boolean;
  medicationAllergies: string;
  hasEnvironmentalAllergies: boolean;
  environmentalAllergies: string;
};

// Định nghĩa kiểu dữ liệu cho khách hàng
export type Customer = {
  id: string;
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  activityLevel: string;
  dietType: string;
  dietDetails?: string;
  preferredTime: string;
  createdAt: string;
  medicalHistory: MedicalHistory;
  allergies: Allergies;
};

const CustomerPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [goalFilter, setGoalFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch customers from Supabase when component loads
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      
      // Fetch customers for the current authenticated user only
      const { data, error } = await supabase
        .from('customers')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Map Supabase data to our Customer type
        const formattedCustomers = data.map(customer => ({
          id: customer.id,
          name: customer.name,
          age: customer.age || 0,
          gender: customer.gender || 'other',
          height: customer.height || 0,
          weight: customer.weight || 0,
          goal: customer.goals || 'general-health',
          activityLevel: customer.activity_level || 'moderate',
          dietType: customer.diet_type || 'balanced',
          dietDetails: customer.diet_details,
          preferredTime: customer.preferred_time || 'morning',
          createdAt: customer.created_at,
          // Parse health conditions from JSON string if available
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
          // Parse allergies from JSON string if available
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
      // Delete customer from Supabase
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state after successful deletion
      setCustomers(customers.filter(customer => customer.id !== id));
      toast.success("Đã xóa khách hàng thành công");
    } catch (error: any) {
      toast.error(`Lỗi khi xóa khách hàng: ${error.message}`);
      console.error("Error deleting customer:", error);
    }
  };

  const exportCustomers = () => {
    const dataStr = JSON.stringify(customers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'customers.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Đã xuất dữ liệu khách hàng thành công");
  };

  const importCustomers = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files?.[0] as File, "UTF-8");
    fileReader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        if (Array.isArray(parsedData)) {
          // Get the current session to get the user ID
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            toast.error("Bạn cần đăng nhập để nhập dữ liệu khách hàng");
            return;
          }
          
          // Batch insert customers with the current user_id
          const customerPromises = parsedData.map(async (customer) => {
            // Prepare health conditions as a JSON string
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
                gender: customer.gender || 'other',
                height: customer.height || 0,
                weight: customer.weight || 0,
                goals: customer.goal || 'general-health',
                activity_level: customer.activityLevel || 'moderate',
                diet_type: customer.dietType || 'balanced',
                diet_details: customer.dietDetails || '',
                preferred_time: customer.preferredTime || 'morning',
                health_conditions: healthConditions,
                user_id: session.user.id, // Important: associate with the current user
              });
          });
          
          // Wait for all insert operations to complete
          await Promise.all(customerPromises);
          
          // Refresh the customer list
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
    
    // Reset input value to allow the same file to be selected again
    event.target.value = "";
  };

  const resetFilters = () => {
    setSearchTerm("");
    setGoalFilter("all");
    setGenderFilter("all");
    setSortBy("name");
    toast.success("Đã đặt lại bộ lọc");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Danh sách khách hàng</h1>
            <p className="text-gray-600">
              Quản lý thông tin khách hàng và tạo kế hoạch tập luyện, dinh dưỡng
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Link to="/customer/new">
              <Button size="sm" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Thêm khách hàng
              </Button>
            </Link>
            
            <div className="hidden">
              <input 
                type="file" 
                id="importFile" 
                accept=".json" 
                onChange={importCustomers}
                className="hidden" 
              />
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => document.getElementById('importFile')?.click()}
              className="flex items-center gap-1"
            >
              <FileUp className="h-4 w-4" />
              <span className="hidden sm:inline">Nhập dữ liệu</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportCustomers}
              className="flex items-center gap-1"
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">Xuất dữ liệu</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Khách hàng ({customers.length})
              </CardTitle>
            </div>
            <CardDescription>
              Danh sách khách hàng đã hoàn thành khảo sát
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : customers.length > 0 ? (
              <>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
                  <div className="w-full md:w-1/3">
                    <CustomerSearch 
                      searchTerm={searchTerm} 
                      setSearchTerm={setSearchTerm} 
                    />
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    <Select 
                      value={goalFilter} 
                      onValueChange={setGoalFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder="Mục tiêu" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả mục tiêu</SelectItem>
                        <SelectItem value="weight-loss">Giảm cân</SelectItem>
                        <SelectItem value="muscle-gain">Tăng cơ</SelectItem>
                        <SelectItem value="general-health">Sức khỏe</SelectItem>
                        <SelectItem value="endurance">Thể lực</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={genderFilter} 
                      onValueChange={setGenderFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder="Giới tính" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả giới tính</SelectItem>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-10">
                          <SlidersHorizontal className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Tùy chọn</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Sắp xếp theo</h4>
                          <Select 
                            value={sortBy} 
                            onValueChange={setSortBy}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Sắp xếp theo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="name">Tên</SelectItem>
                              <SelectItem value="age">Tuổi</SelectItem>
                              <SelectItem value="created">Ngày tạo</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            onClick={resetFilters} 
                            variant="outline" 
                            className="w-full mt-2"
                          >
                            Đặt lại bộ lọc
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <CustomerTable 
                  customers={customers} 
                  searchTerm={searchTerm}
                  onDeleteCustomer={handleDeleteCustomer}
                />
              </>
            ) : (
              <EmptyCustomerState />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerPage;
