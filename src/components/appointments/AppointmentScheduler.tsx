
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

  // Render appointment for weekly view
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

  // Render appointment for monthly view - now using the same popover approach as weekly view
  const renderMonthlyAppointment = (day, appointment) => (
    <AppointmentPopover 
      appointment={appointment} 
      appointmentTypeNameById={appointmentTypeNameById} 
      openEditDialog={openEditDialog} 
      handleCompleteAppointment={handleCompleteAppointment}
    >
      <div className={`text-xs p-1 mb-1 rounded truncate ${appointment.status === "completed" ? "bg-gray-200" : "bg-primary/10 text-primary font-medium"}`}>
        {appointment.time} - {appointment.name.split(" ")[0]}
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
