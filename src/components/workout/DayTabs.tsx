
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DAYS, MIN_WORKOUT_DURATION } from "@/types/workout";
import { CheckCircle } from "lucide-react";

interface DayTabsProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  calculateTotalDurationForDay?: (day: string) => number;
  completionThreshold?: number;
  showCompletionIndicator?: boolean;
  days?: Array<{value: string, label: string}>;
  children: React.ReactNode;
}

const DayTabs: React.FC<DayTabsProps> = ({ 
  selectedDay, 
  onDayChange,
  calculateTotalDurationForDay,
  completionThreshold = MIN_WORKOUT_DURATION,
  showCompletionIndicator = true,
  days = DAYS,
  children
}) => {
  return (
    <Tabs value={selectedDay} onValueChange={onDayChange}>
      <TabsList className="grid grid-cols-7 mb-4">
        {days.map((day) => {
          const duration = calculateTotalDurationForDay ? calculateTotalDurationForDay(day.value) : 0;
          const hasCompletedWorkout = showCompletionIndicator && duration >= completionThreshold;
          
          return (
            <TabsTrigger key={day.value} value={day.value} className="relative">
              {day.label}
              {hasCompletedWorkout && (
                <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default DayTabs;
