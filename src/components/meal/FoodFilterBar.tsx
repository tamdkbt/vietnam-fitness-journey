
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FOOD_CATEGORIES } from "@/types/meal";

interface FoodFilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}

const FoodFilterBar: React.FC<FoodFilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm món ăn..."
          className="pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => onCategoryChange("all")}
        >
          Tất cả
        </Button>
        {FOOD_CATEGORIES.map((category) => (
          <Button
            key={category.value}
            size="sm"
            variant={selectedCategory === category.value ? "default" : "outline"}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FoodFilterBar;
