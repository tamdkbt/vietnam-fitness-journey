
import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { Appointment } from "../types/appointment";
import { toast } from "sonner";
import { navigateNext, navigatePrevious } from "../utils/dateUtils";
import { supabase } from "@/integrations/supabase/client";

export const useAppointmentState = (selectedCustomer: any) => {
  const [view, setView] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    type: "",
    time: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch appointments from Supabase
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }
      
      if (!sessionData.session) {
        setAppointments([]);
        return;
      }
      
      // RLS will ensure we only get appointments belonging to the current user
      const { data, error } = await supabase
        .from('appointments')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedAppointments = data.map(app => ({
          id: app.id,
          date: new Date(app.date),
          time: app.time,
          name: app.customer_name || 'Không có tên',
          type: app.type,
          status: app.status || 'scheduled',
        }));
        
        setAppointments(formattedAppointments);
      }
      
    } catch (error: any) {
      console.error("Error fetching appointments:", error);
      toast.error(`Lỗi khi tải lịch hẹn: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handlePrevious = () => {
    setCurrentDate(navigatePrevious(currentDate, view));
  };

  const handleNext = () => {
    setCurrentDate(navigateNext(currentDate, view));
  };

  const handleAddAppointment = async () => {
    try {
      if (!newAppointment.name && !selectedCustomer) {
        toast.error("Vui lòng điền tên khách hàng");
        return;
      }
      
      if (!newAppointment.type || !newAppointment.time) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast.error("Bạn cần đăng nhập để thêm lịch hẹn");
        return;
      }

      if (editingAppointment) {
        // Update existing appointment
        const { error } = await supabase
          .from('appointments')
          .update({
            time: newAppointment.time,
            customer_name: selectedCustomer ? selectedCustomer.name : newAppointment.name,
            type: newAppointment.type,
            customer_id: selectedCustomer ? selectedCustomer.id : null,
            notes: "",
            status: 'scheduled'
          })
          .eq('id', editingAppointment.id);
          
        if (error) {
          throw error;
        }
        
        // Update local state
        setAppointments(
          appointments.map((app) =>
            app.id === editingAppointment.id
              ? {
                  ...app,
                  time: newAppointment.time,
                  name: selectedCustomer ? selectedCustomer.name : newAppointment.name,
                  type: newAppointment.type,
                }
              : app
          )
        );
        toast.success("Đã cập nhật lịch hẹn thành công");
      } else {
        // Insert new appointment
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        
        const { data, error } = await supabase
          .from('appointments')
          .insert({
            date: formattedDate,
            time: newAppointment.time,
            customer_name: selectedCustomer ? selectedCustomer.name : newAppointment.name,
            type: newAppointment.type,
            customer_id: selectedCustomer ? selectedCustomer.id : null,
            user_id: sessionData.session.user.id, // Set user_id to current user
            notes: "",
            status: 'scheduled'
          })
          .select();
          
        if (error) {
          throw error;
        }
        
        // Update local state
        if (data && data.length > 0) {
          const newApp: Appointment = {
            id: data[0].id,
            date: selectedDate,
            time: newAppointment.time,
            name: selectedCustomer ? selectedCustomer.name : newAppointment.name,
            type: newAppointment.type,
            status: 'scheduled',
          };
          setAppointments([...appointments, newApp]);
        }
        
        toast.success("Đã thêm lịch hẹn thành công");
      }

      setIsDialogOpen(false);
      setEditingAppointment(null);
      setNewAppointment({ name: "", type: "", time: "" });
      
    } catch (error: any) {
      console.error("Error saving appointment:", error);
      toast.error(`Lỗi khi lưu lịch hẹn: ${error.message}`);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setAppointments(appointments.filter((app) => app.id !== id));
      toast.success("Đã xóa lịch hẹn thành công");
      setIsDialogOpen(false);
      setEditingAppointment(null);
      
    } catch (error: any) {
      console.error("Error deleting appointment:", error);
      toast.error(`Lỗi khi xóa lịch hẹn: ${error.message}`);
    }
  };

  const handleCompleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'completed' })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setAppointments(
        appointments.map((app) =>
          app.id === id ? { ...app, status: "completed" } : app
        )
      );
      
      toast.success("Đã đánh dấu hoàn thành lịch hẹn");
      
    } catch (error: any) {
      console.error("Error completing appointment:", error);
      toast.error(`Lỗi khi đánh dấu hoàn thành: ${error.message}`);
    }
  };

  const handleTimeSlotClick = (day: Date, time: string) => {
    setSelectedDate(day);
    
    const existingAppointment = appointments.find(
      (app) => 
        app.date.getDate() === day.getDate() &&
        app.date.getMonth() === day.getMonth() &&
        app.date.getFullYear() === day.getFullYear() &&
        app.time === time
    );

    if (!existingAppointment) {
      setEditingAppointment(null);
      setNewAppointment({
        name: selectedCustomer ? selectedCustomer.name : "",
        type: "",
        time: time,
      });
      setIsDialogOpen(true);
    }
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setNewAppointment({
      name: selectedCustomer ? selectedCustomer.name : "",
      type: "",
      time: "",
    });
    setEditingAppointment(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (appointment: Appointment) => {
    setSelectedDate(appointment.date);
    setEditingAppointment(appointment);
    setNewAppointment({
      name: appointment.name,
      type: appointment.type,
      time: appointment.time,
    });
    setIsDialogOpen(true);
  };

  return {
    view,
    setView,
    currentDate,
    setCurrentDate,
    selectedDate,
    appointments,
    isDialogOpen,
    setIsDialogOpen,
    editingAppointment,
    newAppointment,
    setNewAppointment,
    handlePrevious,
    handleNext,
    handleAddAppointment,
    handleDeleteAppointment,
    handleCompleteAppointment,
    handleTimeSlotClick,
    handleDayClick,
    openEditDialog,
    loading,
  };
};
