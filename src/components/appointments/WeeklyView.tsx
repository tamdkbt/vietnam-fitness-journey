
import React from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Appointment, HOURS, AppointmentType } from "../../types/appointment";
import { checkIsToday, formatDate } from "../../utils/dateUtils";

interface WeeklyViewProps {
  daysToDisplay: Date[];
  appointments: Appointment[];
  appointmentTypes: AppointmentType[];
  handleTimeSlotClick: (day: Date, time: string) => void;
  renderAppointment?: (day: Date, appointment: Appointment) => React.ReactNode;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ 
  daysToDisplay, 
  appointments, 
  appointmentTypes,
  handleTimeSlotClick,
  renderAppointment
}) => {
  const appointmentTypeNameById = (id: string) => {
    return appointmentTypes.find(type => type.id === id)?.name || id;
  };

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
                checkIsToday(day) && "border-primary text-primary font-medium"
              )}
            >
              <div className="text-sm">{formatDate(day, "EEEE")}</div>
              <div className={cn(
                "mt-1 font-bold w-8 h-8 flex items-center justify-center rounded-full",
                checkIsToday(day) && "bg-primary text-white"
              )}>
                {formatDate(day, "d")}
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
                  onClick={() => {
                    if (!appointmentAtThisTime) {
                      handleTimeSlotClick(day, hour);
                    }
                  }}
                >
                  {appointmentAtThisTime && (
                    renderAppointment ? (
                      renderAppointment(day, appointmentAtThisTime)
                    ) : (
                      <div className="p-2 h-full flex flex-col">
                        <div className="font-medium text-sm truncate">
                          {appointmentAtThisTime.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <User className="h-3 w-3 mr-1" />
                          {appointmentTypeNameById(appointmentAtThisTime.type)}
                        </div>
                      </div>
                    )
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

export default WeeklyView;
