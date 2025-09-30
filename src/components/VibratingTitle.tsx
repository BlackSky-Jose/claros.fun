import React from 'react';

interface VibratingTitleProps {
  text: string;
  className?: string;
}

const VibratingTitle: React.FC<VibratingTitleProps> = ({ text, className = '' }) => {
  const characters = text.split('');

  return (
    <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight magical-title ${className}`} style={{ fontFamily: 'Jazz LET, fantasy', fontWeight: 100 }}>
      <span 
        className="claros-branding-text"
        style={{ 
          color: 'white',
          WebkitTextStroke: '5px black',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          display: 'inline-block',
          filter: 'drop-shadow(4px 4px 0px rgba(255, 107, 53, 1)) drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.6))',
          textShadow: `
            4px 4px 0px rgba(255, 107, 53, 1),
            8px 8px 0px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(255, 107, 53, 0.5)
          `
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              animation: `subtleFloat ${2 + (index * 0.1)}s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
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
