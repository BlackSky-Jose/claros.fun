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
        left: `${x - size / 4}px`,
        top: `${y - size / 4}px`,
        width: `${size/3}px`,
        height: `${size/3}px`,
        zIndex: 5,
      }}
    >
      <div
        className="w-full h-full rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255, 102, 0, 0.12) 0%, rgba(255, 149, 0, 0.26) 20%, rgba(255, 200, 0, 0.5) 40%, rgba(200, 50, 0, 0.22) 60%,rgba(100, 0, 0, 0.23)) 80%, rgba(0, 0, 0, 0.06) 100%)',
          animation: 'fogExpand 0.8s ease-out forwards',
          filter: 'blur(0.5px)',
          boxShadow: '0 0 30px rgba(255, 102, 0, 0.15), 0 0 60px rgba(255, 150, 0, 0.5), 0 0 90px rgba(255, 200, 0, 0.2)',
        }}
      />
      <div
        className="absolute inset-0 w-full h-full rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 0, 0.31) 0%, rgba(255, 102, 0, 0.07) 30%, rgba(200, 50, 0, 0.14) 60%, rgba(100, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.1) 100%)',
          animation: 'fogExpand 0.8s ease-out forwards',
          filter: 'blur(1px)',
          transform: 'scale(1.2)',
        }}
      />
      {/* Fire explosion particles */} 
      <div 
        className="absolute inset-0 w-full h-full rounded-full opacity-40" 
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 255, 0, 0.12) 0%, rgba(255, 149, 0, 0.23) 25%, rgba(255, 51, 0, 0.2) 50%, rgba(150, 0, 0, 0.13) 75%, rgba(0, 0, 0, 0.24) 100%)',
          animation: 'fogExpand 0.8s ease-out forwards',
          filter: 'blur(1.5px)',
          transform: 'scale(1.5)',
        }}
      />
    </div>
  );
};

export default FogEffect;
