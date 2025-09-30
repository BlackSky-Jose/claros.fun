import React from 'react';

interface CleanButtonProps {
  isCleaning: boolean;
  onClick: () => void;
}

const CleanButton: React.FC<CleanButtonProps> = ({ isCleaning, onClick }) => {
  return (
    <div className="ancient-button-container mt-10f">
      <div className="h-10"></div>
   

      {/* <div className='flex'>
          <button className={"button-main"} onClick={onClick} >
            {isCleaning ? (
              <>
                <span>Purging...</span>
                <span>Purging...</span>
                <span>Purging...</span>
                <span>Purging...</span>
              </>
            ) : (
              <>
                <span>Clean</span>
                <span>Clean</span>
                <span>Clean</span>
                <span>Clean</span>
              </>
            )}
     
          </button>
          
      </div> */}

      <button 
        className={`pushable ${isCleaning ? 'button-shaking' : ''}`} 
        onClick={onClick}
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          {isCleaning ? 'CLEANING' : 'CLEAN'}
        </span>
      </button>
      
    </div>
  );
};

export default CleanButton;
