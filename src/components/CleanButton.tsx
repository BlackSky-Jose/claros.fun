import React from 'react';

interface CleanButtonProps {
  isCleaning: boolean;
  onClick: () => void;
}

const CleanButton: React.FC<CleanButtonProps> = ({ isCleaning, onClick }) => {
  return (
    <div className="ancient-button-container mt-10">
      <div className="h-5"></div>
      <button
        onClick={onClick}
        className={`ancient-button ${isCleaning ? 'cleaning-state' : 'normal-state'}`}
      >
        <div className="button-frame">
          {/* Weathering and Cracks */}
          <div className="weathering-overlay"></div>
          <div className="crack crack-1"></div>
          <div className="crack crack-2"></div>
          <div className="crack crack-3"></div>
          <div className="moss-patch moss-1"></div>
          <div className="moss-patch moss-2"></div>
          
          {/* Broken Architectural Columns */}
          <div className="architectural-column left-column broken-column">
            <div className="column-damage"></div>
          </div>
          <div className="architectural-column right-column broken-column">
            <div className="column-damage"></div>
          </div>
          
          {/* Damaged Capitals */}
          <div className="column-capital left-capital damaged-capital">
            <div className="capital-crack"></div>
          </div>
          <div className="column-capital right-capital damaged-capital">
            <div className="capital-crack"></div>
          </div>
          
          {/* Weathered Frieze */}
          <div className="architectural-frieze weathered-frieze">
            <div className="frieze-pattern broken-pattern"></div>
            <div className="frieze-pattern"></div>
            <div className="frieze-pattern broken-pattern"></div>
          </div>
          
          {/* Damaged Pediment */}
          <div className="classical-pediment damaged-pediment">
            <div className="pediment-triangle broken-triangle"></div>
            <div className="pediment-ornament missing-ornament"></div>
          </div>
          
          <div className="button-content">
            {isCleaning ? (
              <>
                <div className="ancient-spinner"></div>
                <span className="ancient-text weathered-text">PURGING</span>
                <div className="ancient-glow cleaning-glow"></div>
              </>
            ) : (
              <>
                {/* <div className="architectural-symbol weathered-symbol">🏛️</div> */}
                <span className="ancient-text weathered-text">CLEANSE</span>
                <div className="ancient-glow normal-glow"></div>
              </>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default CleanButton;
