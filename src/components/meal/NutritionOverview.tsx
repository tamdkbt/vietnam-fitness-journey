
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface NutritionOverviewProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  dayLabel: string;
}

const NutritionOverview: React.FC<NutritionOverviewProps> = ({
  calories,
  protein,
  carbs,
  fat,
  dayLabel,
}) => {
  return (
    <Card className="bg-accent/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Tổng quan dinh dưỡng {dayLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-2 bg-white rounded-md shadow-sm text-center">
            <div className="text-xs text-gray-500 mb-1">Calories</div>
            <div className="font-bold">{Math.round(calories)} kcal</div>
          </div>
          <div className="p-2 bg-white rounded-md shadow-sm text-center">
            <div className="text-xs text-gray-500 mb-1">Protein</div>
            <div className="font-bold">{Math.round(protein)}g</div>
          </div>
          <div className="p-2 bg-white rounded-md shadow-sm text-center">
            <div className="text-xs text-gray-500 mb-1">Carbs</div>
            <div className="font-bold">{Math.round(carbs)}g</div>
          </div>
          <div className="p-2 bg-white rounded-md shadow-sm text-center">
            <div className="text-xs text-gray-500 mb-1">Chất béo</div>
            <div className="font-bold">{Math.round(fat)}g</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionOverview;
