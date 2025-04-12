
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Info, Plus } from "lucide-react";
import { Exercise } from "@/types/workout";
import { getMuscleLabel, getDifficultyLabel } from "@/utils/workoutUtils";

interface ExerciseCardProps {
  exercise: Exercise;
  isInSelectedDay: boolean;
  onShowDetails: (exercise: Exercise) => void;
  onAddToWorkout: (exerciseId: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isInSelectedDay,
  onShowDetails,
  onAddToWorkout,
}) => {
  const muscleLabel = getMuscleLabel(exercise.muscle);
  const difficultyLabel = getDifficultyLabel(exercise.difficulty);

  return (
    <Card 
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
              onShowDetails(exercise);
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
              onAddToWorkout(exercise.id);
            }}
          >
            <Plus className="h-3 w-3 mr-1" />
            Thêm vào lịch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
