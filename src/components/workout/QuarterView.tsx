
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, addWeeks, startOfWeek, endOfWeek, isSameMonth } from "date-fns";
import { vi } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { BarChart, CheckCircle, Trophy } from "lucide-react";
import { Workout } from "@/types/workout";
import { calculateWorkoutDuration, formatTime } from "@/utils/workoutUtils";
import { Progress } from "../ui/progress";

interface QuarterViewProps {
  currentDate: Date;
  workouts: Workout[];
  onWeekClick: (weekStart: Date) => void;
}

const QuarterView: React.FC<QuarterViewProps> = ({ currentDate, workouts, onWeekClick }) => {
  // Calculate 12 weeks (a quarter) worth of data
  const weeks = Array.from({ length: 13 }, (_, i) => {
    const weekStartDate = startOfWeek(addWeeks(currentDate, i - 4), { weekStartsOn: 1 });
    const weekEndDate = endOfWeek(weekStartDate, { weekStartsOn: 1 });
    
    // Get English day names for the given date range
    const getDayName = (day: string) => {
      const mapping: Record<string, string> = {
        'monday': 'monday',
        'tuesday': 'tuesday',
        'wednesday': 'wednesday',
        'thursday': 'thursday',
        'friday': 'friday',
        'saturday': 'saturday',
        'sunday': 'sunday',
      };
      return mapping[day] || day;
    };
    
    // Calculate workouts for each day of the week
    const weekWorkouts = Object.fromEntries(
      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
        const dayWorkouts = workouts.filter(w => w.day === getDayName(day));
        return [day, dayWorkouts];
      })
    );
    
    // Calculate total duration and completed days
    const totalDuration = Object.values(weekWorkouts).reduce((total, dayWorkouts) => {
      return total + dayWorkouts.reduce((dayTotal, workout) => 
        dayTotal + calculateWorkoutDuration(workout), 0);
    }, 0);
    
    const MIN_DAILY_WORKOUT = 15 * 60; // 15 minutes in seconds
    const daysWithWorkout = Object.values(weekWorkouts).filter(dayWorkouts => 
      dayWorkouts.reduce((sum, w) => sum + calculateWorkoutDuration(w), 0) >= MIN_DAILY_WORKOUT
    ).length;
    
    return {
      startDate: weekStartDate,
      endDate: weekEndDate,
      weekWorkouts,
      totalDuration,
      daysWithWorkout,
    };
  });
  
  // Function to determine if current week contains the actual current date
  const isCurrentWeek = (weekStartDate: Date) => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    return weekStart.getTime() === startOfWeek(weekStartDate, { weekStartsOn: 1 }).getTime();
  };
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Tuần</TableHead>
            <TableHead>Tiến độ</TableHead>
            <TableHead className="text-right">Số ngày tập</TableHead>
            <TableHead className="text-right">Tổng thời gian</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {weeks.map((week, index) => {
            const weekNumber = format(week.startDate, 'w');
            const progress = Math.min(100, (week.daysWithWorkout / 7) * 100);
            const current = isCurrentWeek(week.startDate);
            
            return (
              <TableRow 
                key={index} 
                className={`cursor-pointer ${current ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'}`}
                onClick={() => onWeekClick(week.startDate)}
              >
                <TableCell className="font-medium">
                  <div>Tuần {weekNumber}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(week.startDate, 'dd/MM')} - {format(week.endDate, 'dd/MM')}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="h-2" />
                    <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {week.daysWithWorkout >= 5 && (
                      <Badge variant="success" className="h-5 text-[10px] gap-1">
                        <CheckCircle className="h-3 w-3" /> Tuần năng suất
                      </Badge>
                    )}
                    
                    {week.totalDuration > 5 * 60 * 60 && (
                      <Badge variant="secondary" className="h-5 text-[10px] gap-1">
                        <Trophy className="h-3 w-3" /> Tổng thời gian cao
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {week.daysWithWorkout}/7
                </TableCell>
                <TableCell className="text-right">
                  {formatTime(week.totalDuration)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-sm font-medium">Phân tích tiến độ tập luyện</h3>
          </div>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>Hiệu suất tốt: tập ít nhất 5 ngày/tuần</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span>Hiệu suất trung bình: tập 3-4 ngày/tuần</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span>Cần cải thiện: tập dưới 3 ngày/tuần</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuarterView;
