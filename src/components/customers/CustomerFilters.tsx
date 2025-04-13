
import React from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import CustomerSearch from "./CustomerSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface CustomerFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  goalFilter: string;
  setGoalFilter: (value: string) => void;
  genderFilter: string;
  setGenderFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  resetFilters: () => void;
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  goalFilter,
  setGoalFilter,
  genderFilter,
  setGenderFilter,
  sortBy,
  setSortBy,
  resetFilters
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
      <div className="w-full md:w-1/3">
        <CustomerSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Select 
          value={goalFilter} 
          onValueChange={setGoalFilter}
        >
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Mục tiêu" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả mục tiêu</SelectItem>
            <SelectItem value="weight-loss">Giảm cân</SelectItem>
            <SelectItem value="muscle-gain">Tăng cơ</SelectItem>
            <SelectItem value="general-health">Sức khỏe</SelectItem>
            <SelectItem value="endurance">Thể lực</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={genderFilter} 
          onValueChange={setGenderFilter}
        >
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Giới tính" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả giới tính</SelectItem>
            <SelectItem value="male">Nam</SelectItem>
            <SelectItem value="female">Nữ</SelectItem>
            <SelectItem value="other">Khác</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Tùy chọn</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Sắp xếp theo</h4>
              <Select 
                value={sortBy} 
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tên</SelectItem>
                  <SelectItem value="age">Tuổi</SelectItem>
                  <SelectItem value="created">Ngày tạo</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={resetFilters} 
                variant="outline" 
                className="w-full mt-2"
              >
                Đặt lại bộ lọc
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CustomerFilters;
