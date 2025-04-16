
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Apple } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FOOD_CATEGORIES, FoodItem } from "@/types/meal";

interface FoodListProps {
  foods: FoodItem[];
  selectedCategory: string;
  onShowDetails: (food: FoodItem) => void;
  onAddToMeal: (foodId: string) => void;
}

const FoodList: React.FC<FoodListProps> = ({
  foods,
  selectedCategory,
  onShowDetails,
  onAddToMeal,
}) => {
  const filteredFoods = selectedCategory === "all" 
    ? foods 
    : foods.filter(food => food.category === selectedCategory);

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map((food) => (
          <Card 
            key={food.id} 
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => onShowDetails(food)}
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                  <Apple className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{food.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {FOOD_CATEGORIES.find(c => c.value === food.category)?.label}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToMeal(food.id);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">
                  {food.calories} kcal
                </Badge>
                <Badge variant="outline">
                  P: {food.protein}g
                </Badge>
                <Badge variant="outline">
                  C: {food.carbs}g
                </Badge>
                <Badge variant="outline">
                  F: {food.fat}g
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Không tìm thấy món ăn nào trong danh mục này.
          </p>
        </div>
      )}
    </ScrollArea>
  );
};

export default FoodList;
