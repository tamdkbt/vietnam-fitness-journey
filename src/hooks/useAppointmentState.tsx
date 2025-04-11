
import { useState } from "react";
import { addDays } from "date-fns";
import { Appointment } from "../types/appointment";
import { toast } from "sonner";
import { navigateNext, navigatePrevious } from "../utils/dateUtils";

export const useAppointmentState = (selectedCustomer: any) => {
  const [view, setView] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      date: addDays(new Date(), 1),
      time: "09:00",
      name: "Nguyễn Văn A",
      type: "personal_training",
      status: "scheduled",
    },
    {
      id: "2",
      date: addDays(new Date(), 2),
      time: "14:00",
      name: "Trần Thị B",
      type: "nutrition",
      status: "scheduled",
    },
    {
      id: "3",
      date: addDays(new Date(), 3),
      time: "17:00",
      name: "Lê Văn C",
      type: "group_class",
      status: "completed",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    type: "",
    time: "",
  });

  const handlePrevious = () => {
    setCurrentDate(navigatePrevious(currentDate, view));
  };

  const handleNext = () => {
    setCurrentDate(navigateNext(currentDate, view));
  };

  const handleAddAppointment = () => {
    if (!newAppointment.name && !selectedCustomer) {
      toast.error("Vui lòng điền tên khách hàng");
      return;
    }
    
    if (!newAppointment.type || !newAppointment.time) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (editingAppointment) {
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
      const newApp: Appointment = {
        id: Math.random().toString(36).substring(2, 9),
        date: selectedDate,
        time: newAppointment.time,
        name: selectedCustomer ? selectedCustomer.name : newAppointment.name,
        type: newAppointment.type,
        status: "scheduled",
      };
      setAppointments([...appointments, newApp]);
      toast.success("Đã thêm lịch hẹn thành công");
    }

    setIsDialogOpen(false);
    setEditingAppointment(null);
    setNewAppointment({ name: "", type: "", time: "" });
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((app) => app.id !== id));
    toast.success("Đã xóa lịch hẹn thành công");
    setIsDialogOpen(false);
    setEditingAppointment(null);
  };

  const handleCompleteAppointment = (id: string) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "completed" } : app
      )
    );
    toast.success("Đã đánh dấu hoàn thành lịch hẹn");
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
  };
};
