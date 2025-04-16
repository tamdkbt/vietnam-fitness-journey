
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogFooter,
  AlertDialogCancel, 
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { FoodItem, FOOD_CATEGORIES } from "@/types/meal";

interface FoodDetailsModalProps {
  food: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToMeal: (foodId: string, quantity: number) => void;
}

const FoodDetailsModal: React.FC<FoodDetailsModalProps> = ({
  food,
  isOpen,
  onClose,
  onAddToMeal,
}) => {
  const [quantity, setQuantity] = useState(100);

  if (!food) return null;

  const multiplier = quantity / 100;
  const calculatedCalories = Math.round(food.calories * multiplier);
  const calculatedProtein = Math.round(food.protein * multiplier * 10) / 10;
  const calculatedCarbs = Math.round(food.carbs * multiplier * 10) / 10;
  const calculatedFat = Math.round(food.fat * multiplier * 10) / 10;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            <span>{food.name}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">
              {FOOD_CATEGORIES.find(c => c.value === food.category)?.label}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              {calculatedCalories} kcal
            </Badge>
          </div>
        </AlertDialogHeader>
        <div className="mt-4">
          <p className="text-sm leading-relaxed text-gray-700 mb-4">
            Thành phần dinh dưỡng (trên {quantity}g):
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-2 bg-secondary/20 rounded-md">
              <div className="text-sm font-medium mb-1">Protein</div>
              <div>{calculatedProtein}g</div>
            </div>
            <div className="text-center p-2 bg-secondary/20 rounded-md">
              <div className="text-sm font-medium mb-1">Carbs</div>
              <div>{calculatedCarbs}g</div>
            </div>
            <div className="text-center p-2 bg-secondary/20 rounded-md">
              <div className="text-sm font-medium mb-1">Fat</div>
              <div>{calculatedFat}g</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="quantity" className="text-sm font-medium">
                Khẩu phần (gram)
              </label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="mt-1"
              />
            </div>
          </div>
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <Button onClick={() => {
            onAddToMeal(food.id, quantity);
            onClose();
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm vào bữa ăn
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FoodDetailsModal;
