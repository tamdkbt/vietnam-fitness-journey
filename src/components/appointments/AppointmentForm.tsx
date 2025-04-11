
import React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { X, Check } from "lucide-react";
import { APPOINTMENT_TYPES, HOURS, Appointment } from "../../types/appointment";
import { Customer } from "../../pages/CustomerPage";

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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="time" className="text-right">
            Thời gian
          </Label>
          <Select
            value={newAppointment.time}
            onValueChange={(value) =>
              setNewAppointment({ ...newAppointment, time: value })
            }
          >
            <SelectTrigger className="col-span-3">
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Tên khách hàng
          </Label>
          {selectedCustomer ? (
            <Input
              id="name"
              value={selectedCustomer.name}
              className="col-span-3 bg-gray-50"
              readOnly
            />
          ) : (
            <Input
              id="name"
              value={newAppointment.name}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, name: e.target.value })
              }
              className="col-span-3"
            />
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Loại dịch vụ
          </Label>
          <Select
            value={newAppointment.type}
            onValueChange={(value) =>
              setNewAppointment({ ...newAppointment, type: value })
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Chọn loại dịch vụ" />
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
