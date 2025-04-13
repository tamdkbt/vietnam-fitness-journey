
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extract the URL hash and search params
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const queryParams = new URLSearchParams(location.search);
        
        // Check for error in hash or query params
        const hashError = hashParams.get("error_description");
        const queryError = queryParams.get("error_description");
        
        if (hashError || queryError) {
          setError(hashError || queryError || "Xác thực thất bại");
          return;
        }
        
        // Check for session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (data?.session) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setError(error.message || "Đã xảy ra lỗi trong quá trình xác thực");
        navigate("/login");
      }
    };
    
    handleAuthCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold text-primary mb-4">FitCoach Pro</h1>
      {error ? (
        <>
          <p className="text-red-500 mb-4">Lỗi: {error}</p>
          <button 
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Quay lại trang đăng nhập
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-4">Đang xử lý đăng nhập...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </>
      )}
    </div>
  );
};

export default AuthCallbackPage;
