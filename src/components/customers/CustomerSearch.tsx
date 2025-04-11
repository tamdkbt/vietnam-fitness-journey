
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CustomerSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Tìm kiếm khách hàng..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomerSearch;
