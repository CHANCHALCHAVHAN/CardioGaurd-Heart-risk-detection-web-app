
import React, { useState } from "react";
import PredictionForm from "@/components/PredictionForm";
import ParticleAnimation from "@/components/ParticleAnimation";
import CardioGuardHeader from "@/components/CardioGuardHeader";
import ResultDisplay from "@/components/ResultDisplay";
import ResultChart from "@/components/ResultChart";
import { predictHeartDisease } from "@/services/predictionService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const result = await predictHeartDisease(formData);
      setPredictionResult(result);
      setShowResults(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setShowResults(false);
    setPredictionResult(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      {/* Animation Layer */}
      <ParticleAnimation />
      
      {/* Cardio-Guard Header */}
      <CardioGuardHeader />
      
      {/* Content */}
      <div className="container max-w-6xl mx-auto py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto pt-12">
          {!showResults ? (
            <div className="flex flex-col items-center">
              <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
              <div className="mt-8 text-center max-w-md mx-auto">
                <p className="text-sm text-gray-500">
                  This application uses machine learning with NumPy, Pandas, and SciPy
                  for accurate predictions. All data stays in your browser.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              <Tabs defaultValue="results" className="max-w-md mx-auto">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="results">Prediction Results</TabsTrigger>
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                </TabsList>
                <TabsContent value="results">
                  <ResultDisplay 
                    result={predictionResult} 
                    onReset={handleReset}
                  />
                </TabsContent>
                <TabsContent value="visualization">
                  <ResultChart 
                    featureImportance={predictionResult?.feature_importance} 
                  />
                  <div className="mt-4 text-center">
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="mx-auto"
                    >
                      Start New Prediction
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="text-center max-w-md mx-auto">
                <p className="text-sm text-gray-600">
                  Remember, this prediction is for informational purposes only and
                  does not replace professional medical advice.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <footer className="text-center text-gray-500 py-8 relative z-10">
        <div className="container mx-auto">
          <p className="text-sm">
            A heart disease prediction system with calming animations.
          </p>
          <p className="text-xs mt-2">
            Built with Python, NumPy, Pandas, SciPy, and React.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
