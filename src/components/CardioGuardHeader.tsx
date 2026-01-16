
import React from "react";
import { Heart } from "lucide-react";

const CardioGuardHeader = () => {
  return (
    <div className="absolute top-4 left-4 flex items-center space-x-2 z-20">
      <h1 className="text-2xl md:text-3xl font-bold text-red-500 animate-pulse tracking-wide" 
          style={{ 
            textShadow: "0 0 10px rgba(234, 56, 76, 0.7), 0 0 20px rgba(234, 56, 76, 0.5)" 
          }}>
        CARDIO-GUARD
      </h1>
      <Heart className="h-6 w-6 text-red-500 animate-pulse" fill="#ea384c" />
    </div>
  );
};

export default CardioGuardHeader;
