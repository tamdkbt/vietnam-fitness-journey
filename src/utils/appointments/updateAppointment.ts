
import { Appointment } from "../../types/appointment";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const updateAppointment = async (
  editingAppointment: Appointment,
  newAppointment: {
    name: string;
    type: string;
    time: string;
  },
  selectedCustomer: any
) => {
  try {
    if (!selectedCustomer?.id) {
      toast.error("Vui lòng chọn khách hàng trước khi cập nhật lịch");
      return null;
    }

    const { error } = await supabase
      .from('appointments')
      .update({
        time: newAppointment.time,
        customer_id: selectedCustomer.id,
        type: newAppointment.type,
        notes: "",
        status: 'scheduled'
      })
      .eq('id', editingAppointment.id);
      
    if (error) {
      throw error;
    }
    
    // Create updated appointment
    const updatedAppointment: Appointment = {
      ...editingAppointment,
      time: newAppointment.time,
      name: selectedCustomer.name,
      type: newAppointment.type,
      status: "scheduled",
    };
    
    toast.success("Đã cập nhật lịch hẹn thành công");
    return updatedAppointment;
  } catch (error: any) {
    console.error("Error updating appointment:", error);
    toast.error(`Lỗi khi cập nhật lịch hẹn: ${error.message}`);
    return null;
  }
};
