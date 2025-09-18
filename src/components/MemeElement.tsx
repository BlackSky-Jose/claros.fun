import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import MagicalSparkles from './MagicalSparkles';

interface MemeElementProps {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  src: string;
  alt: string;
  opacity: number;
  isHit?: boolean;
  onClick?: (id: string) => void;
}

const MemeElement: React.FC<MemeElementProps> = ({
  id,
  x,
  y,
  size,
  rotation,
  src,
  alt,
  opacity,
  isHit = false,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(rotation);
  const [currentScale, setCurrentScale] = useState(0.1);
  const [currentOpacity, setCurrentOpacity] = useState(opacity);
  const [animationProgress, setAnimationProgress] = useState(0);
  const fadeOutRef = useRef<boolean>(false);

  // Sync opacity with prop changes
  useEffect(() => {
    if (!isHit) {
      setCurrentOpacity(opacity);
    }
  }, [opacity, isHit]);

  const handleImageError = () => {
    console.log('Image failed to load:', src);
    setImageError(true);
  };

  const handleClick = () => {
    if (onClick && !isHit) {
      onClick(id);
    }
  };

  // Smooth rotation and scale animation using TypeScript
  useEffect(() => {
    if (isHit) return; // Don't animate if hit
    
    const startRotation = rotation; // Initial rotation from props
    const endRotation = Math.random() * 200 - 20; // Final rotation (upright)
    const startScale = 0.1; // Start very small
    const endScale = 1; // End at normal size
    const duration = 300; // 1 second
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      // Calculate current rotation and scale
      const currentRot = startRotation + (endRotation - startRotation) * easeOut;
      const currentScl = startScale + (endScale - startScale) * easeOut;
      
      setCurrentRotation(currentRot);
      setCurrentScale(currentScl);
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [rotation, isHit]);

  // Fade-out animation using TypeScript when isHit becomes true
  useEffect(() => {
    if (!isHit) {
      fadeOutRef.current = false;
      return; // Only animate fade-out when hit
    }
    
    if (fadeOutRef.current) return; // Prevent multiple fade-out animations
    fadeOutRef.current = true;
    
    // Capture current values immediately
    const startOpacity = currentOpacity;
    const endOpacity = 0;
    const startScale = currentScale;
    const endScale = 0.3; // Scale down to 30%
    const startRotation = currentRotation;
    const endRotation = currentRotation - 180; // Rotate -180 degrees
    const duration = 500; // 0.5 seconds fade-out
    const startTime = Date.now();
    
    const animateFadeOut = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth fade-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      // Calculate current values
      const currentOp = startOpacity + (endOpacity - startOpacity) * easeOut;
      const currentScl = startScale + (endScale - startScale) * easeOut;
      const currentRot = startRotation + (endRotation - startRotation) * easeOut;
      
      setCurrentOpacity(currentOp);
      setCurrentScale(currentScl);
      setCurrentRotation(currentRot);
      
      if (progress < 1) {
        requestAnimationFrame(animateFadeOut);
      }
    };
    
    requestAnimationFrame(animateFadeOut);
  }, [isHit]); // Only depend on isHit, not on the current values

  return (
    <div
      key={id}
      className={`cursor-pointer absolute meme-element floating ${
        isHit ? 'fade-out' : ''
      }`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${currentRotation}deg) scale(${currentScale})`,
        opacity: currentOpacity,
        zIndex: 1000,
        pointerEvents: isHit ? 'none' : 'auto',
        transition: isHit ? 'none' : 'all 1s ease',
      }}
      onClick={handleClick}
    >
      {/* Ripple Effect */}
      {/* <div 
        className="absolute inset-0 ripple-effect pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      /> */}
      
      <div className="relative w-full h-full" style={{ zIndex: 2 }}>
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            {alt}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="w-full h-full object-contain drop-shadow-lg"
            unoptimized
            onError={handleImageError}
            priority={false}
          />
        )}
        {/* {!isHit && <MagicalSparkles x={size/2} y={size/2} size={size} isActive={true} />} */}
      </div>
    </div>
  );
};

export default MemeElement;
