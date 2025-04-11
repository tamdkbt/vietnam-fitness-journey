
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { addDays } from "date-fns";
import { APPOINTMENT_TYPES, HOURS, Appointment } from "../../types/appointment";
import { getDaysToDisplay, formatDate, navigateNext, navigatePrevious } from "../../utils/dateUtils";
import WeeklyView from "./WeeklyView";
import MonthlyView from "./MonthlyView";
import AppointmentForm from "./AppointmentForm";
import { Customer } from "../../pages/CustomerPage";

interface AppointmentSchedulerProps {
  selectedCustomer?: Customer | null;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ selectedCustomer }) => {
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

  const daysToDisplay = getDaysToDisplay(view, currentDate);

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

    if (existingAppointment) {
      setEditingAppointment(existingAppointment);
      setNewAppointment({
        name: existingAppointment.name,
        type: existingAppointment.type,
        time: existingAppointment.time,
      });
    } else {
      setEditingAppointment(null);
      setNewAppointment({
        name: selectedCustomer ? selectedCustomer.name : "",
        type: "",
        time: time,
      });
    }
    
    setIsDialogOpen(true);
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

  const handleAppointmentClick = (day: Date, appointment: Appointment) => {
    setSelectedDate(day);
    setEditingAppointment(appointment);
    setNewAppointment({
      name: appointment.name,
      type: appointment.type,
      time: appointment.time,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Lịch hẹn</CardTitle>
            <div className="flex items-center space-x-2">
              <Tabs value={view} onValueChange={(v) => setView(v as "week" | "month")}>
                <TabsList>
                  <TabsTrigger value="week">Tuần</TabsTrigger>
                  <TabsTrigger value="month">Tháng</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button size="icon" variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={() => setCurrentDate(new Date())}>
                Hôm nay
              </Button>
            </div>
          </div>
          <CardDescription>
            {view === "week" 
              ? `${formatDate(daysToDisplay[0], "dd/MM/yyyy")} - ${formatDate(daysToDisplay[daysToDisplay.length - 1], "dd/MM/yyyy")}` 
              : formatDate(currentDate, "MMMM yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {view === "week" ? (
            <WeeklyView 
              daysToDisplay={daysToDisplay} 
              appointments={appointments} 
              appointmentTypes={APPOINTMENT_TYPES}
              handleTimeSlotClick={handleTimeSlotClick}
            />
          ) : (
            <MonthlyView 
              daysToDisplay={daysToDisplay}
              currentDate={currentDate} 
              appointments={appointments}
              handleDayClick={handleDayClick}
              handleAppointmentClick={handleAppointmentClick}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingAppointment ? "Chỉnh sửa lịch hẹn" : "Thêm lịch hẹn mới"}
            </DialogTitle>
            <DialogDescription>
              {formatDate(selectedDate, "EEEE, dd/MM/yyyy")}
            </DialogDescription>
          </DialogHeader>
          
          <AppointmentForm 
            selectedDate={selectedDate}
            newAppointment={newAppointment}
            setNewAppointment={setNewAppointment}
            editingAppointment={editingAppointment}
            selectedCustomer={selectedCustomer}
            handleAddAppointment={handleAddAppointment}
            handleDeleteAppointment={handleDeleteAppointment}
            handleCompleteAppointment={handleCompleteAppointment}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentScheduler;
