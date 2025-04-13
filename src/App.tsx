
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import AppointmentPage from "./pages/AppointmentPage";
import WorkoutPage from "./pages/WorkoutPage";
import MealPage from "./pages/MealPage";
import CustomerPage from "./pages/CustomerPage";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<RequireAuth><Index /></RequireAuth>} />
          <Route path="/appointments" element={<RequireAuth><AppointmentPage /></RequireAuth>} />
          <Route path="/workouts" element={<RequireAuth><WorkoutPage /></RequireAuth>} />
          <Route path="/meals" element={<RequireAuth><MealPage /></RequireAuth>} />
          <Route path="/customers" element={<RequireAuth><CustomerPage /></RequireAuth>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
