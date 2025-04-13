
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Dumbbell, 
  Utensils, 
  ChevronRight, 
  ArrowRight, 
  Facebook, 
  Mail, 
  Phone,
  Instagram, 
  Twitter,
  CheckCircle,
  Clock,
  Users,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-fitness.jpg";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState<string>("survey");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">FitCoach Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Tính năng
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Cách thức hoạt động
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Bảng giá
              </a>
              <Link to="/login">
                <Button variant="outline" size="sm">Đăng nhập</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Đăng ký</Button>
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="sm">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 bg-white sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
              <div className="mx-auto max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="sm:text-center md:max-w-2xl md:mx-auto lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block">FitCoach Pro</span>
                      <span className="block text-primary">Hành trình sức khỏe cá nhân hóa</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      Hãy bắt đầu hành trình sức khỏe của bạn với FitCoach Pro - giải pháp kết hợp luyện tập, 
                      dinh dưỡng và theo dõi tiến độ được thiết kế riêng cho mục tiêu của bạn.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <Link to="/signup">
                          <Button size="lg" className="w-full flex items-center justify-center">
                            Đăng ký ngay
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link to="/demo">
                          <Button variant="outline" size="lg" className="w-full">
                            Xem demo
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={heroImage}
            alt="Person exercising"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Tính năng</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Mọi thứ bạn cần để đạt được mục tiêu
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              FitCoach Pro cung cấp đầy đủ công cụ để theo dõi, quản lý và tối ưu hóa hành trình sức khỏe của bạn.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Khảo sát chi tiết</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Hệ thống khảo sát thông minh giúp chúng tôi hiểu rõ mục tiêu và nhu cầu cá nhân của bạn.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Lịch hẹn thông minh</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Đặt lịch hẹn với huấn luyện viên và nhận thông báo tự động.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Lịch tập cá nhân hóa</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Tạo lịch tập phù hợp với thời gian, mục tiêu và khả năng của bạn.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <Utensils className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Kế hoạch dinh dưỡng</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Nhận kế hoạch dinh dưỡng tùy chỉnh giúp tối ưu hóa kết quả luyện tập của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Cách thức hoạt động</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              4 bước đơn giản để bắt đầu
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold">
                  1
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Hoàn thành khảo sát</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Chia sẻ mục tiêu, thói quen và sở thích của bạn để chúng tôi có thể tạo kế hoạch phù hợp nhất.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold">
                  2
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Nhận kế hoạch cá nhân hóa</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Hệ thống AI của chúng tôi tạo ra kế hoạch luyện tập và dinh dưỡng tùy chỉnh dựa trên thông tin của bạn.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold">
                  3
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Bắt đầu hành trình</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Theo dõi tiến độ của bạn thông qua ứng dụng và nhận phản hồi thời gian thực.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold">
                  4
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Đạt được mục tiêu</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Với sự hỗ trợ liên tục và điều chỉnh kế hoạch, bạn sẽ đạt được mục tiêu nhanh hơn và hiệu quả hơn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Sections */}
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
              {activeSection === "survey" && (
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
              )}

              {activeSection === "appointment" && (
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
              )}

              {activeSection === "workout" && (
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Lịch tập cá nhân hóa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Dumbbell className="h-4 w-4 mr-2 text-primary" />
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
                        <Dumbbell className="h-4 w-4 mr-2 text-primary" />
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
              )}

              {activeSection === "meal" && (
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Bảng giá</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Lựa chọn gói phù hợp với bạn
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Chúng tôi cung cấp nhiều gói dịch vụ khác nhau để đáp ứng nhu cầu và ngân sách của bạn.
            </p>
          </div>

          <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Basic Plan */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Cơ bản</h3>
                <p className="mt-4 text-sm text-gray-500">Bắt đầu hành trình sức khỏe của bạn.</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">199k</span>
                  <span className="text-base font-medium text-gray-500">/tháng</span>
                </p>
                <Link to="/signup">
                  <Button variant="outline" className="mt-8 w-full">
                    Bắt đầu
                  </Button>
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">Bao gồm</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Kế hoạch tập luyện cơ bản</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Khảo sát sức khỏe</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Theo dõi tiến độ</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border border-primary rounded-lg shadow-md divide-y divide-gray-200">
              <div className="p-6 bg-primary rounded-t-lg">
                <h3 className="text-lg font-medium text-white">Chuyên nghiệp</h3>
                <p className="mt-4 text-sm text-gray-100">Giải pháp toàn diện và hiệu quả nhất.</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">399k</span>
                  <span className="text-base font-medium text-gray-100">/tháng</span>
                </p>
                <Link to="/signup">
                  <Button className="mt-8 w-full bg-white text-primary hover:bg-gray-100">
                    Đăng ký ngay
                  </Button>
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">Bao gồm</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Tất cả tính năng của gói Cơ bản</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Lịch tập cá nhân hóa cao cấp</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Kế hoạch dinh dưỡng chi tiết</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">2 buổi tư vấn trực tiếp mỗi tháng</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Hỗ trợ 24/7</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Cao cấp</h3>
                <p className="mt-4 text-sm text-gray-500">Trải nghiệm VIP với dịch vụ tận tâm.</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">799k</span>
                  <span className="text-base font-medium text-gray-500">/tháng</span>
                </p>
                <Link to="/signup">
                  <Button variant="outline" className="mt-8 w-full">
                    Liên hệ
                  </Button>
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">Bao gồm</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Tất cả tính năng của gói Chuyên nghiệp</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Huấn luyện viên cá nhân</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Chuyên gia dinh dưỡng riêng</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-gray-500">Tư vấn không giới hạn</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Phản hồi khách hàng</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Khách hàng nói gì về chúng tôi
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl">
                  T
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Trần Minh Tuấn</h4>
                  <p className="text-sm text-gray-500">Khách hàng 6 tháng</p>
                </div>
              </div>
              <p className="text-gray-600">
                "FitCoach Pro đã giúp tôi giảm 12kg trong 4 tháng. Kế hoạch tập luyện và dinh dưỡng rất hiệu quả và dễ thực hiện."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl">
                  H
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Nguyễn Thị Hoa</h4>
                  <p className="text-sm text-gray-500">Khách hàng 3 tháng</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Tôi yêu thích cách FitCoach Pro tùy chỉnh kế hoạch tập luyện theo thời gian của tôi. Không còn cảm giác quá tải nữa!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl">
                  L
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Phạm Văn Linh</h4>
                  <p className="text-sm text-gray-500">Khách hàng 1 năm</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Sau 1 năm sử dụng, tôi không chỉ đạt được mục tiêu tăng cơ mà còn cải thiện sức khỏe tổng thể. Cảm ơn FitCoach Pro!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h2>
          <p className="mt-4 text-lg leading-6 text-white">
            Đăng ký ngay hôm nay và nhận ưu đãi 30% cho tháng đầu tiên.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Đăng ký ngay
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="ml-4 text-white border-white hover:bg-primary-foreground hover:text-primary">
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">FitCoach Pro</h3>
              <p className="text-gray-400 text-sm">
                Hành trình sức khỏe cá nhân hóa cho mọi mục tiêu và lối sống.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Liên kết</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Trang chủ</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Tính năng</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Bảng giá</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Pháp lý</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Chính sách bảo mật</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Giấy phép</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:info@fitcoachpro.vn" className="text-gray-400 hover:text-white">info@fitcoachpro.vn</a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <a href="tel:+84901234567" className="text-gray-400 hover:text-white">+84 90 123 4567</a>
                </li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} FitCoach Pro. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
