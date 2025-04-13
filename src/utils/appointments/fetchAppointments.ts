
import { Appointment, AppointmentStatus } from "../../types/appointment";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AppointmentDB } from "./types";

export const fetchAppointments = async (selectedCustomer: any = null) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      throw sessionError;
    }
    
    if (!sessionData.session) {
      return [];
    }
    
    let query = supabase
      .from('appointments')
      .select(`
        *,
        customers (
          id,
          name
        )
      `)
      .eq('user_id', sessionData.session.user.id);
      
    // Filter by customer_id if a customer is selected
    if (selectedCustomer?.id) {
      query = query.eq('customer_id', selectedCustomer.id);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    if (data) {
      const formattedAppointments = data.map((app: any) => ({
        id: app.id,
        date: new Date(app.date),
        time: app.time,
        name: app.customers?.name || selectedCustomer?.name || 'Chưa chọn khách hàng',
        type: app.type,
        status: (app.status || 'scheduled') as AppointmentStatus,
      }));
      
      return formattedAppointments;
    }
    
    return [];
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    toast.error(`Lỗi khi tải lịch hẹn: ${error.message}`);
    return [];
  }
};
