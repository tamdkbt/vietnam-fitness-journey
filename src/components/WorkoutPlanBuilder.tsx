
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download, Save } from "lucide-react";

import { DAYS, Exercise, MIN_WORKOUT_DURATION, Workout, WorkoutView } from "@/types/workout";
import { EXERCISES, SAMPLE_WORKOUT } from "@/data/workoutData";
import { calculateWorkoutDuration, formatTime, getExerciseById, isExerciseInDay } from "@/utils/workoutUtils";

import DayTabs from "./workout/DayTabs";
import DayWorkouts from "./workout/DayWorkouts";
import ExerciseList from "./workout/ExerciseList";
import ExerciseFilterBar from "./workout/ExerciseFilterBar";
import ExerciseDetailsModal from "./workout/modals/ExerciseDetailsModal";
import AddExerciseModal from "./workout/modals/AddExerciseModal";
import AddNewExerciseModal from "./workout/modals/AddNewExerciseModal";
import { DeleteExerciseDialog, DeleteWorkoutDialog } from "./workout/modals/DeleteDialogs";
import ViewSwitcher from "./workout/ViewSwitcher";
import MonthView from "./workout/MonthView";
import QuarterView from "./workout/QuarterView";
import UnsavedChangesDialog from "./workout/UnsavedChangesDialog";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { format, startOfWeek, getDay } from "date-fns";
import { vi } from "date-fns/locale";

