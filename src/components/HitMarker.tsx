import React, { useEffect, useState } from 'react';

interface HitMarkerProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const HitMarker: React.FC<HitMarkerProps> = ({ x, y, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the hitmarker after a short duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 300); // Show for 300ms

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        // rotate: '45deg',
        left: `${x - 50}px`, // Center the 80px hitmarker
        top: `${y - 40}px`,
        width: '80px',
        height: '80px',
        zIndex: 2000,
      }}
    >
      <div
        className="absolute"
        style={{
          width: '80px',
          height: '80px',
          animation: 'hitmarkerPulse 0.3s ease-out forwards',
        }}
      >
        {/* Top-left to bottom-right diagonal bar */}
        <div
          className="absolute"
          style={{
            left: '20px',
            top: '20px',
            width: '40px',
            height: '8px',
            background: 'linear-gradient(45deg, #4ade80, #22c55e, #4ade80)',
            borderRadius: '4px',
            border: '1px solidrgb(11, 61, 7)',
            boxShadow: '0 0 15px rgba(74, 222, 128, 0.8), 0 0 25px rgba(34, 197, 94, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)',
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
          }}
        />
        {/* Top-right to bottom-left diagonal bar */}
        <div
          className="absolute"
          style={{
            left: '20px',
            top: '52px',
            width: '40px',
            height: '8px',
            background: 'linear-gradient(-45deg, #4ade80, #22c55e, #4ade80)',
            borderRadius: '4px',
            border: '1px solidrgb(2, 85, 20)',
            boxShadow: '0 0 15px rgba(74, 222, 128, 0.8), 0 0 25px rgba(34, 197, 94, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)',
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
          }}
        />
        {/* Top-right to bottom-left diagonal bar (second part) */}
        <div
          className="absolute"
          style={{
            left: '52px',
            top: '20px',
            width: '40px',
            height: '8px',
            background: 'linear-gradient(-45deg, #4ade80, #22c55e, #4ade80)',
            borderRadius: '4px',
            border: '1px solidrgb(23, 73, 3)',
            boxShadow: '0 0 15px rgba(74, 222, 128, 0.8), 0 0 25px rgba(34, 197, 94, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)',
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
          }}
        />
        {/* Top-left to bottom-right diagonal bar (second part) */}
        <div
          className="absolute"
          style={{
            left: '52px',
            top: '52px',
            width: '40px',
            height: '8px',
            background: 'linear-gradient(45deg, #4ade80, #22c55e, #4ade80)',
            borderRadius: '4px',
            border: '1px solidrgb(2, 78, 25)',
            boxShadow: '0 0 15px rgba(74, 222, 128, 0.8), 0 0 25px rgba(34, 197, 94, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)',
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes hitmarkerPulse {
          0% {
            transform: scale(0.3);
            opacity: 0;
            filter: brightness(2);
          }
          20% {
            transform: scale(1.3);
            opacity: 1;
            filter: brightness(1.5);
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
            filter: brightness(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
            filter: brightness(1);
          }
        }
      `}</style>
    </div>
  );
};

export default HitMarker;