
import { Appointment, AppointmentStatus } from "../../types/appointment";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const addAppointment = async (
  selectedDate: Date,
  newAppointment: { 
    name: string; 
    type: string; 
    time: string; 
  }, 
  selectedCustomer: any
) => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      toast.error("Bạn cần đăng nhập để thêm lịch hẹn");
      return null;
    }

    if (!selectedCustomer?.id) {
      toast.error("Vui lòng chọn khách hàng trước khi đặt lịch");
      return null;
    }

    // Format date as YYYY-MM-DD
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        date: formattedDate,
        time: newAppointment.time,
        customer_id: selectedCustomer.id,
        type: newAppointment.type,
        user_id: sessionData.session.user.id,
        notes: "",
        status: 'scheduled'
      })
      .select();
      
    if (error) {
      throw error;
    }
    
    if (data && data.length > 0) {
      const newApp: Appointment = {
        id: data[0].id,
        date: selectedDate,
        time: newAppointment.time,
        name: selectedCustomer.name,
        type: newAppointment.type,
        status: "scheduled",
      };
      
      toast.success("Đã thêm lịch hẹn thành công");
      return newApp;
    }
    
    return null;
  } catch (error: any) {
    console.error("Error saving appointment:", error);
    toast.error(`Lỗi khi lưu lịch hẹn: ${error.message}`);
    return null;
  }
};
