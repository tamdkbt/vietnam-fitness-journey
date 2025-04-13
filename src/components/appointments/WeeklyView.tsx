
import React from "react";
import { cn } from "@/lib/utils";
import { Dumbbell, Users, Apple, UserCheck } from "lucide-react";
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

  // Get icon for appointment type
  const getAppointmentTypeIcon = (type: string) => {
    switch(type) {
      case "consultation": return <UserCheck className="h-3 w-3 mr-1" />;
      case "personal_training": return <Dumbbell className="h-3 w-3 mr-1" />;
      case "nutrition": return <Apple className="h-3 w-3 mr-1" />;
      case "group_class": return <Users className="h-3 w-3 mr-1" />;
      default: return <UserCheck className="h-3 w-3 mr-1" />;
    }
  };

  // Get color for appointment type
  const getAppointmentColor = (type: string, status: string) => {
    if (status === "completed") {
      return "bg-gray-100 border-gray-200 text-gray-700";
    }
    
    switch(type) {
      case "consultation": return "bg-purple-50 border-purple-200 text-purple-700";
      case "personal_training": return "bg-blue-50 border-blue-200 text-blue-700";
      case "nutrition": return "bg-green-50 border-green-200 text-green-700";
      case "group_class": return "bg-orange-50 border-orange-200 text-orange-700";
      default: return "bg-primary/10 border-primary/30";
    }
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
                    "h-16 border m-1 rounded-md transition-all",
                    appointmentAtThisTime 
                      ? getAppointmentColor(appointmentAtThisTime.type, appointmentAtThisTime.status)
                      : "hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
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
                        <div className="text-xs flex items-center mt-1">
                          {getAppointmentTypeIcon(appointmentAtThisTime.type)}
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
