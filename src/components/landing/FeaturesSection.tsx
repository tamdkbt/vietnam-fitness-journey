
import React from "react";
import { Calendar, Dumbbell, Utensils, Users } from "lucide-react";

const FeatureItem = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Khảo sát chi tiết",
      description: "Hệ thống khảo sát thông minh giúp chúng tôi hiểu rõ mục tiêu và nhu cầu cá nhân của bạn."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Lịch hẹn thông minh",
      description: "Đặt lịch hẹn với huấn luyện viên và nhận thông báo tự động."
    },
    {
      icon: <Dumbbell className="h-6 w-6" />,
      title: "Lịch tập cá nhân hóa",
      description: "Tạo lịch tập phù hợp với thời gian, mục tiêu và khả năng của bạn."
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Kế hoạch dinh dưỡng",
      description: "Nhận kế hoạch dinh dưỡng tùy chỉnh giúp tối ưu hóa kết quả luyện tập của bạn."
    }
  ];

  return (
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
            {features.map((feature, index) => (
              <FeatureItem 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
