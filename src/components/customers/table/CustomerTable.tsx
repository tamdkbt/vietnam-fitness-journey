
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Table, TableBody } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Customer } from "@/types/customer";
import CustomerTableHeader from "./CustomerTableHeader";
import CustomerRow from "./CustomerRow";
import ExpandedCustomerDetails from "./ExpandedCustomerDetails";
import EmptyCustomerList from "./EmptyCustomerList";
import { Customer as CustomerType } from "@/types/customer";

interface CustomerTableProps {
  customers: Customer[];
  searchTerm: string;
  onDeleteCustomer: (id: string) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ 
  customers,
  searchTerm,
  onDeleteCustomer 
}) => {
  const navigate = useNavigate();
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  
  // Mock appointments data - in a real app, this would come from a database
  const customerAppointments = {
    upcoming: [
      { id: "1", customerId: customers[0]?.id, date: "2025-05-01", time: "09:00", type: "personal_training" },
      { id: "2", customerId: customers[0]?.id, date: "2025-05-05", time: "14:00", type: "nutrition" },
    ],
    past: [
      { id: "3", customerId: customers[0]?.id, date: "2025-04-10", time: "10:00", type: "consultation" },
      { id: "4", customerId: customers[0]?.id, date: "2025-04-05", time: "15:00", type: "group_class" },
    ]
  };
  
  // Lọc khách hàng theo từ khóa tìm kiếm
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Chức năng chọn khách hàng và điều hướng đến trang tương ứng
  const selectCustomerAndNavigate = (customer: Customer, destination: string) => {
    localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    navigate(`/${destination}`);
    toast.success(`Đã chọn khách hàng ${customer.name}`);
  };

  const toggleExpandCustomer = (customerId: string) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  if (customers.length === 0) {
    return <EmptyCustomerList />;
  }

  return (
    <TooltipProvider>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <CustomerTableHeader />
          <TableBody>
            {filteredCustomers.map((customer) => (
              <React.Fragment key={customer.id}>
                <CustomerRow 
                  customer={customer}
                  expandedCustomer={expandedCustomer}
                  toggleExpandCustomer={toggleExpandCustomer}
                  selectCustomerAndNavigate={selectCustomerAndNavigate}
                  onDeleteCustomer={onDeleteCustomer}
                />
                <ExpandedCustomerDetails 
                  customer={customer}
                  expandedCustomer={expandedCustomer}
                  customerAppointments={customerAppointments}
                  selectCustomerAndNavigate={selectCustomerAndNavigate}
                />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default CustomerTable;
