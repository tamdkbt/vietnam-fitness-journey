import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserCheck, Check } from "lucide-react";
import { formatDate, getDaysToDisplay } from "../../utils/dateUtils";
import { appointmentTypeNameById } from "../../utils/appointmentUtils";
import { APPOINTMENT_TYPES } from "../../types/appointment";
import { useAppointmentState } from "../../hooks/useAppointmentState";
import WeeklyView from "./WeeklyView";
import MonthlyView from "./MonthlyView";
import AppointmentForm from "./AppointmentForm";
import AppointmentHeader from "./AppointmentHeader";
import AppointmentPopover from "./AppointmentPopover";
import { AppointmentSchedulerProps } from "../../types/appointment";

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  selectedCustomer
}) => {
  const {
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
    openEditDialog
  } = useAppointmentState(selectedCustomer);
  
  const daysToDisplay = getDaysToDisplay(view, currentDate);

  const renderWeeklyAppointment = (day, appointment) => (
    <AppointmentPopover 
      appointment={appointment} 
      appointmentTypeNameById={appointmentTypeNameById} 
      openEditDialog={openEditDialog} 
      handleCompleteAppointment={handleCompleteAppointment}
    >
      <div className="p-2 h-full flex flex-col cursor-pointer px-[8px] py-[4px] my-0">
        <div className="font-medium text-sm truncate">
          {appointment.name}
        </div>
        <div className="text-xs text-gray-500 flex items-center mt-1">
          <UserCheck className="h-3 w-3 mr-1" />
          {appointmentTypeNameById(appointment.type)}
        </div>
        {appointment.status === "completed" && (
          <div className="text-xs text-gray-500 flex items-center mt-1">
            <Check className="h-3 w-3 mr-1" />
            Đã hoàn thành
          </div>
        )}
      </div>
    </AppointmentPopover>
  );

  const renderMonthlyAppointment = (day, appointment) => (
    <AppointmentPopover 
      appointment={appointment} 
      appointmentTypeNameById={appointmentTypeNameById} 
      openEditDialog={openEditDialog} 
      handleCompleteAppointment={handleCompleteAppointment}
    >
      <div className={`p-1.5 rounded cursor-pointer ${
        appointment.status === "completed" 
          ? "bg-gray-200 text-gray-700" 
          : "bg-primary/10 text-primary"
      }`}>
        <div className="font-medium text-xs truncate flex justify-between">
          <span>{appointment.time}</span>
          <span>{appointment.name}</span>
        </div>
        <div className="text-[10px] flex items-center mt-1 truncate">
          <UserCheck className="h-2.5 w-2.5 mr-1" />
          <span className="truncate">{appointmentTypeNameById(appointment.type)}</span>
        </div>
        {appointment.status === "completed" && (
          <div className="text-[10px] text-green-600 flex items-center mt-0.5">
            <Check className="h-2.5 w-2.5 mr-1" />
            <span>Đã hoàn thành</span>
          </div>
        )}
      </div>
    </AppointmentPopover>
  );

  return (
    <div className="space-y-4">
      <Card>
        <AppointmentHeader 
          view={view} 
          setView={setView} 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate} 
          handlePrevious={handlePrevious} 
          handleNext={handleNext} 
          daysToDisplay={daysToDisplay} 
        />
        <CardContent>
          {view === "week" ? (
            <WeeklyView 
              daysToDisplay={daysToDisplay} 
              appointments={appointments} 
              appointmentTypes={APPOINTMENT_TYPES} 
              handleTimeSlotClick={handleTimeSlotClick} 
              renderAppointment={renderWeeklyAppointment} 
            />
          ) : (
            <MonthlyView 
              daysToDisplay={daysToDisplay} 
              currentDate={currentDate} 
              appointments={appointments} 
              handleDayClick={handleDayClick} 
              renderAppointment={renderMonthlyAppointment} 
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
