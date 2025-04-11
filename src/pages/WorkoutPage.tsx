
import React from "react";
import WorkoutPlanBuilder from "../components/WorkoutPlanBuilder";
import Layout from "../components/Layout";

const WorkoutPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kế hoạch tập luyện</h1>
          <p className="text-gray-600">
            Tạo và quản lý lịch tập luyện của bạn theo từng ngày trong tuần
          </p>
        </div>
        
        <WorkoutPlanBuilder />
      </div>
    </Layout>
  );
};

export default WorkoutPage;
