
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Save, X, Undo } from "lucide-react";

interface UnsavedChangesDialogProps {
  isOpen: boolean;
  onSaveAndContinue: () => void;
  onLeave: () => void;
  onCancel: () => void;
}

const UnsavedChangesDialog: React.FC<UnsavedChangesDialogProps> = ({
  isOpen,
  onSaveAndContinue,
  onLeave,
  onCancel,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thay đổi chưa được lưu</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có thay đổi trong lịch tập nhưng chưa lưu. Bạn muốn làm gì?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel onClick={onCancel} className="flex items-center gap-2">
            <Undo className="h-4 w-4" />
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onLeave}
            className="bg-destructive hover:bg-destructive/90 flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Rời đi
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={onSaveAndContinue}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Lưu và tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnsavedChangesDialog;
