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
          WebkitTextStroke: '2px black',
          background: 'linear-gradient(135deg, #ff6b35, #ff4500, #ff8c42, #ff6b35)',
          backgroundSize: '200% 200%',
          padding: '0.2em 0.5em',
          borderRadius: '12px',
          display: 'inline-block',
          animation: 'brandingGlow 3s ease-in-out infinite, brandingShift 4s ease infinite',
          boxShadow: `
            0 0 20px rgba(255, 107, 53, 0.4),
            0 4px 8px rgba(0, 0, 0, 0.3),
            inset 0 2px 0 rgba(255, 255, 255, 0.2)
          `,
          textShadow: `
            2px 2px 0 black,
            -2px -2px 0 black,
            2px -2px 0 black,
            -2px 2px 0 black,
            0 0 10px rgba(255, 107, 53, 0.5)
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
