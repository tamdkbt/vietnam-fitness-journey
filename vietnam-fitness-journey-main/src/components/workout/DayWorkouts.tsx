
import React from "react";
import { Card } from "@/components/ui/card";
import { DumbbellIcon, CheckCircle } from "lucide-react";
import { DAYS, MIN_WORKOUT_DURATION, Workout } from "@/types/workout";
import { formatTime, getDayLabel } from "@/utils/workoutUtils";
import WorkoutCard from "./WorkoutCard";

interface DayWorkoutsProps {
  day: string;
  workouts: Workout[];
  calculateTotalDurationForDay: (day: string) => number;
  onStartEditingExercise: (workoutId: string, exerciseId: string, sets: number, reps: number, restTime: number) => void;
  onShowDeleteExerciseDialog: (workoutId: string, exerciseId: string) => void;
  onShowDeleteWorkoutDialog: (workoutId: string) => void;
  onShowExerciseDetails: (exerciseId: string) => void;
}

const DayWorkouts: React.FC<DayWorkoutsProps> = ({
  day,
  workouts,
  calculateTotalDurationForDay,
  onStartEditingExercise,
  onShowDeleteExerciseDialog,
  onShowDeleteWorkoutDialog,
  onShowExerciseDetails,
}) => {
  const dayWorkouts = workouts.filter((workout) => workout.day === day);
  const totalDuration = calculateTotalDurationForDay(day);
  const hasCompletedWorkout = totalDuration >= MIN_WORKOUT_DURATION;
  
  if (dayWorkouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
        <DumbbellIcon className="h-12 w-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Chưa có bài tập nào</h3>
        <p className="mb-4">Hãy thêm bài tập mới cho {getDayLabel(day)}</p>
      </div>
    );
  }

  return (
    <>
      {hasCompletedWorkout && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          <p>🎉 Bạn đã hoàn thành lịch tập cho hôm nay! (Tổng thời gian: {formatTime(totalDuration)})</p>
        </div>
      )}
    
      {dayWorkouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onStartEditingExercise={onStartEditingExercise}
          onShowDeleteExerciseDialog={onShowDeleteExerciseDialog}
          onShowDeleteWorkoutDialog={onShowDeleteWorkoutDialog}
          onShowExerciseDetails={onShowExerciseDetails}
        />
      ))}
    </>
  );
};

export default DayWorkouts;
