
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const EmptyCustomerList: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-medium mb-2">Chưa có khách hàng nào</h3>
      <p className="text-gray-500 mb-4">Thêm khách hàng mới bằng cách hoàn thành khảo sát</p>
      <Link to="/dashboard">
        <Button>Thêm khách hàng mới</Button>
      </Link>
    </div>
  );
};

export default EmptyCustomerList;
