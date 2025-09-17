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
        left: `${x - size / 6}px`,
        top: `${y - size / 5}px`,
        width: `${size/5}px`,
        height: `${size/5}px`,
        zIndex: 5,
      }}
    >
      <div
        className="w-full h-full rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(223, 220, 219, 0.04) 0%, rgba(97, 97, 97, 0.14) 20%, rgba(247, 247, 247, 0.13) 40%, rgba(51, 51, 51, 0.04) 60%,rgba(241, 241, 241, 0.05)) 80%, rgba(226, 223, 223, 0.06) 100%)',
          animation: 'fogExpand 0.8s ease-out forwards',
          filter: 'blur(0.5px)',
          boxShadow: '0 0 30px rgba(92, 91, 91, 0.05), 0 0 60px rgba(82, 82, 82, 0.11), 0 0 90px rgba(102, 102, 102, 0.1)',
        }}
      />
      <div
        className="absolute inset-0 w-full h-full rounded-full opacity-3"
        style={{
          background: 'radial-gradient(circle, rgba(77, 77, 77, 0.11) 0%rgba(54, 54, 54, 0.07)7) 30%, rgba(202, 202, 202, 0.09) 60%, rgba(97, 97, 97, 0.18) 80%, rgba(255, 229, 229, 0.1) 100%)',
          animation: 'fogExpand 0.8s ease-out forwards',
          filter: 'blur(1px)',
          transform: 'scale(1)',
        }}
      />
      {/* Fire explosion particles */} 
      <div 
        className="absolute inset-0 w-full h-full rounded-full opacity-10" 
        style={{ 
          background: 'radial-gradient(circle, rgba(112, 112, 112, 0.03) 0%, rgba(158, 158, 158, 0.07) 25%, rgba(99, 99, 99, 0.11) 50%, rgba(241, 241, 241, 0.13) 75%, rgba(252, 251, 219, 0.14) 100%)',
          animation: 'fogExpand 0.8s ease-out forwards',
          filter: 'blur(1.5px)',
          transform: 'scale(1.2)',
        }}
      />
    </div>
  );
};

export default FogEffect;
