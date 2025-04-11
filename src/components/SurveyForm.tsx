import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Target, 
  Activity, 
  Utensils, 
  Clock,
  Heart,
  Pill,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../pages/CustomerPage";

type PersonalInfo = {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
};

type TrainingGoal = "weight-loss" | "muscle-gain" | "general-health" | "endurance" | "";
type ActivityLevel = "sedentary" | "moderate" | "active" | "very-active" | "";
type DietType = "normal" | "diet" | "special" | "";
type PreferredTime = "morning" | "afternoon" | "evening" | "";

type MedicalHistory = {
  hasHeartIssues: boolean;
  hasDiabetes: boolean;
  hasAsthma: boolean;
  hasArthritis: boolean;
  hasHighBloodPressure: boolean;
  otherConditions: string;
};

type Allergies = {
  hasFoodAllergies: boolean;
  foodAllergies: string;
  hasMedicationAllergies: boolean;
  medicationAllergies: string;
  hasEnvironmentalAllergies: boolean;
  environmentalAllergies: string;
};

const SurveyForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });
  const [goal, setGoal] = useState<TrainingGoal>("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("");
  const [dietType, setDietType] = useState<DietType>("");
  const [dietDetails, setDietDetails] = useState("");
  const [preferredTime, setPreferredTime] = useState<PreferredTime>("");
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({
    hasHeartIssues: false,
    hasDiabetes: false,
    hasAsthma: false,
    hasArthritis: false,
    hasHighBloodPressure: false,
    otherConditions: "",
  });
  const [allergies, setAllergies] = useState<Allergies>({
    hasFoodAllergies: false,
    foodAllergies: "",
    hasMedicationAllergies: false,
    medicationAllergies: "",
    hasEnvironmentalAllergies: false,
    environmentalAllergies: "",
  });

  const nextStep = () => {
    if (step === 1) {
      if (!personalInfo.name || !personalInfo.age || !personalInfo.gender || !personalInfo.height || !personalInfo.weight) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return;
      }
      if (isNaN(Number(personalInfo.age)) || isNaN(Number(personalInfo.height)) || isNaN(Number(personalInfo.weight))) {
        toast.error("Tuổi, chiều cao và cân nặng phải là số");
        return;
      }
    } else if (step === 2 && !goal) {
      toast.error("Vui lòng chọn mục tiêu tập luyện");
      return;
    } else if (step === 3 && !activityLevel) {
      toast.error("Vui lòng chọn mức độ vận động");
      return;
    } else if (step === 4 && !dietType) {
      toast.error("Vui lòng chọn chế độ ăn uống");
      return;
    } else if (step === 5 && !preferredTime) {
      toast.error("Vui lòng chọn thời gian tập luyện");
      return;
    }

    if (step < 6) {
      setStep(step + 1);
    } else {
      const newCustomer: Customer = {
        id: Math.random().toString(36).substring(2, 9),
        name: personalInfo.name,
        age: Number(personalInfo.age),
        gender: personalInfo.gender,
        height: Number(personalInfo.height),
        weight: Number(personalInfo.weight),
        goal,
        activityLevel,
        dietType,
        dietDetails,
        preferredTime,
        medicalHistory,
        allergies,
        createdAt: new Date().toISOString(),
      };
      
      const storedCustomers = localStorage.getItem("customers");
      const customers = storedCustomers ? JSON.parse(storedCustomers) : [];
      
      customers.push(newCustomer);
      
      localStorage.setItem("customers", JSON.stringify(customers));
      
      toast.success("Cảm ơn bạn đã hoàn thành khảo sát!");
      
      setStep(1);
      setPersonalInfo({
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
      });
      setGoal("");
      setActivityLevel("");
      setDietType("");
      setDietDetails("");
      setPreferredTime("");
      setMedicalHistory({
        hasHeartIssues: false,
        hasDiabetes: false,
        hasAsthma: false,
        hasArthritis: false,
        hasHighBloodPressure: false,
        otherConditions: "",
      });
      setAllergies({
        hasFoodAllergies: false,
        foodAllergies: "",
        hasMedicationAllergies: false,
        medicationAllergies: "",
        hasEnvironmentalAllergies: false,
        environmentalAllergies: "",
      });
      
      navigate("/customers");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleMedicalHistoryChange = (condition: keyof MedicalHistory, value: boolean | string) => {
    setMedicalHistory({ ...medicalHistory, [condition]: value });
  };

  const handleAllergiesChange = (allergyType: keyof Allergies, value: boolean | string) => {
    setAllergies({ ...allergies, [allergyType]: value });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Thông tin cá nhân cơ bản
              </CardTitle>
              <CardDescription>
                Vui lòng cung cấp thông tin cá nhân để chúng tôi có thể tạo kế hoạch phù hợp nhất cho bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  name="name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Tuổi</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={personalInfo.age}
                  onChange={handlePersonalInfoChange}
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  value={personalInfo.gender}
                  onValueChange={(value) =>
                    setPersonalInfo({ ...personalInfo, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Chiều cao (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={personalInfo.height}
                  onChange={handlePersonalInfoChange}
                  placeholder="170"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Cân nặng (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={personalInfo.weight}
                  onChange={handlePersonalInfoChange}
                  placeholder="65"
                />
              </div>
            </CardContent>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Mục tiêu tập luyện
              </CardTitle>
              <CardDescription>
                Chọn mục tiêu chính của bạn để chúng tôi chuẩn bị kế hoạch phù hợp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={goal}
                onValueChange={(value) => setGoal(value as TrainingGoal)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="weight-loss" id="weight-loss" />
                  <Label htmlFor="weight-loss" className="flex-1 cursor-pointer">
                    Giảm cân
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                  <Label htmlFor="muscle-gain" className="flex-1 cursor-pointer">
                    Tăng cơ
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="general-health" id="general-health" />
                  <Label htmlFor="general-health" className="flex-1 cursor-pointer">
                    Cải thiện sức khỏe chung
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="endurance" id="endurance" />
                  <Label htmlFor="endurance" className="flex-1 cursor-pointer">
                    Nâng cao thể lực
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Mức độ vận động hiện tại
              </CardTitle>
              <CardDescription>
                Chọn mức độ vận động hiện tại của bạn để chúng tôi đề xuất cường độ phù hợp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={activityLevel}
                onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="sedentary" id="sedentary" />
                  <Label htmlFor="sedentary" className="flex-1 cursor-pointer">
                    Ít hoặc không vận động
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="flex-1 cursor-pointer">
                    Vận động vừa phải (1-3 lần/tuần)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="flex-1 cursor-pointer">
                    Vận động thường xuyên (4-6 lần/tuần)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="very-active" id="very-active" />
                  <Label htmlFor="very-active" className="flex-1 cursor-pointer">
                    Vận động cường độ cao (hàng ngày)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Chế độ ăn uống hiện tại
              </CardTitle>
              <CardDescription>
                Cho chúng tôi biết về chế độ ăn uống của bạn để lập kế hoạch dinh dưỡng phù hợp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={dietType}
                onValueChange={(value) => setDietType(value as DietType)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="flex-1 cursor-pointer">
                    Bình thường
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="diet" id="diet" />
                  <Label htmlFor="diet" className="flex-1 cursor-pointer">
                    Ăn kiêng
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="special" id="special" />
                  <Label htmlFor="special" className="flex-1 cursor-pointer">
                    Chế độ đặc biệt
                  </Label>
                </div>
              </RadioGroup>
              {(dietType === "diet" || dietType === "special") && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="dietDetails">Mô tả chi tiết</Label>
                  <Input
                    id="dietDetails"
                    value={dietDetails}
                    onChange={(e) => setDietDetails(e.target.value)}
                    placeholder="Chi tiết về chế độ ăn của bạn"
                  />
                </div>
              )}
            </CardContent>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Thời gian tập luyện mong muốn
              </CardTitle>
              <CardDescription>
                Chọn thời gian tập luyện phù hợp với lịch trình của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={preferredTime}
                onValueChange={(value) => setPreferredTime(value as PreferredTime)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="morning" id="morning" />
                  <Label htmlFor="morning" className="flex-1 cursor-pointer">
                    Buổi sáng (6:00 - 11:00)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="afternoon" id="afternoon" />
                  <Label htmlFor="afternoon" className="flex-1 cursor-pointer">
                    Buổi chiều (12:00 - 17:00)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value="evening" id="evening" />
                  <Label htmlFor="evening" className="flex-1 cursor-pointer">
                    Buổi tối (18:00 - 22:00)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Tiểu sử bệnh và dị ứng
              </CardTitle>
              <CardDescription>
                Thông tin này giúp chúng tôi điều chỉnh kế hoạch tập luyện an toàn và hiệu quả cho bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 bg-soft-purple/10 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-medium text-lg flex items-center gap-2 text-primary">
                    <Heart className="w-5 h-5" />
                    Tiểu sử bệnh
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="heart-issues" 
                        checked={medicalHistory.hasHeartIssues}
                        onCheckedChange={(checked) => 
                          handleMedicalHistoryChange("hasHeartIssues", Boolean(checked))
                        }
                      />
                      <Label htmlFor="heart-issues" className="cursor-pointer">Vấn đề tim mạch</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="diabetes" 
                        checked={medicalHistory.hasDiabetes}
                        onCheckedChange={(checked) => 
                          handleMedicalHistoryChange("hasDiabetes", Boolean(checked))
                        }
                      />
                      <Label htmlFor="diabetes" className="cursor-pointer">Tiểu đường</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="asthma" 
                        checked={medicalHistory.hasAsthma}
                        onCheckedChange={(checked) => 
                          handleMedicalHistoryChange("hasAsthma", Boolean(checked))
                        }
                      />
                      <Label htmlFor="asthma" className="cursor-pointer">Hen suyễn</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="arthritis" 
                        checked={medicalHistory.hasArthritis}
                        onCheckedChange={(checked) => 
                          handleMedicalHistoryChange("hasArthritis", Boolean(checked))
                        }
                      />
                      <Label htmlFor="arthritis" className="cursor-pointer">Viêm khớp</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="high-blood-pressure" 
                        checked={medicalHistory.hasHighBloodPressure}
                        onCheckedChange={(checked) => 
                          handleMedicalHistoryChange("hasHighBloodPressure", Boolean(checked))
                        }
                      />
                      <Label htmlFor="high-blood-pressure" className="cursor-pointer">Huyết áp cao</Label>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Label htmlFor="other-conditions">Tình trạng khác (nếu có)</Label>
                    <Textarea
                      id="other-conditions"
                      placeholder="Mô tả các vấn đề sức khỏe khác mà bạn đang gặp phải"
                      value={medicalHistory.otherConditions}
                      onChange={(e) => handleMedicalHistoryChange("otherConditions", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-accent/50 p-4 rounded-lg border border-secondary/20">
                  <h3 className="font-medium text-lg flex items-center gap-2 text-secondary">
                    <AlertTriangle className="w-5 h-5" />
                    Dị ứng
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id="food-allergies" 
                          checked={allergies.hasFoodAllergies}
                          onCheckedChange={(checked) => 
                            handleAllergiesChange("hasFoodAllergies", Boolean(checked))
                          }
                        />
                        <Label htmlFor="food-allergies" className="font-medium cursor-pointer">Dị ứng thực phẩm</Label>
                      </div>
                      
                      {allergies.hasFoodAllergies && (
                        <Input
                          id="food-allergies-details"
                          placeholder="Ví dụ: hải sản, lạc, đậu nành..."
                          value={allergies.foodAllergies}
                          onChange={(e) => handleAllergiesChange("foodAllergies", e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id="medication-allergies" 
                          checked={allergies.hasMedicationAllergies}
                          onCheckedChange={(checked) => 
                            handleAllergiesChange("hasMedicationAllergies", Boolean(checked))
                          }
                        />
                        <Label htmlFor="medication-allergies" className="font-medium cursor-pointer">Dị ứng thuốc</Label>
                      </div>
                      
                      {allergies.hasMedicationAllergies && (
                        <Input
                          id="medication-allergies-details"
                          placeholder="Ví dụ: penicillin, aspirin..."
                          value={allergies.medicationAllergies}
                          onChange={(e) => handleAllergiesChange("medicationAllergies", e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id="environmental-allergies" 
                          checked={allergies.hasEnvironmentalAllergies}
                          onCheckedChange={(checked) => 
                            handleAllergiesChange("hasEnvironmentalAllergies", Boolean(checked))
                          }
                        />
                        <Label htmlFor="environmental-allergies" className="font-medium cursor-pointer">Dị ứng môi trường</Label>
                      </div>
                      
                      {allergies.hasEnvironmentalAllergies && (
                        <Input
                          id="environmental-allergies-details"
                          placeholder="Ví dụ: phấn hoa, lông thú cưng, bụi..."
                          value={allergies.environmentalAllergies}
                          onChange={(e) => handleAllergiesChange("environmentalAllergies", e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white/70 p-3 rounded-lg mt-4 border border-secondary/10">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Pill className="h-4 w-4 text-secondary" />
                      Thông tin này giúp chúng tôi điều chỉnh chế độ dinh dưỡng phù hợp với bạn
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-t-4 border-t-primary">
        <div className="px-4 pt-4">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className={`w-1/6 px-1 ${
                  item !== 6 ? "flex items-center" : ""
                }`}
              >
                <div
                  className={`w-full h-2 rounded-full ${
                    item <= step
                      ? "bg-primary"
                      : "bg-gray-200"
                  }`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-1 text-xs text-gray-500 mb-4">
            <span className={step >= 1 ? "text-primary font-medium" : ""}>Thông tin</span>
            <span className={step >= 2 ? "text-primary font-medium" : ""}>Mục tiêu</span>
            <span className={step >= 3 ? "text-primary font-medium" : ""}>Vận động</span>
            <span className={step >= 4 ? "text-primary font-medium" : ""}>Dinh dưỡng</span>
            <span className={step >= 5 ? "text-primary font-medium" : ""}>Lịch trình</span>
            <span className={step >= 6 ? "text-primary font-medium" : ""}>Sức khỏe</span>
          </div>
        </div>
        
        {renderStepContent()}
        
        <CardFooter className="flex justify-between pt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={nextStep}>
            {step === 6 ? (
              <>
                Hoàn thành
                <Check className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Tiếp theo
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SurveyForm;
