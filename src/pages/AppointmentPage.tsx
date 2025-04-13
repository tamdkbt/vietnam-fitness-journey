
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InfoIcon, UserCheck } from "lucide-react";
import { Customer } from "@/types/customer";
import AppointmentScheduler from "../components/appointments/AppointmentScheduler";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AppointmentPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Bạn cần đăng nhập để xem lịch hẹn");
        navigate("/login");
        return;
      }
      setIsAuthenticated(true);
    };
    
    checkAuth();
    
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && event === 'SIGNED_OUT') {
        navigate("/login");
      }
      setIsAuthenticated(!!session);
    });
    
    // Lấy thông tin khách hàng đã chọn từ localStorage
    const storedCustomer = localStorage.getItem("selectedCustomer");
    if (storedCustomer) {
      setSelectedCustomer(JSON.parse(storedCustomer));
    }
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication check is done
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quản lý lịch hẹn</h1>
          <p className="text-gray-600">
            Đặt lịch hẹn với huấn luyện viên và theo dõi lịch tập luyện của bạn
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
              <span>Hãy chọn một khách hàng từ danh sách để tạo lịch hẹn</span>
              <Link to="/customers">
                <Button size="sm">Đi đến danh sách khách hàng</Button>
              </Link>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Passing the selectedCustomer as a prop and a key to force re-render when customer changes */}
        <AppointmentScheduler key={selectedCustomer?.id} selectedCustomer={selectedCustomer} />
      </div>
    </Layout>
  );
};

export default AppointmentPage;
