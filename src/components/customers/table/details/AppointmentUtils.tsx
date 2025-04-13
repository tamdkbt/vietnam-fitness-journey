
import React from "react";
import { Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Define the props interface
interface AppointmentUtilsProps {
  customer: Customer;
}

// Use the props interface in the component definition
export const AppointmentUtils: React.FC<AppointmentUtilsProps> = ({ customer }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Lịch hẹn sắp tới</h3>
      <div className="rounded-md border p-4 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Khách hàng này chưa có lịch hẹn sắp tới
        </p>
        <Link to="/appointments">
          <Button size="sm" className="mt-2">
            <Calendar className="mr-2 h-4 w-4" />
            Đặt lịch hẹn
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
        <span className="flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          Thời gian tập luyện: {customer.preferredTime === 'morning' ? 'Buổi sáng' : 
                              customer.preferredTime === 'afternoon' ? 'Buổi chiều' : 'Buổi tối'}
        </span>
      </div>
    </div>
  );
};
