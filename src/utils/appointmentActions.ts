
import { Appointment, AppointmentStatus } from "../types/appointment";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
      .select('*')
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
      const formattedAppointments = data.map(app => ({
        id: app.id,
        date: new Date(app.date),
        time: app.time,
        name: selectedCustomer?.name || app.customer_name || 'Chưa chọn khách hàng',
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
        customer_name: selectedCustomer.name, // Store customer name for reference
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
        customer_name: selectedCustomer.name,
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
