import React from 'react';

interface VibratingTitleProps {
  text: string;
  className?: string;
}

const VibratingTitle: React.FC<VibratingTitleProps> = ({ text, className = '' }) => {
  // Map characters to their PNG file names
  const getImagePath = (char: string): string => {
    const charMap: { [key: string]: string } = {
      'C': '/claros/C.png',
      'L': '/claros/L.png',
      'A': '/claros/A.png',
      'R': '/claros/R.png',
      'O': '/claros/O.png',
      'S': '/claros/S.png',
      '.': '/claros/dot.png',
      'F': '/claros/F.png',
      'U': '/claros/U.png',
      'N': '/claros/N.png',
    };
    return charMap[char.toUpperCase()] || '';
  };

  const characters = text.split('');

  return (
    <h1 className={`mb-6 magical-title ${className}`} style={{ fontFamily: 'Jazz LET, fantasy', fontWeight: 100 }}>
      <div 
        className="claros-branding-text flex items-center justify-center gap-1"
        style={{ 
          display: 'inline-flex',
          filter: 'drop-shadow(4px 4px 0px rgba(231, 53, 255, 0.18)) drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.6))',
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              animation: `subtleFloat ${2 + (index * 0.1)}s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
              alignSelf: char === '.' ? 'flex-end' : 'center',
              marginBottom: char === '.' ? 'clamp(0px, 1.5vw, 0px)' : '0',
            }}
          >
            {char === ' ' ? (
              <span style={{ width: '20px', display: 'inline-block' }}></span>
            ) : (
              <img 
                src={getImagePath(char)} 
                alt={char}
                className="inline-block"
                style={{
                  height: char === '.' ? 'clamp(30px, 6vw, 60px)' : 'clamp(60px, 12vw, 120px)',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            )}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 magical-title-sparkles"></div>
    </h1>
  );
};

export default VibratingTitle;
