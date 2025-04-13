
import { Appointment, AppointmentStatus } from "../../types/appointment";

// Define extended type for DB appointments that includes customer_name
export type AppointmentDB = {
  id: string;
  date: string;
  time: string;
  customer_id: string | null;
  customer_name?: string | null; // Make this optional to fix the error
  type: string;
  status: string | null;
  notes: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
};
