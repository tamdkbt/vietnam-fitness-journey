
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import DayTabs from "./workout/DayTabs";
import { WorkoutView } from "@/types/workout";
import { TabsContent } from "./ui/tabs";
import MonthView from "./workout/MonthView";
import QuarterView from "./workout/QuarterView";
import { DAYS, Meal, SAMPLE_MEALS } from "@/types/meal";
import DayMealList from "./meal/DayMealList";
import { formatDateRange, calculateDailyNutrition, checkHasCompletedNutrition } from "@/utils/mealUtils";

interface MealPlanBuilderProps {
  currentView: WorkoutView;
}

const MealPlanBuilder: React.FC<MealPlanBuilderProps> = ({ currentView }) => {
  const [meals, setMeals] = useState<Meal[]>(SAMPLE_MEALS);
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handlePrevious = () => {
    if (currentView === "week") {
      setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 7)));
    } else if (currentView === "month") {
      setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)));
    } else if (currentView === "quarter") {
      setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() - 3)));
    }
  };

  const handleNext = () => {
    if (currentView === "week") {
      setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 7)));
    } else if (currentView === "month") {
      setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)));
    } else if (currentView === "quarter") {
      setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() + 3)));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDownloadPDF = () => {
    toast.success("Đã xuất kế hoạch ăn uống thành công");
  };

  const calculateTotalCaloriesForDay = (day: string): number => {
    const nutrition = calculateDailyNutrition(meals, day);
    return nutrition.calories;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Kế hoạch dinh dưỡng</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium min-w-24 text-center">
                {formatDateRange(currentDate, currentView)}
              </div>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleToday}>
                Hôm nay
              </Button>
              <Button onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Xuất PDF
              </Button>
            </div>
          </div>
          <CardDescription>
            Lập kế hoạch ăn uống theo từng ngày
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentView === "week" && (
            <DayTabs 
              selectedDay={selectedDay} 
              onDayChange={setSelectedDay} 
              calculateTotalDurationForDay={calculateTotalCaloriesForDay}
              completionThreshold={1500}
              showCompletionIndicator={true}
            >
              {DAYS.map((day) => {
                const dayMeals = meals.filter((meal) => meal.day === day.value);
                const hasCompletedNutrition = checkHasCompletedNutrition(meals, day.value);
                
                return (
                  <TabsContent key={day.value} value={day.value} className="space-y-4">
                    <DayMealList 
                      dayMeals={dayMeals}
                      day={day.value}
                      hasCompletedNutrition={hasCompletedNutrition}
                    />
                  </TabsContent>
                );
              })}
            </DayTabs>
          )}
          
          {currentView === "month" && (
            <MonthView 
              currentDate={currentDate}
              workouts={[]} // We'll adapt this for meals later
              onDayClick={(date) => {
                setCurrentDate(date);
                // Convert date to day of week
                const dayIndex = date.getDay();
                const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                setSelectedDay(dayNames[dayIndex]);
              }}
            />
          )}
          
          {currentView === "quarter" && (
            <QuarterView
              currentDate={currentDate}
              workouts={[]} // We'll adapt this for meals later
              onWeekClick={(weekStart) => {
                setCurrentDate(weekStart);
                setSelectedDay("monday");
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlanBuilder;
