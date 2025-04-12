
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Filter, Plus, Search } from "lucide-react";
import { DIFFICULTY_LEVELS, MUSCLE_GROUPS } from "@/types/workout";

interface ExerciseFilterBarProps {
  searchTerm: string;
  filteredMuscle: string;
  filteredDifficulty: string;
  onSearchChange: (value: string) => void;
  onMuscleFilterChange: (value: string) => void;
  onDifficultyFilterChange: (value: string) => void;
  onAddNewExercise: () => void;
}

const ExerciseFilterBar: React.FC<ExerciseFilterBarProps> = ({
  searchTerm,
  filteredMuscle,
  filteredDifficulty,
  onSearchChange,
  onMuscleFilterChange,
  onDifficultyFilterChange,
  onAddNewExercise,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Lọc bài tập</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <div className="p-2">
              <Label className="text-xs font-medium mb-1.5 block">Nhóm cơ</Label>
              <Select value={filteredMuscle} onValueChange={onMuscleFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả nhóm cơ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả nhóm cơ</SelectItem>
                  {MUSCLE_GROUPS.map((muscle) => (
                    <SelectItem key={muscle.value} value={muscle.value}>
                      {muscle.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-2 pt-0">
              <Label className="text-xs font-medium mb-1.5 block">Độ khó</Label>
              <Select value={filteredDifficulty} onValueChange={onDifficultyFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả độ khó" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả độ khó</SelectItem>
                  {DIFFICULTY_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              onMuscleFilterChange("all");
              onDifficultyFilterChange("all");
            }}>
              Xóa bộ lọc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Tìm bài tập..."
            className="pl-9 w-[200px]"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <Button 
        variant="default" 
        size="sm"
        onClick={onAddNewExercise}
      >
        <Plus className="h-4 w-4 mr-2" />
        Thêm bài tập mới
      </Button>
    </div>
  );
};

export default ExerciseFilterBar;
