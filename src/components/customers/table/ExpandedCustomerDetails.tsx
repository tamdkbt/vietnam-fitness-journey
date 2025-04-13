
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Customer } from "@/types/customer";
import UpcomingAppointments from "./details/UpcomingAppointments";
import ProgressGoals from "./details/ProgressGoals";
import HealthInfo from "./details/HealthInfo";
import { AppointmentType } from "./details/AppointmentUtils";

interface ExpandedCustomerDetailsProps {
  customer: Customer;
  expandedCustomer: string | null;
  customerAppointments: {
    upcoming: AppointmentType[];
    past: AppointmentType[];
  };
  selectCustomerAndNavigate: (customer: Customer, destination: string) => void;
}

const ExpandedCustomerDetails: React.FC<ExpandedCustomerDetailsProps> = ({
  customer,
  expandedCustomer,
  customerAppointments,
  selectCustomerAndNavigate
}) => {
  if (expandedCustomer !== customer.id) return null;

  return (
    <TableRow>
      <TableCell colSpan={5} className="p-0 border-t-0">
        <div className="p-4 bg-gray-50">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Lịch hẹn sắp tới */}
              <UpcomingAppointments 
                customerId={customer.id} 
                appointments={customerAppointments.upcoming} 
              />
              
              {/* Tiến độ mục tiêu */}
              <ProgressGoals />
              
              {/* Thông tin sức khỏe */}
              <HealthInfo customer={customer} />
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => selectCustomerAndNavigate(customer, "appointments")}
              >
                <Info className="h-3.5 w-3.5 mr-1" />
                Xem chi tiết hồ sơ
              </Button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ExpandedCustomerDetails;
