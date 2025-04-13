
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPrimary?: boolean;
  buttonText: string;
}

const PricingPlan = ({ name, price, description, features, isPrimary = false, buttonText }: PricingPlanProps) => (
  <div className={`border ${isPrimary ? 'border-primary' : 'border-gray-200'} rounded-lg shadow-sm divide-y divide-gray-200`}>
    <div className={`p-6 ${isPrimary ? 'bg-primary rounded-t-lg' : ''}`}>
      <h3 className={`text-lg font-medium ${isPrimary ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
      <p className={`mt-4 text-sm ${isPrimary ? 'text-gray-100' : 'text-gray-500'}`}>{description}</p>
      <p className="mt-8">
        <span className={`text-4xl font-extrabold ${isPrimary ? 'text-white' : 'text-gray-900'}`}>{price}</span>
        <span className={`text-base font-medium ${isPrimary ? 'text-gray-100' : 'text-gray-500'}`}>/tháng</span>
      </p>
      <Link to="/signup">
        <Button 
          className={`mt-8 w-full ${isPrimary ? 'bg-white text-primary hover:bg-gray-100' : ''}`}
          variant={isPrimary ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
    <div className="pt-6 pb-8 px-6">
      <h4 className="text-sm font-medium text-gray-900 tracking-wide">Bao gồm</h4>
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex">
            <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
            <span className="ml-3 text-sm text-gray-500">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Cơ bản",
      price: "199k",
      description: "Bắt đầu hành trình sức khỏe của bạn.",
      buttonText: "Bắt đầu",
      features: [
        "Kế hoạch tập luyện cơ bản",
        "Khảo sát sức khỏe",
        "Theo dõi tiến độ"
      ]
    },
    {
      name: "Chuyên nghiệp",
      price: "399k",
      description: "Giải pháp toàn diện và hiệu quả nhất.",
      buttonText: "Đăng ký ngay",
      isPrimary: true,
      features: [
        "Tất cả tính năng của gói Cơ bản",
        "Lịch tập cá nhân hóa cao cấp",
        "Kế hoạch dinh dưỡng chi tiết",
        "2 buổi tư vấn trực tiếp mỗi tháng",
        "Hỗ trợ 24/7"
      ]
    },
    {
      name: "Cao cấp",
      price: "799k",
      description: "Trải nghiệm VIP với dịch vụ tận tâm.",
      buttonText: "Liên hệ",
      features: [
        "Tất cả tính năng của gói Chuyên nghiệp",
        "Huấn luyện viên cá nhân",
        "Chuyên gia dinh dưỡng riêng",
        "Tư vấn không giới hạn"
      ]
    }
  ];

  return (
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
          {pricingPlans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPrimary={plan.isPrimary}
              buttonText={plan.buttonText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
