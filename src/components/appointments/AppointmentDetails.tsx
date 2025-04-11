
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, UserCheck, Edit, Check } from "lucide-react";
import { Appointment } from "../../types/appointment";
import { formatDate } from "../../utils/dateUtils";

interface AppointmentDetailsProps {
  appointment: Appointment;
  appointmentTypeNameById: (id: string) => string;
  openEditDialog: (appointment: Appointment) => void;
  handleCompleteAppointment: (id: string) => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  appointmentTypeNameById,
  openEditDialog,
  handleCompleteAppointment,
}) => {
  return (
    <>
      <h3 className="font-medium mb-2">Chi tiết lịch hẹn</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-start">
          <UserCheck className="h-4 w-4 mt-0.5 mr-2 text-primary" />
          <div>
            <p className="font-medium">{appointment.name}</p>
            <p className="text-sm text-gray-500">{appointmentTypeNameById(appointment.type)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm">{formatDate(appointment.date, "EEEE, dd/MM/yyyy")}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full mr-2 ${appointment.status === "completed" ? "bg-green-500" : appointment.status === "cancelled" ? "bg-red-500" : "bg-blue-500"}`}></div>
          <span className="text-sm">
            {appointment.status === "completed" 
              ? "Đã hoàn thành" 
              : appointment.status === "cancelled" 
                ? "Đã hủy" 
                : "Đã lên lịch"}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => openEditDialog(appointment)}
        >
          <Edit className="h-3.5 w-3.5 mr-1" />
          Chỉnh sửa
        </Button>
        {appointment.status !== "completed" && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleCompleteAppointment(appointment.id)}
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Hoàn thành
          </Button>
        )}
      </div>
    </>
  );
};

export default AppointmentDetails;
