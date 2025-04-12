
import React from "react";
import { VIEWS, WorkoutView } from "@/types/workout";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarDays, CalendarRange, Calendar } from "lucide-react";

interface ViewSwitcherProps {
  currentView: WorkoutView;
  onViewChange: (view: WorkoutView) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, onViewChange }) => {
  const getIcon = (view: WorkoutView) => {
    switch (view) {
      case "week":
        return <CalendarDays className="h-4 w-4 mr-2" />;
      case "month":
        return <Calendar className="h-4 w-4 mr-2" />;
      case "quarter":
        return <CalendarRange className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <ToggleGroup type="single" value={currentView} onValueChange={(value) => value && onViewChange(value as WorkoutView)}>
      {VIEWS.map((view) => (
        <ToggleGroupItem key={view.value} value={view.value} className="flex items-center">
          {getIcon(view.value)}
          {view.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ViewSwitcher;
