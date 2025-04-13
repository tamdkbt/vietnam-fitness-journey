
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const deleteAppointment = async (id: string) => {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
      
    if (error) {
      throw error;
    }
    
    toast.success("Đã xóa lịch hẹn thành công");
    return true;
  } catch (error: any) {
    console.error("Error deleting appointment:", error);
    toast.error(`Lỗi khi xóa lịch hẹn: ${error.message}`);
    return false;
  }
};
