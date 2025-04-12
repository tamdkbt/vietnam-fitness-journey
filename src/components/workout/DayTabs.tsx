
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DAYS, MIN_WORKOUT_DURATION } from "@/types/workout";
import { CheckCircle } from "lucide-react";

interface DayTabsProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  calculateTotalDurationForDay: (day: string) => number;
  children: React.ReactNode; // Add children prop to render TabsContent
}

const DayTabs: React.FC<DayTabsProps> = ({ 
  selectedDay, 
  onDayChange,
  calculateTotalDurationForDay,
  children
}) => {
  return (
    <Tabs value={selectedDay} onValueChange={onDayChange}>
      <TabsList className="grid grid-cols-7 mb-4">
        {DAYS.map((day) => {
          const duration = calculateTotalDurationForDay(day.value);
          const hasCompletedWorkout = duration >= MIN_WORKOUT_DURATION;
          
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
