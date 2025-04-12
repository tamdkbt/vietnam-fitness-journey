
import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
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
  Calendar, 
  Clock, 
  Activity,
  DumbbellIcon,
  Edit,
  ChevronDown,
  Info,
  X,
  Save,
  Check,
  CheckCircle,
  ArrowRight
} from "lucide-react";

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

const REST_TIMES = [
  { value: "30", label: "30 giây" },
  { value: "45", label: "45 giây" },
  { value: "60", label: "60 giây" },
  { value: "90", label: "90 giây" },
  { value: "120", label: "120 giây" },
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

const MIN_WORKOUT_DURATION = 15 * 60; // 15 phút trong giây

const WorkoutPlanBuilder = ({ key }: { key?: string }) => {
  const [workouts, setWorkouts] = useState<Workout[]>(SAMPLE_WORKOUT);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMuscle, setFilteredMuscle] = useState<string>("all");
  const [filteredDifficulty, setFilteredDifficulty] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [showDeleteExerciseDialog, setShowDeleteExerciseDialog] = useState<{workoutId: string, exerciseId: string} | null>(null);
  const [showDeleteWorkoutDialog, setShowDeleteWorkoutDialog] = useState<string | null>(null);
  const [exerciseDetailModal, setExerciseDetailModal] = useState<Exercise | null>(null);
  const [showAddNewExerciseModal, setShowAddNewExerciseModal] = useState<boolean>(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState<boolean>(false);
  const [editingExercise, setEditingExercise] = useState<{workoutId: string, exerciseId: string} | null>(null);
  
  // New state for adding exercise to workout
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const [exerciseSets, setExerciseSets] = useState<number>(3);
  const [exerciseReps, setExerciseReps] = useState<number>(10);
  const [exerciseRestTime, setExerciseRestTime] = useState<number>(60);
  const [dayForNewExercise, setDayForNewExercise] = useState<string>("");
  const [newWorkoutName, setNewWorkoutName] = useState<string>("Buổi tập mới");
  const [showCompletionNotice, setShowCompletionNotice] = useState<boolean>(false);
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

  // Set the selected day as default when adding new exercise
  useEffect(() => {
    setDayForNewExercise(selectedDay);
  }, [selectedDay]);

  // Effect to check if workout duration exceeds the minimum and show notification
  useEffect(() => {
    const currentWorkouts = workouts.filter(workout => workout.day === selectedDay);
    let totalDuration = 0;
    
    for (const workout of currentWorkouts) {
      totalDuration += calculateWorkoutDuration(workout);
    }
    
    if (totalDuration >= MIN_WORKOUT_DURATION && !showCompletionNotice) {
      setShowCompletionNotice(true);
      toast.success("🎉 Bạn đã hoàn thành lịch tập cho hôm nay!", {
        duration: 4000,
      });
    }
  }, [workouts, selectedDay]);

  const filteredExercises = EXERCISES.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = filteredMuscle === "all" ? true : exercise.muscle === filteredMuscle;
    const matchesDifficulty = filteredDifficulty === "all" ? true : exercise.difficulty === filteredDifficulty;
    
    return matchesSearch && matchesMuscle && matchesDifficulty;
  });

  const isExerciseInSelectedDay = (exerciseId: string) => {
    return workouts.some(workout => 
      workout.day === selectedDay && 
      workout.exercises.some(ex => ex.exerciseId === exerciseId)
    );
  };

  const getExerciseById = (id: string): Exercise | undefined => {
    return EXERCISES.find((ex) => ex.id === id);
  };

  const getDayLabel = (value: string): string => {
    return DAYS.find((day) => day.value === value)?.label || value;
  };
  
  const getMuscleLabel = (value: string): string => {
    return MUSCLE_GROUPS.find(m => m.value === value)?.label || value;
  };
  
  const getDifficultyLabel = (value: string): string => {
    return DIFFICULTY_LEVELS.find(d => d.value === value)?.label || value;
  };

  const calculateWorkoutDuration = (workout: Workout): number => {
    return workout.exercises.reduce((total, exercise) => {
      const exerciseDetails = getExerciseById(exercise.exerciseId);
      if (!exerciseDetails) return total;
      
      // Thời gian thực hiện = thời gian của mỗi lần x số lần x số hiệp + thời gian nghỉ x (số hiệp - 1)
      return total + (exerciseDetails.duration * exercise.sets * exercise.reps) + 
                     (exercise.restTime * (exercise.sets - 1));
    }, 0);
  };

  const calculateTotalDurationForDay = (day: string): number => {
    return workouts
      .filter(workout => workout.day === day)
      .reduce((total, workout) => total + calculateWorkoutDuration(workout), 0);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const openAddExerciseModal = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    setDayForNewExercise(selectedDay);
    setExerciseSets(3);
    setExerciseReps(10);
    setExerciseRestTime(60);
    setShowAddExerciseModal(true);
  };

  const resetExerciseForm = () => {
    setSelectedExerciseId("");
    setExerciseSets(3);
    setExerciseReps(10);
    setExerciseRestTime(60);
    setDayForNewExercise(selectedDay);
    setNewWorkoutName("Buổi tập mới");
    setEditingExercise(null);
    setShowAddExerciseModal(false);
  };

  const addExerciseToWorkout = () => {
    if (!selectedExerciseId) {
      toast.error("Vui lòng chọn bài tập");
      return;
    }

    const targetDay = dayForNewExercise || selectedDay;
    let existingWorkout = workouts.find(w => w.day === targetDay);
    
    const newExerciseItem = {
      exerciseId: selectedExerciseId,
      sets: exerciseSets,
      reps: exerciseReps,
      restTime: exerciseRestTime,
    };

    if (existingWorkout) {
      // Kiểm tra nếu bài tập đã tồn tại trong buổi tập
      const alreadyExists = existingWorkout.exercises.some(ex => ex.exerciseId === selectedExerciseId);
      
      if (alreadyExists) {
        toast.error("Bài tập này đã có trong lịch tập hôm nay");
        return;
      }

      // Thêm bài tập vào buổi tập đã tồn tại
      const updatedWorkout = {
        ...existingWorkout,
        exercises: [...existingWorkout.exercises, newExerciseItem]
      };

      setWorkouts(
        workouts.map(w => w.id === existingWorkout?.id ? updatedWorkout : w)
      );
    } else {
      // Tạo buổi tập mới nếu không có buổi tập nào trong ngày đó
      const newWorkout: Workout = {
        id: `workout-${Date.now()}`,
        name: newWorkoutName,
        day: targetDay,
        exercises: [newExerciseItem],
      };

      setWorkouts([...workouts, newWorkout]);
    }

    // Kiểm tra xem tổng thời gian tập đã đạt đủ 15 phút chưa
    const updatedDuration = calculateTotalDurationForDay(targetDay) + 
      (getExerciseById(selectedExerciseId)?.duration || 0) * exerciseSets * exerciseReps + 
      exerciseRestTime * (exerciseSets - 1);
    
    if (updatedDuration >= MIN_WORKOUT_DURATION) {
      setShowCompletionNotice(true);
      toast.success("🎉 Bạn đã hoàn thành lịch tập cho hôm nay!", {
        duration: 4000,
      });
    }

    toast.success("Đã thêm bài tập vào lịch tập thành công");
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
    setDayForNewExercise(workout.day);
    setShowAddExerciseModal(true);
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
    
    // Add to the beginning of the exercises array
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
      {/* Bảng lịch tập theo ngày */}
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
              {DAYS.map((day) => {
                const duration = calculateTotalDurationForDay(day.value);
                const hasCompletedWorkout = duration >= MIN_WORKOUT_DURATION;
                
                return (
                  <TabsTrigger key={day.value} value={day.value} className="relative">
                    {day.label}
                    {hasCompletedWorkout && (
                      <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </span>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            {DAYS.map((day) => {
              const dayWorkouts = workouts.filter((workout) => workout.day === day.value);
              const totalDuration = calculateTotalDurationForDay(day.value);
              const hasCompletedWorkout = totalDuration >= MIN_WORKOUT_DURATION;
              
              return (
                <TabsContent key={day.value} value={day.value} className="space-y-4">
                  {dayWorkouts.length > 0 ? (
                    <>
                      {hasCompletedWorkout && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                          <p>🎉 Bạn đã hoàn thành lịch tập cho hôm nay! (Tổng thời gian: {formatTime(totalDuration)})</p>
                        </div>
                      )}
                    
                      {dayWorkouts.map((workout) => (
                        <Card key={workout.id} className="overflow-hidden workout-card">
                          <CardHeader className="p-4 pb-2 bg-primary/5">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg font-medium">
                                {workout.name}
                              </CardTitle>
                              <div className="flex gap-2 items-center">
                                <Badge variant="outline" className="flex gap-1 items-center">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(calculateWorkoutDuration(workout))}
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
                      ))}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                      <DumbbellIcon className="h-12 w-12 mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">Chưa có bài tập nào</h3>
                      <p className="mb-4">Hãy thêm bài tập mới cho {getDayLabel(day.value)}</p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Danh sách các bài tập */}
      <Card>
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
            Danh sách các bài tập có sẵn. Chọn bài tập để thêm vào lịch tập.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.map((exercise) => {
                const muscleLabel = getMuscleLabel(exercise.muscle);
                const difficultyLabel = getDifficultyLabel(exercise.difficulty);
                const isInSelectedDay = isExerciseInSelectedDay(exercise.id);
                
                return (
                  <Card 
                    key={exercise.id} 
                    className={`workout-card hover:shadow-md transition-all cursor-pointer relative ${
                      isInSelectedDay ? 'border-primary border-2' : ''
                    }`}
                  >
                    {isInSelectedDay && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="default" className="bg-primary">
                          <Check className="h-3 w-3 mr-1" />
                          Đã thêm
                        </Badge>
                      </div>
                    )}
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
                      <div className="mt-3 flex justify-between">
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
                        
                        <Button
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddExerciseModal(exercise.id);
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Thêm vào lịch
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
        </CardContent>
      </Card>

      {/* Dialog xác nhận xóa bài tập */}
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

      {/* Dialog xác nhận xóa buổi tập */}
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

      {/* Modal chi tiết bài tập */}
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
                openAddExerciseModal(exerciseDetailModal.id);
                setExerciseDetailModal(null);
              }
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm vào lịch tập
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal thêm bài tập mới vào thư viện */}
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

      {/* Modal thêm bài tập vào lịch */}
      <Dialog open={showAddExerciseModal} onOpenChange={setShowAddExerciseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingExercise ? "Cập nhật bài tập" : "Thêm bài tập vào lịch"}
            </DialogTitle>
            <DialogDescription>
              {editingExercise 
                ? "Chỉnh sửa thông tin bài tập trong lịch tập của bạn" 
                : "Chọn ngày và thông số chi tiết cho bài tập"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            {selectedExerciseId && (
              <div className="p-3 border rounded-md bg-muted/50">
                <h3 className="font-medium mb-1">
                  {getExerciseById(selectedExerciseId)?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getExerciseById(selectedExerciseId)?.description}
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="day">Ngày tập</Label>
              <Select 
                value={dayForNewExercise} 
                onValueChange={setDayForNewExercise}
                disabled={!!editingExercise}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngày" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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
                <Label htmlFor="rest">Thời gian nghỉ</Label>
                <Select 
                  value={exerciseRestTime.toString()} 
                  onValueChange={(value) => setExerciseRestTime(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    {REST_TIMES.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddExerciseModal(false)}>
              Hủy
            </Button>
            {editingExercise ? (
              <Button onClick={updateExerciseInWorkout}>
                <Save className="mr-2 h-4 w-4" />
                Cập nhật
              </Button>
            ) : (
              <Button onClick={addExerciseToWorkout}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm vào lịch
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutPlanBuilder;
