import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Coffee,
  Utensils,
  Pizza,
  Apple,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { 
  format, 
  addDays, 
  startOfWeek, 
  addWeeks,
  addMonths,
  startOfMonth
} from "date-fns";
import { vi } from "date-fns/locale";
import DayTabs from "./workout/DayTabs";
import { WorkoutView } from "@/types/workout";
import { TabsContent } from "./ui/tabs";
import MonthView from "./workout/MonthView";
import QuarterView from "./workout/QuarterView";
import { Badge } from "./ui/badge";

// Các loại thực phẩm
type FoodItem = {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
};

// Các loại bữa ăn
type Meal = {
  id: string;
  type: string; // breakfast, lunch, dinner, snack
  day: string; // monday, tuesday, etc.
  foods: MealFood[];
};

type MealFood = {
  foodId: string;
  quantity: number;
};

// Danh sách loại thực phẩm
const FOOD_CATEGORIES = [
  { value: "protein", label: "Thực phẩm giàu Protein" },
  { value: "carbs", label: "Tinh bột - Carbs" },
  { value: "fats", label: "Chất béo lành mạnh" },
  { value: "vegetables", label: "Rau củ" },
  { value: "fruits", label: "Trái cây" },
  { value: "drinks", label: "Đồ uống" },
  { value: "other", label: "Khác" },
];

// Danh sách loại bữa ăn
const MEAL_TYPES = [
  { value: "breakfast", label: "Bữa sáng", icon: Coffee },
  { value: "lunch", label: "Bữa trưa", icon: Utensils },
  { value: "dinner", label: "Bữa tối", icon: Pizza },
  { value: "snack", label: "Bữa phụ", icon: Apple },
];

