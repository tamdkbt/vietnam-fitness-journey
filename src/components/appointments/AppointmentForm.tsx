
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { X, Check, AlarmClock, User, Dumbbell, FileText } from "lucide-react";
import { APPOINTMENT_TYPES, HOURS, Appointment } from "../../types/appointment";
import { Customer } from "@/types/customer";

interface AppointmentFormProps {
  selectedDate: Date;
  newAppointment: {
    name: string;
    type: string;
    time: string;
  };
  setNewAppointment: React.Dispatch<React.SetStateAction<{
    name: string;
    type: string;
    time: string;
  }>>;
  editingAppointment: Appointment | null;
  selectedCustomer?: Customer | null;
  handleAddAppointment: () => void;
  handleDeleteAppointment: (id: string) => void;
  handleCompleteAppointment: (id: string) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedDate,
  newAppointment,
  setNewAppointment,
  editingAppointment,
  selectedCustomer,
  handleAddAppointment,
  handleDeleteAppointment,
  handleCompleteAppointment
}) => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="flex items-center gap-2">
          <AlarmClock className="w-4 h-4 text-primary" />
          <Label className="font-medium">Thời gian buổi hẹn</Label>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Select
            value={newAppointment.time}
            onValueChange={(value) =>
              setNewAppointment({ ...newAppointment, time: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn giờ" />
            </SelectTrigger>
            <SelectContent>
              {HOURS.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <User className="w-4 h-4 text-primary" />
          <Label className="font-medium">Thông tin khách hàng</Label>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {selectedCustomer ? (
            <div className="p-3 border rounded-md bg-gray-50 space-y-1">
              <p className="font-medium">{selectedCustomer.name}</p>
              <p className="text-sm text-gray-600">
                {selectedCustomer.age} tuổi, {selectedCustomer.height}cm, {selectedCustomer.weight}kg
              </p>
              <p className="text-sm text-gray-600">
                Mục tiêu: {selectedCustomer.goal === "weight-loss" ? "Giảm cân" : 
                        selectedCustomer.goal === "muscle-gain" ? "Tăng cơ" :
                        selectedCustomer.goal === "general-health" ? "Sức khỏe chung" : "Nâng cao thể lực"}
              </p>
            </div>
          ) : (
            <Input
              value={newAppointment.name}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, name: e.target.value })
              }
              placeholder="Nhập tên khách hàng"
            />
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <Dumbbell className="w-4 h-4 text-primary" />
          <Label className="font-medium">Loại buổi tập</Label>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Select
            value={newAppointment.type}
            onValueChange={(value) =>
              setNewAppointment({ ...newAppointment, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại buổi tập" />
            </SelectTrigger>
            <SelectContent>
              {APPOINTMENT_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <FileText className="w-4 h-4 text-primary" />
          <Label className="font-medium">Ghi chú (tùy chọn)</Label>
        </div>
        
        <Textarea 
          placeholder="Thêm ghi chú cho buổi hẹn này..." 
          className="resize-none"
          rows={3}
        />
      </div>
      
      <DialogFooter className="flex justify-between">
        {editingAppointment && (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteAppointment(editingAppointment.id)}
            >
              <X className="h-4 w-4 mr-1" />
              Xóa
            </Button>
            {editingAppointment.status !== "completed" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCompleteAppointment(editingAppointment.id)}
              >
                <Check className="h-4 w-4 mr-1" />
                Hoàn thành
              </Button>
            )}
          </div>
        )}
        <Button onClick={handleAddAppointment}>
          {editingAppointment ? "Cập nhật" : "Thêm"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default AppointmentForm;
