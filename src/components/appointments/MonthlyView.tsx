
import React from "react";
import { cn } from "@/lib/utils";
import { format, getDay } from "date-fns";
import { vi } from "date-fns/locale";
import { startOfMonth } from "date-fns";
import { Appointment } from "../../types/appointment";
import { checkIsToday, formatDate, getAppointmentsForDay } from "../../utils/dateUtils";

interface MonthlyViewProps {
  daysToDisplay: Date[];
  currentDate: Date;
  appointments: Appointment[];
  handleDayClick: (day: Date) => void;
  renderAppointment?: (day: Date, appointment: Appointment) => React.ReactNode;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({ 
  daysToDisplay, 
  currentDate,
  appointments, 
  handleDayClick,
  renderAppointment
}) => {
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
          
          const dayAppointments = getAppointmentsForDay(appointments, day);
          
          return (
            <div
              key={i}
              className={cn(
                "h-24 p-1 rounded border overflow-y-auto",
                checkIsToday(day) 
                  ? "bg-accent border-primary" 
                  : "bg-white hover:bg-gray-50 cursor-pointer"
              )}
              onClick={() => handleDayClick(day)}
            >
              <div className="text-right text-sm font-medium mb-1">
                {formatDate(day, "d")}
              </div>
              {dayAppointments.map((appointment) => (
                renderAppointment ? 
                  renderAppointment(day, appointment) : 
                  <div
                    key={appointment.id}
                    className={cn(
                      "text-xs p-1 mb-1 rounded truncate",
                      appointment.status === "completed"
                        ? "bg-gray-200"
                        : "bg-primary/10 text-primary font-medium"
                    )}
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

export default MonthlyView;
