
import { Exercise, Workout, DAYS, MUSCLE_GROUPS, DIFFICULTY_LEVELS } from "../types/workout";
import { EXERCISES } from "../data/workoutData";
import { format, addDays, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';

export const getExerciseById = (id: string): Exercise | undefined => {
  return EXERCISES.find((ex) => ex.id === id);
};

export const getDayLabel = (value: string): string => {
  return DAYS.find((day) => day.value === value)?.label || value;
};

export const getMuscleLabel = (value: string): string => {
  return MUSCLE_GROUPS.find(m => m.value === value)?.label || value;
};

export const getDifficultyLabel = (value: string): string => {
  return DIFFICULTY_LEVELS.find(d => d.value === value)?.label || value;
};

export const calculateWorkoutDuration = (workout: Workout): number => {
  return workout.exercises.reduce((total, exercise) => {
    const exerciseDetails = getExerciseById(exercise.exerciseId);
    if (!exerciseDetails) return total;
    
    // Thời gian thực hiện = thời gian của mỗi lần x số lần x số hiệp + thời gian nghỉ x (số hiệp - 1)
    return total + (exerciseDetails.duration * exercise.sets * exercise.reps) + 
                   (exercise.restTime * (exercise.sets - 1));
  }, 0);
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const isExerciseInDay = (exerciseId: string, workouts: Workout[], day: string): boolean => {
  return workouts.some(workout => 
    workout.day === day && 
    workout.exercises.some(ex => ex.exerciseId === exerciseId)
  );
};

export const getTotalExercisesForDay = (workouts: Workout[], day: string): number => {
  return workouts.filter(w => w.day === day)
    .reduce((total, workout) => total + workout.exercises.length, 0);
};

export const getDateFromDay = (day: string, referenceDate: Date = new Date()): Date => {
  const dayIndex = DAYS.findIndex(d => d.value === day);
  if (dayIndex === -1) return referenceDate;
  
  // Get Monday of the current week
  const monday = startOfWeek(referenceDate, { weekStartsOn: 1 });
  return addDays(monday, dayIndex);
};

export const getDayFromDate = (date: Date): string => {
  const dayName = format(date, 'EEEE', { locale: vi }).toLowerCase();
  const dayMap: Record<string, string> = {
    'thứ hai': 'monday',
    'thứ ba': 'tuesday',
    'thứ tư': 'wednesday',
    'thứ năm': 'thursday',
    'thứ sáu': 'friday',
    'thứ bảy': 'saturday',
    'chủ nhật': 'sunday'
  };
  
  return dayMap[dayName] || 'monday';
};
