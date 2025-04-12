
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save } from "lucide-react";
import { DAYS, REST_TIMES } from "@/types/workout";

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  selectedExerciseId: string;
  exerciseName: string;
  exerciseSets: number;
  exerciseReps: number;
  exerciseRestTime: number;
  dayForNewExercise: string;
  onSetsChange: (value: number) => void;
  onRepsChange: (value: number) => void;
  onRestTimeChange: (value: number) => void;
  onDayChange: (value: string) => void;
  onSave: () => void;
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  isOpen,
  onClose,
  isEditing,
  selectedExerciseId,
  exerciseName,
  exerciseSets,
  exerciseReps,
  exerciseRestTime,
  dayForNewExercise,
  onSetsChange,
  onRepsChange,
  onRestTimeChange,
  onDayChange,
  onSave,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Cập nhật bài tập" : "Thêm bài tập vào lịch"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Chỉnh sửa thông tin bài tập trong lịch tập của bạn" 
              : "Chọn ngày và thông số chi tiết cho bài tập"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {selectedExerciseId && exerciseName && (
            <div className="p-3 border rounded-md bg-muted/50">
              <h3 className="font-medium mb-1">
                {exerciseName}
              </h3>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="day">Ngày tập</Label>
            <Select 
              value={dayForNewExercise} 
              onValueChange={onDayChange}
              disabled={isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn ngày" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sets">Số hiệp</Label>
              <Input
                id="sets"
                type="number"
                min="1"
                value={exerciseSets}
                onChange={(e) => onSetsChange(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reps">Số lần</Label>
              <Input
                id="reps"
                type="number"
                min="1"
                value={exerciseReps}
                onChange={(e) => onRepsChange(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rest">Thời gian nghỉ</Label>
              <Select 
                value={exerciseRestTime.toString()} 
                onValueChange={(value) => onRestTimeChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  {REST_TIMES.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={onSave}>
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Cập nhật
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Thêm vào lịch
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseModal;
