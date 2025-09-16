import React, { useState, useEffect, useRef } from 'react';

interface MouseTailProps {
  isActive?: boolean;
}

interface TailPoint {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  createdAt: number;
}

const MouseTail: React.FC<MouseTailProps> = ({ isActive = true }) => {
  const [tailPoints, setTailPoints] = useState<TailPoint[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointIdRef = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TailPoint = {
        id: pointIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: Math.random() * 12 + 6, // Random size between 6-18px
        createdAt: Date.now(),
      };

      setTailPoints(prev => {
        const updated = [...prev, newPoint];
        // Keep only the last 30 points for performance
        return updated.slice(-30);
      });
    };

    const handleMouseLeave = () => {
      // Clear all points when mouse leaves
      setTailPoints([]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive]);

  // Animate tail points
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTailPoints(prev => {
        return prev
          .map(point => ({
            ...point,
            opacity: Math.max(0, point.opacity - 0.05),
            size: point.size * 0.98,
          }))
          .filter(point => point.opacity > 0.1);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1000 }}
    >
      {tailPoints.map((point) => (
        <div
          key={point.id}
          className="absolute rounded-full"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            opacity: point.opacity,
            background: `
              radial-gradient(circle, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(200, 200, 255, 0.7) 30%, 
                rgba(150, 150, 255, 0.5) 60%, 
                rgba(100, 100, 255, 0.3) 100%
              )
            `,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(2px)',
            transition: 'opacity 0.1s ease-out',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}
    </div>
  );
};

export default MouseTail;
