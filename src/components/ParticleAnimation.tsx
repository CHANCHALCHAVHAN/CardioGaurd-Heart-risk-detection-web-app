
import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const ParticleAnimation = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const colors = [
      "rgba(211, 228, 253, 0.7)", // Light blue
      "rgba(242, 252, 226, 0.7)", // Light green
      "rgba(255, 222, 226, 0.7)", // Light pink
      "rgba(51, 195, 240, 0.4)",  // Medical blue
    ];
    
    const createParticle = () => {
      const id = Date.now() + Math.random();
      const size = Math.floor(Math.random() * 4) + 2; // 2-6px
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const speedX = (Math.random() - 0.5) * 0.5;
      const speedY = Math.random() * -0.5 - 0.1; // Move upward slowly
      const opacity = Math.random() * 0.5 + 0.1;
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      const newParticle: Particle = {
        id,
        x,
        y, 
        size,
        speedX,
        speedY,
        opacity,
        color: colors[colorIndex]
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Remove particle after animation duration
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, 8000);
    };
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
      createParticle();
    }
    
    // Create new particles periodically
    const intervalId = setInterval(createParticle, 200);
    
    // Animation loop to move particles
    let animationId: number;
    const moveParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          opacity: particle.y < 0 ? particle.opacity - 0.01 : particle.opacity,
        }))
      );
      animationId = requestAnimationFrame(moveParticles);
    };
    
    animationId = requestAnimationFrame(moveParticles);
    
    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleAnimation;
