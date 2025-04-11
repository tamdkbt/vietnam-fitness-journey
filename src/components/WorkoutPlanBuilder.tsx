
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  Download, 
  Filter, 
  Search, 
  Plus, 
  Trash, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Activity,
  DumbbellIcon,
  Edit,
  ArrowRight,
  ChevronDown
} from "lucide-react";

// Define exercise type
type Exercise = {
  id: string;
  name: string;
  description: string;
  muscle: string;
  difficulty: string;
  duration: number;
  reps?: number;
  sets?: number;
  restTime?: number;
};

// Define workout type
type Workout = {
  id: string;
  name: string;
  day: string;
  exercises: WorkoutExercise[];
};

type WorkoutExercise = {
  exerciseId: string;
  sets: number;
  reps: number;
  restTime: number;
};

// Sample exercise data
const EXERCISES: Exercise[] = [
  {
    id: "ex1",
    name: "Hít đất",
    description: "Tư thế nằm sấp, hai tay chống xuống sàn, nâng người lên và hạ xuống.",
    muscle: "chest",
    difficulty: "beginner",
    duration: 10,
  },
  {
    id: "ex2",
    name: "Gập bụng",
    description: "Tư thế nằm ngửa, hai chân co, nâng phần thân trên lên và hạ xuống.",
    muscle: "abs",
    difficulty: "beginner",
    duration: 10,
  },
  {
    id: "ex3",
    name: "Squat",
    description: "Đứng thẳng, hai chân rộng bằng vai, hạ người xuống như ngồi ghế và đứng lên.",
    muscle: "legs",
    difficulty: "beginner",
    duration: 15,
  },
  {
    id: "ex4",
    name: "Plank",
    description: "Tư thế nằm sấp, chống hai khuỷu tay xuống sàn, giữ thân trên thẳng.",
    muscle: "core",
    difficulty: "intermediate",
    duration: 30,
  },
  {
    id: "ex5",
    name: "Chống đẩy ngực hẹp",
    description: "Tương tự hít đất nhưng hai tay đặt gần nhau hơn.",
    muscle: "triceps",
    difficulty: "intermediate",
    duration: 10,
  },
  {
    id: "ex6",
    name: "Lunge",
    description: "Một chân bước tới trước, hạ người xuống, rồi đứng lên lại.",
    muscle: "legs",
    difficulty: "intermediate",
    duration: 10,
  },
  {
    id: "ex7",
    name: "Pull-up",
    description: "Treo người trên xà, kéo cơ thể lên cho đến khi cằm vượt qua xà.",
    muscle: "back",
    difficulty: "advanced",
    duration: 10,
  },
  {
    id: "ex8",
    name: "Burpee",
    description: "Kết hợp chống đẩy, nhảy, squat thành một bài tập phức hợp.",
    muscle: "full_body",
    difficulty: "advanced",
    duration: 20,
  },
];

// Sample workout routine
const SAMPLE_WORKOUT: Workout[] = [
  {
    id: "w1",
    name: "Tập toàn thân",
    day: "monday",
    exercises: [
      { exerciseId: "ex1", sets: 3, reps: 10, restTime: 60 },
      { exerciseId: "ex3", sets: 3, reps: 12, restTime: 60 },
      { exerciseId: "ex5", sets: 3, reps: 8, restTime: 60 },
    ],
  },
  {
    id: "w2",
    name: "Ngày tập bụng",
    day: "wednesday",
    exercises: [
      { exerciseId: "ex2", sets: 3, reps: 15, restTime: 45 },
      { exerciseId: "ex4", sets: 3, reps: 1, restTime: 30 },
    ],
  },
  {
    id: "w3",
    name: "Ngày tập chân",
    day: "friday",
    exercises: [
      { exerciseId: "ex3", sets: 4, reps: 15, restTime: 60 },
      { exerciseId: "ex6", sets: 3, reps: 10, restTime: 45 },
    ],
  },
];

