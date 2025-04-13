
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export interface AppointmentType {
  id: string;
  customerId: string;
  date: string;
  time: string;
  type: string;
}

export const formatDateTime = (date: string, time: string) => {
  return `${format(parseISO(date), "dd/MM/yyyy", { locale: vi })} - ${time}`;
};

export const getAppointmentTypeLabel = (type: string) => {
  switch (type) {
    case "consultation": return "Tư vấn";
    case "personal_training": return "Tập cá nhân";
    case "nutrition": return "Tư vấn dinh dưỡng";
    case "group_class": return "Lớp học nhóm";
    default: return type;
  }
};

export const getUpcomingAppointments = (appointments: AppointmentType[], customerId: string) => {
  const today = new Date();
  return appointments.filter(app => 
    app.customerId === customerId && isAfter(parseISO(app.date), today)
  );
};

export const getPastAppointments = (appointments: AppointmentType[], customerId: string) => {
  const today = new Date();
  return appointments.filter(app => 
    app.customerId === customerId && isBefore(parseISO(app.date), today)
  );
};
