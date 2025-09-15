import React from 'react';

interface HitMarkerProps {
  id: string;
  x: number;
  y: number;
}

const HitMarker: React.FC<HitMarkerProps> = ({ id, x, y }) => {
  return (
    <div
      key={id}
      className="absolute pointer-events-none hit-marker"
      style={{
        left: `${x - 20}px`,
        top: `${y - 20}px`,
        width: '40px',
        height: '40px',
      }}
    >
      <div className="w-full h-full border-4 border-white-500 rounded-full bg-white-500/20"></div>
    </div>
  );
};

export default HitMarker;
