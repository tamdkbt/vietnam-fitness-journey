
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { format, isAfter, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

interface AppointmentType {
  id: string;
  customerId: string;
  date: string;
  time: string;
  type: string;
}

interface UpcomingAppointmentsProps {
  customerId: string;
  appointments: AppointmentType[];
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ 
  customerId, 
  appointments 
}) => {
  const formatDateTime = (date: string, time: string) => {
    return `${format(parseISO(date), "dd/MM/yyyy", { locale: vi })} - ${time}`;
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

  const getUpcomingAppointments = () => {
    const today = new Date();
    return appointments.filter(app => 
      app.customerId === customerId && isAfter(parseISO(app.date), today)
    );
  };

  const upcomingAppointments = getUpcomingAppointments();

  return (
    <div className="bg-white rounded-lg p-4 border">
      <div className="flex items-center mb-3">
        <Calendar className="h-5 w-5 text-primary mr-2" />
        <h3 className="font-medium">Lịch hẹn sắp tới</h3>
      </div>
      {upcomingAppointments.length > 0 ? (
        <ul className="space-y-2">
          {upcomingAppointments.map(appointment => (
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
  );
};

export default UpcomingAppointments;
