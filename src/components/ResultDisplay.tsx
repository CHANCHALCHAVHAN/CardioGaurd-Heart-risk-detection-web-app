
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface PredictionResult {
  prediction: number;
  prediction_probability: number;
  feature_importance: Record<string, number>;
}

interface ResultDisplayProps {
  result: PredictionResult | null;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  if (!result) return null;
  
  const predictionPercentage = Math.round(result.prediction_probability * 100);
  const isHighRisk = result.prediction === 1;
  
  // Sort features by importance
  const sortedFeatures = Object.entries(result.feature_importance)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5 features
  
  const featureLabels: Record<string, string> = {
    age: "Age",
    sex: "Sex",
    cp: "Chest Pain Type",
    trestbps: "Resting Blood Pressure",
    chol: "Cholesterol",
    fbs: "Fasting Blood Sugar",
    restecg: "Resting ECG",
    thalach: "Max Heart Rate",
    exang: "Exercise Induced Angina",
    oldpeak: "ST Depression",
    slope: "ST Slope",
    ca: "Number of Major Vessels",
    thal: "Thalassemia"
  };
  
  const riskLevel = () => {
    if (isHighRisk) {
      if (predictionPercentage > 80) return "Very High";
      if (predictionPercentage > 60) return "High";
      return "Moderate to High";
    } else {
      if (predictionPercentage > 80) return "Very Low";
      if (predictionPercentage > 60) return "Low";
      return "Low to Moderate";
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto shadow-lg ${
      isHighRisk ? "bg-red-50" : "bg-green-50"
    } bg-opacity-80 backdrop-blur-sm`}>
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <Heart className={`h-6 w-6 ${
            isHighRisk ? "text-red-500" : "text-green-500"
          }`} />
          <CardTitle className="text-2xl">Prediction Results</CardTitle>
        </div>
        <CardDescription>
          Based on the information you provided
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-xl font-medium mb-2">Risk Level: {riskLevel()}</div>
          <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full ${
                isHighRisk ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${predictionPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {isHighRisk 
              ? `${predictionPercentage}% likelihood of heart disease`
              : `${predictionPercentage}% likelihood of no heart disease`
            }
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Key Factors:</h3>
          <ul className="space-y-1">
            {sortedFeatures.map(([feature, importance]) => (
              <li key={feature} className="text-sm flex justify-between">
                <span>{featureLabels[feature] || feature}</span>
                <span className="font-medium">{Math.round(importance * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-gray-600 mb-4 text-center">
            {isHighRisk 
              ? "Please consult with a healthcare professional for a comprehensive evaluation."
              : "Continue your healthy lifestyle. Regular check-ups are still recommended."
            }
          </p>
          <Button 
            onClick={onReset} 
            className="w-full bg-medical-blue-dark hover:bg-blue-500"
          >
            Start New Prediction
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
