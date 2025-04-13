
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const completeAppointment = async (id: string) => {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'completed' })
      .eq('id', id);
      
    if (error) {
      throw error;
    }
    
    toast.success("Đã đánh dấu hoàn thành lịch hẹn");
    return true;
  } catch (error: any) {
    console.error("Error completing appointment:", error);
    toast.error(`Lỗi khi đánh dấu hoàn thành: ${error.message}`);
    return false;
  }
};
