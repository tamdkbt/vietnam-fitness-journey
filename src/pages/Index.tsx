
import React from "react";
import SurveyForm from "../components/SurveyForm";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Chào mừng đến với Fitness Việt Nam</h1>
          <p className="text-gray-600">
            Hãy điền thông tin của bạn để chúng tôi có thể tạo kế hoạch tập luyện và dinh dưỡng phù hợp nhất
          </p>
        </div>
        
        <SurveyForm />
      </div>
    </Layout>
  );
};

export default Index;
