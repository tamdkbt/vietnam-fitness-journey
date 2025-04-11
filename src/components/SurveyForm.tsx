
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
  Clock 
} from "lucide-react";

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

const SurveyForm = () => {
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

    if (step < 5) {
      setStep(step + 1);
    } else {
      // Submit the form
      toast.success("Cảm ơn bạn đã hoàn thành khảo sát!");
      console.log({
        personalInfo,
        goal,
        activityLevel,
        dietType,
        dietDetails,
        preferredTime,
      });
      // Reset form after submission
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
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-t-4 border-t-primary">
        <div className="px-4 pt-4">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className={`w-1/5 px-1 ${
                  item !== 5 ? "flex items-center" : ""
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
            {step === 5 ? (
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
