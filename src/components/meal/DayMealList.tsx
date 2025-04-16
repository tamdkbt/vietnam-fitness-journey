
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Utensils, Check, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MealCard from "./MealCard";
import NutritionOverview from "./NutritionOverview";
import FoodList from "./FoodList";
import FoodFilterBar from "./FoodFilterBar";
import FoodDetailsModal from "./FoodDetailsModal";
import { calculateDailyNutrition } from "@/utils/mealUtils";
import { Meal, FoodItem } from "@/types/mealTypes";
import { DAYS, FOODS } from "@/types/meal";
import { toast } from "sonner";

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
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const nutrition = calculateDailyNutrition(dayMeals, day);
  const dayLabel = DAYS.find(d => d.value === day)?.label || day;

  const handleAddFoodToMeal = (foodId: string, quantity: number) => {
    // Here you would implement the logic to add food to the meal
    toast.success("Đã thêm món ăn vào thực đơn");
  };

  const filteredFoods = FOODS.filter(food => {
    if (searchQuery) {
      return food.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (selectedCategory !== "all") {
      return food.category === selectedCategory;
    }
    return true;
  });

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
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Danh sách món ăn
          </CardTitle>
          <CardDescription>
            Danh sách các món ăn có sẵn. Chọn món ăn để thêm vào lịch.
          </CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm món ăn..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Thêm món ăn mới
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <FoodFilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchQuery}
            />
            <FoodList
              foods={filteredFoods}
              selectedCategory={selectedCategory}
              onShowDetails={setSelectedFood}
              onAddToMeal={(foodId) => handleAddFoodToMeal(foodId, 100)}
            />
          </div>
        </CardContent>
      </Card>

      <FoodDetailsModal
        food={selectedFood}
        isOpen={!!selectedFood}
        onClose={() => setSelectedFood(null)}
        onAddToMeal={handleAddFoodToMeal}
      />
    </div>
  );
};

export default DayMealList;
