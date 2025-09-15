import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-white-900/30 to-white-900/40"></div>
      <div className="absolute inset-0">
        <div className="web-mesh"></div>
      </div>
    </div>
  );
};

export default Background;
