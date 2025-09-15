import React from 'react';

const ScanlineEffect: React.FC = () => {
  return (
    <>
      {/* Main scanlines - maximum thickness */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0, 0, 0, 0.5) 1px,
              rgba(0, 0, 0, 0.5) 5px
            )
          `,
          zIndex: 1,
        }}
      />
      
    </>
  );
};

export default ScanlineEffect;
