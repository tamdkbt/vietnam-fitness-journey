import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format, getDate, getDay, getDaysInMonth, isSameDay, isToday, startOfMonth } from "date-fns";
import { vi } from "date-fns/locale";
import { Workout } from "@/types/workout";
import { calculateWorkoutDuration, formatTime, getExerciseById } from "@/utils/workoutUtils";
import { Badge } from "../ui/badge";
import { DumbbellIcon } from "lucide-react";

interface MonthViewProps {
  currentDate: Date;
  workouts: Workout[];
  onDayClick: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, workouts, onDayClick }) => {
  const firstDayOfMonth = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startWeekday = getDay(firstDayOfMonth);
  // Adjust start weekday for Vietnamese calendar (Monday is first day)
  const adjustedStartDay = startWeekday === 0 ? 6 : startWeekday - 1;
  
  // Create days array for the grid
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayOffset = i - adjustedStartDay;
    const date = new Date(firstDayOfMonth);
    date.setDate(date.getDate() + dayOffset);
    return date;
  });
  
  // Filter days to show only current month and necessary padding
  const visibleDays = days.filter((date, index) => {
    const day = getDate(date);
    const monthDifference = date.getMonth() - currentDate.getMonth();
    
    // Keep the first row even if it contains days from the previous month
    if (index < 7 && monthDifference === -1) return true;
    
    // Keep days from the current month
    if (monthDifference === 0) return true;
    
    // Keep days from the next month to complete the grid
    if (monthDifference === 1 && index % 7 !== 0) return true;
    
    return false;
  });
  
  const getWorkoutsForDate = (date: Date) => {
    // Get day of week as string
    const dayOfWeek = format(date, 'EEEE', { locale: vi }).toLowerCase();
    const englishDayMap: Record<string, string> = {
      'thứ hai': 'monday', 
      'thứ ba': 'tuesday', 
      'thứ tư': 'wednesday', 
      'thứ năm': 'thursday', 
      'thứ sáu': 'friday', 
      'thứ bảy': 'saturday',
      'chủ nhật': 'sunday'
    };
    
    const dayKey = englishDayMap[dayOfWeek] || dayOfWeek;
    return workouts.filter(workout => workout.day === dayKey);
  };
  
  const calculateTotalDurationForDay = (date: Date) => {
    const dayWorkouts = getWorkoutsForDate(date);
    return dayWorkouts.reduce((total, workout) => {
      return total + calculateWorkoutDuration(workout);
    }, 0);
  };
  
  const getDayCardClass = (date: Date) => {
    const inCurrentMonth = date.getMonth() === currentDate.getMonth();
    const isCurrentDay = isToday(date);
    
    if (!inCurrentMonth) return "bg-gray-50 opacity-50";
    if (isCurrentDay) return "bg-blue-50 border-blue-200";
    
    const dayWorkouts = getWorkoutsForDate(date);
    if (dayWorkouts.length > 0) return "bg-green-50 border-green-100";
    
    return "bg-white hover:bg-gray-50";
  };
  
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1 text-center font-medium">
        <div>T2</div>
        <div>T3</div>
        <div>T4</div>
        <div>T5</div>
        <div>T6</div>
        <div>T7</div>
        <div>CN</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {visibleDays.map((date, index) => {
          const dayWorkouts = getWorkoutsForDate(date);
          const totalDuration = calculateTotalDurationForDay(date);
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          
          return (
            <Card 
              key={index} 
              className={`min-h-[90px] flex flex-col overflow-hidden border ${getDayCardClass(date)} cursor-pointer transition-colors`}
              onClick={() => onDayClick(date)}
            >
              <div className={`text-right p-1 text-sm font-medium ${isToday(date) ? 'bg-primary text-white' : ''}`}>
                {format(date, 'd')}
              </div>
              
              <CardContent className="p-1 text-xs flex-1 flex flex-col">
                {dayWorkouts.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant="outline" className="text-[10px] h-4 px-1">
                        {dayWorkouts.length} buổi tập
                      </Badge>
                      {totalDuration > 0 && (
                        <Badge variant="secondary" className="text-[10px] h-4 px-1">
                          {formatTime(totalDuration)}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 overflow-hidden">
                      {dayWorkouts.slice(0, 2).map(workout => (
                        <div key={workout.id} className="text-[10px] truncate">
                          • {workout.name} ({workout.exercises.length} bài tập)
                        </div>
                      ))}
                      
                      {dayWorkouts.length > 2 && (
                        <div className="text-[10px] text-muted-foreground">
                          + {dayWorkouts.length - 2} buổi tập khác
                        </div>
                      )}
                    </div>
                  </>
                ) : isCurrentMonth ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <DumbbellIcon className="h-3 w-3 mr-1 opacity-50" />
                    <span className="opacity-50">Chưa có lịch tập</span>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
