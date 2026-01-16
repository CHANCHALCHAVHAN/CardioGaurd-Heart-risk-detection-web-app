
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Butterfly {
  id: number;
  size: number;
  left: string;
  top: string;
  color: string;
  duration: number;
  delay: number;
  isScattered: boolean;
  randomX: number;
  randomY: number;
}

const colors = [
  "text-medical-blue-dark",
  "text-medical-pink",
  "text-blue-400",
  "text-purple-300",
];

const ButterflyAnimation = () => {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  
  useEffect(() => {
    const createButterfly = () => {
      const id = Date.now();
      const size = Math.floor(Math.random() * 20) + 15; // 15-35px
      const left = `${Math.random() * 90}%`;
      const top = `${Math.random() * 90}%`;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const duration = Math.floor(Math.random() * 5) + 8; // 8-13s
      const delay = Math.random() * 2;
      
      const newButterfly: Butterfly = {
        id,
        size,
        left,
        top,
        color: colors[colorIndex],
        duration,
        delay,
        isScattered: false,
        randomX: Math.random() * 200 - 100,
        randomY: Math.random() * 200 - 100
      };
      
      setButterflies(prev => [...prev, newButterfly]);
      
      // Remove butterfly after animation duration + some buffer
      setTimeout(() => {
        setButterflies(prev => prev.filter(b => b.id !== id));
      }, (duration + delay + 2) * 1000);
    };
    
    // Create initial butterflies
    for (let i = 0; i < 8; i++) {
      createButterfly();
    }
    
    // Create new butterflies periodically
    const intervalId = setInterval(createButterfly, 3000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleButterflyClick = (id: number) => {
    setButterflies(prev => 
      prev.map(butterfly => 
        butterfly.id === id ? { ...butterfly, isScattered: true } : butterfly
      )
    );
    
    // Remove scattered butterfly after animation completes
    setTimeout(() => {
      setButterflies(prev => prev.filter(b => b.id !== id));
    }, 800);
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {butterflies.map(butterfly => (
        <div
          key={butterfly.id}
          onClick={() => handleButterflyClick(butterfly.id)}
          className={cn(
            "absolute pointer-events-auto cursor-pointer",
            butterfly.color,
            butterfly.isScattered ? "" : "animate-butterfly-float"
          )}
          style={{
            left: butterfly.left,
            top: butterfly.top,
            fontSize: `${butterfly.size}px`,
            animationDuration: `${butterfly.duration}s`,
            animationDelay: `${butterfly.delay}s`,
            ...(butterfly.isScattered && {
              '--random-x': `${butterfly.randomX}px`,
              '--random-y': `${butterfly.randomY}px`,
              animation: 'scatter 0.8s ease-out forwards',
            }),
          } as React.CSSProperties}
        >
          <span className={cn("inline-block", !butterfly.isScattered && "animate-wing-flap")}>
            &#x1F98B;
          </span>
        </div>
      ))}
    </div>
  );
};

export default ButterflyAnimation;
