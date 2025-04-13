
import React from "react";
import { HeartPulse } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Customer } from "@/types/customer";

interface HealthInfoProps {
  customer: Customer;
}

const HealthInfo: React.FC<HealthInfoProps> = ({ customer }) => {
  return (
    <div className="bg-white rounded-lg p-4 border">
      <div className="flex items-center mb-3">
        <HeartPulse className="h-5 w-5 text-primary mr-2" />
        <h3 className="font-medium">Thông tin sức khỏe</h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="medical">
          <AccordionTrigger className="text-sm py-2">Tiền sử y tế</AccordionTrigger>
          <AccordionContent>
            {customer.medicalHistory ? (
              <ul className="text-xs space-y-1 text-gray-600">
                <li className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${customer.medicalHistory.hasHeartIssues ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  <span>Vấn đề tim mạch: {customer.medicalHistory.hasHeartIssues ? 'Có' : 'Không'}</span>
                </li>
                <li className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${customer.medicalHistory.hasDiabetes ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  <span>Tiểu đường: {customer.medicalHistory.hasDiabetes ? 'Có' : 'Không'}</span>
                </li>
                <li className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${customer.medicalHistory.hasAsthma ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  <span>Hen suyễn: {customer.medicalHistory.hasAsthma ? 'Có' : 'Không'}</span>
                </li>
                {customer.medicalHistory.otherConditions && (
                  <li className="mt-1">
                    <span className="font-medium">Ghi chú khác:</span> {customer.medicalHistory.otherConditions}
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-xs italic">Không có thông tin y tế</p>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="allergies">
          <AccordionTrigger className="text-sm py-2">Dị ứng</AccordionTrigger>
          <AccordionContent>
            {customer.allergies ? (
              <ul className="text-xs space-y-1 text-gray-600">
                {customer.allergies.hasFoodAllergies && (
                  <li>
                    <span className="font-medium">Thực phẩm:</span> {customer.allergies.foodAllergies}
                  </li>
                )}
                {customer.allergies.hasMedicationAllergies && (
                  <li>
                    <span className="font-medium">Thuốc:</span> {customer.allergies.medicationAllergies}
                  </li>
                )}
                {customer.allergies.hasEnvironmentalAllergies && (
                  <li>
                    <span className="font-medium">Môi trường:</span> {customer.allergies.environmentalAllergies}
                  </li>
                )}
                {!customer.allergies.hasFoodAllergies && 
                !customer.allergies.hasMedicationAllergies && 
                !customer.allergies.hasEnvironmentalAllergies && (
                  <li className="italic">Không có dị ứng</li>
                )}
              </ul>
            ) : (
              <p className="text-xs italic">Không có thông tin dị ứng</p>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="diet">
          <AccordionTrigger className="text-sm py-2">Chế độ ăn</AccordionTrigger>
          <AccordionContent>
            <div className="text-xs space-y-1 text-gray-600">
              <p>
                <span className="font-medium">Loại chế độ ăn:</span> {customer.dietType === 'regular' ? 'Thông thường' : 
                  customer.dietType === 'vegetarian' ? 'Chay' : 
                  customer.dietType === 'vegan' ? 'Thuần chay' : 
                  customer.dietType === 'keto' ? 'Keto' : 
                  customer.dietType === 'paleo' ? 'Paleo' : customer.dietType}
              </p>
              {customer.dietDetails && (
                <p className="mt-1">
                  <span className="font-medium">Chi tiết:</span> {customer.dietDetails}
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HealthInfo;
