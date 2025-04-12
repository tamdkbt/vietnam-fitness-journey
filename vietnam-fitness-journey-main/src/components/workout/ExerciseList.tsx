
import React from "react";
import { Exercise } from "@/types/workout";
import { ScrollArea } from "@/components/ui/scroll-area";
import ExerciseCard from "./ExerciseCard";

interface ExerciseListProps {
  exercises: Exercise[];
  selectedDay: string;
  isExerciseInSelectedDay: (exerciseId: string) => boolean;
  onShowDetails: (exercise: Exercise) => void;
  onAddToWorkout: (exerciseId: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  selectedDay,
  isExerciseInSelectedDay,
  onShowDetails,
  onAddToWorkout,
}) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isInSelectedDay={isExerciseInSelectedDay(exercise.id)}
            onShowDetails={onShowDetails}
            onAddToWorkout={onAddToWorkout}
          />
        ))}
      </div>
      
      {exercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Không tìm thấy bài tập nào phù hợp với bộ lọc.
          </p>
        </div>
      )}
    </ScrollArea>
  );
};

export default ExerciseList;
