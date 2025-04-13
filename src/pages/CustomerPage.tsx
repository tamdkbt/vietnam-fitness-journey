
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { toast } from "sonner";
import CustomerTable from "../components/customers/CustomerTable";
import EmptyCustomerState from "../components/customers/EmptyCustomerState";
import CustomerPageHeader from "../components/customers/CustomerPageHeader";
import CustomerFilters from "../components/customers/CustomerFilters";
import { useCustomers } from "@/hooks/useCustomers";
import { 
  exportCustomers as exportCustomersUtil, 
  importCustomers as importCustomersUtil,
  filterCustomerBySearchTerm,
  filterCustomersByGoal,
  filterCustomersByGender,
  sortCustomers
} from "@/utils/customerUtils";

const CustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [goalFilter, setGoalFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  
  const { 
    customers, 
    loading, 
    handleDeleteCustomer, 
    fetchCustomers,
    setCustomers
  } = useCustomers();

  const exportCustomersHandler = () => {
    exportCustomersUtil(customers);
  };

  const importCustomersHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    importCustomersUtil(event, fetchCustomers);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setGoalFilter("all");
    setGenderFilter("all");
    setSortBy("name");
    toast.success("Đã đặt lại bộ lọc");
  };

  // Apply filters and sorting
  let filteredCustomers = filterCustomerBySearchTerm(customers, searchTerm);
  filteredCustomers = filterCustomersByGoal(filteredCustomers, goalFilter);
  filteredCustomers = filterCustomersByGender(filteredCustomers, genderFilter);
  filteredCustomers = sortCustomers(filteredCustomers, sortBy);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <CustomerPageHeader 
          customersCount={customers.length}
          exportCustomers={exportCustomersHandler}
          importCustomers={importCustomersHandler}
        />

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
                <CustomerFilters 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  goalFilter={goalFilter}
                  setGoalFilter={setGoalFilter}
                  genderFilter={genderFilter}
                  setGenderFilter={setGenderFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  resetFilters={resetFilters}
                />
                <CustomerTable 
                  customers={filteredCustomers} 
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
