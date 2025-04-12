
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Customer } from "../../../pages/CustomerPage";
import CustomerActions from "./CustomerActions";
import { HealthConcernsIndicator, AllergiesIndicator } from "./HealthIndicators";

interface CustomerRowProps {
  customer: Customer;
  expandedCustomer: string | null;
  toggleExpandCustomer: (customerId: string) => void;
  selectCustomerAndNavigate: (customer: Customer, destination: string) => void;
  onDeleteCustomer: (id: string) => void;
}

const CustomerRow: React.FC<CustomerRowProps> = ({ 
  customer, 
  expandedCustomer, 
  toggleExpandCustomer, 
  selectCustomerAndNavigate,
  onDeleteCustomer
}) => {
  const getGoalBadgeColor = (goal: string) => {
    switch (goal) {
      case "weight-loss": return "bg-red-100 text-red-800";
      case "muscle-gain": return "bg-blue-100 text-blue-800";
      case "general-health": return "bg-green-100 text-green-800";
      case "endurance": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatGoalLabel = (goal: string) => {
    switch (goal) {
      case "weight-loss": return "Giảm cân";
      case "muscle-gain": return "Tăng cơ";
      case "general-health": return "Sức khỏe";
      case "endurance": return "Thể lực";
      default: return goal;
    }
  };

  return (
    <TableRow 
      className={`hover:bg-gray-50 ${expandedCustomer === customer.id ? 'bg-gray-50' : ''}`}
    >
      <TableCell className="font-medium">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 mr-2"
            onClick={() => toggleExpandCustomer(customer.id)}
          >
            {expandedCustomer === customer.id ? 
              <span className="font-bold text-primary">−</span> : 
              <span className="font-bold text-primary">+</span>}
          </Button>
          <span 
            onClick={() => selectCustomerAndNavigate(customer, "appointments")} 
            className="cursor-pointer hover:text-primary"
          >
            {customer.name}
          </span>
          <HealthConcernsIndicator customer={customer} />
          <AllergiesIndicator customer={customer} />
        </div>
      </TableCell>
      <TableCell>
        {customer.age} tuổi, {customer.gender === 'male' ? 'Nam' : customer.gender === 'female' ? 'Nữ' : 'Khác'}
        <br />
        <span className="text-sm text-gray-500">
          {customer.height}cm, {customer.weight}kg
        </span>
      </TableCell>
      <TableCell>
        <Badge className={getGoalBadgeColor(customer.goal)}>
          {formatGoalLabel(customer.goal)}
        </Badge>
      </TableCell>
      <TableCell>
        {customer.preferredTime === 'morning' ? 'Buổi sáng' :
        customer.preferredTime === 'afternoon' ? 'Buổi chiều' : 'Buổi tối'}
      </TableCell>
      <TableCell>
        <CustomerActions 
          customer={customer} 
          onDeleteCustomer={onDeleteCustomer} 
        />
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;
