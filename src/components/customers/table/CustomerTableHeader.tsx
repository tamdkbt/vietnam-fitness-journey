
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CustomerTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Tên khách hàng</TableHead>
        <TableHead>Thông tin</TableHead>
        <TableHead>Mục tiêu</TableHead>
        <TableHead>Thời gian tập</TableHead>
        <TableHead>Tùy chọn</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CustomerTableHeader;
