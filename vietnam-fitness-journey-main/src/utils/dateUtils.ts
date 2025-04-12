
import { format, isToday, eachDayOfInterval, startOfWeek, startOfMonth, endOfWeek, endOfMonth, addDays, addMonths, getDay } from "date-fns";
import { vi } from "date-fns/locale";
import { Appointment } from "../types/appointment";

export const getDaysToDisplay = (view: "week" | "month", currentDate: Date) => {
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

export const getAppointmentsForDay = (appointments: Appointment[], day: Date) => {
  return appointments.filter(
    (appointment) =>
      appointment.date.getDate() === day.getDate() &&
      appointment.date.getMonth() === day.getMonth() &&
      appointment.date.getFullYear() === day.getFullYear()
  );
};

export const isSameDay = (day: Date, date: Date) => {
  return (
    day.getDate() === date.getDate() &&
    day.getMonth() === date.getMonth() &&
    day.getFullYear() === date.getFullYear()
  );
};

export const formatDate = (date: Date, formatString: string) => {
  return format(date, formatString, { locale: vi });
};

export const checkIsToday = isToday;

export const navigatePrevious = (currentDate: Date, view: "week" | "month") => {
  if (view === "week") {
    return addDays(currentDate, -7);
  } else {
    return addMonths(currentDate, -1);
  }
};

export const navigateNext = (currentDate: Date, view: "week" | "month") => {
  if (view === "week") {
    return addDays(currentDate, 7);
  } else {
    return addMonths(currentDate, 1);
  }
};
