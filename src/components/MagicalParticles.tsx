import React, { useEffect, useState } from 'react';

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
  life: number;
  maxLife: number;
}

const MagicalParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticle = (): Particle => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
      speed: Math.random() * 2 + 0.5,
      direction: Math.random() * Math.PI * 2,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    });

    const interval = setInterval(() => {
      setParticles(prev => {
        // Only add new particle if we have less than 15 particles
        const newParticles = prev.length < 15 ? [...prev, createParticle()] : prev;
        return newParticles
          .map(p => ({
            ...p,
            x: p.x + Math.cos(p.direction) * p.speed,
            y: p.y + Math.sin(p.direction) * p.speed,
            life: p.life + 1,
          }))
          .filter(p => p.life < p.maxLife);
      });
    }, 200); // Reduced frequency from 50ms to 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            opacity: 1 - (particle.life / particle.maxLife),
          }}
        />
      ))}
    </div>
  );
};

export default MagicalParticles;
