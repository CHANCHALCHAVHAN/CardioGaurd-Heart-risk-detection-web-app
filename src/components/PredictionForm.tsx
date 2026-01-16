
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { HeartPulse } from "lucide-react";

interface FormData {
  age: number;
  sex: string;
  cp: string;
  trestbps: number;
  chol: number;
  fbs: string;
  restecg: string;
  thalach: number;
  exang: string;
  oldpeak: number;
  slope: string;
  ca: string;
  thal: string;
}

const initialFormData: FormData = {
  age: 45,
  sex: "male",
  cp: "1",
  trestbps: 120,
  chol: 200,
  fbs: "0",
  restecg: "0",
  thalach: 150,
  exang: "0",
  oldpeak: 0,
  slope: "1",
  ca: "0",
  thal: "3"
};

interface PredictionFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value === "" || value === undefined) {
          throw new Error(`Please fill in the ${key} field`);
        }
      });
      
      await onSubmit(formData);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-lg bg-white/25 border border-white/40 shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center gap-2 text-medical-blue-dark">
          <HeartPulse className="h-6 w-6" />
          <CardTitle className="text-2xl">Heart Health Predictor</CardTitle>
        </div>
        <CardDescription className="text-gray-700">
          Please enter your health metrics for prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="100"
                required
                className="bg-white/50 backdrop-blur-sm border-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select
                value={formData.sex}
                onValueChange={(value) => handleSelectChange("sex", value)}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trestbps">Resting Blood Pressure (mm Hg)</Label>
              <Input
                id="trestbps"
                name="trestbps"
                type="number"
                value={formData.trestbps}
                onChange={handleInputChange}
                min="80"
                max="200"
                required
                className="bg-white/50 backdrop-blur-sm border-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chol">Cholesterol (mg/dl)</Label>
              <Input
                id="chol"
                name="chol"
                type="number"
                value={formData.chol}
                onChange={handleInputChange}
                min="100"
                max="600"
                required
                className="bg-white/50 backdrop-blur-sm border-white/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fbs">Fasting Blood Sugar {`>`} 120 mg/dl</Label>
              <Select
                value={formData.fbs}
                onValueChange={(value) => handleSelectChange("fbs", value)}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="thalach">Max Heart Rate</Label>
              <Input
                id="thalach"
                name="thalach"
                type="number"
                value={formData.thalach}
                onChange={handleInputChange}
                min="60"
                max="220"
                required
                className="bg-white/50 backdrop-blur-sm border-white/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cp">Chest Pain Type</Label>
              <Select
                value={formData.cp}
                onValueChange={(value) => handleSelectChange("cp", value)}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Typical Angina</SelectItem>
                  <SelectItem value="1">Atypical Angina</SelectItem>
                  <SelectItem value="2">Non-anginal Pain</SelectItem>
                  <SelectItem value="3">Asymptomatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-medical-blue-dark hover:bg-blue-500 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Predict Heart Health"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
