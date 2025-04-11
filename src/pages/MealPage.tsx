
import React from "react";
import MealPlanBuilder from "../components/MealPlanBuilder";
import Layout from "../components/Layout";

const MealPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kế hoạch dinh dưỡng</h1>
          <p className="text-gray-600">
            Lập kế hoạch dinh dưỡng hàng ngày phù hợp với mục tiêu của bạn
          </p>
        </div>
        
        <MealPlanBuilder />
      </div>
    </Layout>
  );
};

export default MealPage;
