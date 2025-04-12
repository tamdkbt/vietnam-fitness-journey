
import React from "react";
import CustomerTable from "./table/CustomerTable";
import { Customer } from "../../pages/CustomerPage";

interface CustomerTableWrapperProps {
  customers: Customer[];
  searchTerm: string;
  onDeleteCustomer: (id: string) => void;
}

// This is a wrapper component that maintains backward compatibility
const CustomerTableWrapper: React.FC<CustomerTableWrapperProps> = (props) => {
  return <CustomerTable {...props} />;
};

export default CustomerTableWrapper;
