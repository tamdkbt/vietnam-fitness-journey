
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
