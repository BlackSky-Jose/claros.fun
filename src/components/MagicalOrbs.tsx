import React, { useEffect, useState } from 'react';

interface Orb {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
  pulse: number;
}

const MagicalOrbs: React.FC = () => {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const createOrb = (): Orb => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 50,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
      speed: Math.random() * 0.5 + 0.1,
      direction: Math.random() * Math.PI * 2,
      pulse: Math.random() * Math.PI * 2,
    });

    // Create initial orbs
    const initialOrbs = Array.from({ length: 8 }, createOrb);
    setOrbs(initialOrbs);

    const interval = setInterval(() => {
      setOrbs(prev => 
        prev.map(orb => {
          let newDirection = orb.direction;
          
          // Bounce off horizontal edges
          if (orb.x <= 0 || orb.x >= window.innerWidth) {
            newDirection = Math.PI - newDirection;
          }
          
          // Bounce off vertical edges
          if (orb.y <= 0 || orb.y >= window.innerHeight) {
            newDirection = -newDirection;
          }
          
          return {
            ...orb,
            x: orb.x + Math.cos(orb.direction) * orb.speed,
            y: orb.y + Math.sin(orb.direction) * orb.speed,
            pulse: orb.pulse + 0.02,
            direction: newDirection,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${orb.x}px`,
            top: `${orb.y}px`,
            width: `${orb.size + Math.sin(orb.pulse) * 20}px`,
            height: `${orb.size + Math.sin(orb.pulse) * 20}px`,
            background: `radial-gradient(circle, ${orb.color}40, transparent)`,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </div>
  );
};

export default MagicalOrbs;
