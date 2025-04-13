
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
