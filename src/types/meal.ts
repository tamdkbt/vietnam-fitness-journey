
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

export const DAYS = [
  { value: "monday", label: "Thứ hai" },
  { value: "tuesday", label: "Thứ ba" },
  { value: "wednesday", label: "Thứ tư" },
  { value: "thursday", label: "Thứ năm" },
  { value: "friday", label: "Thứ sáu" },
  { value: "saturday", label: "Thứ bảy" },
  { value: "sunday", label: "Chủ nhật" },
];

export const FOOD_CATEGORIES = [
  { value: "protein", label: "Thực phẩm giàu Protein" },
  { value: "carbs", label: "Tinh bột - Carbs" },
  { value: "fats", label: "Chất béo lành mạnh" },
  { value: "vegetables", label: "Rau củ" },
  { value: "fruits", label: "Trái cây" },
  { value: "drinks", label: "Đồ uống" },
  { value: "other", label: "Khác" },
];

export const MEAL_TYPES = [
  { value: "breakfast", label: "Bữa sáng", icon: "Coffee" },
  { value: "lunch", label: "Bữa trưa", icon: "Utensils" },
  { value: "dinner", label: "Bữa tối", icon: "Pizza" },
  { value: "snack", label: "Bữa phụ", icon: "Apple" },
];

export const FOODS: FoodItem[] = [
  // Protein
  {
    id: "food1",
    name: "Thịt gà",
    category: "protein",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  {
    id: "food2",
    name: "Thịt bò",
    category: "protein",
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 17,
  },
  {
    id: "food3",
    name: "Cá hồi",
    category: "protein",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
  },
  {
    id: "food4",
    name: "Trứng gà",
    category: "protein",
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
  },
  {
    id: "food5",
    name: "Đậu phụ",
    category: "protein",
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fat: 4.8,
  },
  // Carbs
  {
    id: "food6",
    name: "Cơm trắng",
    category: "carbs",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
  },
  {
    id: "food7",
    name: "Bánh mì",
    category: "carbs",
    calories: 265,
    protein: 9,
    carbs: 49,
    fat: 3.2,
  },
  {
    id: "food8",
    name: "Khoai lang",
    category: "carbs",
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
  },
  {
    id: "food9",
    name: "Yến mạch",
    category: "carbs",
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fat: 6.9,
  },
  // Fats
  {
    id: "food10",
    name: "Bơ",
    category: "fats",
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
  },
  {
    id: "food11",
    name: "Dầu olive",
    category: "fats",
    calories: 119,
    protein: 0,
    carbs: 0,
    fat: 13.5,
  },
  {
    id: "food12",
    name: "Hạt điều",
    category: "fats",
    calories: 553,
    protein: 18,
    carbs: 30,
    fat: 44,
  },
  // Vegetables
  {
    id: "food13",
    name: "Rau cải xanh",
    category: "vegetables",
    calories: 34,
    protein: 2.9,
    carbs: 6.6,
    fat: 0.4,
  },
  {
    id: "food14",
    name: "Cà rốt",
    category: "vegetables",
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2,
  },
  {
    id: "food15",
    name: "Bông cải xanh",
    category: "vegetables",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
  },
  // Fruits
  {
    id: "food16",
    name: "Chuối",
    category: "fruits",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
  },
  {
    id: "food17",
    name: "Táo",
    category: "fruits",
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2,
  },
  {
    id: "food18",
    name: "Cam",
    category: "fruits",
    calories: 43,
    protein: 0.9,
    carbs: 8.2,
    fat: 0.1,
  },
  // Drinks
  {
    id: "food19",
    name: "Nước ép cam",
    category: "drinks",
    calories: 45,
    protein: 0.7,
    carbs: 10.4,
    fat: 0.2,
  },
  {
    id: "food20",
    name: "Sữa ít béo",
    category: "drinks",
    calories: 42,
    protein: 3.4,
    carbs: 5,
    fat: 1,
  },
];

// Add sample meals for testing
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
