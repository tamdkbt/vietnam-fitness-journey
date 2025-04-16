
import { Meal, FoodItem, FOODS, MEAL_TYPES } from "@/types/meal";
import { format, startOfMonth, startOfWeek, addDays, addMonths } from "date-fns";
import { vi } from "date-fns/locale";
import { WorkoutView } from "@/types/workout";

export const calculateDailyNutrition = (meals: Meal[], day: string) => {
  const dayMeals = meals.filter((meal) => meal.day === day);
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  dayMeals.forEach((meal) => {
    meal.foods.forEach((food) => {
      const foodItem = FOODS.find((f) => f.id === food.foodId);
      if (foodItem) {
        const multiplier = food.quantity / 100;
        calories += foodItem.calories * multiplier;
        protein += foodItem.protein * multiplier;
        carbs += foodItem.carbs * multiplier;
        fat += foodItem.fat * multiplier;
      }
    });
  });

  return { calories, protein, carbs, fat };
};

export const formatDateRange = (currentDate: Date, currentView: WorkoutView) => {
  if (currentView === "week") {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    return `${format(weekStart, "dd/MM")} - ${format(weekEnd, "dd/MM")}`;
  } else if (currentView === "month") {
    return format(currentDate, "MMMM yyyy", { locale: vi });
  } else if (currentView === "quarter") {
    const quarterStart = startOfMonth(currentDate);
    const quarterEnd = addMonths(quarterStart, 2);
    return `${format(quarterStart, "MM/yyyy")} - ${format(quarterEnd, "MM/yyyy")}`;
  }
  return "";
};

export const getMealIcon = (type: string) => {
  return MEAL_TYPES.find(t => t.value === type)?.icon || "Utensils";
};

export const checkHasCompletedNutrition = (meals: Meal[], day: string): boolean => {
  const nutrition = calculateDailyNutrition(meals, day);
  return nutrition.calories >= 1500;
};
