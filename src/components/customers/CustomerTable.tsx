
import React, { useState } from "react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Calendar, 
  Dumbbell, 
  Utensils,
  Clock,
  Info,
  HeartPulse,
  Activity,
  AlertTriangle
} from "lucide-react";
import { Customer } from "../../pages/CustomerPage";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

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

  const getAppointmentTypeLabel = (type: string) => {
    switch (type) {
      case "consultation": return "Tư vấn";
      case "personal_training": return "Tập cá nhân";
      case "nutrition": return "Tư vấn dinh dưỡng";
      case "group_class": return "Lớp học nhóm";
      default: return type;
    }
  };

  const formatDateTime = (date: string, time: string) => {
    return `${format(parseISO(date), "dd/MM/yyyy", { locale: vi })} - ${time}`;
  };

  const getUpcomingAppointments = (customerId: string) => {
    const today = new Date();
    return customerAppointments.upcoming.filter(app => 
      app.customerId === customerId && isAfter(parseISO(app.date), today)
    );
  };

  const getPastAppointments = (customerId: string) => {
    const today = new Date();
    return customerAppointments.past.filter(app => 
      app.customerId === customerId && isBefore(parseISO(app.date), today)
    );
  };

  // Render health concerns warning if the customer has medical conditions
  const renderHealthConcerns = (customer: Customer) => {
    const { medicalHistory } = customer;
    
    const hasMedicalConcerns = 
      medicalHistory.hasHeartIssues || 
      medicalHistory.hasDiabetes || 
      medicalHistory.hasAsthma || 
      medicalHistory.hasArthritis || 
      medicalHistory.hasHighBloodPressure || 
      (medicalHistory.otherConditions && medicalHistory.otherConditions.length > 0);
    
    if (!hasMedicalConcerns) return null;
    
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="ml-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold text-amber-500">Vấn đề sức khỏe cần lưu ý:</p>
            <ul className="text-xs list-disc pl-4">
              {medicalHistory.hasHeartIssues && <li>Vấn đề tim mạch</li>}
              {medicalHistory.hasDiabetes && <li>Tiểu đường</li>}
              {medicalHistory.hasAsthma && <li>Hen suyễn</li>}
              {medicalHistory.hasArthritis && <li>Viêm khớp</li>}
              {medicalHistory.hasHighBloodPressure && <li>Huyết áp cao</li>}
              {medicalHistory.otherConditions && <li>{medicalHistory.otherConditions}</li>}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  // Render allergies warning if the customer has allergies
  const renderAllergies = (customer: Customer) => {
    const { allergies } = customer;
    
    const hasAllergies = 
      (allergies.hasFoodAllergies && allergies.foodAllergies) || 
      (allergies.hasMedicationAllergies && allergies.medicationAllergies) || 
      (allergies.hasEnvironmentalAllergies && allergies.environmentalAllergies);
    
    if (!hasAllergies) return null;
    
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="ml-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold text-red-500">Dị ứng cần lưu ý:</p>
            <ul className="text-xs list-disc pl-4">
              {allergies.hasFoodAllergies && <li>Thực phẩm: {allergies.foodAllergies}</li>}
              {allergies.hasMedicationAllergies && <li>Thuốc: {allergies.medicationAllergies}</li>}
              {allergies.hasEnvironmentalAllergies && <li>Môi trường: {allergies.environmentalAllergies}</li>}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    );
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
    <TooltipProvider>
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
              <React.Fragment key={customer.id}>
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
                      <span onClick={() => selectCustomerAndNavigate(customer, "appointments")} className="cursor-pointer hover:text-primary">
                        {customer.name}
                      </span>
                      {renderHealthConcerns(customer)}
                      {renderAllergies(customer)}
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
                  </TableCell>
                </TableRow>
                
                {/* Expanded details row */}
                {expandedCustomer === customer.id && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-0 border-t-0">
                      <div className="p-4 bg-gray-50">
                        <div className="flex flex-col space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Lịch hẹn sắp tới */}
                            <div className="bg-white rounded-lg p-4 border">
                              <div className="flex items-center mb-3">
                                <Calendar className="h-5 w-5 text-primary mr-2" />
                                <h3 className="font-medium">Lịch hẹn sắp tới</h3>
                              </div>
                              {getUpcomingAppointments(customer.id).length > 0 ? (
                                <ul className="space-y-2">
                                  {getUpcomingAppointments(customer.id).map(appointment => (
                                    <li key={appointment.id} className="text-sm border-l-2 border-primary pl-2 py-1">
                                      <div className="flex items-center">
                                        <Clock className="h-3.5 w-3.5 text-gray-500 mr-1" />
                                        <span>{formatDateTime(appointment.date, appointment.time)}</span>
                                      </div>
                                      <div className="text-xs text-gray-600">
                                        {getAppointmentTypeLabel(appointment.type)}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-gray-500 italic">Chưa có lịch hẹn sắp tới</p>
                              )}
                            </div>
                            
                            {/* Tiến độ mục tiêu */}
                            <div className="bg-white rounded-lg p-4 border">
                              <div className="flex items-center mb-3">
                                <Activity className="h-5 w-5 text-primary mr-2" />
                                <h3 className="font-medium">Tiến độ mục tiêu</h3>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Lịch tập luyện</span>
                                    <span className="font-medium">20%</span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Kế hoạch dinh dưỡng</span>
                                    <span className="font-medium">60%</span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Mục tiêu chung</span>
                                    <span className="font-medium">35%</span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Thông tin sức khỏe */}
                            <div className="bg-white rounded-lg p-4 border">
                              <div className="flex items-center mb-3">
                                <HeartPulse className="h-5 w-5 text-primary mr-2" />
                                <h3 className="font-medium">Thông tin sức khỏe</h3>
                              </div>
                              
                              <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="medical">
                                  <AccordionTrigger className="text-sm py-2">Tiền sử y tế</AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="text-xs space-y-1 text-gray-600">
                                      <li className="flex items-center">
                                        <span className={`w-3 h-3 rounded-full mr-2 ${customer.medicalHistory.hasHeartIssues ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        <span>Vấn đề tim mạch: {customer.medicalHistory.hasHeartIssues ? 'Có' : 'Không'}</span>
                                      </li>
                                      <li className="flex items-center">
                                        <span className={`w-3 h-3 rounded-full mr-2 ${customer.medicalHistory.hasDiabetes ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        <span>Tiểu đường: {customer.medicalHistory.hasDiabetes ? 'Có' : 'Không'}</span>
                                      </li>
                                      <li className="flex items-center">
                                        <span className={`w-3 h-3 rounded-full mr-2 ${customer.medicalHistory.hasAsthma ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        <span>Hen suyễn: {customer.medicalHistory.hasAsthma ? 'Có' : 'Không'}</span>
                                      </li>
                                      {customer.medicalHistory.otherConditions && (
                                        <li className="mt-1">
                                          <span className="font-medium">Ghi chú khác:</span> {customer.medicalHistory.otherConditions}
                                        </li>
                                      )}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                                
                                <AccordionItem value="allergies">
                                  <AccordionTrigger className="text-sm py-2">Dị ứng</AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="text-xs space-y-1 text-gray-600">
                                      {customer.allergies.hasFoodAllergies && (
                                        <li>
                                          <span className="font-medium">Thực phẩm:</span> {customer.allergies.foodAllergies}
                                        </li>
                                      )}
                                      {customer.allergies.hasMedicationAllergies && (
                                        <li>
                                          <span className="font-medium">Thuốc:</span> {customer.allergies.medicationAllergies}
                                        </li>
                                      )}
                                      {customer.allergies.hasEnvironmentalAllergies && (
                                        <li>
                                          <span className="font-medium">Môi trường:</span> {customer.allergies.environmentalAllergies}
                                        </li>
                                      )}
                                      {!customer.allergies.hasFoodAllergies && 
                                       !customer.allergies.hasMedicationAllergies && 
                                       !customer.allergies.hasEnvironmentalAllergies && (
                                        <li className="italic">Không có dị ứng</li>
                                      )}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                                
                                <AccordionItem value="diet">
                                  <AccordionTrigger className="text-sm py-2">Chế độ ăn</AccordionTrigger>
                                  <AccordionContent>
                                    <div className="text-xs space-y-1 text-gray-600">
                                      <p>
                                        <span className="font-medium">Loại chế độ ăn:</span> {customer.dietType === 'regular' ? 'Thông thường' : 
                                          customer.dietType === 'vegetarian' ? 'Chay' : 
                                          customer.dietType === 'vegan' ? 'Thuần chay' : 
                                          customer.dietType === 'keto' ? 'Keto' : 
                                          customer.dietType === 'paleo' ? 'Paleo' : customer.dietType}
                                      </p>
                                      {customer.dietDetails && (
                                        <p className="mt-1">
                                          <span className="font-medium">Chi tiết:</span> {customer.dietDetails}
                                        </p>
                                      )}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
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
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default CustomerTable;
