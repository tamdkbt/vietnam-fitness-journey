
import React from "react";
import { Facebook, Mail, Phone, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
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
  );
};

export default Footer;
