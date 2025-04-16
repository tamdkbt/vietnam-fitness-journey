
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Utensils } from "lucide-react";
import { Check } from "lucide-react";
import MealCard from "./MealCard";
import NutritionOverview from "./NutritionOverview";
import { calculateDailyNutrition } from "@/utils/mealUtils";
import { Meal, DAYS } from "@/types/meal";

interface DayMealListProps {
  dayMeals: Meal[];
  day: string;
  hasCompletedNutrition: boolean;
}

const DayMealList: React.FC<DayMealListProps> = ({
  dayMeals,
  day,
  hasCompletedNutrition,
}) => {
  const nutrition = calculateDailyNutrition(dayMeals, day);
  const dayLabel = DAYS.find(d => d.value === day)?.label || day;

  if (dayMeals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
        <Utensils className="h-12 w-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Chưa có bữa ăn nào</h3>
        <p className="mb-4">Hãy thêm bữa ăn mới cho ngày này</p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm bữa ăn
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hasCompletedNutrition && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
          <Check className="h-5 w-5 mr-2 text-green-500" />
          <p>Bạn đã hoàn thành kế hoạch dinh dưỡng cho ngày này!</p>
        </div>
      )}
      
      <NutritionOverview {...nutrition} dayLabel={dayLabel} />
      
      {dayMeals
        .sort((a, b) => {
          const mealOrder = { breakfast: 1, lunch: 2, snack: 3, dinner: 4 };
          return mealOrder[a.type as keyof typeof mealOrder] - mealOrder[b.type as keyof typeof mealOrder];
        })
        .map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      
      <div className="flex justify-center mt-4">
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Thêm bữa ăn
        </Button>
      </div>
    </div>
  );
};

export default DayMealList;
