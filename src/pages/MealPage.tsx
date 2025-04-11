
import React, { useEffect, useState } from "react";
import MealPlanBuilder from "../components/MealPlanBuilder";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InfoIcon, UserCheck } from "lucide-react";
import { Customer } from "./CustomerPage";

const MealPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Lấy thông tin khách hàng đã chọn từ localStorage
    const storedCustomer = localStorage.getItem("selectedCustomer");
    if (storedCustomer) {
      setSelectedCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kế hoạch dinh dưỡng</h1>
          <p className="text-gray-600">
            Lập kế hoạch dinh dưỡng hàng ngày phù hợp với mục tiêu của bạn
          </p>
        </div>
        
        {selectedCustomer && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Khách hàng đang được chọn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedCustomer.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedCustomer.age} tuổi, {selectedCustomer.height}cm, {selectedCustomer.weight}kg
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Mục tiêu: {selectedCustomer.goal === "weight-loss" ? "Giảm cân" : 
                              selectedCustomer.goal === "muscle-gain" ? "Tăng cơ" :
                              selectedCustomer.goal === "general-health" ? "Sức khỏe chung" : "Nâng cao thể lực"}
                  </p>
                </div>
                <Link to="/customers">
                  <Button variant="outline" size="sm">Chọn khách hàng khác</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
        
        {!selectedCustomer && (
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Chưa chọn khách hàng</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>Hãy chọn một khách hàng từ danh sách để tạo kế hoạch dinh dưỡng</span>
              <Link to="/customers">
                <Button size="sm">Đi đến danh sách khách hàng</Button>
              </Link>
            </AlertDescription>
          </Alert>
        )}
        
        <MealPlanBuilder selectedCustomer={selectedCustomer} />
      </div>
    </Layout>
  );
};

export default MealPage;