// Sample food items
const FOODS: FoodItem[] = [
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

// Sample meals
const SAMPLE_MEALS: Meal[] = [
  {
    id: "meal1",
    type: "breakfast",
    day: "monday",
    foods: [
      { foodId: "food9", quantity: 100 }, // Yến mạch
      { foodId: "food20", quantity: 250 }, // Sữa
      { foodId: "food16", quantity: 100 }, // Chuối
    ],
  },
  {
    id: "meal2",
    type: "lunch",
    day: "monday",
    foods: [
      { foodId: "food6", quantity: 150 }, // Cơm
      { foodId: "food1", quantity: 100 }, // Gà
      { foodId: "food13", quantity: 100 }, // Rau cải
    ],
  },
  {
    id: "meal3",
    type: "dinner",
    day: "monday",
    foods: [
      { foodId: "food3", quantity: 150 }, // Cá hồi
      { foodId: "food8", quantity: 100 }, // Khoai lang
      { foodId: "food15", quantity: 100 }, // Bông cải
    ],
  },
  {
    id: "meal4",
    type: "breakfast",
    day: "tuesday",
    foods: [
      { foodId: "food7", quantity: 100 }, // Bánh mì
      { foodId: "food4", quantity: 100 }, // Trứng
      { foodId: "food10", quantity: 50 }, // Bơ
    ],
  },
];

// Danh sách ngày trong tuần
const DAYS = [
  { value: "monday", label: "Thứ 2" },
  { value: "tuesday", label: "Thứ 3" },
  { value: "wednesday", label: "Thứ 4" },
  { value: "thursday", label: "Thứ 5" },
  { value: "friday", label: "Thứ 6" },
  { value: "saturday", label: "Thứ 7" },
  { value: "sunday", label: "CN" },
];

interface MealPlanBuilderProps {
  currentView: WorkoutView;
}

const MealPlanBuilder: React.FC<MealPlanBuilderProps> = ({ currentView }) => {
  const [meals, setMeals] = useState<Meal[]>(SAMPLE_MEALS);
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Handle navigation based on view
  const handlePrevious = () => {
    if (currentView === "week") {
      setCurrentDate(prev => addDays(prev, -7));
    } else if (currentView === "month") {
      setCurrentDate(prev => addMonths(prev, -1));
    } else if (currentView === "quarter") {
      setCurrentDate(prev => addMonths(prev, -3));
    }
  };

  const handleNext = () => {
    if (currentView === "week") {
      setCurrentDate(prev => addDays(prev, 7));
    } else if (currentView === "month") {
      setCurrentDate(prev => addMonths(prev, 1));
    } else if (currentView === "quarter") {
      setCurrentDate(prev => addMonths(prev, 3));
    }
  };

  // Reset to current day/week/month
  const handleToday = () => {
    setCurrentDate(new Date());
    
    if (currentView === "week") {
      // Set the selectedDay to the current day of the week
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const today = new Date();
      const dayIndex = today.getDay();
      setSelectedDay(dayNames[dayIndex]);
    }
  };

  // Calculate total calories for a day
  const calculateTotalCaloriesForDay = (day: string): number => {
    const dayMeals = meals.filter((meal) => meal.day === day);
    let totalCalories = 0;

    dayMeals.forEach((meal) => {
      meal.foods.forEach((food) => {
        const foodItem = FOODS.find((f) => f.id === food.foodId);
        if (foodItem) {
          totalCalories += (foodItem.calories * food.quantity) / 100;
        }
      });
    });

    return totalCalories;
  };

  // Calculate total nutrients for a day
  const calculateDailyNutrition = (day: string) => {
    const dayMeals = meals.filter((meal) => meal.day === day);
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    dayMeals.forEach((meal) => {
      meal.foods.forEach((food) => {
        const foodItem = FOODS.find((f) => f.id === food.foodId);
        if (foodItem) {
          const multiplier = food.quantity / 100;
          calories += foodItem.calories * multiplier;
          protein += foodItem.protein * multiplier;
          carbs += foodItem.carbs * multiplier;
          fat += foodItem.fat * multiplier;
        }
      });
    });

    return { calories, protein, carbs, fat };
  };

  // Format date ranges for display
  const formatDateRange = () => {
    if (currentView === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = addDays(weekStart, 6);
      return `${format(weekStart, "dd/MM")} - ${format(weekEnd, "dd/MM")}`;
    } else if (currentView === "month") {
      return format(currentDate, "MMMM yyyy", { locale: vi });
    } else if (currentView === "quarter") {
      const quarterStart = startOfMonth(currentDate);
      const quarterEnd = addMonths(quarterStart, 2);
      return `${format(quarterStart, "MM/yyyy")} - ${format(quarterEnd, "MM/yyyy")}`;
    }
    return "";
  };

  // Handle exporting to PDF
  const handleDownloadPDF = () => {
    toast.success("Đã xuất kế hoạch ăn uống thành công");
  };

  // Handle week selection from quarter view
  const handleWeekSelection = (weekStart: Date) => {
    setCurrentDate(weekStart);
    setSelectedDay("monday"); // Reset to Monday when selecting a week
  };

  // Handle date selection from month view
  const handleDateSelection = (date: Date) => {
    setCurrentDate(date);
    // Convert date to day of week string
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayIndex = date.getDay();
    setSelectedDay(dayNames[dayIndex]);
  };

  // Get icon for meal type
  const MealIcon = ({ type }: { type: string }) => {
    const mealType = MEAL_TYPES.find((t) => t.value === type);
    
    if (!mealType) return null;
    
    const Icon = mealType.icon;
    return <Icon className="h-5 w-5" />;
  };

  const renderMealCards = (dayMeals: Meal[]) => {
    if (dayMeals.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <Utensils className="h-12 w-12 mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Chưa có bữa ăn nào</h3>
          <p className="mb-4">Hãy thêm bữa ăn mới cho ngày này</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm bữa ăn
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {dayMeals.sort((a, b) => {
          const mealOrder = { breakfast: 1, lunch: 2, snack: 3, dinner: 4 };
          return mealOrder[a.type as keyof typeof mealOrder] - mealOrder[b.type as keyof typeof mealOrder];
        }).map((meal) => {
          const mealNutrition = calculateDailyNutrition(meal.day);
          
          return (
            <Card key={meal.id} className="meal-card">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                    <MealIcon type={meal.type} />
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
        })}
        
        <div className="flex justify-center mt-4">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Thêm bữa ăn
          </Button>
        </div>
      </div>
    );
  };

  const checkHasCompletedNutrition = (day: string): boolean => {
    const nutrition = calculateDailyNutrition(day);
    // Consider nutrition plan complete if has at least 1500 calories
    return nutrition.calories >= 1500;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Kế hoạch dinh dưỡng</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium min-w-24 text-center">
                {formatDateRange()}
              </div>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleToday}>
                Hôm nay
              </Button>
              <Button onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Xuất PDF
              </Button>
            </div>
          </div>
          <CardDescription>
            Lập kế hoạch ăn uống theo từng ngày
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentView === "week" && (
            <DayTabs 
              selectedDay={selectedDay} 
              onDayChange={setSelectedDay} 
              calculateTotalDurationForDay={(day) => calculateTotalCaloriesForDay(day)} 
              completionThreshold={1500}
              showCompletionIndicator={true}
            >
              {DAYS.map((day) => {
                const dayMeals = meals.filter((meal) => meal.day === day.value);
                const nutrition = calculateDailyNutrition(day.value);
                const hasCompletedNutrition = checkHasCompletedNutrition(day.value);
                
                return (
                  <TabsContent key={day.value} value={day.value} className="space-y-4">
                    {hasCompletedNutrition && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <p>Bạn đã hoàn thành kế hoạch dinh dưỡng cho ngày này!</p>
                      </div>
                    )}
                    
                    <Card className="bg-accent/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Tổng quan dinh dưỡng {day.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="p-2 bg-white rounded-md shadow-sm text-center">
                            <div className="text-xs text-gray-500 mb-1">Calories</div>
                            <div className="font-bold">{Math.round(nutrition.calories)} kcal</div>
                          </div>
                          <div className="p-2 bg-white rounded-md shadow-sm text-center">
                            <div className="text-xs text-gray-500 mb-1">Protein</div>
                            <div className="font-bold">{Math.round(nutrition.protein)}g</div>
                          </div>
                          <div className="p-2 bg-white rounded-md shadow-sm text-center">
                            <div className="text-xs text-gray-500 mb-1">Carbs</div>
                            <div className="font-bold">{Math.round(nutrition.carbs)}g</div>
                          </div>
                          <div className="p-2 bg-white rounded-md shadow-sm text-center">
                            <div className="text-xs text-gray-500 mb-1">Chất béo</div>
                            <div className="font-bold">{Math.round(nutrition.fat)}g</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {renderMealCards(dayMeals)}
                  </TabsContent>
                );
              })}
            </DayTabs>
          )}
          
          {currentView === "month" && (
            <MonthView 
              currentDate={currentDate}
              workouts={[]} // We'll adapt this for meals later
              onDayClick={handleDateSelection}
            />
          )}
          
          {currentView === "quarter" && (
            <QuarterView
              currentDate={currentDate}
              workouts={[]} // We'll adapt this for meals later
              onWeekClick={handleWeekSelection}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlanBuilder;
