
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogFooter,
  AlertDialogCancel, 
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, X } from "lucide-react";
import { Exercise } from "@/types/workout";
import { getDifficultyLabel, getMuscleLabel } from "@/utils/workoutUtils";

interface ExerciseDetailsModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToWorkout: (exerciseId: string) => void;
}

const ExerciseDetailsModal: React.FC<ExerciseDetailsModalProps> = ({
  exercise,
  isOpen,
  onClose,
  onAddToWorkout,
}) => {
  if (!exercise) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            <span>{exercise.name}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{getMuscleLabel(exercise.muscle)}</Badge>
            <Badge variant="outline">{getDifficultyLabel(exercise.difficulty)}</Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {exercise.duration}s
            </Badge>
          </div>
        </AlertDialogHeader>
        <div className="mt-2">
          <p className="text-sm leading-relaxed text-gray-700">{exercise.description}</p>

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
            onAddToWorkout(exercise.id);
            onClose();
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm vào lịch tập
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExerciseDetailsModal;
