
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Customer } from "@/types/customer";
import AppointmentScheduler from "../components/appointments/AppointmentScheduler";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CustomerSelector from "../components/appointments/CustomerSelector";

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
    
    // Get selected customer from localStorage
    const storedCustomer = localStorage.getItem("selectedCustomer");
    if (storedCustomer) {
      setSelectedCustomer(JSON.parse(storedCustomer));
    }
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    toast.success(`Đã chọn khách hàng ${customer.name}`);
  };

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
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerSelector
              selectedCustomer={selectedCustomer}
              onCustomerSelect={handleCustomerSelect}
            />
          </CardContent>
        </Card>
        
        {!selectedCustomer && (
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Chưa chọn khách hàng</AlertTitle>
            <AlertDescription>
              Hãy chọn một khách hàng từ danh sách để tạo lịch hẹn
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
