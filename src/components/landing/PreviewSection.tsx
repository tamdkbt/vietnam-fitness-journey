
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SurveyPreview = () => (
  <div className="p-6">
    <h3 className="text-xl font-bold mb-4">Khảo sát chi tiết</h3>
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nguyễn Văn A" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tuổi</label>
        <input type="number" className="w-full p-2 border border-gray-300 rounded-md" placeholder="30" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Chiều cao (cm)</label>
        <input type="number" className="w-full p-2 border border-gray-300 rounded-md" placeholder="170" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cân nặng (kg)</label>
        <input type="number" className="w-full p-2 border border-gray-300 rounded-md" placeholder="65" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu của bạn</label>
        <select className="w-full p-2 border border-gray-300 rounded-md">
          <option>Giảm cân</option>
          <option>Tăng cơ</option>
          <option>Tăng sức bền</option>
          <option>Sức khỏe tổng thể</option>
        </select>
      </div>
    </div>
    <div className="mt-6 flex justify-end">
      <Button>Tiếp tục <ChevronRight className="ml-2 h-4 w-4" /></Button>
    </div>
  </div>
);

const AppointmentPreview = () => (
  <div className="p-6">
    <h3 className="text-xl font-bold mb-4">Lịch hẹn thông minh</h3>
    <div className="grid grid-cols-7 gap-2 mb-4">
      {Array.from({ length: 7 }, (_, i) => {
        const day = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][i];
        return (
          <div key={i} className={`text-center p-2 rounded-md ${i === 2 ? 'bg-primary text-white' : 'bg-gray-100'}`}>
            <div className="text-sm font-medium">{day}</div>
            <div className="text-xs">{i + 10}</div>
          </div>
        );
      })}
    </div>
    <div className="space-y-3">
      <div className="flex items-center p-3 border rounded-md bg-gray-50">
        <div className="flex-1">
          <p className="font-medium">Tư vấn dinh dưỡng</p>
          <p className="text-sm text-gray-500">9:00 - 10:00</p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Đã xác nhận</Badge>
      </div>
      <div className="flex items-center p-3 border rounded-md">
        <div className="flex-1">
          <p className="font-medium">Buổi tập cá nhân</p>
          <p className="text-sm text-gray-500">15:00 - 16:00</p>
        </div>
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Chờ xác nhận</Badge>
      </div>
    </div>
    <div className="mt-6 flex justify-center">
      <Button>Đặt lịch hẹn mới</Button>
    </div>
  </div>
);

const WorkoutPreview = () => (
  <div className="p-6">
    <h3 className="text-xl font-bold mb-4">Lịch tập cá nhân hóa</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2 flex items-center">
          <div className="h-4 w-4 mr-2 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.7 6.7a8 8 0 1 0 10.6 0M7 15l-.9 6H6l-2-6h18l-2 6h-.1l-.9-6M4 5h16a1 1 0 0 1 1 1 1 1 0 0 1-1 1H4a1 1 0 0 1-1-1 1 1 0 0 1 1-1Z" />
            </svg>
          </div>
          Bài tập ngực và tay
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Đẩy ngực với tạ đơn - 3 x 12
          </li>
          <li className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Đẩy ngực máy - 3 x 10
          </li>
          <li className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Gập tay với tạ đơn - 3 x 15
          </li>
        </ul>
        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> 45 phút
          </span>
          <Badge variant="outline" className="text-xs">Trung bình</Badge>
        </div>
      </div>
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2 flex items-center">
          <div className="h-4 w-4 mr-2 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.7 6.7a8 8 0 1 0 10.6 0M7 15l-.9 6H6l-2-6h18l-2 6h-.1l-.9-6M4 5h16a1 1 0 0 1 1 1 1 1 0 0 1-1 1H4a1 1 0 0 1-1-1 1 1 0 0 1 1-1Z" />
            </svg>
          </div>
          Bài tập chân
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Squat - 4 x 10
          </li>
          <li className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Leg press - 3 x 12
          </li>
          <li className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Đá chân sau - 3 x 15 mỗi bên
          </li>
        </ul>
        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> 50 phút
          </span>
          <Badge variant="outline" className="text-xs">Khó</Badge>
        </div>
      </div>
    </div>
    <div className="mt-4 flex justify-center">
      <Button>Tải xuống PDF</Button>
    </div>
  </div>
);

const MealPreview = () => (
  <div className="p-6">
    <h3 className="text-xl font-bold mb-4">Kế hoạch dinh dưỡng</h3>
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Bữa sáng</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-sm">Yến mạch với chuối và hạt</p>
            <p className="text-xs text-gray-500">300 calo, 15g protein</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-sm">Sinh tố protein với sữa chua</p>
            <p className="text-xs text-gray-500">250 calo, 20g protein</p>
          </div>
        </div>
      </div>
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Bữa trưa</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-sm">Salad gà với dầu olive</p>
            <p className="text-xs text-gray-500">420 calo, 35g protein</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-sm">Cơm gạo lứt với đậu và rau</p>
            <p className="text-xs text-gray-500">380 calo, 25g protein</p>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4 flex justify-center">
      <Button>Xuất danh sách mua sắm</Button>
    </div>
  </div>
);

const PreviewSection = () => {
  const [activeSection, setActiveSection] = useState<string>("survey");

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Tính năng chính</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trải nghiệm FitCoach Pro
          </p>
        </div>

        <div className="space-y-12">
          {/* Preview tabs */}
          <div className="flex flex-wrap justify-center space-x-2 mb-6">
            <Button
              variant={activeSection === "survey" ? "default" : "outline"}
              onClick={() => setActiveSection("survey")}
              className="mb-2"
            >
              Khảo sát
            </Button>
            <Button
              variant={activeSection === "appointment" ? "default" : "outline"}
              onClick={() => setActiveSection("appointment")}
              className="mb-2"
            >
              Lịch hẹn
            </Button>
            <Button
              variant={activeSection === "workout" ? "default" : "outline"}
              onClick={() => setActiveSection("workout")}
              className="mb-2"
            >
              Lịch tập
            </Button>
            <Button
              variant={activeSection === "meal" ? "default" : "outline"}
              onClick={() => setActiveSection("meal")}
              className="mb-2"
            >
              Dinh dưỡng
            </Button>
          </div>

          {/* Preview content */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {activeSection === "survey" && <SurveyPreview />}
            {activeSection === "appointment" && <AppointmentPreview />}
            {activeSection === "workout" && <WorkoutPreview />}
            {activeSection === "meal" && <MealPreview />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
