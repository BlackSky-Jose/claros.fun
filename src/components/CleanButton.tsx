import React from 'react';

interface CleanButtonProps {
  isCleaning: boolean;
  isPreparing?: boolean;
  onClick: () => void;
}

const CleanButton: React.FC<CleanButtonProps> = ({ isCleaning, isPreparing = false, onClick }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="button-border">
        <div className="button-base">
          <button 
            className={`button ${isCleaning ? 'button-shaking' : ''}`} 
            onClick={onClick}
          >
            {isCleaning ? 'Cleaning' : 'Clean Feed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CleanButton;
