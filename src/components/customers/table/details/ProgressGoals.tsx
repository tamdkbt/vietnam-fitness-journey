
import React from "react";
import { Activity } from "lucide-react";
import { Customer } from "@/types/customer";

interface ProgressGoalsProps {
  customer: Customer;
}

const ProgressGoals: React.FC<ProgressGoalsProps> = ({ customer }) => {
  return (
    <div className="bg-white rounded-lg p-4 border">
      <div className="flex items-center mb-3">
        <Activity className="h-5 w-5 text-primary mr-2" />
        <h3 className="font-medium">Tiến độ mục tiêu</h3>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Lịch tập luyện</span>
            <span className="font-medium">20%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Kế hoạch dinh dưỡng</span>
            <span className="font-medium">60%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Mục tiêu chung</span>
            <span className="font-medium">35%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressGoals;
