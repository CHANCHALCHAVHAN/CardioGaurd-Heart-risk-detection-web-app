
// This is a frontend client for our Python API
// In a real app, you would replace this with actual API calls

import { toast } from "sonner";

// Mock data for feature importance
const mockFeatureImportance = {
  age: 0.15,
  sex: 0.08,
  cp: 0.23,
  trestbps: 0.09,
  chol: 0.12,
  fbs: 0.05,
  restecg: 0.03,
  thalach: 0.18,
  exang: 0.07,
  oldpeak: 0.10,
  slope: 0.06,
  ca: 0.11,
  thal: 0.09,
};

// In a real application, this would be replaced with actual API calls
// to a Python backend with NumPy, Pandas, and SciPy
export async function predictHeartDisease(formData: any) {
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple prediction logic for demonstration
    const risk = calculateRisk(formData);
    
    // Simulate a random prediction with bias from risk
    const prediction = risk > 0.6 ? 1 : 0;
    const predictionProbability = prediction === 1 
      ? 0.5 + (Math.random() * 0.5) // 50-100% for positive prediction
      : Math.random() * 0.5; // 0-50% for negative prediction
    
    return {
      prediction: prediction,
      prediction_probability: prediction === 1 ? predictionProbability : 1 - predictionProbability,
      feature_importance: mockFeatureImportance
    };
  } catch (error) {
    console.error("Error in prediction service:", error);
    toast.error("Failed to process prediction. Please try again.");
    throw error;
  }
}

// Simple risk calculation for demonstration
function calculateRisk(formData: any) {
  let risk = 0;
  
  // Age factor (higher age = higher risk)
  risk += Math.min((formData.age - 30) * 0.01, 0.3);
  
  // Sex factor
  if (formData.sex === "male") risk += 0.1;
  
  // Blood pressure factor
  if (formData.trestbps > 130) {
    risk += Math.min((formData.trestbps - 130) * 0.005, 0.15);
  }
  
  // Cholesterol factor
  if (formData.chol > 200) {
    risk += Math.min((formData.chol - 200) * 0.001, 0.2);
  }
  
  // Chest pain factor
  if (formData.cp === "0") risk += 0.15;
  if (formData.cp === "1") risk += 0.1;
  if (formData.cp === "2") risk += 0.05;
  
  // Fasting blood sugar factor
  if (formData.fbs === "1") risk += 0.1;
  
  // Max heart rate factor (lower max heart rate can indicate issues)
  const predictedMaxHR = 220 - formData.age;
  if (formData.thalach < predictedMaxHR * 0.7) {
    risk += 0.15;
  }
  
  return Math.min(risk, 0.95); // Cap at 95%
}
