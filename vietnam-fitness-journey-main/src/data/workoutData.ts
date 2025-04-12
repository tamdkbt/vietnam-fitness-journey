
import { Exercise, Workout } from "../types/workout";

export const EXERCISES: Exercise[] = [
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

export const SAMPLE_WORKOUT: Workout[] = [
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
