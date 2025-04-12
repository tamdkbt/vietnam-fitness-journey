
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { 
  Calendar, 
  Clock, 
  Activity, 
  HeartPulse, 
  Info 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Customer } from "../../../pages/CustomerPage";

interface AppointmentType {
  id: string;
  customerId: string;
  date: string;
  time: string;
  type: string;
}

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

  return (
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
                      {customer.medicalHistory ? (
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
                      ) : (
                        <p className="text-xs italic">Không có thông tin y tế</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="allergies">
                    <AccordionTrigger className="text-sm py-2">Dị ứng</AccordionTrigger>
                    <AccordionContent>
                      {customer.allergies ? (
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
                      ) : (
                        <p className="text-xs italic">Không có thông tin dị ứng</p>
                      )}
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
  );
};

export default ExpandedCustomerDetails;
