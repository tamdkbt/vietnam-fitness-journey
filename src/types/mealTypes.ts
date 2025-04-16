
export type FoodItem = {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
};

export type MealFood = {
  foodId: string;
  quantity: number;
};

export type Meal = {
  id: string;
  type: string;
  day: string;
  foods: MealFood[];
};
