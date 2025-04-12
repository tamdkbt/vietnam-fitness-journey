
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
  
  useEffect(() => {
    // Lấy danh sách khách hàng từ localStorage
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      try {
        const parsedCustomers = JSON.parse(storedCustomers);
        
        // Ensure each customer has the required fields
        const validatedCustomers = parsedCustomers.map((customer: any) => {
          return {
            ...customer,
            // Ensure medicalHistory exists with default values if needed
            medicalHistory: customer.medicalHistory || {
              hasHeartIssues: false,
              hasDiabetes: false,
              hasAsthma: false,
              hasArthritis: false,
              hasHighBloodPressure: false,
              otherConditions: ""
            },
            // Ensure allergies exists with default values if needed
            allergies: customer.allergies || {
              hasFoodAllergies: false,
              foodAllergies: "",
              hasMedicationAllergies: false,
              medicationAllergies: "",
              hasEnvironmentalAllergies: false,
              environmentalAllergies: ""
            }
          };
        });
        
        setCustomers(validatedCustomers);
        
        // Update localStorage with the validated customers
        localStorage.setItem("customers", JSON.stringify(validatedCustomers));
      } catch (error) {
        console.error("Error parsing customers:", error);
        setCustomers([]);
      }
    }
  }, []);

  const handleDeleteCustomer = (id: string) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    toast.success("Đã xóa khách hàng thành công");
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

  const importCustomers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files?.[0] as File, "UTF-8");
    fileReader.onload = e => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        if (Array.isArray(parsedData)) {
          // Validate and ensure required fields exist
          const validatedCustomers = parsedData.map((customer: any) => {
            return {
              ...customer,
              // Ensure medicalHistory exists with default values if needed
              medicalHistory: customer.medicalHistory || {
                hasHeartIssues: false,
                hasDiabetes: false,
                hasAsthma: false,
                hasArthritis: false,
                hasHighBloodPressure: false,
                otherConditions: ""
              },
              // Ensure allergies exists with default values if needed
              allergies: customer.allergies || {
                hasFoodAllergies: false,
                foodAllergies: "",
                hasMedicationAllergies: false,
                medicationAllergies: "",
                hasEnvironmentalAllergies: false,
                environmentalAllergies: ""
              }
            };
          });
          
          setCustomers(validatedCustomers);
          localStorage.setItem("customers", JSON.stringify(validatedCustomers));
          toast.success("Đã nhập dữ liệu khách hàng thành công");
        } else {
          toast.error("Định dạng tệp không hợp lệ");
        }
      } catch (error) {
        toast.error("Lỗi khi đọc tệp");
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
            <Link to="/">
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
            {customers.length > 0 ? (
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
