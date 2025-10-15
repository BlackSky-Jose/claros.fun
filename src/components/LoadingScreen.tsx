import React, { useState, useEffect } from 'react';
import VibratingTitle from './VibratingTitle';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds total
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(progressPercent);
      
      if (progressPercent >= 100) {
        setIsComplete(true);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, []);

  // Auto-transition to main page when complete
  useEffect(() => {
    if (isComplete) {
      // Show title animation
      setTimeout(() => {
        setTitleVisible(true);
      }, 200);
      
      // Start zoom animation after title grows
      setTimeout(() => {
        setIsZooming(true);
        
        // Go to main page after zoom animation
        setTimeout(() => {
          onStart();
        }, 1200); // Wait for zoom animation to complete
      }, 1500); // Wait for title to grow first
    }
  }, [isComplete, onStart]);


  return (
    <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-all duration-1200 ${
      isZooming ? 'scale-[12] opacity-0' : 'scale-100 opacity-100'
    }`}>
      {/* Old TV Frame Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              #1a1a1a 0%, 
              #0d0d0d 70%, 
              #000000 100%
            )
          `,
        }}
      />
      
      {/* TV Screen Area */}
      <div 
        className="absolute inset-8 md:inset-16"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              #2a2a2a 0%, 
              #1a1a1a 60%, 
              #0a0a0a 100%
            )
          `,
          borderRadius: '20px',
          border: '4px solid #333',
          boxShadow: `
            inset 0 0 50px rgba(0,0,0,0.8),
            0 0 20px rgba(0,0,0,0.5)
          `
        }}
      />
      
      {/* TV Static Background */}
      <div className="tv-static"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Progress bar */}
        {!isComplete && (
          <div className="mx-auto mb-12">
            <div 
              className="segmented-loading-bar"
              style={{
                width: '301px',
                background: '#cecece',
                padding: '2px',
                border: '1px solid rgb(139, 51, 255)',
                borderRadius: '6px',
                boxShadow: '0 0 20px 0 rgba(129, 51, 255, 0.5)',
                margin: 'auto'
              }}
            >
              <div 
                className="segmented-loading-bar--progress"
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  alignContent: 'center'
                }}
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const segmentProgress = (progress / 100) * 12;
                  const isActive = i < Math.floor(segmentProgress);
                  const isPartial = i === Math.floor(segmentProgress) && segmentProgress % 1 > 0;
                  
                  return (
                    <span
                      key={i}
                      className={`${i === 0 ? 'first' : ''} ${i === 11 ? 'last' : ''}`}
                      style={{
                        margin: 'auto',
                        background: isActive || isPartial ? 'linear-gradient(180deg, rgb(146, 51, 255) 0%, rgb(172, 119, 221) 56%, rgb(110, 68, 187) 100%)' : 'transparent',
                        borderRadius: '4px',
                        flexBasis: '11%',
                        flexGrow: 1,
                        flexShrink: 1,
                        height: '20px',
                        opacity: isActive || isPartial ? 1 : 0.3,
                        transform: isActive || isPartial ? 'scale(1)' : 'scale(0.8)',
                        transition: 'all 0.5s cubic-bezier(0.17, 0.67, 0.88, 0.17)',
                        animationDelay: `${i * 0.15}s`,
                        ...(i === 0 && {
                          borderTopLeftRadius: '4px',
                          borderBottomLeftRadius: '4px'
                        }),
                        ...(i === 11 && {
                          borderTopRightRadius: '4px',
                          borderBottomRightRadius: '4px'
                        })
                      }}
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Loading percentage */}
            <div className="text-center mt-4">
              <span className="text-purple-400 font-mono text-lg">
                LOADING: {Math.round(progress)}%
              </span>
            </div>
          </div>
        )}

        {/* Claros.fun title - shows when complete with size animation */}
        {isComplete && (
          <div 
            className={`mb-12 transition-all duration-1200 ${
              titleVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-10'
            }`}
            style={{
              transform: titleVisible ? 'scale(1)' : 'scale(0.1)',
              transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <VibratingTitle text="Claros.fun" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
