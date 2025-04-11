
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Appointment } from "../../types/appointment";
import AppointmentDetails from "./AppointmentDetails";

interface AppointmentPopoverProps {
  children: React.ReactNode;
  appointment: Appointment;
  appointmentTypeNameById: (id: string) => string;
  openEditDialog: (appointment: Appointment) => void;
  handleCompleteAppointment: (id: string) => void;
}

const AppointmentPopover: React.FC<AppointmentPopoverProps> = ({
  children,
  appointment,
  appointmentTypeNameById,
  openEditDialog,
  handleCompleteAppointment,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-72 p-3">
        <AppointmentDetails
          appointment={appointment}
          appointmentTypeNameById={appointmentTypeNameById}
          openEditDialog={openEditDialog}
          handleCompleteAppointment={handleCompleteAppointment}
        />
      </PopoverContent>
    </Popover>
  );
};

export default AppointmentPopover;
