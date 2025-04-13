
import { Customer } from "@/types/customer";

export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  date: Date;
  time: string;
  name: string;
  type: string;
  status: AppointmentStatus;
};

export type AppointmentType = {
  id: string;
  name: string;
};

export const APPOINTMENT_TYPES: AppointmentType[] = [
  { id: "consultation", name: "Tư vấn chế độ tập luyện" },
  { id: "personal_training", name: "Buổi tập cá nhân" },
  { id: "nutrition", name: "Tư vấn dinh dưỡng" },
  { id: "group_class", name: "Lớp học nhóm" }
];

export const HOURS = [
  "08:00", "09:00", "10:00", "11:00", 
  "14:00", "15:00", "16:00", "17:00", 
  "18:00", "19:00", "20:00"
];

export interface AppointmentSchedulerProps {
  selectedCustomer?: Customer | null;
}
