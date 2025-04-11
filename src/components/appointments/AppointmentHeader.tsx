
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";

interface AppointmentHeaderProps {
  view: "week" | "month";
  setView: (view: "week" | "month") => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  daysToDisplay: Date[];
}

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  view,
  setView,
  currentDate,
  setCurrentDate,
  handlePrevious,
  handleNext,
  daysToDisplay,
}) => {
  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle>Lịch hẹn</CardTitle>
        <div className="flex items-center space-x-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "week" | "month")}>
            <TabsList>
              <TabsTrigger value="week">Tuần</TabsTrigger>
              <TabsTrigger value="month">Tháng</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button size="icon" variant="outline" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => setCurrentDate(new Date())}>
            Hôm nay
          </Button>
        </div>
      </div>
      <CardDescription>
        {view === "week" 
          ? `${formatDate(daysToDisplay[0], "dd/MM/yyyy")} - ${formatDate(daysToDisplay[daysToDisplay.length - 1], "dd/MM/yyyy")}` 
          : formatDate(currentDate, "MMMM yyyy")}
      </CardDescription>
    </CardHeader>
  );
};

export default AppointmentHeader;
