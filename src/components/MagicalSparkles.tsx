import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  life: number;
  maxLife: number;
}

interface MagicalSparklesProps {
  x: number;
  y: number;
  size: number;
  isActive: boolean;
}

const MagicalSparkles: React.FC<MagicalSparklesProps> = ({ x, y, size, isActive }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const createSparkle = (): Sparkle => ({
      id: Math.random().toString(36).substr(2, 9),
      x: x + (Math.random() - 0.5) * size,
      y: y + (Math.random() - 0.5) * size,
      size: Math.random() * 6 + 2,
      rotation: Math.random() * 360,
      life: 0,
      maxLife: 60,
    });

    const interval = setInterval(() => {
      setSparkles(prev => {
        // Only add new sparkle if we have less than 5 sparkles
        const newSparkles = prev.length < 5 ? [...prev, createSparkle()] : prev;
        return newSparkles
          .map(s => ({
            ...s,
            rotation: s.rotation + 10,
            life: s.life + 1,
          }))
          .filter(s => s.life < s.maxLife);
      });
    }, 300); // Reduced frequency from 100ms to 300ms

    return () => clearInterval(interval);
  }, [x, y, size, isActive]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            transform: `rotate(${sparkle.rotation}deg)`,
            opacity: 1 - (sparkle.life / sparkle.maxLife),
            zIndex: 10,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full animate-pulse" 
               style={{
                 boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700',
               }} />
        </div>
      ))}
    </div>
  );
};

export default MagicalSparkles;
