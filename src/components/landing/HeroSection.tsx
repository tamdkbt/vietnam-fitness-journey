
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Sử dụng đường dẫn tuyệt đối cho hình ảnh hero
const heroImagePath = "/lovable-uploads/be41f201-9ab3-4a3b-aeaa-6110c1e7639c.png";

const HeroSection = () => {
  return (
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
          src={heroImagePath}
          alt="Người tập thể dục"
        />
      </div>
    </section>
  );
};

export default HeroSection;
