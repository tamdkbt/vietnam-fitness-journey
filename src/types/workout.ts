
export type Exercise = {
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

export type WorkoutExercise = {
  exerciseId: string;
  sets: number;
  reps: number;
  restTime: number;
};

export type Workout = {
  id: string;
  name: string;
  day: string;
  exercises: WorkoutExercise[];
};

export const DAYS = [
  { value: "monday", label: "Thứ Hai" },
  { value: "tuesday", label: "Thứ Ba" },
  { value: "wednesday", label: "Thứ Tư" },
  { value: "thursday", label: "Thứ Năm" },
  { value: "friday", label: "Thứ Sáu" },
  { value: "saturday", label: "Thứ Bảy" },
  { value: "sunday", label: "Chủ Nhật" },
];

export const REST_TIMES = [
  { value: "30", label: "30 giây" },
  { value: "45", label: "45 giây" },
  { value: "60", label: "60 giây" },
  { value: "90", label: "90 giây" },
  { value: "120", label: "120 giây" },
];

export const MUSCLE_GROUPS = [
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

export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Người mới" },
  { value: "intermediate", label: "Trung bình" },
  { value: "advanced", label: "Nâng cao" },
];

export const MIN_WORKOUT_DURATION = 15 * 60; // 15 phút trong giây
