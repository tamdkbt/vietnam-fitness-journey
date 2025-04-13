
import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Customer } from "@/types/customer";

interface HealthIndicatorsProps {
  customer: Customer;
}

export const HealthConcernsIndicator: React.FC<HealthIndicatorsProps> = ({ customer }) => {
  const { medicalHistory } = customer;
  
  // Check if medicalHistory exists before accessing its properties
  if (!medicalHistory) return null;
  
  const hasMedicalConcerns = 
    medicalHistory.hasHeartIssues || 
    medicalHistory.hasDiabetes || 
    medicalHistory.hasAsthma || 
    medicalHistory.hasArthritis || 
    medicalHistory.hasHighBloodPressure || 
    (medicalHistory.otherConditions && medicalHistory.otherConditions.length > 0);
  
  if (!hasMedicalConcerns) return null;
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="ml-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-1">
          <p className="font-semibold text-amber-500">Vấn đề sức khỏe cần lưu ý:</p>
          <ul className="text-xs list-disc pl-4">
            {medicalHistory.hasHeartIssues && <li>Vấn đề tim mạch</li>}
            {medicalHistory.hasDiabetes && <li>Tiểu đường</li>}
            {medicalHistory.hasAsthma && <li>Hen suyễn</li>}
            {medicalHistory.hasArthritis && <li>Viêm khớp</li>}
            {medicalHistory.hasHighBloodPressure && <li>Huyết áp cao</li>}
            {medicalHistory.otherConditions && <li>{medicalHistory.otherConditions}</li>}
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export const AllergiesIndicator: React.FC<HealthIndicatorsProps> = ({ customer }) => {
  const { allergies } = customer;
  
  // Check if allergies exists before accessing its properties
  if (!allergies) return null;
  
  const hasAllergies = 
    (allergies.hasFoodAllergies && allergies.foodAllergies) || 
    (allergies.hasMedicationAllergies && allergies.medicationAllergies) || 
    (allergies.hasEnvironmentalAllergies && allergies.environmentalAllergies);
  
  if (!hasAllergies) return null;
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="ml-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-1">
          <p className="font-semibold text-red-500">Dị ứng cần lưu ý:</p>
          <ul className="text-xs list-disc pl-4">
            {allergies.hasFoodAllergies && <li>Thực phẩm: {allergies.foodAllergies}</li>}
            {allergies.hasMedicationAllergies && <li>Thuốc: {allergies.medicationAllergies}</li>}
            {allergies.hasEnvironmentalAllergies && <li>Môi trường: {allergies.environmentalAllergies}</li>}
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
