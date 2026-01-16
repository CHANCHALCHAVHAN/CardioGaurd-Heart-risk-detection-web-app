
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Bubble {
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
  "bg-medical-blue opacity-60",
  "bg-medical-blue-dark opacity-40",
  "bg-medical-green opacity-50",
  "bg-medical-pink opacity-30",
];

const BubbleAnimation = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
  useEffect(() => {
    const createBubble = () => {
      const id = Date.now();
      const size = Math.floor(Math.random() * 50) + 20; // 20-70px
      const left = `${Math.random() * 90}%`;
      const top = `${Math.random() * 90}%`;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const duration = Math.floor(Math.random() * 5) + 5; // 5-10s
      const delay = Math.random() * 2;
      
      const newBubble: Bubble = {
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
      
      setBubbles(prev => [...prev, newBubble]);
      
      // Remove bubble after animation duration + some buffer
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== id));
      }, (duration + delay + 2) * 1000);
    };
    
    // Create initial bubbles
    for (let i = 0; i < 10; i++) {
      createBubble();
    }
    
    // Create new bubbles periodically
    const intervalId = setInterval(createBubble, 2000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleBubbleClick = (id: number) => {
    setBubbles(prev => 
      prev.map(bubble => 
        bubble.id === id ? { ...bubble, isScattered: true } : bubble
      )
    );
    
    // Remove scattered bubble after animation completes
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 800);
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          onClick={() => handleBubbleClick(bubble.id)}
          className={cn(
            "rounded-full absolute pointer-events-auto cursor-pointer",
            bubble.color,
            bubble.isScattered ? "" : "animate-float"
          )}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: bubble.left,
            top: bubble.top,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            ...(bubble.isScattered && {
              '--random-x': `${bubble.randomX}px`,
              '--random-y': `${bubble.randomY}px`,
              animation: 'scatter 0.8s ease-out forwards',
            }),
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default BubbleAnimation;
