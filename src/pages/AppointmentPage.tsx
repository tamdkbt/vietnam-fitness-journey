
import React from "react";
import AppointmentScheduler from "../components/AppointmentScheduler";
import Layout from "../components/Layout";

const AppointmentPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quản lý lịch hẹn</h1>
          <p className="text-gray-600">
            Đặt lịch hẹn với huấn luyện viên và theo dõi lịch tập luyện của bạn
          </p>
        </div>
        
        <AppointmentScheduler />
      </div>
    </Layout>
  );
};

export default AppointmentPage;
