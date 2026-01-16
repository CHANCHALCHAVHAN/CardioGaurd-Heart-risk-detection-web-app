
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ResultChartProps {
  featureImportance: Record<string, number> | null;
}

const featureLabels: Record<string, string> = {
  age: "Age",
  sex: "Sex",
  cp: "Chest Pain Type",
  trestbps: "Blood Pressure",
  chol: "Cholesterol",
  fbs: "Blood Sugar",
  restecg: "Resting ECG",
  thalach: "Max Heart Rate",
  exang: "Exercise Angina",
  oldpeak: "ST Depression",
  slope: "ST Slope",
  ca: "Major Vessels",
  thal: "Thalassemia",
};

const ResultChart: React.FC<ResultChartProps> = ({ featureImportance }) => {
  if (!featureImportance) return null;

  // Format data for the chart
  const chartData = Object.entries(featureImportance)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8) // Top 8 features
    .map(([feature, importance]) => ({
      name: featureLabels[feature] || feature,
      importance: Math.round(importance * 100),
    }));

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-center text-medical-blue-dark">
          Feature Importance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" unit="%" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip formatter={(value) => [`${value}%`, 'Importance']} />
              <Bar
                dataKey="importance"
                fill="#33C3F0"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultChart;
