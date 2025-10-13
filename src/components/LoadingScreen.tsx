import React, { useState, useEffect } from 'react';
import VibratingTitle from './VibratingTitle';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isTurningOff, setIsTurningOff] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);


  // Trigger title animation on mount
  useEffect(() => {
    setTimeout(() => {
      setTitleVisible(true);
    }, 300);
  }, []);

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
      // Start TV turn-off effect
      setTimeout(() => {
        setIsTurningOff(true);
        
        // Go to main page after TV turn-off animation
        setTimeout(() => {
          onStart();
        }, 1200); // Wait for turn-off animation to complete
      }, 500); // Small delay before starting turn-off
    }
  }, [isComplete, onStart]);


  return (
    <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-50 ${isTurningOff ? 'tv-turn-off' : ''}`}>
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
      
      {/* TV Screen Shrink Effect */}
      {isTurningOff && (
        <div 
          className="absolute inset-0 z-20"
          style={{
            background: 'black',
            animation: 'tvScreenShrink 1.5s ease-in-out forwards'
          }}
        />
      )}

      {/* Clean minimal content */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${isTurningOff ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}`}>
        {/* Title with PNG letter images - Amazing Animation */}
        <div 
          className={`mb-12 transition-all duration-1000 ${
            titleVisible 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-50 -rotate-12'
          }`}
          style={{
            transform: titleVisible ? 'translateY(0)' : 'translateY(-50px)',
            filter: titleVisible ? 'blur(0px) brightness(1)' : 'blur(10px) brightness(2)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <VibratingTitle text="Claros.fun" />
        </div>

        {/* Coming soon text */}
        {/* <p className="text-xl md:text-2xl text-gray-400 mb-16 font-light">
          Coming soon...
        </p> */}
      <div className='h-6'></div>
        {/* Segmented Progress bar container */}
        <div className="mx-auto">
          <div 
            className="segmented-loading-bar"
            style={{
              width: '301px',
              background: '#cecece',
              padding: '2px',
              border: '1px solid rgba(255, 51, 102, 1)',
              borderRadius: '6px',
              boxShadow: '0 0 20px 0 rgba(255, 51, 102, 0.5)',
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
                      background: isActive || isPartial ? 'linear-gradient(180deg, rgba(255, 51, 102, 1) 0%, rgba(221, 119, 187, 1) 56%, rgba(187, 68, 153, 1) 100%)' : 'transparent',
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
            <span className="text-pink-400 font-mono text-lg">
              LOADING: {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Social handle */}
        <div className="mt-16">
          <span className="text-gray-500 text-sm ">@Clarosdotfun</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
