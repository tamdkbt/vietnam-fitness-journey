
import { FoodItem } from "../types/mealTypes";
import { PROTEIN_FOODS } from "./foods/proteinFoods";
import { CARB_FOODS } from "./foods/carbFoods";
import { FAT_FOODS } from "./foods/fatFoods";
import { VEGETABLE_FOODS } from "./foods/vegetables";
import { FRUIT_FOODS } from "./foods/fruits";
import { DRINK_FOODS } from "./foods/drinks";

export const FOODS: FoodItem[] = [
  ...PROTEIN_FOODS,
  ...CARB_FOODS,
  ...FAT_FOODS,
  ...VEGETABLE_FOODS,
  ...FRUIT_FOODS,
  ...DRINK_FOODS,
];
