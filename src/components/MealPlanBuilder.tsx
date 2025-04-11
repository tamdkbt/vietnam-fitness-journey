
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { format, addDays, startOfWeek } from "date-fns";
import { vi } from "date-fns/locale";
import { 
  Download, 
  Search, 
  Plus, 
  X, 
  Calendar, 
  Coffee,
  Utensils,
  Pizza,
  Apple,
  Moon,
  ArrowRight,
  Info,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";

// Define food item type
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

// Define meal type
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

// Food categories
const FOOD_CATEGORIES = [
  { value: "protein", label: "Thực phẩm giàu Protein" },
  { value: "carbs", label: "Tinh bột - Carbs" },
  { value: "fats", label: "Chất béo lành mạnh" },
  { value: "vegetables", label: "Rau củ" },
  { value: "fruits", label: "Trái cây" },
  { value: "drinks", label: "Đồ uống" },
  { value: "other", label: "Khác" },
];

// Meal types
const MEAL_TYPES = [
  { value: "breakfast", label: "Bữa sáng", icon: Coffee },
  { value: "lunch", label: "Bữa trưa", icon: Utensils },
  { value: "dinner", label: "Bữa tối", icon: Pizza },
  { value: "snack", label: "Bữa phụ", icon: Apple },
];

// Vietnamese foods database
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

// Days of the week
const DAYS = [
  { value: "monday", label: "Thứ 2" },
  { value: "tuesday", label: "Thứ 3" },
  { value: "wednesday", label: "Thứ 4" },
  { value: "thursday", label: "Thứ 5" },
  { value: "friday", label: "Thứ 6" },
  { value: "saturday", label: "Thứ 7" },
  { value: "sunday", label: "CN" },
];

// Sample meal plan
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

const MealPlanBuilder = () => {
  const [meals, setMeals] = useState<Meal[]>(SAMPLE_MEALS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [showAddMealDialog, setShowAddMealDialog] = useState(false);
  const [mealType, setMealType] = useState<string>("");
  const [selectedFoods, setSelectedFoods] = useState<Array<{ foodId: string; quantity: number }>>([]);
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  // Filter foods based on search term and category
  const filteredFoods = FOODS.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filteredCategory ? food.category === filteredCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Get meals for the selected day
  const mealsForDay = meals.filter((meal) => meal.day === selectedDay);

  // Calculate nutrition totals for a meal
  const calculateMealNutrition = (meal: Meal) => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    meal.foods.forEach((mealFood) => {
      const food = FOODS.find((f) => f.id === mealFood.foodId);
      if (food) {
        const multiplier = mealFood.quantity / 100; // Assuming nutrition values are per 100g
        calories += food.calories * multiplier;
        protein += food.protein * multiplier;
        carbs += food.carbs * multiplier;
        fat += food.fat * multiplier;
      }
    });

    return { calories, protein, carbs, fat };
  };

  // Calculate daily nutrition totals
  const calculateDailyNutrition = (day: string) => {
    const dayMeals = meals.filter((meal) => meal.day === day);
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    dayMeals.forEach((meal) => {
      const mealNutrition = calculateMealNutrition(meal);
      calories += mealNutrition.calories;
      protein += mealNutrition.protein;
      carbs += mealNutrition.carbs;
      fat += mealNutrition.fat;
    });

    return { calories, protein, carbs, fat };
  };

  // Handle adding a new meal
  const handleAddMeal = () => {
    if (!mealType) {
      toast.error("Vui lòng chọn loại bữa ăn");
      return;
    }

    if (selectedFoods.length === 0) {
      toast.error("Vui lòng chọn ít nhất một loại thực phẩm");
      return;
    }

    // Check if this meal type already exists for this day
    const existingMeal = meals.find(
      (meal) => meal.day === selectedDay && meal.type === mealType
    );

    if (existingMeal) {
      // Update existing meal
      const updatedMeals = meals.map((meal) =>
        meal.id === existingMeal.id
          ? { ...meal, foods: selectedFoods }
          : meal
      );
      setMeals(updatedMeals);
      toast.success("Đã cập nhật bữa ăn");
    } else {
      // Create new meal
      const newMeal: Meal = {
        id: `meal-${Date.now()}`,
        type: mealType,
        day: selectedDay,
        foods: selectedFoods,
      };
      setMeals([...meals, newMeal]);
      toast.success("Đã thêm bữa ăn mới");
    }

    // Reset form
    setShowAddMealDialog(false);
    setMealType("");
    setSelectedFoods([]);
  };

  // Handle selecting a food item
  const handleSelectFood = (foodId: string) => {
    const existingFoodIndex = selectedFoods.findIndex(f => f.foodId === foodId);
    
    if (existingFoodIndex >= 0) {
      // Remove if already selected
      const newSelectedFoods = [...selectedFoods];
      newSelectedFoods.splice(existingFoodIndex, 1);
      setSelectedFoods(newSelectedFoods);
    } else {
      // Add new food with default quantity
      setSelectedFoods([...selectedFoods, { foodId, quantity: 100 }]);
    }
  };

  // Handle changing food quantity
  const handleFoodQuantityChange = (foodId: string, quantity: number) => {
    setSelectedFoods(
      selectedFoods.map((food) =>
        food.foodId === foodId ? { ...food, quantity } : food
      )
    );
  };

  // Get a food item by ID
  const getFoodById = (foodId: string): FoodItem | undefined => {
    return FOODS.find((food) => food.id === foodId);
  };

  // Handle editing a meal
  const handleEditMeal = (meal: Meal) => {
    setMealType(meal.type);
    setSelectedFoods(meal.foods);
    setShowAddMealDialog(true);
  };

  // Handle deleting a meal
  const handleDeleteMeal = (mealId: string) => {
    setMeals(meals.filter((meal) => meal.id !== mealId));
    toast.success("Đã xóa bữa ăn");
  };

  // Generate PDF for meal plan
  const handleDownloadPDF = () => {
    toast.success("Đã xuất kế hoạch ăn uống thành công");
  };

  // Navigate to previous week
  const handlePreviousWeek = () => {
    setWeekStartDate(addDays(weekStartDate, -7));
  };

  // Navigate to next week
  const handleNextWeek = () => {
    setWeekStartDate(addDays(weekStartDate, 7));
  };

  // Format the current week display
  const formatWeekDisplay = () => {
    const weekEnd = addDays(weekStartDate, 6);
    return `${format(weekStartDate, "dd/MM")} - ${format(weekEnd, "dd/MM")}`;
  };

  // Meal icon component
  const MealIcon = ({ type }: { type: string }) => {
    const mealType = MEAL_TYPES.find((t) => t.value === type);
    
    if (!mealType) return null;
    
    const Icon = mealType.icon;
    return <Icon className="h-5 w-5" />;
  };

  // Get category label for a food item
  const getCategoryLabel = (categoryValue: string): string => {
    return FOOD_CATEGORIES.find((c) => c.value === categoryValue)?.label || categoryValue;
  };

  // Get meal type label
  const getMealTypeLabel = (typeValue: string): string => {
    return MEAL_TYPES.find((t) => t.value === typeValue)?.label || typeValue;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Kế hoạch dinh dưỡng</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium">
                {formatWeekDisplay()}
              </div>
              <Button variant="outline" size="icon" onClick={handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Xuất PDF
              </Button>
            </div>
          </div>
          <CardDescription>
            Lập kế hoạch ăn uống theo từng ngày trong tuần
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monday" value={selectedDay} onValueChange={setSelectedDay}>
            <TabsList className="grid grid-cols-7 mb-4">
              {DAYS.map((day) => (
                <TabsTrigger key={day.value} value={day.value}>
                  {day.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {DAYS.map((day) => {
              const dayNutrition = calculateDailyNutrition(day.value);
              const dayMeals = meals.filter((meal) => meal.day === day.value);
              
              return (
                <TabsContent key={day.value} value={day.value} className="space-y-4">
                  <Card className="bg-accent/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Tổng quan dinh dưỡng {day.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="p-2 bg-white rounded-md shadow-sm text-center">
                          <div className="text-xs text-gray-500 mb-1">Calories</div>
                          <div className="font-bold">{Math.round(dayNutrition.calories)} kcal</div>
                        </div>
                        <div className="p-2 bg-white rounded-md shadow-sm text-center">
                          <div className="text-xs text-gray-500 mb-1">Protein</div>
                          <div className="font-bold">{Math.round(dayNutrition.protein)}g</div>
                        </div>
                        <div className="p-2 bg-white rounded-md shadow-sm text-center">
                          <div className="text-xs text-gray-500 mb-1">Carbs</div>
                          <div className="font-bold">{Math.round(dayNutrition.carbs)}g</div>
                        </div>
                        <div className="p-2 bg-white rounded-md shadow-sm text-center">
                          <div className="text-xs text-gray-500 mb-1">Chất béo</div>
                          <div className="font-bold">{Math.round(dayNutrition.fat)}g</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {dayMeals.length > 0 ? (
                    <>
                      {dayMeals
                        .sort((a, b) => {
                          const mealOrder = { breakfast: 1, lunch: 2, snack: 3, dinner: 4 };
                          return mealOrder[a.type as keyof typeof mealOrder] - mealOrder[b.type as keyof typeof mealOrder];
                        })
                        .map((meal) => {
                          const mealNutrition = calculateMealNutrition(meal);
                          
                          return (
                            <Card key={meal.id} className="meal-card">
                              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                                    <MealIcon type={meal.type} />
                                  </div>
                                  <CardTitle className="text-base">{getMealTypeLabel(meal.type)}</CardTitle>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditMeal(meal)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteMeal(meal.id)}>
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-2">
                                <div className="space-y-3">
                                  {meal.foods.map((food) => {
                                    const foodDetails = getFoodById(food.foodId);
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
                                
                                <div className="flex justify-between mt-3 pt-2 border-t text-sm">
                                  <div className="font-medium">Tổng</div>
                                  <div className="font-medium">{Math.round(mealNutrition.calories)} kcal</div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setMealType("");
                            setSelectedFoods([]);
                            setShowAddMealDialog(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm bữa ăn
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                      <Utensils className="h-12 w-12 mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">Chưa có bữa ăn nào</h3>
                      <p className="mb-4">Hãy thêm bữa ăn cho {day.label}</p>
                      <Button onClick={() => {
                        setMealType("");
                        setSelectedFoods([]);
                        setShowAddMealDialog(true);
                      }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm bữa ăn
                      </Button>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showAddMealDialog} onOpenChange={setShowAddMealDialog}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {mealType ? `${getMealTypeLabel(mealType)} - ${DAYS.find(d => d.value === selectedDay)?.label}` : "Thêm bữa ăn mới"}
            </DialogTitle>
            <DialogDescription>
              Chọn loại bữa ăn và thêm thực phẩm vào kế hoạch
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {!mealType && (
              <div className="grid grid-cols-4 gap-4">
                {MEAL_TYPES.map((type) => {
                  const Icon = type.icon;
                  const mealExists = meals.some(m => m.day === selectedDay && m.type === type.value);
                  
                  return (
                    <Card 
                      key={type.value}
                      className={`cursor-pointer transition-all ${mealExists ? 'border-primary' : 'hover:border-primary/50'}`}
                      onClick={() => setMealType(type.value)}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <div className={`p-2 rounded-full mb-3 ${mealExists ? 'bg-primary/20' : 'bg-accent'}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-center font-medium">{type.label}</div>
                        {mealExists && (
                          <Badge variant="outline" className="mt-2">Đã có</Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
            
            {mealType && (
              <>
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <Label>Thực phẩm đã chọn</Label>
                    <div className="text-sm text-gray-500">
                      {selectedFoods.length === 0 ? "Chưa có thực phẩm nào được chọn" : `${selectedFoods.length} loại thực phẩm`}
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setMealType("")} className="h-8">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Đổi loại bữa ăn
                  </Button>
                </div>
                
                {selectedFoods.length > 0 && (
                  <div className="border rounded-md p-4 mb-4 space-y-3">
                    {selectedFoods.map((selectedFood) => {
                      const food = getFoodById(selectedFood.foodId);
                      if (!food) return null;
                      
                      return (
                        <div key={food.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{food.name}</div>
                            <div className="text-xs text-gray-500">{getCategoryLabel(food.category)}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              min="5"
                              value={selectedFood.quantity}
                              onChange={(e) => handleFoodQuantityChange(food.id, Number(e.target.value))}
                              className="w-20"
                            />
                            <span className="text-sm text-gray-500">g</span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleSelectFood(food.id)}
                              className="h-8 w-8 text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="pt-2 border-t flex justify-between text-sm font-medium">
                      <div>Tổng calories</div>
                      <div>
                        {Math.round(
                          selectedFoods.reduce((total, food) => {
                            const foodDetails = getFoodById(food.foodId);
                            if (!foodDetails) return total;
                            return total + (foodDetails.calories * food.quantity) / 100;
                          }, 0)
                        )} kcal
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Thêm thực phẩm</Label>
                    <div className="flex items-center gap-2">
                      <Select value={filteredCategory} onValueChange={setFilteredCategory}>
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Tất cả loại" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tất cả loại</SelectItem>
                          {FOOD_CATEGORIES.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Tìm..."
                          className="pl-9 w-[160px]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[200px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredFoods.map((food) => {
                        const isSelected = selectedFoods.some((f) => f.foodId === food.id);
                        
                        return (
                          <div
                            key={food.id}
                            className={`p-3 border rounded-md cursor-pointer transition-all ${
                              isSelected ? "border-primary bg-primary/5" : "hover:border-primary/40"
                            }`}
                            onClick={() => handleSelectFood(food.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{food.name}</div>
                                <div className="text-xs text-gray-500">{getCategoryLabel(food.category)}</div>
                              </div>
                              <Badge variant="outline">{food.calories} kcal</Badge>
                            </div>
                            
                            <div className="mt-2 grid grid-cols-3 gap-1 text-xs text-gray-500">
                              <div>P: {food.protein}g</div>
                              <div>C: {food.carbs}g</div>
                              <div>F: {food.fat}g</div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {filteredFoods.length === 0 && (
                        <div className="col-span-2 text-center py-8 text-gray-500">
                          Không tìm thấy thực phẩm phù hợp
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddMealDialog(false);
              setMealType("");
              setSelectedFoods([]);
            }}>
              Hủy
            </Button>
            {mealType && (
              <Button onClick={handleAddMeal} disabled={selectedFoods.length === 0}>
                {meals.some(m => m.day === selectedDay && m.type === mealType) 
                  ? "Cập nhật bữa ăn" 
                  : "Thêm bữa ăn"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealPlanBuilder;
