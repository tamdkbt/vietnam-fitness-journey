
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Calendar, Dumbbell, Utensils } from "lucide-react";
import { Customer } from "../../pages/CustomerPage";

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

  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="h-12 w-12 mx-auto text-gray-300 mb-4">
          {/* User icon will go here */}
        </div>
        <h3 className="text-lg font-medium mb-2">Chưa có khách hàng nào</h3>
        <p className="text-gray-500 mb-4">Thêm khách hàng mới bằng cách hoàn thành khảo sát</p>
        <Link to="/">
          <Button>Thêm khách hàng mới</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên khách hàng</TableHead>
            <TableHead>Thông tin</TableHead>
            <TableHead>Mục tiêu</TableHead>
            <TableHead>Thời gian tập</TableHead>
            <TableHead>Tùy chọn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow 
              key={customer.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => selectCustomerAndNavigate(customer, "appointments")}
            >
              <TableCell className="font-medium">{customer.name}</TableCell>
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
              <TableCell onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => selectCustomerAndNavigate(customer, "appointments")}
                    className="flex items-center gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden md:inline">Lịch hẹn</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => selectCustomerAndNavigate(customer, "workouts")}
                    className="flex items-center gap-1"
                  >
                    <Dumbbell className="h-4 w-4" />
                    <span className="hidden md:inline">Lịch tập</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => selectCustomerAndNavigate(customer, "meals")}
                    className="flex items-center gap-1"
                  >
                    <Utensils className="h-4 w-4" />
                    <span className="hidden md:inline">Dinh dưỡng</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => onDeleteCustomer(customer.id)}
                      >
                        Xóa khách hàng
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
