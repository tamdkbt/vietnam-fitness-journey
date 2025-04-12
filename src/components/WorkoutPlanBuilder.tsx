
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download } from "lucide-react";

import { DAYS, Exercise, MIN_WORKOUT_DURATION, Workout } from "@/types/workout";
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

const WorkoutPlanBuilder = ({ key }: { key?: string }) => {
  const [workouts, setWorkouts] = useState<Workout[]>(SAMPLE_WORKOUT);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMuscle, setFilteredMuscle] = useState<string>("all");
  const [filteredDifficulty, setFilteredDifficulty] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("monday");

  // Modals state
  const [showDeleteExerciseDialog, setShowDeleteExerciseDialog] = useState<{workoutId: string, exerciseId: string} | null>(null);
  const [showDeleteWorkoutDialog, setShowDeleteWorkoutDialog] = useState<string | null>(null);
  const [exerciseDetailModal, setExerciseDetailModal] = useState<Exercise | null>(null);
  const [showAddNewExerciseModal, setShowAddNewExerciseModal] = useState<boolean>(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState<boolean>(false);
  const [editingExercise, setEditingExercise] = useState<{workoutId: string, exerciseId: string} | null>(null);
  
  // Exercise form state
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
          <DayTabs 
            selectedDay={selectedDay} 
            onDayChange={setSelectedDay} 
            calculateTotalDurationForDay={calculateTotalDurationForDay}
          />
          
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
        </CardContent>
      </Card>

      {/* Danh sách các bài tập */}
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

      {/* Modals */}
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
    </div>
  );
};

export default WorkoutPlanBuilder;
