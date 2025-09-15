import React from 'react';

interface VibratingTitleProps {
  text: string;
  className?: string;
}

const VibratingTitle: React.FC<VibratingTitleProps> = ({ text, className = '' }) => {
  const characters = text.split('');

  return (
    <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight magical-title ${className}`} style={{ fontFamily: 'Jazz LET, fantasy', fontWeight: 100 }}>
      <span 
        className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent magical-text-glow"
        style={{ 
          filter: 'none',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
          WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.8)'
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              animation: `characterVibrate${index % 4} ${0.5 + (index * 0.1)}s ease-in-out infinite`,
              animationDelay: `${index * 0.05}s`,
              filter: 'none',
              textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      <div className="absolute inset-0 magical-title-sparkles"></div>
    </h1>
  );
};

export default VibratingTitle;
