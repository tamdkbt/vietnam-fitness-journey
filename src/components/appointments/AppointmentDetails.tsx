
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  Clock, 
  UserCheck, 
  Edit, 
  Check,
  Dumbbell,
  FileText
} from "lucide-react";
import { Appointment } from "../../types/appointment";
import { formatDate } from "../../utils/dateUtils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Simple hash function to generate consistent colors based on name
  const getAvatarColor = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-teal-500"];
    return colors[hash % colors.length];
  };

  // Get icon for appointment type
  const getAppointmentTypeIcon = (type: string) => {
    switch(type) {
      case "consultation": return <UserCheck className="h-4 w-4 text-purple-500" />;
      case "personal_training": return <Dumbbell className="h-4 w-4 text-blue-500" />;
      case "nutrition": return <FileText className="h-4 w-4 text-green-500" />;
      case "group_class": return <UserCheck className="h-4 w-4 text-orange-500" />;
      default: return <UserCheck className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="p-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Chi tiết lịch hẹn</h3>
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium 
          ${appointment.status === "completed" ? "bg-green-100 text-green-800" : 
            appointment.status === "cancelled" ? "bg-red-100 text-red-800" : 
            "bg-blue-100 text-blue-800"}`}>
          {appointment.status === "completed" 
            ? "Đã hoàn thành" 
            : appointment.status === "cancelled" 
              ? "Đã hủy" 
              : "Đã lên lịch"}
        </div>
      </div>
      
      <div className="space-y-4 mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className={cn("text-sm", getAvatarColor(appointment.name))}>
              {getInitials(appointment.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-base">{appointment.name}</p>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              {getAppointmentTypeIcon(appointment.type)}
              <span className="ml-1">{appointmentTypeNameById(appointment.type)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-md p-3 space-y-2">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{formatDate(appointment.date, "EEEE, dd/MM/yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{appointment.time}</span>
          </div>
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
    </div>
  );
};

export default AppointmentDetails;
