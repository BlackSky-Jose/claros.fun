import React, { useState } from 'react';
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

  const handleImageError = () => {
    console.log('Image failed to load:', src);
    setImageError(true);
  };

  const handleClick = () => {
    if (onClick && !isHit) {
      onClick(id);
    }
  };

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
        transform: isHit ? `rotate(${rotation}deg)` : `rotate(${rotation}deg)`,
        opacity: isHit ? 0 : opacity,
        zIndex: 1000,
        pointerEvents: isHit ? 'none' : 'auto',
        transition: isHit ? 'none' : 'all 1s ease',
      }}
      onClick={handleClick}
    >
      {/* Ripple Effect */}
      <div 
        className="absolute inset-0 ripple-effect pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />
      
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
        {!isHit && <MagicalSparkles x={size/2} y={size/2} size={size} isActive={true} />}
      </div>
    </div>
  );
};

export default MemeElement;