// Days of the week
const DAYS = [
  { value: "monday", label: "Thứ Hai" },
  { value: "tuesday", label: "Thứ Ba" },
  { value: "wednesday", label: "Thứ Tư" },
  { value: "thursday", label: "Thứ Năm" },
  { value: "friday", label: "Thứ Sáu" },
  { value: "saturday", label: "Thứ Bảy" },
  { value: "sunday", label: "Chủ Nhật" },
];

// Muscle groups
const MUSCLE_GROUPS = [
  { value: "abs", label: "Bụng" },
  { value: "chest", label: "Ngực" },
  { value: "back", label: "Lưng" },
  { value: "legs", label: "Chân" },
  { value: "arms", label: "Tay" },
  { value: "shoulders", label: "Vai" },
  { value: "triceps", label: "Tam đầu" },
  { value: "core", label: "Lõi" },
  { value: "full_body", label: "Toàn thân" },
];

// Difficulty levels
const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Người mới" },
  { value: "intermediate", label: "Trung bình" },
  { value: "advanced", label: "Nâng cao" },
];

const WorkoutPlanBuilder = () => {
  const [workouts, setWorkouts] = useState<Workout[]>(SAMPLE_WORKOUT);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMuscle, setFilteredMuscle] = useState<string>("all");
  const [filteredDifficulty, setFilteredDifficulty] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [activeTab, setActiveTab] = useState<string>("exercises");
  const [currentEditingWorkout, setCurrentEditingWorkout] = useState<Workout | null>(null);
  const [showAddExerciseForm, setShowAddExerciseForm] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const [exerciseSets, setExerciseSets] = useState<number>(3);
  const [exerciseReps, setExerciseReps] = useState<number>(10);
  const [exerciseRestTime, setExerciseRestTime] = useState<number>(60);
  const [newWorkoutName, setNewWorkoutName] = useState<string>("");

  // Filter exercises based on search term and filters
  const filteredExercises = EXERCISES.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = filteredMuscle === "all" ? true : exercise.muscle === filteredMuscle;
    const matchesDifficulty = filteredDifficulty === "all" ? true : exercise.difficulty === filteredDifficulty;
    
    return matchesSearch && matchesMuscle && matchesDifficulty;
  });

  // Get current workout for selected day
  const currentWorkout = workouts.find((workout) => workout.day === selectedDay);

  // Add exercise to workout
  const addExerciseToWorkout = () => {
    if (!selectedExerciseId) {
      toast.error("Vui lòng chọn bài tập");
      return;
    }

    if (!currentEditingWorkout) {
      // Create a new workout
      if (!newWorkoutName) {
        toast.error("Vui lòng đặt tên cho buổi tập");
        return;
      }

      const newWorkout: Workout = {
        id: `workout-${Date.now()}`,
        name: newWorkoutName,
        day: selectedDay,
        exercises: [
          {
            exerciseId: selectedExerciseId,
            sets: exerciseSets,
            reps: exerciseReps,
            restTime: exerciseRestTime,
          },
        ],
      };

      setWorkouts([...workouts, newWorkout]);
      toast.success("Đã tạo buổi tập mới");
    } else {
      // Add to existing workout
      const existingExercise = currentEditingWorkout.exercises.find(
        (ex) => ex.exerciseId === selectedExerciseId
      );

      if (existingExercise) {
        toast.error("Bài tập này đã có trong buổi tập");
        return;
      }

      const updatedWorkout = {
        ...currentEditingWorkout,
        exercises: [
          ...currentEditingWorkout.exercises,
          {
            exerciseId: selectedExerciseId,
            sets: exerciseSets,
            reps: exerciseReps,
            restTime: exerciseRestTime,
          },
        ],
      };

      setWorkouts(
        workouts.map((w) =>
          w.id === currentEditingWorkout.id ? updatedWorkout : w
        )
      );
      toast.success("Đã thêm bài tập vào buổi tập");
    }

    resetExerciseForm();
  };

  // Reset exercise form
  const resetExerciseForm = () => {
    setSelectedExerciseId("");
    setExerciseSets(3);
    setExerciseReps(10);
    setExerciseRestTime(60);
    setShowAddExerciseForm(false);
    setNewWorkoutName("");
  };

  // Remove exercise from workout
  const removeExerciseFromWorkout = (workoutId: string, exerciseId: string) => {
    const workout = workouts.find((w) => w.id === workoutId);
    
    if (!workout) return;
    
    if (workout.exercises.length === 1) {
      // If this is the last exercise, remove the whole workout
      setWorkouts(workouts.filter((w) => w.id !== workoutId));
      toast.success("Đã xóa buổi tập");
    } else {
      // Otherwise just remove the exercise
      const updatedWorkout = {
        ...workout,
        exercises: workout.exercises.filter((ex) => ex.exerciseId !== exerciseId),
      };
      
      setWorkouts(
        workouts.map((w) => (w.id === workoutId ? updatedWorkout : w))
      );
      toast.success("Đã xóa bài tập");
    }
  };

  // Generate PDF
  const handleDownloadPDF = () => {
    toast.success("Đã xuất lịch tập thành công");
  };

  // Get details of an exercise by ID
  const getExerciseById = (id: string): Exercise | undefined => {
    return EXERCISES.find((ex) => ex.id === id);
  };

  // Get day label by value
  const getDayLabel = (value: string): string => {
    return DAYS.find((day) => day.value === value)?.label || value;
  };

  // Calculate workout duration
  const calculateWorkoutDuration = (workout: Workout): number => {
    return workout.exercises.reduce((total, exercise) => {
      const exerciseDetails = getExerciseById(exercise.exerciseId);
      if (!exerciseDetails) return total;
      
      // Time for all sets including rest time
      return total + (exerciseDetails.duration * exercise.sets) + 
                     (exercise.restTime * (exercise.sets - 1));
    }, 0);
  };

  // Start editing a workout
  const startEditingWorkout = (workout: Workout) => {
    setCurrentEditingWorkout(workout);
    setActiveTab("exercises");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Lịch tập của tôi</CardTitle>
            <Button onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Xuất PDF
            </Button>
          </div>
          <CardDescription>
            Tạo và quản lý lịch tập theo ngày của bạn
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
              const dayWorkouts = workouts.filter((workout) => workout.day === day.value);
              
              return (
                <TabsContent key={day.value} value={day.value} className="space-y-4">
                  {dayWorkouts.length > 0 ? (
                    dayWorkouts.map((workout) => (
                      <Card key={workout.id} className="overflow-hidden workout-card">
                        <CardHeader className="p-4 pb-2 bg-primary/5">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg font-medium">
                              {workout.name}
                            </CardTitle>
                            <div className="flex gap-2 items-center">
                              <Badge variant="outline" className="flex gap-1 items-center">
                                <Clock className="h-3 w-3" />
                                {Math.floor(calculateWorkoutDuration(workout) / 60)} phút
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => startEditingWorkout(workout)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Chỉnh sửa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => {
                                      setWorkouts(workouts.filter((w) => w.id !== workout.id));
                                      toast.success("Đã xóa buổi tập");
                                    }}
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Xóa buổi tập
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-3">
                          <div className="space-y-3">
                            {workout.exercises.map((exercise) => {
                              const exerciseDetails = getExerciseById(exercise.exerciseId);
                              if (!exerciseDetails) return null;
                              
                              return (
                                <div key={exercise.exerciseId} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                                  <div className="space-y-1">
                                    <div className="font-medium">{exerciseDetails.name}</div>
                                    <div className="text-sm text-gray-500">
                                      {exercise.sets} x {exercise.reps} | Nghỉ: {exercise.restTime}s
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-destructive"
                                    onClick={() => removeExerciseFromWorkout(workout.id, exercise.exerciseId)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                      <DumbbellIcon className="h-12 w-12 mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">Chưa có buổi tập nào</h3>
                      <p className="mb-4">Hãy thêm buổi tập mới cho {getDayLabel(day.value)}</p>
                      <Button onClick={() => {
                        setCurrentEditingWorkout(null);
                        setSelectedDay(day.value);
                        setActiveTab("exercises");
                        setShowAddExerciseForm(true);
                      }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm buổi tập
                      </Button>
                    </div>
                  )}
                  
                  {dayWorkouts.length > 0 && (
                    <div className="flex justify-center pt-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentEditingWorkout(null);
                          setSelectedDay(day.value);
                          setActiveTab("exercises");
                          setShowAddExerciseForm(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm buổi tập mới
                      </Button>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      <Card className={activeTab === "exercises" ? "" : "hidden"}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách bài tập</CardTitle>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Bộ lọc
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Lọc bài tập</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <Label className="text-xs font-medium mb-1.5 block">Nhóm cơ</Label>
                    <Select value={filteredMuscle} onValueChange={setFilteredMuscle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tất cả nhóm cơ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tất cả nhóm cơ</SelectItem>
                        {MUSCLE_GROUPS.map((muscle) => (
                          <SelectItem key={muscle.value} value={muscle.value}>
                            {muscle.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-2 pt-0">
                    <Label className="text-xs font-medium mb-1.5 block">Độ khó</Label>
                    <Select value={filteredDifficulty} onValueChange={setFilteredDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tất cả độ khó" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tất cả độ khó</SelectItem>
                        {DIFFICULTY_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    setFilteredMuscle("");
                    setFilteredDifficulty("");
                  }}>
                    Xóa bộ lọc
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Tìm bài tập..."
                  className="pl-9 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <CardDescription>
            {showAddExerciseForm ? "Chọn bài tập để thêm vào lịch tập" : "Danh sách các bài tập có sẵn"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showAddExerciseForm ? (
            <div className="space-y-4">
              {!currentEditingWorkout && (
                <div className="space-y-2">
                  <Label htmlFor="workoutName">Tên buổi tập</Label>
                  <Input
                    id="workoutName"
                    placeholder="Nhập tên buổi tập"
                    value={newWorkoutName}
                    onChange={(e) => setNewWorkoutName(e.target.value)}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="exercise">Chọn bài tập</Label>
                <Select value={selectedExerciseId} onValueChange={setSelectedExerciseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bài tập" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredExercises.map((exercise) => (
                      <SelectItem key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedExerciseId && (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sets">Số hiệp</Label>
                      <Input
                        id="sets"
                        type="number"
                        min="1"
                        value={exerciseSets}
                        onChange={(e) => setExerciseSets(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reps">Số lần</Label>
                      <Input
                        id="reps"
                        type="number"
                        min="1"
                        value={exerciseReps}
                        onChange={(e) => setExerciseReps(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restTime">Thời gian nghỉ (giây)</Label>
                      <Input
                        id="restTime"
                        type="number"
                        min="0"
                        value={exerciseRestTime}
                        onChange={(e) => setExerciseRestTime(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" onClick={resetExerciseForm}>
                      Hủy
                    </Button>
                    <Button onClick={addExerciseToWorkout}>
                      {currentEditingWorkout ? "Thêm vào buổi tập" : "Tạo buổi tập mới"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map((exercise) => {
                    const muscleLabel = MUSCLE_GROUPS.find(m => m.value === exercise.muscle)?.label || exercise.muscle;
                    const difficultyLabel = DIFFICULTY_LEVELS.find(d => d.value === exercise.difficulty)?.label || exercise.difficulty;
                    
                    return (
                      <Card key={exercise.id} className="workout-card cursor-pointer"
                           onClick={() => {
                             setSelectedExerciseId(exercise.id);
                             setShowAddExerciseForm(true);
                           }}>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base font-medium">{exercise.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{exercise.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{muscleLabel}</Badge>
                            <Badge variant="outline">{difficultyLabel}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {exercise.duration}s
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                {filteredExercises.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      Không tìm thấy bài tập nào phù hợp với bộ lọc.
                    </p>
                  </div>
                )}
              </ScrollArea>
              
              <div className="mt-4 flex justify-center">
                <Button onClick={() => setShowAddExerciseForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm bài tập vào lịch
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPlanBuilder;
