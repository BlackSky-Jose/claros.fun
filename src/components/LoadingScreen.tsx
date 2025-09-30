import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isTurningOff, setIsTurningOff] = useState(false);


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
        {/* Title with bold outlined style like image */}
        <h1 
          className="text-6xl md:text-8xl font-black mb-12 tracking-tight"
          style={{
            color: 'white',
            WebkitTextStroke: '8px black',
            background: 'linear-gradient(135deg, #ff6b35, #ff8c42, #ff9f5a)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            padding: '0.2em 0.5em',
            borderRadius: '20px',
            display: 'inline-block',
            filter: 'drop-shadow(4px 4px 0px rgba(255, 107, 53, 1)) drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.8))',
            textShadow: `
              4px 4px 0px rgba(255, 107, 53, 1),
              6px 6px 0px rgba(0, 0, 0, 0.8),
              0 0 20px rgba(255, 107, 53, 0.6)
            `
          }}
        >
          Claros.fun
        </h1>

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
              border: '1px solid rgba(255, 107, 53, 1)',
              borderRadius: '6px',
              boxShadow: '0 0 20px 0 rgba(255, 107, 53, 0.5)',
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
                      background: isActive || isPartial ? 'linear-gradient(180deg, rgba(255, 107, 53, 1) 0%, rgba(255, 69, 0, 1) 56%, rgba(204, 82, 0, 1) 100%)' : 'transparent',
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
            <span className="text-orange-400 font-mono text-lg">
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
