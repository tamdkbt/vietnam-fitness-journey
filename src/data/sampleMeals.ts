import { Meal } from "../types/mealTypes";

export const SAMPLE_MEALS: Meal[] = [
  {
    id: "meal1",
    type: "breakfast",
    day: "monday",
    foods: [
      { foodId: "food4", quantity: 100 }, // Trứng gà
      { foodId: "food7", quantity: 50 },  // Bánh mì
    ]
  },
  {
    id: "meal2",
    type: "lunch",
    day: "monday",
    foods: [
      { foodId: "food1", quantity: 150 }, // Thịt gà
      { foodId: "food6", quantity: 200 }, // Cơm trắng
      { foodId: "food14", quantity: 100 }, // Cà rốt
    ]
  },
  {
    id: "meal3",
    type: "breakfast",
    day: "tuesday",
    foods: [
      { foodId: "food9", quantity: 80 }, // Yến mạch
      { foodId: "food16", quantity: 120 }, // Chuối
    ]
  },
  {
    id: "meal4",
    type: "dinner",
    day: "monday",
    foods: [
      { foodId: "food3", quantity: 120 }, // Cá hồi
      { foodId: "food6", quantity: 150 }, // Cơm trắng
      { foodId: "food15", quantity: 100 }, // Bông cải xanh
    ]
  }
];
