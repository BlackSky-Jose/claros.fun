import React, { useEffect, useState, useRef } from 'react';

interface Star {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkle: number;
  speed: number;
  layer: number; // 0: background, 1: mid, 2: foreground
  isApproaching?: boolean;
  approachProgress?: number; // 0 to 1
  maxSize?: number;
}

interface FallingStar {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number; // 0 to 1
  speed: number;
  size: number;
  opacity: number;
  trailLength: number;
  angle: number;
}

interface Nebula {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
  layer: number;
}

const SpaceEffect: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [nebulas, setNebulas] = useState<Nebula[]>([]);
  const [fallingStars, setFallingStars] = useState<FallingStar[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    // Create initial stars with different layers
    const createStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 250; i++) {
        const layer = Math.floor(Math.random() * 3);
        newStars.push({
          id: Math.random().toString(36).substr(2, 9),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * (layer === 0 ? 1 : layer === 1 ? 2 : 3) + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
          speed: (layer + 1) * 0.1, // Different speeds for parallax
          layer,
          isApproaching: false,
        });
      }
      return newStars;
    };

    // Create nebulas
    const createNebulas = () => {
      const newNebulas: Nebula[] = [];
      const colors = [
        'rgba(0, 0, 0, 0.3)',
        'rgba(20, 5, 40, 0.2)',
        'rgba(15, 8, 30, 0.25)',
        'rgba(25, 15, 45, 0.2)',
        'rgba(10, 20, 35, 0.15)',
      ];
      
      for (let i = 0; i < 8; i++) {
        const layer = Math.floor(Math.random() * 3);
        newNebulas.push({
          id: Math.random().toString(36).substr(2, 9),
          x: Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25,
          y: Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25,
          size: Math.random() * 400 + 200,
          opacity: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: (layer + 1) * 0.05,
          layer,
        });
      }
      return newNebulas;
    };

    setStars(createStars());
    setNebulas(createNebulas());

    // Create falling stars function
    const createFallingStar = (): FallingStar => {
      // Create more pronounced diagonal slash movement
      const isLeftToRight = Math.random() > 0.5; // Random direction
      
      let startX, startY, endX, endY;
      
      if (isLeftToRight) {
        // Forward slash / - starts from top-left, ends at bottom-right
        startX = -100; // Start from left side
        startY = -50;
        endX = window.innerWidth + 100; // End at right side
        endY = window.innerHeight * 0.5;
      } else {
        // Backslash \ - starts from top-right, ends at bottom-left
        startX = -100; // Start from left side
        startY = -50;
        endX = window.innerWidth + 100; // End at right side
        endY = window.innerHeight * 0.5;
      }
      
      const angle = Math.atan2(endY - startY, endX - startX);
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        startX,
        startY,
        endX,
        endY,
        progress: 0,
        speed: Math.random() * 0.005 + 0.001, // Random speed between 0.01 and 0.03
        size: Math.random() * 3 + 1, // Size between 1 and 4
        opacity: Math.random() * 0.8 + 0.2, // Opacity between 0.2 and 1
        trailLength: Math.random() * 100 + 80, // Trail length between 60 and 140 (longer)
        angle,
      };
    };

    // Animation loop for space movement
    const animate = () => {
      timeRef.current += 0.01;
      
      setStars(prev => {
        const updatedStars = prev.map(star => {
          if (star.isApproaching) {
            // Handle approaching stars
            const newProgress = (star.approachProgress || 0) + 0.008;
            const currentSize = (star.maxSize || 20) * newProgress;
            const currentOpacity = Math.min(1, newProgress * 2) * (Math.sin(star.twinkle) + 1) * 0.5 + 0.3;
            
            if (newProgress >= 1) {
              // Star has passed by, remove it
              return null;
            }
            
            return {
              ...star,
              approachProgress: newProgress,
              size: currentSize,
              opacity: currentOpacity,
              twinkle: star.twinkle + 0.05,
            };
          } else {
            // Handle regular drifting stars
            const newX = (star.x + star.speed * Math.cos(timeRef.current * 0.1)) % (window.innerWidth + 100);
            const newY = (star.y + star.speed * Math.sin(timeRef.current * 0.05)) % (window.innerHeight + 100);
            
            return {
              ...star,
              x: newX < -50 ? window.innerWidth + 50 : newX,
              y: newY < -50 ? window.innerHeight + 50 : newY,
              twinkle: star.twinkle + 0.02,
              opacity: (Math.sin(star.twinkle) + 1) * 0.4 + 0.2,
            };
          }
        }).filter(star => star !== null) as Star[];

        // Occasionally spawn approaching stars
        if (Math.random() < 0.02 && updatedStars.length < 300) {
          const approachingStar: Star = {
            id: Math.random().toString(36).substr(2, 9),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: 0.5,
            opacity: 0.1,
            twinkle: Math.random() * Math.PI * 2,
            speed: 0,
            layer: 3, // Special layer for approaching stars
            isApproaching: true,
            approachProgress: 0,
            maxSize: Math.random() * 15 + 5,
          };
          return [...updatedStars, approachingStar];
        }

        return updatedStars;
      });

      setNebulas(prev => prev.map(nebula => {
        const newX = (nebula.x + nebula.speed * Math.cos(timeRef.current * 0.08)) % (window.innerWidth * 1.5);
        const newY = (nebula.y + nebula.speed * Math.sin(timeRef.current * 0.06)) % (window.innerHeight * 1.5);
        
        return {
          ...nebula,
          x: newX < -200 ? window.innerWidth * 1.5 : newX,
          y: newY < -200 ? window.innerHeight * 1.5 : newY,
        };
      }));

      // Update falling stars
      setFallingStars(prev => {
        const updatedFallingStars = prev.map(star => {
          const newProgress = star.progress + star.speed;
          
          if (newProgress >= 1) {
            // Star has finished falling, remove it
            return null;
          }
          
          return {
            ...star,
            progress: newProgress,
          };
        }).filter(star => star !== null) as FallingStar[];

        // Occasionally spawn new falling stars
        if (Math.random() < 0.008 && updatedFallingStars.length < 3) { // Max 3 falling stars at once
          return [...updatedFallingStars, createFallingStar()];
        }

        return updatedFallingStars;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Base deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              rgba(2, 2, 2, 0.8) 0%, 
              rgba(5, 2, 10, 0.9) 40%, 
              rgb(0, 0, 0) 100%
            )
          `,
        }}
      />
      
      {/* Animated cosmic gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at ${50 + Math.sin(timeRef.current * 0.01) * 30}% ${40 + Math.cos(timeRef.current * 0.015) * 20}%, 
              rgba(4, 2, 8, 0.3) 0%, 
              rgba(6, 5, 40, 0.37) 30%,
              transparent 60%
            ),
            radial-gradient(ellipse at ${80 + Math.sin(timeRef.current * 0.008) * 25}% ${70 + Math.cos(timeRef.current * 0.012) * 15}%, 
              rgba(6, 14, 36, 0.25) 0%, 
              rgba(10, 15, 30, 0.15) 40%,
              transparent 70%
            ),
            radial-gradient(ellipse at ${20 + Math.sin(timeRef.current * 0.006) * 20}% ${20 + Math.cos(timeRef.current * 0.01) * 25}%, 
              rgba(7, 9, 39, 0.2) 0%, 
              rgba(8, 11, 50, 0.05) 50%,
              transparent 80%
            )
          `,
          transform: `translate(${Math.sin(timeRef.current * 0.02) * 2}px, ${Math.cos(timeRef.current * 0.03) * 1}px)`,
        }}
      />
      
      {/* Nebula gradient layers */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(1, 5, 15, 0.4) 0%, 
              transparent 30%,
              rgba(5, 7, 12, 0.3) 50%,
              transparent 70%,
              rgba(15, 24, 55, 0.2) 100%
            )
          `,
          transform: `translate(${Math.cos(timeRef.current * 0.015) * 1}px, ${Math.sin(timeRef.current * 0.02) * 1.5}px)`,
        }}
      />
      
      {/* Subtle color variations */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${30 + Math.sin(timeRef.current * 0.005) * 10}% ${60 + Math.cos(timeRef.current * 0.008) * 10}%, 
              rgba(9, 9, 51, 0.15) 0%, 
              transparent 50%
            ),
            radial-gradient(circle at ${70 + Math.sin(timeRef.current * 0.007) * 15}% ${30 + Math.cos(timeRef.current * 0.006) * 12}%, 
              rgba(20, 40, 70, 0.12) 0%, 
              transparent 45%
            ),
            radial-gradient(circle at ${90 + Math.sin(timeRef.current * 0.004) * 8}% ${80 + Math.cos(timeRef.current * 0.009) * 8}%, 
              rgba(10, 9, 63, 0.1) 0%, 
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Moving nebulas */}
      {/* {nebulas.map((nebula) => (
        <div
          key={nebula.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${nebula.x}px`,
            top: `${nebula.y}px`,
            width: `${nebula.size}px`,
            height: `${nebula.size}px`,
            background: `radial-gradient(circle, ${nebula.color} 0%, transparent 70%)`,
            opacity: nebula.opacity,
            zIndex: nebula.layer,
            transform: `scale(${1 + Math.sin(timeRef.current * 0.1 + nebula.id.charCodeAt(0)) * 0.1})`,
          }}
        />
      ))} */}
      
      {/* Background stars (slowest movement) */}
      {stars.filter(star => star.layer === 0).map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#ffffff',
            opacity: star.opacity * 0.6,
            boxShadow: `0 0 ${star.size * 1}px #ffffff`,
            zIndex: 1,
          }}
        />
      ))}
      
      {/* Mid-layer stars (medium movement) */}
      {stars.filter(star => star.layer === 1).map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#ffffff',
            opacity: star.opacity * 0.8,
            boxShadow: `0 0 ${star.size * 2}px #ffffff`,
            zIndex: 2,
          }}
        />
      ))}
      
      {/* Foreground stars (fastest movement) */}
      {stars.filter(star => star.layer === 2).map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#ffffff',
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 3}px #ffffff, 0 0 ${star.size * 6}px rgba(255, 255, 255, 0.3)`,
            zIndex: 3,
          }}
        />
      ))}
      
      {/* Approaching stars (coming towards you) */}
      {stars.filter(star => star.isApproaching).map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#ffffff',
            opacity: star.opacity,
            boxShadow: `
              0 0 ${star.size * 2}px #ffffff,
              0 0 ${star.size * 4}px rgba(255, 255, 255, 0.8),
              0 0 ${star.size * 8}px rgba(255, 255, 255, 0.4),
              0 0 ${star.size * 16}px rgba(255, 255, 255, 0.2)
            `,
            zIndex: 4,
            transform: `scale(${1 + Math.sin(timeRef.current * 0.2 + star.id.charCodeAt(0)) * 0.1})`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      
      {/* Falling stars (shooting stars) */}
      {fallingStars.map((star) => {
        const currentX = star.startX + (star.endX - star.startX) * star.progress;
        const currentY = star.startY + (star.endY - star.startY) * star.progress;
        const trailStartX = currentX - Math.cos(star.angle) * star.trailLength;
        const trailStartY = currentY - Math.sin(star.angle) * star.trailLength;
        
        // Fade out as star approaches middle
        const fadeProgress = Math.min(1, star.progress * 2); // Fade starts at 50% progress
        const currentOpacity = star.opacity * (1 - fadeProgress);
        
        return (
          <div key={star.id} style={{ zIndex: 5 }}>
            {/* Star trail */}
            <div
              className="absolute"
              style={{
                left: `${trailStartX}px`,
                top: `${trailStartY}px`,
                width: `${star.trailLength}px`,
                height: '3px', // Slightly thicker trail
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(255, 255, 255, ${currentOpacity * 0.3}) 10%,
                  rgba(255, 255, 255, ${currentOpacity * 0.6}) 30%, 
                  rgba(255, 255, 255, ${currentOpacity * 0.9}) 70%,
                  rgba(255, 255, 255, ${currentOpacity}) 100%
                )`,
                transform: `rotate(${star.angle}rad)`,
                transformOrigin: '0 50%',
                filter: 'blur(0.8px)', // More blur for longer trail effect
              }}
            />
            {/* Star head */}
            <div
              className="absolute rounded-full"
              style={{
                left: `${currentX}px`,
                top: `${currentY}px`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: '#ffffff',
                opacity: currentOpacity,
                boxShadow: `
                  0 0 ${star.size * 2}px #ffffff,
                  0 0 ${star.size * 4}px rgba(255, 255, 255, 0.8),
                  0 0 ${star.size * 8}px rgba(255, 255, 255, 0.4)
                `,
                filter: 'blur(0.3px)',
              }}
            />
          </div>
        );
      })}
      
      {/* Enhanced cosmic dust with gradient */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 3px,
              rgba(200, 150, 255, 0.02) 3px,
              rgba(181, 150, 255, 0.02) 6px
            )
          `,
          transform: `translate(${Math.sin(timeRef.current * 0.01) * 1}px, ${Math.cos(timeRef.current * 0.015) * 0.5}px)`,
        }}
      />
      
      {/* Enhanced cosmic clouds with gradients */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          background: `
            radial-gradient(ellipse at ${50 + Math.sin(timeRef.current * 0.005) * 20}% ${30 + Math.cos(timeRef.current * 0.008) * 15}%, 
              rgba(8, 5, 41, 0.15) 0%, 
              rgba(10, 37, 60, 0.1) 40%,
              transparent 70%
            ),
            radial-gradient(ellipse at ${80 + Math.sin(timeRef.current * 0.007) * 15}% ${70 + Math.cos(timeRef.current * 0.006) * 10}%, 
              rgba(17, 10, 60, 0.12) 0%, 
              rgba(20, 5, 40, 0.06) 35%,
              transparent 60%
            ),
            radial-gradient(ellipse at ${20 + Math.sin(timeRef.current * 0.003) * 12}% ${80 + Math.cos(timeRef.current * 0.004) * 8}%, 
              rgba(23, 15, 70, 0.1) 0%, 
              rgba(3, 3, 37, 0.05) 30%,
              transparent 55%
            )
          `,
        }}
      />
      
      {/* Additional gradient depth layer */}
      <div 
        className="absolute inset-0 opacity-6"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(0, 0, 0, 0.1) 0%, 
              transparent 25%,
              rgba(15, 19, 35, 0.08) 50%,
              transparent 75%,
              rgba(20, 29, 55, 0.06) 100%
            )
          `,
          transform: `translate(${Math.cos(timeRef.current * 0.008) * 0.5}px, ${Math.sin(timeRef.current * 0.012) * 0.8}px)`,
        }}
      />
    </div>
  );
};

export default SpaceEffect;
