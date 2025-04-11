import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Users, Search, MoreHorizontal, Calendar, Dumbbell, Utensils } from "lucide-react";
import { toast } from "sonner";

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

  // Lọc khách hàng theo từ khóa tìm kiếm
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCustomer = (id: string) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    toast.success("Đã xóa khách hàng thành công");
  };

  // Chức năng tạo lịch hẹn cho khách hàng cụ thể
  const createAppointment = (customer: Customer) => {
    // Lưu khách hàng được chọn vào localStorage để sử dụng ở trang lịch hẹn
    localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    // Chuyển hướng đến trang lịch hẹn
    window.location.href = "/appointments";
  };

  // Chức năng tạo lịch tập cho khách hàng cụ thể
  const createWorkout = (customer: Customer) => {
    localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    window.location.href = "/workouts";
  };

  // Chức năng tạo kế hoạch dinh dưỡng cho khách hàng cụ thể
  const createMealPlan = (customer: Customer) => {
    localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    window.location.href = "/meals";
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
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Tìm kiếm khách hàng..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {customers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Chưa có khách hàng nào</h3>
                <p className="text-gray-500 mb-4">Thêm khách hàng mới bằng cách hoàn thành khảo sát</p>
                <Link to="/">
                  <Button>Thêm khách hàng mới</Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên khách hàng</TableHead>
                      <TableHead>Thông tin</TableHead>
                      <TableHead>Mục tiêu</TableHead>
                      <TableHead>Thời gian tập</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
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
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => createAppointment(customer)}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Tạo lịch hẹn
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => createWorkout(customer)}>
                                <Dumbbell className="h-4 w-4 mr-2" />
                                Tạo lịch tập
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => createMealPlan(customer)}>
                                <Utensils className="h-4 w-4 mr-2" />
                                Tạo kế hoạch dinh dưỡng
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteCustomer(customer.id)}
                              >
                                Xóa khách hàng
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerPage;
