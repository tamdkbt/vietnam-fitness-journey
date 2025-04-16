
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FoodItem, Meal, FOODS, MEAL_TYPES } from "@/types/meal";
import { Coffee, Utensils, Pizza, Apple } from "lucide-react";
import { getMealIcon } from "@/utils/mealUtils";

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const renderMealIcon = () => {
    const iconName = getMealIcon(meal.type);
    switch (iconName) {
      case "Coffee":
        return <Coffee className="h-5 w-5" />;
      case "Utensils":
        return <Utensils className="h-5 w-5" />;
      case "Pizza":
        return <Pizza className="h-5 w-5" />;
      case "Apple":
        return <Apple className="h-5 w-5" />;
      default:
        return <Utensils className="h-5 w-5" />;
    }
  };

  const mealNutrition = meal.foods.reduce((total, food) => {
    const foodDetails = FOODS.find(f => f.id === food.foodId);
    if (foodDetails) {
      const multiplier = food.quantity / 100;
      total.calories += foodDetails.calories * multiplier;
    }
    return total;
  }, { calories: 0 });

  return (
    <Card className="meal-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-md text-primary">
            {renderMealIcon()}
          </div>
          <CardTitle className="text-base">
            {MEAL_TYPES.find(t => t.value === meal.type)?.label || meal.type}
          </CardTitle>
        </div>
        
        <div className="flex items-center gap-1">
          <Badge variant="outline">
            {Math.round(mealNutrition.calories)} kcal
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          {meal.foods.map((food) => {
            const foodDetails = FOODS.find(f => f.id === food.foodId);
            if (!foodDetails) return null;
            
            return (
              <div key={food.foodId} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{foodDetails.name}</div>
                  <div className="text-xs text-gray-500">{food.quantity}g</div>
                </div>
                <div className="text-sm">
                  {Math.round((foodDetails.calories * food.quantity) / 100)} kcal
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
