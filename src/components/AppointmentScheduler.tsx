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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  User,
  Clock,
  X,
  Check,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format, addDays, addMonths, startOfWeek, startOfMonth, endOfWeek, endOfMonth, eachDayOfInterval, getDay, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { Customer } from "../pages/CustomerPage";

type Appointment = {
  id: string;
  date: Date;
  time: string;
  name: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled";
};

const HOURS = [
  "08:00", "09:00", "10:00", "11:00", 
  "14:00", "15:00", "16:00", "17:00", 
  "18:00", "19:00", "20:00"
];

const APPOINTMENT_TYPES = [
  { id: "consultation", name: "Tư vấn chế độ tập luyện" },
  { id: "personal_training", name: "Buổi tập cá nhân" },
  { id: "nutrition", name: "Tư vấn dinh dưỡng" },
  { id: "group_class", name: "Lớp học nhóm" }
];

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

  const getDaysToDisplay = () => {
    if (view === "week") {
      return eachDayOfInterval({
        start: startOfWeek(currentDate, { weekStartsOn: 1 }),
        end: endOfWeek(currentDate, { weekStartsOn: 1 }),
      });
    } else {
      return eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
      });
    }
  };

  const daysToDisplay = getDaysToDisplay();

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(
      (appointment) =>
        appointment.date.getDate() === day.getDate() &&
        appointment.date.getMonth() === day.getMonth() &&
        appointment.date.getFullYear() === day.getFullYear()
    );
  };

  const handlePrevious = () => {
    if (view === "week") {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(addMonths(currentDate, -1));
    }
  };

  const handleNext = () => {
    if (view === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const handleAddAppointment = () => {
    if (!newAppointment.name || !newAppointment.type || !newAppointment.time) {
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
                name: newAppointment.name,
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
        name: newAppointment.name,
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

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const appointmentTypeNameById = (id: string) => {
    return APPOINTMENT_TYPES.find(type => type.id === id)?.name || id;
  };

  const renderMonthlyView = () => {
    const dayNames = Array.from({ length: 7 }, (_, i) => 
      format(new Date(2021, 0, i + 1), 'EEEEEE', { locale: vi })
    );
    
    const firstDayOfMonth = startOfMonth(currentDate);
    const startDay = getDay(firstDayOfMonth);
    
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;
    
    const daysInMonth = daysToDisplay.length;
    const totalCells = Math.ceil((adjustedStartDay + daysInMonth) / 7) * 7;
    
    const calendarCells = Array.from({ length: totalCells }, (_, i) => {
      const dayIndex = i - adjustedStartDay;
      if (dayIndex < 0 || dayIndex >= daysInMonth) {
        return null;
      }
      return daysToDisplay[dayIndex];
    });
    
    return (
      <div className="w-full">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((day, i) => (
            <div key={i} className="text-center py-1 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map((day, i) => {
            if (!day) {
              return <div key={`empty-${i}`} className="h-24 bg-gray-50 rounded" />;
            }
            
            const dayAppointments = getAppointmentsForDay(day);
            
            return (
              <div
                key={i}
                className={cn(
                  "h-24 p-1 rounded border overflow-y-auto",
                  isToday(day) 
                    ? "bg-accent border-primary" 
                    : "bg-white hover:bg-gray-50 cursor-pointer"
                )}
                onClick={() => {
                  setSelectedDate(day);
                  setNewAppointment({
                    name: "",
                    type: "",
                    time: "",
                  });
                  setEditingAppointment(null);
                  setIsDialogOpen(true);
                }}
              >
                <div className="text-right text-sm font-medium mb-1">
                  {format(day, "d")}
                </div>
                {dayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={cn(
                      "text-xs p-1 mb-1 rounded truncate",
                      appointment.status === "completed"
                        ? "bg-gray-200"
                        : "bg-primary/10 text-primary font-medium"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(day);
                      setEditingAppointment(appointment);
                      setNewAppointment({
                        name: appointment.name,
                        type: appointment.type,
                        time: appointment.time,
                      });
                      setIsDialogOpen(true);
                    }}
                  >
                    {appointment.time} - {appointment.name.split(" ")[0]}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeeklyView = () => {
    return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-4 min-w-[800px]">
          <div className="col-span-1">
            <div className="h-12"></div>
            {HOURS.map((hour) => (
              <div key={hour} className="h-16 flex items-center justify-center text-sm text-gray-500">
                {hour}
              </div>
            ))}
          </div>
          
          {daysToDisplay.map((day, index) => (
            <div key={index} className="col-span-1">
              <div 
                className={cn(
                  "h-12 flex flex-col items-center justify-center border-b pb-1",
                  isToday(day) && "border-primary text-primary font-medium"
                )}
              >
                <div className="text-sm">{format(day, "EEEE", { locale: vi })}</div>
                <div className={cn(
                  "mt-1 font-bold w-8 h-8 flex items-center justify-center rounded-full",
                  isToday(day) && "bg-primary text-white"
                )}>
                  {format(day, "d")}
                </div>
              </div>
              
              {HOURS.map((hour) => {
                const appointmentAtThisTime = appointments.find(
                  (a) => 
                    a.date.getDate() === day.getDate() &&
                    a.date.getMonth() === day.getMonth() &&
                    a.date.getFullYear() === day.getFullYear() &&
                    a.time === hour
                );
                
                return (
                  <div 
                    key={`${day}-${hour}`} 
                    className={cn(
                      "h-16 border m-1 rounded-md",
                      appointmentAtThisTime ? (
                        appointmentAtThisTime.status === "completed" 
                          ? "bg-gray-100 border-gray-200" 
                          : "bg-primary/10 border-primary/30"
                      ) : "hover:bg-accent hover:border-primary/20 cursor-pointer"
                    )}
                    onClick={() => handleTimeSlotClick(day, hour)}
                  >
                    {appointmentAtThisTime && (
                      <div className="p-2 h-full flex flex-col">
                        <div className="font-medium text-sm truncate">
                          {appointmentAtThisTime.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <User className="h-3 w-3 mr-1" />
                          {appointmentTypeNameById(appointmentAtThisTime.type)}
                        </div>
                        {appointmentAtThisTime.status === "completed" && (
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Check className="h-3 w-3 mr-1" />
                            Đã hoàn thành
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
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
              ? `${format(daysToDisplay[0], "dd/MM/yyyy")} - ${format(daysToDisplay[daysToDisplay.length - 1], "dd/MM/yyyy")}` 
              : format(currentDate, "MMMM yyyy", { locale: vi })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {view === "week" ? renderWeeklyView() : renderMonthlyView()}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingAppointment ? "Chỉnh sửa lịch hẹn" : "Thêm lịch hẹn mới"}
            </DialogTitle>
            <DialogDescription>
              {format(selectedDate, "EEEE, dd/MM/yyyy", { locale: vi })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Thời gian
              </Label>
              <Select
                value={newAppointment.time}
                onValueChange={(value) =>
                  setNewAppointment({ ...newAppointment, time: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn giờ" />
                </SelectTrigger>
                <SelectContent>
                  {HOURS.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên khách hàng
              </Label>
              {selectedCustomer ? (
                <Input
                  id="name"
                  value={selectedCustomer.name}
                  className="col-span-3 bg-gray-50"
                  readOnly
                />
              ) : (
                <Input
                  id="name"
                  value={newAppointment.name}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, name: e.target.value })
                  }
                  className="col-span-3"
                />
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Loại dịch vụ
              </Label>
              <Select
                value={newAppointment.type}
                onValueChange={(value) =>
                  setNewAppointment({ ...newAppointment, type: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn loại dịch vụ" />
                </SelectTrigger>
                <SelectContent>
                  {APPOINTMENT_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {editingAppointment && (
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteAppointment(editingAppointment.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Xóa
                </Button>
                {editingAppointment.status !== "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCompleteAppointment(editingAppointment.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Hoàn thành
                  </Button>
                )}
              </div>
            )}
            <Button onClick={handleAddAppointment}>
              {editingAppointment ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentScheduler;