const WorkoutPlanBuilder = ({ key }: { key?: string }) => {
  // Initial state
  const [workouts, setWorkouts] = useState<Workout[]>(SAMPLE_WORKOUT);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(SAMPLE_WORKOUT);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMuscle, setFilteredMuscle] = useState<string>("all");
  const [filteredDifficulty, setFilteredDifficulty] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<WorkoutView>("week");

  // Modals and dialogs
  const [showDeleteExerciseDialog, setShowDeleteExerciseDialog] = useState<{workoutId: string, exerciseId: string} | null>(null);
  const [showDeleteWorkoutDialog, setShowDeleteWorkoutDialog] = useState<string | null>(null);
  const [exerciseDetailModal, setExerciseDetailModal] = useState<Exercise | null>(null);
  const [showAddNewExerciseModal, setShowAddNewExerciseModal] = useState<boolean>(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState<boolean>(false);
  const [editingExercise, setEditingExercise] = useState<{workoutId: string, exerciseId: string} | null>(null);
  
  // Form state
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

  // Unsaved changes tracking
  const { 
    hasUnsavedChanges, 
    setHasUnsavedChanges, 
    showDialog, 
    confirmNavigation, 
    cancelNavigation,
    handleNavigationAttempt
  } = useUnsavedChanges();

  // Check for unsaved changes by comparing current workouts with saved workouts
  useEffect(() => {
    const workoutsChanged = JSON.stringify(workouts) !== JSON.stringify(savedWorkouts);
    setHasUnsavedChanges(workoutsChanged);
  }, [workouts, savedWorkouts, setHasUnsavedChanges]);

  useEffect(() => {
    setDayForNewExercise(selectedDay);
  }, [selectedDay]);

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
  }, [workouts, selectedDay, showCompletionNotice]);

  const filteredExercises = EXERCISES.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = filteredMuscle === "all" ? true : exercise.muscle === filteredMuscle;
    const matchesDifficulty = filteredDifficulty === "all" ? true : exercise.difficulty === filteredDifficulty;
    
    return matchesSearch && matchesMuscle && matchesDifficulty;
  });

  const isExerciseInSelectedDay = (exerciseId: string) => {
    return isExerciseInDay(exerciseId, workouts, selectedDay);
  };

  const calculateTotalDurationForDay = (day: string): number => {
    return workouts
      .filter(workout => workout.day === day)
      .reduce((total, workout) => total + calculateWorkoutDuration(workout), 0);
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

  const saveWorkouts = () => {
    setSavedWorkouts([...workouts]);
    setHasUnsavedChanges(false);
    toast.success("Đã lưu lịch tập thành công");
  };

  const handleViewChange = (view: WorkoutView) => {
    setCurrentView(view);
  };

  const handleDayClick = (date: Date) => {
    // Get day of week and convert to our day format
    const dayOfWeek = format(date, 'EEEE', { locale: vi }).toLowerCase();
    const englishDayMap: Record<string, string> = {
      'thứ hai': 'monday', 
      'thứ ba': 'tuesday', 
      'thứ tư': 'wednesday', 
      'thứ năm': 'thursday', 
      'thứ sáu': 'friday', 
      'thứ bảy': 'saturday',
      'chủ nhật': 'sunday'
    };
    
    const dayKey = englishDayMap[dayOfWeek] || dayOfWeek;
    setSelectedDay(dayKey);
    setCurrentView("week");
    setCurrentDate(date);
  };

  const handleWeekClick = (weekStart: Date) => {
    setCurrentDate(weekStart);
    setCurrentView("week");
    
    // Set the selected day to Monday of the selected week
    setSelectedDay("monday");
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
      const alreadyExists = existingWorkout.exercises.some(ex => ex.exerciseId === selectedExerciseId);
      
      if (alreadyExists) {
        toast.error("Bài tập này đã có trong lịch tập hôm nay");
        return;
      }

      const updatedWorkout = {
        ...existingWorkout,
        exercises: [...existingWorkout.exercises, newExerciseItem]
      };

      setWorkouts(
        workouts.map(w => w.id === existingWorkout?.id ? updatedWorkout : w)
      );
    } else {
      const newWorkout: Workout = {
        id: `workout-${Date.now()}`,
        name: newWorkoutName,
        day: targetDay,
        exercises: [newExerciseItem],
      };

      setWorkouts([...workouts, newWorkout]);
    }

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

  const startEditingExercise = (workoutId: string, exerciseId: string, sets: number, reps: number, restTime: number) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;
    
    setEditingExercise({ workoutId, exerciseId });
    setSelectedExerciseId(exerciseId);
    setExerciseSets(sets);
    setExerciseReps(reps);
    setExerciseRestTime(restTime);
    setDayForNewExercise(workout.day);
    setShowAddExerciseModal(true);
  };

  const removeExerciseFromWorkout = () => {
    if (!showDeleteExerciseDialog) return;
    
    const { workoutId, exerciseId } = showDeleteExerciseDialog;
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

  const removeWorkout = () => {
    if (!showDeleteWorkoutDialog) return;
    
    setWorkouts(workouts.filter((w) => w.id !== showDeleteWorkoutDialog));
    setShowDeleteWorkoutDialog(null);
    toast.success("Đã xóa buổi tập thành công");
  };

  const handleDownloadPDF = () => {
    toast.success("Đã xuất lịch tập thành công");
  };

  const showExerciseDetails = (exerciseId: string) => {
    const exercise = getExerciseById(exerciseId);
    if (exercise) {
      setExerciseDetailModal(exercise);
    }
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

  // Render different views based on current view state
  const renderWorkoutView = () => {
    switch (currentView) {
      case "week":
        return (
          <DayTabs 
            selectedDay={selectedDay} 
            onDayChange={setSelectedDay} 
            calculateTotalDurationForDay={calculateTotalDurationForDay}
          >
            {DAYS.map((day) => (
              <TabsContent key={day.value} value={day.value} className="space-y-4">
                <DayWorkouts
                  day={day.value}
                  workouts={workouts}
                  calculateTotalDurationForDay={calculateTotalDurationForDay}
                  onStartEditingExercise={(workoutId, exerciseId, sets, reps, restTime) => 
                    startEditingExercise(workoutId, exerciseId, sets, reps, restTime)
                  }
                  onShowDeleteExerciseDialog={(workoutId, exerciseId) => 
                    setShowDeleteExerciseDialog({ workoutId, exerciseId })
                  }
                  onShowDeleteWorkoutDialog={(workoutId) => 
                    setShowDeleteWorkoutDialog(workoutId)
                  }
                  onShowExerciseDetails={showExerciseDetails}
                />
              </TabsContent>
            ))}
          </DayTabs>
        );
      case "month":
        return (
          <MonthView 
            currentDate={currentDate}
            workouts={workouts}
            onDayClick={handleDayClick}
          />
        );
      case "quarter":
        return (
          <QuarterView 
            currentDate={currentDate}
            workouts={workouts}
            onWeekClick={handleWeekClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <CardTitle>Lịch tập của tôi</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={saveWorkouts}
                disabled={!hasUnsavedChanges}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Lưu thay đổi
              </Button>
              <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Xuất PDF
              </Button>
            </div>
          </div>
          <CardDescription className="flex justify-between items-center mt-2">
            <span>Tạo và quản lý lịch tập theo ngày của bạn</span>
            <ViewSwitcher currentView={currentView} onViewChange={handleViewChange} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderWorkoutView()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách bài tập</CardTitle>
            <ExerciseFilterBar
              searchTerm={searchTerm}
              filteredMuscle={filteredMuscle}
              filteredDifficulty={filteredDifficulty}
              onSearchChange={setSearchTerm}
              onMuscleFilterChange={setFilteredMuscle}
              onDifficultyFilterChange={setFilteredDifficulty}
              onAddNewExercise={() => setShowAddNewExerciseModal(true)}
            />
          </div>
          <CardDescription>
            Danh sách các bài tập có sẵn. Chọn bài tập để thêm vào lịch tập.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExerciseList
            exercises={filteredExercises}
            selectedDay={selectedDay}
            isExerciseInSelectedDay={isExerciseInSelectedDay}
            onShowDetails={(exercise) => setExerciseDetailModal(exercise)}
            onAddToWorkout={openAddExerciseModal}
          />
        </CardContent>
      </Card>

      <DeleteExerciseDialog
        isOpen={!!showDeleteExerciseDialog}
        onClose={() => setShowDeleteExerciseDialog(null)}
        onConfirm={removeExerciseFromWorkout}
      />

      <DeleteWorkoutDialog
        isOpen={!!showDeleteWorkoutDialog}
        onClose={() => setShowDeleteWorkoutDialog(null)}
        onConfirm={removeWorkout}
      />

      <ExerciseDetailsModal
        exercise={exerciseDetailModal}
        isOpen={!!exerciseDetailModal}
        onClose={() => setExerciseDetailModal(null)}
        onAddToWorkout={(exerciseId) => {
          openAddExerciseModal(exerciseId);
          setExerciseDetailModal(null);
        }}
      />

      <AddNewExerciseModal
        isOpen={showAddNewExerciseModal}
        onClose={() => setShowAddNewExerciseModal(false)}
        newExercise={newExercise}
        onNameChange={(value) => setNewExercise({...newExercise, name: value})}
        onDescriptionChange={(value) => setNewExercise({...newExercise, description: value})}
        onMuscleChange={(value) => setNewExercise({...newExercise, muscle: value})}
        onDifficultyChange={(value) => setNewExercise({...newExercise, difficulty: value})}
        onDurationChange={(value) => setNewExercise({...newExercise, duration: value})}
        onAddExercise={addNewExerciseToLibrary}
      />

      <AddExerciseModal
        isOpen={showAddExerciseModal}
        onClose={() => {
          resetExerciseForm();
          setShowAddExerciseModal(false);
        }}
        isEditing={!!editingExercise}
        selectedExerciseId={selectedExerciseId}
        exerciseName={getExerciseById(selectedExerciseId)?.name || ""}
        exerciseSets={exerciseSets}
        exerciseReps={exerciseReps}
        exerciseRestTime={exerciseRestTime}
        dayForNewExercise={dayForNewExercise}
        onSetsChange={setExerciseSets}
        onRepsChange={setExerciseReps}
        onRestTimeChange={setExerciseRestTime}
        onDayChange={setDayForNewExercise}
        onSave={editingExercise ? updateExerciseInWorkout : addExerciseToWorkout}
      />

      <UnsavedChangesDialog
        isOpen={showDialog}
        onSaveAndContinue={() => {
          saveWorkouts();
          confirmNavigation();
        }}
        onLeave={confirmNavigation}
        onCancel={cancelNavigation}
      />
    </div>
  );
};

export default WorkoutPlanBuilder;
