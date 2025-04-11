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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  ChevronDown,
  Info,
  X,
  Save,
  Check
} from "lucide-react";
import { useForm } from "react-hook-form";

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

const DAYS = [
  { value: "monday", label: "Thứ Hai" },
  { value: "tuesday", label: "Thứ Ba" },
  { value: "wednesday", label: "Thứ Tư" },
  { value: "thursday", label: "Thứ Năm" },
  { value: "friday", label: "Thứ Sáu" },
  { value: "saturday", label: "Thứ Bảy" },
  { value: "sunday", label: "Chủ Nhật" },
];

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
  const [editingExercise, setEditingExercise] = useState<{workoutId: string, exerciseId: string} | null>(null);
  const [showDeleteExerciseDialog, setShowDeleteExerciseDialog] = useState<{workoutId: string, exerciseId: string} | null>(null);
  const [showDeleteWorkoutDialog, setShowDeleteWorkoutDialog] = useState<string | null>(null);
  const [exerciseDetailModal, setExerciseDetailModal] = useState<Exercise | null>(null);
  const [showAddNewExerciseModal, setShowAddNewExerciseModal] = useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<{
    name: string;
    description: string;
    muscle: string;
    difficulty: string;
    duration: number;
  }>({
    name: "",
    description: "",
    muscle: "abs",
    difficulty: "beginner",
    duration: 10
  });

  const filteredExercises = EXERCISES.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = filteredMuscle === "all" ? true : exercise.muscle === filteredMuscle;
    const matchesDifficulty = filteredDifficulty === "all" ? true : exercise.difficulty === filteredDifficulty;
    
    return matchesSearch && matchesMuscle && matchesDifficulty;
  });

  const currentWorkout = workouts.find((workout) => workout.day === selectedDay);

  const addExerciseToWorkout = () => {
    if (!selectedExerciseId) {
      toast.error("Vui lòng chọn bài tập");
      return;
    }

    if (!currentEditingWorkout) {
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
      toast.success("Đã tạo buổi tập mới thành công");
    } else {
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
      toast.success("Đã thêm bài tập vào buổi tập thành công");
    }

    resetExerciseForm();
  };

  const updateExerciseInWorkout = () => {
    if (!editingExercise) return;
    
    const { workoutId, exerciseId } = editingExercise;
    const workout = workouts.find((w) => w.id === workoutId);
    
    if (!workout) return;
    
    const updatedExercises = workout.exercises.map(ex => 
      ex.exerciseId === exerciseId 
        ? { ...ex, sets: exerciseSets, reps: exerciseReps, restTime: exerciseRestTime }
        : ex
    );
    
    const updatedWorkout = { ...workout, exercises: updatedExercises };
    
    setWorkouts(workouts.map(w => w.id === workoutId ? updatedWorkout : w));
    setEditingExercise(null);
    resetExerciseForm();
    toast.success("Đã cập nhật bài tập thành công");
  };

  const startEditingExercise = (workoutId: string, exercise: WorkoutExercise) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;
    
    setEditingExercise({ workoutId, exerciseId: exercise.exerciseId });
    setSelectedExerciseId(exercise.exerciseId);
    setExerciseSets(exercise.sets);
    setExerciseReps(exercise.reps);
    setExerciseRestTime(exercise.restTime);
    setShowAddExerciseForm(true);
    setActiveTab("exercises");
  };

  const resetExerciseForm = () => {
    setSelectedExerciseId("");
    setExerciseSets(3);
    setExerciseReps(10);
    setExerciseRestTime(60);
    setShowAddExerciseForm(false);
    setNewWorkoutName("");
    setEditingExercise(null);
  };

  const removeExerciseFromWorkout = (workoutId: string, exerciseId: string) => {
    const workout = workouts.find((w) => w.id === workoutId);
    
    if (!workout) return;
    
    if (workout.exercises.length === 1) {
      setWorkouts(workouts.filter((w) => w.id !== workoutId));
      toast.success("Đã xóa buổi tập thành công");
    } else {
      const updatedWorkout = {
        ...workout,
        exercises: workout.exercises.filter((ex) => ex.exerciseId !== exerciseId),
      };
      
      setWorkouts(
        workouts.map((w) => (w.id === workoutId ? updatedWorkout : w))
      );
      toast.success("Đã xóa bài tập thành công");
    }
    setShowDeleteExerciseDialog(null);
  };

  const removeWorkout = (workoutId: string) => {
    setWorkouts(workouts.filter((w) => w.id !== workoutId));
    setShowDeleteWorkoutDialog(null);
    toast.success("Đã xóa buổi tập thành công");
  };

  const handleDownloadPDF = () => {
    toast.success("Đã xuất lịch tập thành công");
  };

  const getExerciseById = (id: string): Exercise | undefined => {
    return EXERCISES.find((ex) => ex.id === id);
  };

  const getDayLabel = (value: string): string => {
    return DAYS.find((day) => day.value === value)?.label || value;
  };

  const calculateWorkoutDuration = (workout: Workout): number => {
    return workout.exercises.reduce((total, exercise) => {
      const exerciseDetails = getExerciseById(exercise.exerciseId);
      if (!exerciseDetails) return total;
      
      return total + (exerciseDetails.duration * exercise.sets) + 
                     (exercise.restTime * (exercise.sets - 1));
    }, 0);
  };

  const startEditingWorkout = (workout: Workout) => {
    setCurrentEditingWorkout(workout);
    setActiveTab("exercises");
  };

  const getMuscleLabel = (value: string): string => {
    return MUSCLE_GROUPS.find(m => m.value === value)?.label || value;
  };
  
  const getDifficultyLabel = (value: string): string => {
    return DIFFICULTY_LEVELS.find(d => d.value === value)?.label || value;
  };

  const showExerciseDetails = (exercise: Exercise) => {
    setExerciseDetailModal(exercise);
  };

  const addNewExerciseToLibrary = () => {
    if (!newExercise.name.trim()) {
      toast.error("Vui lòng nhập tên bài tập");
      return;
    }
    
    if (!newExercise.description.trim()) {
      toast.error("Vui lòng nhập mô tả bài tập");
      return;
    }
    
    if (newExercise.duration <= 0) {
      toast.error("Thời gian thực hiện phải lớn hơn 0");
      return;
    }
    
    const newExerciseId = `ex${Date.now()}`;
    
    const exerciseToAdd: Exercise = {
      id: newExerciseId,
      name: newExercise.name,
      description: newExercise.description,
      muscle: newExercise.muscle,
      difficulty: newExercise.difficulty,
      duration: newExercise.duration
    };
    
    EXERCISES.unshift(exerciseToAdd);
    
    setShowAddNewExerciseModal(false);
    setNewExercise({
      name: "",
      description: "",
      muscle: "abs",
      difficulty: "beginner",
      duration: 10
    });
    
    toast.success("Đã thêm bài tập mới thành công");
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
                                    Thêm bài tập
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => setShowDeleteWorkoutDialog(workout.id)}
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
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Bài tập</TableHead>
                                <TableHead>Hiệp x Lần</TableHead>
                                <TableHead>Nghỉ</TableHead>
                                <TableHead className="text-right">Thao tác</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {workout.exercises.map((exercise) => {
                                const exerciseDetails = getExerciseById(exercise.exerciseId);
                                if (!exerciseDetails) return null;
                                
                                return (
                                  <TableRow key={exercise.exerciseId}>
                                    <TableCell>
                                      <div className="font-medium hover:underline cursor-pointer"
                                           onClick={() => showExerciseDetails(exerciseDetails)}>
                                        {exerciseDetails.name}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {getMuscleLabel(exerciseDetails.muscle)} • {getDifficultyLabel(exerciseDetails.difficulty)}
                                      </div>
                                    </TableCell>
                                    <TableCell>{exercise.sets} x {exercise.reps}</TableCell>
                                    <TableCell>{exercise.restTime}s</TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                                          onClick={() => startEditingExercise(workout.id, exercise)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                          onClick={() => setShowDeleteExerciseDialog({ workoutId: workout.id, exerciseId: exercise.exerciseId })}
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
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
                        <SelectItem value="all">Tất cả nhóm cơ</SelectItem>
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
                        <SelectItem value="all">Tất cả độ khó</SelectItem>
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
                    setFilteredMuscle("all");
                    setFilteredDifficulty("all");
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
              
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setShowAddNewExerciseModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm bài tập mới
              </Button>
            </div>
          </div>
          <CardDescription>
            {showAddExerciseForm ? 
              (editingExercise ? "Chỉnh sửa bài tập" : "Chọn bài tập để thêm vào lịch tập") : 
              "Danh sách các bài tập có sẵn"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showAddExerciseForm ? (
            <div className="space-y-4">
              {!currentEditingWorkout && !editingExercise && (
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
                <Label htmlFor="exercise">
                  {editingExercise ? "Bài tập đang chỉnh sửa" : "Chọn bài tập"}
                </Label>
                <Select 
                  value={selectedExerciseId} 
                  onValueChange={setSelectedExerciseId}
                  disabled={!!editingExercise}
                >
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
                
                {selectedExerciseId && getExerciseById(selectedExerciseId) && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {getExerciseById(selectedExerciseId)?.description}
                  </div>
                )}
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
                    {editingExercise ? (
                      <Button onClick={updateExerciseInWorkout}>
                        <Save className="mr-2 h-4 w-4" />
                        Lưu thay đổi
                      </Button>
                    ) : (
                      <Button onClick={addExerciseToWorkout}>
                        <Plus className="mr-2 h-4 w-4" />
                        {currentEditingWorkout ? "Thêm vào buổi tập" : "Tạo buổi tập mới"}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map((exercise) => {
                    const muscleLabel = getMuscleLabel(exercise.muscle);
                    const difficultyLabel = getDifficultyLabel(exercise.difficulty);
                    
                    return (
                      <Card key={exercise.id} className="workout-card hover:shadow-md transition-all cursor-pointer"
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
                          <div className="mt-3 flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                showExerciseDetails(exercise);
                              }}
                            >
                              <Info className="h-3 w-3 mr-1" />
                              Chi tiết
                            </Button>
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

      <AlertDialog open={!!showDeleteExerciseDialog} onOpenChange={(open) => !open && setShowDeleteExerciseDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bài tập</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bài tập này khỏi lịch tập? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (showDeleteExerciseDialog) {
                  removeExerciseFromWorkout(
                    showDeleteExerciseDialog.workoutId,
                    showDeleteExerciseDialog.exerciseId
                  );
                }
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              Xác nhận xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!showDeleteWorkoutDialog} onOpenChange={(open) => !open && setShowDeleteWorkoutDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa buổi tập</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa toàn bộ buổi tập này? Tất cả bài tập trong buổi tập sẽ bị xóa và không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (showDeleteWorkoutDialog) {
                  removeWorkout(showDeleteWorkoutDialog);
                }
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              Xác nhận xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!exerciseDetailModal} onOpenChange={(open) => !open && setExerciseDetailModal(null)}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between items-center">
              <span>{exerciseDetailModal?.name}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setExerciseDetailModal(null)}>
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {exerciseDetailModal && (
                <>
                  <Badge variant="secondary">{getMuscleLabel(exerciseDetailModal.muscle)}</Badge>
                  <Badge variant="outline">{getDifficultyLabel(exerciseDetailModal.difficulty)}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {exerciseDetailModal.duration}s
                  </Badge>
                </>
              )}
            </div>
          </AlertDialogHeader>
          <div className="mt-2">
            <p className="text-sm leading-relaxed text-gray-700">{exerciseDetailModal?.description}</p>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Hướng dẫn thực hiện:</h3>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Giữ lưng thẳng và cơ bụng căng</li>
                <li>Hít vào khi hạ người, thở ra khi nâng người</li>
                <li>Tập trung vào cảm giác cơ khi thực hiện</li>
                <li>Thực hiện động tác từ từ và có kiểm soát</li>
              </ul>
            </div>
          </div>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Đóng</AlertDialogCancel>
            <Button onClick={() => {
              if (exerciseDetailModal) {
                setSelectedExerciseId(exerciseDetailModal.id);
                setShowAddExerciseForm(true);
                setExerciseDetailModal(null);
              }
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm vào lịch tập
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showAddNewExerciseModal} onOpenChange={setShowAddNewExerciseModal}>
        <AlertDialogContent className="sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Thêm bài tập mới</AlertDialogTitle>
            <AlertDialogDescription>
              Tạo một bài tập mới cho thư viện bài tập. Bài tập này sẽ xuất hiện trong danh sách các bài tập có sẵn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="exerciseName">Tên bài tập *</Label>
              <Input
                id="exerciseName"
                value={newExercise.name}
                onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                placeholder="Ví dụ: Nâng tạ trên vai"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exerciseDescription">Mô tả bài tập *</Label>
              <Input
                id="exerciseDescription"
                value={newExercise.description}
                onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                placeholder="Mô tả cách thực hiện bài tập"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exerciseMuscle">Nhóm cơ</Label>
                <Select
                  value={newExercise.muscle}
                  onValueChange={(value) => setNewExercise({...newExercise, muscle: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm cơ" />
                  </SelectTrigger>
                  <SelectContent>
                    {MUSCLE_GROUPS.map((muscle) => (
                      <SelectItem key={muscle.value} value={muscle.value}>
                        {muscle.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="exerciseDifficulty">Độ khó</Label>
                <Select
                  value={newExercise.difficulty}
                  onValueChange={(value) => setNewExercise({...newExercise, difficulty: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn độ khó" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exerciseDuration">
                Thời gian thực hiện (giây) *
              </Label>
              <Input
                id="exerciseDuration"
                type="number"
                min="1"
                value={newExercise.duration}
                onChange={(e) => setNewExercise({...newExercise, duration: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={addNewExerciseToLibrary} className="bg-primary">
              <Plus className="mr-2 h-4 w-4" />
              Thêm bài tập
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorkoutPlanBuilder;
