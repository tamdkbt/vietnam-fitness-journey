
import React from "react";

interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
}

const Step = ({ stepNumber, title, description }: StepProps) => (
  <div className="flex flex-col md:flex-row">
    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold">
      {stepNumber}
    </div>
    <div className="mt-4 md:mt-0 md:ml-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      title: "Hoàn thành khảo sát",
      description: "Chia sẻ mục tiêu, thói quen và sở thích của bạn để chúng tôi có thể tạo kế hoạch phù hợp nhất."
    },
    {
      title: "Nhận kế hoạch cá nhân hóa",
      description: "Hệ thống AI của chúng tôi tạo ra kế hoạch luyện tập và dinh dưỡng tùy chỉnh dựa trên thông tin của bạn."
    },
    {
      title: "Bắt đầu hành trình",
      description: "Theo dõi tiến độ của bạn thông qua ứng dụng và nhận phản hồi thời gian thực."
    },
    {
      title: "Đạt được mục tiêu",
      description: "Với sự hỗ trợ liên tục và điều chỉnh kế hoạch, bạn sẽ đạt được mục tiêu nhanh hơn và hiệu quả hơn."
    }
  ];

  return (
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
            {steps.map((step, index) => (
              <Step
                key={index}
                stepNumber={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
