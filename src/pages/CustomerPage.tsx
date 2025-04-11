
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { toast } from "sonner";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerSearch from "../components/customers/CustomerSearch";
import EmptyCustomerState from "../components/customers/EmptyCustomerState";

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
  
  useEffect(() => {
    // Lấy danh sách khách hàng từ localStorage
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);

  const handleDeleteCustomer = (id: string) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    toast.success("Đã xóa khách hàng thành công");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Danh sách khách hàng</h1>
          <p className="text-gray-600">
            Quản lý thông tin khách hàng và tạo kế hoạch tập luyện, dinh dưỡng
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Khách hàng ({customers.length})
              </CardTitle>
              <Link to="/">
                <Button size="sm">
                  Thêm khách hàng
                </Button>
              </Link>
            </div>
            <CardDescription>
              Danh sách khách hàng đã hoàn thành khảo sát
            </CardDescription>
          </CardHeader>
          <CardContent>
            {customers.length > 0 ? (
              <>
                <CustomerSearch 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm} 
                />
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
