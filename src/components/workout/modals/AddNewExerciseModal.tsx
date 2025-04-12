
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { DIFFICULTY_LEVELS, MUSCLE_GROUPS } from "@/types/workout";

interface AddNewExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  newExercise: {
    name: string;
    description: string;
    muscle: string;
    difficulty: string;
    duration: number;
  };
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onMuscleChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onDurationChange: (value: number) => void;
  onAddExercise: () => void;
}

const AddNewExerciseModal: React.FC<AddNewExerciseModalProps> = ({
  isOpen,
  onClose,
  newExercise,
  onNameChange,
  onDescriptionChange,
  onMuscleChange,
  onDifficultyChange,
  onDurationChange,
  onAddExercise,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Ví dụ: Nâng tạ trên vai"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exerciseDescription">Mô tả bài tập *</Label>
            <Input
              id="exerciseDescription"
              value={newExercise.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Mô tả cách thực hiện bài tập"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exerciseMuscle">Nhóm cơ</Label>
              <Select
                value={newExercise.muscle}
                onValueChange={onMuscleChange}
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
                onValueChange={onDifficultyChange}
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
              onChange={(e) => onDurationChange(parseInt(e.target.value))}
            />
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onAddExercise} className="bg-primary">
            <Plus className="mr-2 h-4 w-4" />
            Thêm bài tập
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddNewExerciseModal;
