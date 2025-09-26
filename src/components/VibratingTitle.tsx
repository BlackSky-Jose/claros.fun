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
        className="bg-gradient-to-br from-amber-200 via-orange-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent magical-text-glow"
        style={{ 
          filter: 'drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3))',
          textShadow: `
            0 0 10px rgba(255, 223, 186, 1.0),
            0 0 20px rgba(255, 165, 79, 0.9),
            0 0 30px rgba(255, 140, 0, 0.8),
            0 0 40px rgba(218, 165, 32, 0.6),
            0 0 60px rgba(184, 134, 11, 0.4),
            0 2px 4px rgba(101, 67, 33, 0.8),
            0 4px 8px rgba(62, 39, 35, 0.6)
          `,
          WebkitTextStroke: '1.5px rgba(255, 248, 220, 0.95)',
          background: 'linear-gradient(135deg, #ffd89b 0%, #ff9a9e 25%, #fecfef 50%, #fecfef 75%, #ffd89b 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text'
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              animation: `characterVibrate${index % 4} ${0.5 + (index * 0.1)}s ease-in-out infinite`,
              animationDelay: `${index * 0.05}s`,
              filter: 'drop-shadow(0 2px 4px rgba(139, 69, 19, 0.4))',
              textShadow: `
                0 0 5px rgba(255, 223, 186, 1.0),
                0 0 10px rgba(255, 165, 79, 0.9),
                0 0 15px rgba(255, 140, 0, 0.7),
                0 0 25px rgba(218, 165, 32, 0.5),
                0 1px 2px rgba(101, 67, 33, 0.9)
              `,
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
