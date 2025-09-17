import React, { useEffect, useState } from 'react';

interface ExplosionEffectProps {
  x: number;
  y: number;
  size: number;
  onComplete: () => void;
}

const ExplosionEffect: React.FC<ExplosionEffectProps> = ({ x, y, size, onComplete }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Create explosion particles
    const newParticles = [];
    const particleCount = 20;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed = Math.random() * 150 + 50;
      const particleSize = Math.random() * 8 + 4;
      const life = Math.random() * 30 + 20;
      
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        size: particleSize,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setParticles(newParticles);
    
    // Auto-remove after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    if (particles.length === 0) return;

    const animation = () => {
      setParticles(prev => {
        const updated = prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx * 0.016,
          y: particle.y + particle.vy * 0.016,
          vx: particle.vx * 0.98, // Friction
          vy: particle.vy * 0.98 + 0.5, // Gravity
          life: particle.life - 1,
        })).filter(particle => particle.life > 0);
        
        return updated;
      });
      
      requestAnimationFrame(animation);
    };
    
    requestAnimationFrame(animation);
  }, [particles.length]);

  return (
    <div className="absolute pointer-events-none" style={{ zIndex: 2000 }}>
      {particles.map(particle => {
        const alpha = particle.life / particle.maxLife;
        const scale = alpha;
        
        return (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${x + particle.x}px`,
              top: `${y + particle.y}px`,
              width: `${particle.size * scale}px`,
              height: `${particle.size * scale}px`,
              backgroundColor: particle.color,
              opacity: alpha,
              transform: `scale(${scale})`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        );
      })}
      
      {/* Central explosion flash */}
      <div
        className="absolute rounded-full"
        style={{
          left: `${x - size}px`,
          top: `${y - size}px`,
          width: `${size * 2}px`,
          height: `${size * 2}px`,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 100, 100, 0.6) 30%, transparent 70%)',
          animation: 'explosionFlash 0.3s ease-out',
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
      `}</style>
    </div>
  );
};

export default ExplosionEffect;
