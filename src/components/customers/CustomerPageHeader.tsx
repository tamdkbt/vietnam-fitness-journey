
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, FileUp, FileDown } from "lucide-react";
import { Customer } from "@/types/customer";

interface CustomerPageHeaderProps {
  customersCount: number;
  exportCustomers: () => void;
  importCustomers: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerPageHeader: React.FC<CustomerPageHeaderProps> = ({ 
  customersCount,
  exportCustomers,
  importCustomers 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Danh sách khách hàng</h1>
        <p className="text-gray-600">
          Quản lý thông tin khách hàng và tạo kế hoạch tập luyện, dinh dưỡng
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
        <Link to="/customer/new">
          <Button size="sm" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Thêm khách hàng
          </Button>
        </Link>
        
        <div className="hidden">
          <input 
            type="file" 
            id="importFile" 
            accept=".json" 
            onChange={importCustomers}
            className="hidden" 
          />
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => document.getElementById('importFile')?.click()}
          className="flex items-center gap-1"
        >
          <FileUp className="h-4 w-4" />
          <span className="hidden sm:inline">Nhập dữ liệu</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={exportCustomers}
          className="flex items-center gap-1"
        >
          <FileDown className="h-4 w-4" />
          <span className="hidden sm:inline">Xuất dữ liệu</span>
        </Button>
      </div>
    </div>
  );
};

export default CustomerPageHeader;
