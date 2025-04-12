
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Clock, Edit, MoreVertical, Trash } from "lucide-react";
import { Workout } from "@/types/workout";
import { calculateWorkoutDuration, formatTime, getDifficultyLabel, getExerciseById, getMuscleLabel } from "@/utils/workoutUtils";

interface WorkoutCardProps {
  workout: Workout;
  onStartEditingExercise: (workoutId: string, exerciseId: string, sets: number, reps: number, restTime: number) => void;
  onShowDeleteExerciseDialog: (workoutId: string, exerciseId: string) => void;
  onShowDeleteWorkoutDialog: (workoutId: string) => void;
  onShowExerciseDetails: (exerciseId: string) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onStartEditingExercise,
  onShowDeleteExerciseDialog,
  onShowDeleteWorkoutDialog,
  onShowExerciseDetails,
}) => {
  return (
    <Card key={workout.id} className="overflow-hidden workout-card mb-4">
      <CardHeader className="p-4 pb-2 bg-primary/5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            {workout.name}
          </CardTitle>
          <div className="flex gap-2 items-center">
            <Badge variant="outline" className="flex gap-1 items-center">
              <Clock className="h-3 w-3" />
              {formatTime(calculateWorkoutDuration(workout))}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onShowDeleteWorkoutDialog(workout.id)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Xóa buổi tập
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bài tập</TableHead>
              <TableHead>Hiệp x Lần</TableHead>
              <TableHead>Nghỉ</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workout.exercises.map((exercise) => {
              const exerciseDetails = getExerciseById(exercise.exerciseId);
              if (!exerciseDetails) return null;
              
              return (
                <TableRow key={exercise.exerciseId}>
                  <TableCell>
                    <div 
                      className="font-medium hover:underline cursor-pointer"
                      onClick={() => onShowExerciseDetails(exercise.exerciseId)}
                    >
                      {exerciseDetails.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getMuscleLabel(exerciseDetails.muscle)} • {getDifficultyLabel(exerciseDetails.difficulty)}
                    </div>
                  </TableCell>
                  <TableCell>{exercise.sets} x {exercise.reps}</TableCell>
                  <TableCell>{exercise.restTime}s</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => onStartEditingExercise(
                          workout.id, 
                          exercise.exerciseId, 
                          exercise.sets, 
                          exercise.reps, 
                          exercise.restTime
                        )}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onShowDeleteExerciseDialog(workout.id, exercise.exerciseId)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
