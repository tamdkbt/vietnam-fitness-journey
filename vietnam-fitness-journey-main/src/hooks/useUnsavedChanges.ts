
import { useState, useEffect, useCallback } from "react";
import { useBeforeUnload, useLocation, useNavigate } from "react-router-dom";

export const useUnsavedChanges = () => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Warn before window/tab close
  useBeforeUnload(
    useCallback(
      (e) => {
        if (hasUnsavedChanges) {
          e.preventDefault();
          return e.returnValue = "Bạn có thay đổi chưa được lưu. Bạn có chắc chắn muốn rời đi không?";
        }
      },
      [hasUnsavedChanges]
    )
  );
  
  // Track navigation attempts
  useEffect(() => {
    return () => {
      // Cleanup
      setPendingNavigation(null);
      setShowDialog(false);
    };
  }, [location.pathname]);
  
  const confirmNavigation = useCallback(() => {
    setHasUnsavedChanges(false);
    setShowDialog(false);
    
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [navigate, pendingNavigation]);
  
  const cancelNavigation = useCallback(() => {
    setPendingNavigation(null);
    setShowDialog(false);
  }, []);
  
  const handleNavigationAttempt = useCallback((path: string) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(path);
      setShowDialog(true);
      return false;
    }
    return true;
  }, [hasUnsavedChanges]);
  
  return {
    hasUnsavedChanges,
    setHasUnsavedChanges,
    showDialog,
    pendingNavigation,
    confirmNavigation,
    cancelNavigation,
    handleNavigationAttempt
  };
};
