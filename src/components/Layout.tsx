
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  User, 
  Calendar, 
  Dumbbell, 
  Utensils, 
  LogOut,
  UsersRound
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

  const navigationItems = [
    {
      name: "Khách hàng",
      path: "/customers",
      icon: <UsersRound className="h-5 w-5" />,
    },
    {
      name: "Hồ sơ",
      path: "/dashboard", // Đổi đường dẫn từ "/" thành "/dashboard"
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Lịch hẹn",
      path: "/appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Lịch tập",
      path: "/workouts",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      name: "Dinh dưỡng",
      path: "/meals",
      icon: <Utensils className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b md:hidden">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold text-primary">FitCoach Pro</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navigationItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link to={item.path} className="flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                <LogOut className="h-5 w-5" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex min-h-screen">
        {/* Sidebar - Desktop only */}
        <aside className="fixed hidden md:flex flex-col w-64 h-screen bg-white border-r">
          <div className="p-6">
            <h1 className="text-xl font-bold text-primary">FitCoach Pro</h1>
            <p className="text-sm text-muted-foreground mt-1">Hành trình sức khỏe của bạn</p>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive(item.path) ? "" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-500 hover:text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Đăng xuất
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="container mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
