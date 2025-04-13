
import { useState, useEffect } from "react";
import { Appointment } from "../types/appointment";
import { toast } from "sonner";
import {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  completeAppointment
} from "../utils/appointments";
import { handleNext, handlePrevious } from "../utils/appointmentDateUtils";

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
  const loadAppointments = async () => {
    try {
      setLoading(true);
      const fetchedAppointments = await fetchAppointments(selectedCustomer);
      setAppointments(fetchedAppointments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [selectedCustomer]);

  const handleNavigatePrevious = () => {
    setCurrentDate(handlePrevious(currentDate, view));
  };

  const handleNavigateNext = () => {
    setCurrentDate(handleNext(currentDate, view));
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

      if (editingAppointment) {
        // Update existing appointment
        const updatedAppointment = await updateAppointment(
          editingAppointment,
          newAppointment,
          selectedCustomer
        );
        
        if (updatedAppointment) {
          // Update local state
          setAppointments(
            appointments.map((app) =>
              app.id === editingAppointment.id ? updatedAppointment : app
            )
          );
        }
      } else {
        // Insert new appointment
        const newApp = await addAppointment(selectedDate, newAppointment, selectedCustomer);
        
        if (newApp) {
          setAppointments([...appointments, newApp]);
        }
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
    const success = await deleteAppointment(id);
    
    if (success) {
      setAppointments(appointments.filter((app) => app.id !== id));
      setIsDialogOpen(false);
      setEditingAppointment(null);
    }
  };

  const handleCompleteAppointment = async (id: string) => {
    const success = await completeAppointment(id);
    
    if (success) {
      setAppointments(
        appointments.map((app) =>
          app.id === id ? { ...app, status: "completed" } : app
        )
      );
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
    handlePrevious: handleNavigatePrevious,
    handleNext: handleNavigateNext,
    handleAddAppointment,
    handleDeleteAppointment,
    handleCompleteAppointment,
    handleTimeSlotClick,
    handleDayClick,
    openEditDialog,
    loading,
  };
};
