import React, { useState, useEffect } from 'react';

interface FogEffectProps {
  x: number;
  y: number;
  size: number;
  duration?: number;
  onComplete: () => void;
}

const FogEffect: React.FC<FogEffectProps> = ({ x, y, size, duration = 2000, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the fog after the specified duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x - size /5}px`,
        top: `${y - size / 4}px`,
        width: `${size/3}px`,
        height: `${size/3}px`,
        zIndex: 5,
      }}
    >
      {/* Central explosion flash */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 100, 100, 0.8) 20%, rgba(255, 200, 0, 0.6) 40%, rgba(255, 50, 50, 0.4) 60%, transparent 80%)',
          animation: 'explosionFlash 0.6s ease-out forwards',
          filter: 'blur(0px)',
          boxShadow: '0 0 20px rgba(255, 100, 100, 0.8), 0 0 40px rgba(255, 200, 0, 0.6), 0 0 60px rgba(255, 50, 50, 0.4)',
        }}
      />
      
      {/* Outer explosion ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(255, 150, 0, 0.3) 30%, rgba(255, 50, 50, 0.2) 60%, transparent 80%)',
          animation: 'explosionRing 0.8s ease-out forwards',
          filter: 'blur(1px)',
          transform: 'scale(1.5)',
        }}
      />
      
      {/* Fire explosion core */}
      <div 
        className="absolute inset-0 rounded-full" 
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 200, 0, 0.9) 25%, rgba(255, 100, 0, 0.7) 50%, rgba(255, 0, 0, 0.5) 75%, transparent 100%)',
          animation: 'explosionCore 0.4s ease-out forwards',
          filter: 'blur(0.5px)',
          transform: 'scale(0.8)',
        }}
      />
      
      {/* Explosion particles */}
      <div 
        className="absolute inset-0 rounded-full" 
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 150, 0, 0.4) 20%, rgba(255, 50, 50, 0.3) 40%, rgba(255, 0, 0, 0.2) 60%, transparent 80%)',
          animation: 'explosionParticles 1s ease-out forwards',
          filter: 'blur(2px)',
          transform: 'scale(2)',
        }}
      />
      
      <style jsx>{`
        @keyframes explosionFlash {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes explosionRing {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        
        @keyframes explosionCore {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes explosionParticles {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FogEffect;
