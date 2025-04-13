import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Customer } from "@/types/customer";
import { AppointmentUtils } from "./details/AppointmentUtils";
import ProgressGoals from "./details/ProgressGoals";
import HealthInfo from "./details/HealthInfo";

// Define a type for appointment
interface AppointmentItem {
  id: string;
  customerId: string;
  date: string;
  time: string;
  type: string;
}

interface CustomerAppointments {
  upcoming: AppointmentItem[];
  past: AppointmentItem[];
}

interface ExpandedCustomerDetailsProps {
  customer: Customer;
  expandedCustomer: string | null;
  customerAppointments: CustomerAppointments;
  selectCustomerAndNavigate: (customer: Customer, destination: string) => void;
}

const ExpandedCustomerDetails: React.FC<ExpandedCustomerDetailsProps> = ({ 
  customer, 
  expandedCustomer, 
  customerAppointments,
  selectCustomerAndNavigate
}) => {
  if (expandedCustomer !== customer.id) {
    return null;
  }

  return (
    <TableRow className="bg-gray-50 border-t border-b">
      <TableCell colSpan={5} className="p-4">
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="w-full mb-4 bg-white">
            <TabsTrigger value="appointments" className="flex-1">Lịch hẹn</TabsTrigger>
            <TabsTrigger value="progress" className="flex-1">Tiến độ</TabsTrigger>
            <TabsTrigger value="health" className="flex-1">Sức khỏe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="space-y-4">
            <AppointmentUtils customer={customer} />
          </TabsContent>
          
          <TabsContent value="progress">
            <ProgressGoals customer={customer} />
          </TabsContent>
          
          <TabsContent value="health">
            <HealthInfo customer={customer} />
          </TabsContent>
        </Tabs>
      </TableCell>
    </TableRow>
  );
};

export default ExpandedCustomerDetails;
