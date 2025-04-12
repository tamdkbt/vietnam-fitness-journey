
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  MoreHorizontal, 
  Calendar, 
  Dumbbell, 
  Utensils,
} from "lucide-react";
import { Customer } from "../../../pages/CustomerPage";

interface CustomerActionsProps {
  customer: Customer;
  onDeleteCustomer: (id: string) => void;
}

const CustomerActions: React.FC<CustomerActionsProps> = ({ 
  customer, 
  onDeleteCustomer 
}) => {
  const navigate = useNavigate();

  const selectCustomerAndNavigate = (customer: Customer, destination: string) => {
    localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    navigate(`/${destination}`);
    toast.success(`Đã chọn khách hàng ${customer.name}`);
  };

  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => selectCustomerAndNavigate(customer, "appointments")}
            className="flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">Lịch hẹn</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Quản lý lịch hẹn</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => selectCustomerAndNavigate(customer, "workouts")}
            className="flex items-center gap-1"
          >
            <Dumbbell className="h-4 w-4" />
            <span className="hidden md:inline">Lịch tập</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tạo lịch tập luyện</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => selectCustomerAndNavigate(customer, "meals")}
            className="flex items-center gap-1"
          >
            <Utensils className="h-4 w-4" />
            <span className="hidden md:inline">Dinh dưỡng</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Lập kế hoạch dinh dưỡng</p>
        </TooltipContent>
      </Tooltip>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="grid gap-2">
            <h4 className="font-medium leading-none">Thao tác khác</h4>
            <div className="grid gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start text-destructive"
                onClick={() => onDeleteCustomer(customer.id)}
              >
                Xóa khách hàng
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomerActions;
