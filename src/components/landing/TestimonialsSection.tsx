
import React from "react";

interface TestimonialProps {
  initial: string;
  name: string;
  duration: string;
  content: string;
}

const Testimonial = ({ initial, name, duration, content }: TestimonialProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl">
        {initial}
      </div>
      <div className="ml-4">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-gray-500">{duration}</p>
      </div>
    </div>
    <p className="text-gray-600">{content}</p>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      initial: "T",
      name: "Trần Minh Tuấn",
      duration: "Khách hàng 6 tháng",
      content: "\"FitCoach Pro đã giúp tôi giảm 12kg trong 4 tháng. Kế hoạch tập luyện và dinh dưỡng rất hiệu quả và dễ thực hiện.\""
    },
    {
      initial: "H",
      name: "Nguyễn Thị Hoa",
      duration: "Khách hàng 3 tháng",
      content: "\"Tôi yêu thích cách FitCoach Pro tùy chỉnh kế hoạch tập luyện theo thời gian của tôi. Không còn cảm giác quá tải nữa!\""
    },
    {
      initial: "L",
      name: "Phạm Văn Linh",
      duration: "Khách hàng 1 năm",
      content: "\"Sau 1 năm sử dụng, tôi không chỉ đạt được mục tiêu tăng cơ mà còn cải thiện sức khỏe tổng thể. Cảm ơn FitCoach Pro!\""
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Phản hồi khách hàng</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Khách hàng nói gì về chúng tôi
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              initial={testimonial.initial}
              name={testimonial.name}
              duration={testimonial.duration}
              content={testimonial.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
