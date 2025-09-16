import React, { useState, useEffect, useMemo } from 'react';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFallingChars, setShowFallingChars] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFadingToDark, setIsFadingToDark] = useState(false);

  // Generate stable particle data to prevent hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
    }));
  }, []);


  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3 seconds total
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const baseProgress = (elapsed / duration) * 100;
      
      // Create natural loading curve with easing
      let progressPercent;
      if (baseProgress < 20) {
        // Slow start (0-20%)
        progressPercent = baseProgress * 0.3;
      } else if (baseProgress < 70) {
        // Steady middle (20-70%)
        progressPercent = 6 + (baseProgress - 20) * 0.8;
      } else if (baseProgress < 90) {
        // Slight slowdown (70-90%)
        progressPercent = 46 + (baseProgress - 70) * 0.6;
      } else {
        // Final push (90-100%)
        progressPercent = 58 + (baseProgress - 90) * 4.2;
      }
      
      // Add subtle natural variation
      const variation = Math.sin(elapsed / 300) * 1.5 + Math.sin(elapsed / 150) * 0.8;
      const naturalProgress = Math.max(0, Math.min(100, progressPercent + variation));
      
      setProgress(naturalProgress);
      
      if (naturalProgress >= 100) {
        console.log('Progress reached 100%! Setting isComplete to true');
        setIsComplete(true);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, []);

  // Start falling characters when progress reaches 50%
  useEffect(() => {
    if (progress >= 0 && !showFallingChars) {
      setShowFallingChars(true);
    }
  }, [progress, showFallingChars]);

  // Auto-transition to main page when progress reaches 100%
  useEffect(() => {
    if (progress >= 100 && !isTransitioning) {
      console.log('Progress reached 100%, starting first transition (scale 1.3)');
      console.log('Current progress value:', progress);
      setIsTransitioning(true);
      
      // Start circle transition after a longer delay to see the full process
      setTimeout(() => {
        
        // Start dark fade effect
        setTimeout(() => {
          setIsFadingToDark(true);
          
          // Go to main page after dark fade completes
          setTimeout(() => {
            onStart();
          }, 1500); // Wait for dark fade to complete
        }, 1000); // Wait for content to disappear (1s transition)
      }, 500); // Wait 2 seconds for circle transition
    }
  }, [progress, isComplete, onStart, isTransitioning]);


  // Debug log
  const currentScale = isTransitioning ? '10' : '1';
  console.log('Render - progress:', progress, 'isTransitioning:', isTransitioning, 'scale:', currentScale);

  return (
    <div className="loading-container fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Dark Night Sky Transition Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
          isFadingToDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(ellipse at center, 
              rgba(0, 0, 0, 0.3) 0%, 
              rgba(0, 0, 0, 0.7) 50%, 
              rgba(0, 0, 0, 0.95) 100%
            ),
            linear-gradient(135deg, 
              rgba(10, 10, 30, 0.9) 0%, 
              rgba(0, 0, 0, 1) 100%
            )
          `,
          zIndex: 1000
        }}
      >
        {/* Subtle stars appearing in the dark */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white rounded-full star-twinkle ${
                isFadingToDark ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                transition: 'opacity 1s ease-in-out'
              }}
            />
          ))}
        </div>
      </div>
      {/* Modern gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(0, 0, 0, 0.9) 0%, 
                rgba(20, 20, 30, 0.95) 50%, 
                rgba(0, 0, 0, 1) 100%
              )
            `,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full  flex flex-col items-center justify-center">
        {/* Orange Border Container */}
        <div 
          className="border-orange-300 bg-orange-100/5"
          style={{
            // Smooth interpolation using CSS custom properties
            '--border-radius': isTransitioning ? '50%' : '12px',
            '--width': isTransitioning ? '200px' : 'auto',
            '--height': isTransitioning ? '200px' : 'auto',
            '--min-width': isTransitioning ? '200px' : '700px',
            '--min-height': isTransitioning ? '200px' : '200px',
            '--padding': isTransitioning ? '0' : '40px 80px',
            '--border-width': isTransitioning ? '12px' : '6px',
            '--scale':isTransitioning ? '10' : '1',
            // '--scale': isSecondTransition ? '8' : (isTransitioning ? '8' : '1'),
            '--shadow-opacity': isTransitioning ? '0.8' : '0.3',
            '--glow-opacity': isTransitioning ? '0.8' : '0.1',
            '--border-opacity': isTransitioning ? '0.9' : '0.7',
            
            // Apply the custom properties
            borderRadius: 'var(--border-radius)',
            width: 'var(--width)',
            height: 'var(--height)',
            minWidth: 'var(--min-width)',
            minHeight: 'var(--min-height)',
            padding: 'var(--padding)',
            borderWidth: 'var(--border-width)',
            aspectRatio: isTransitioning ? '1 / 1' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${isTransitioning ? '10' : '1'})`,
            boxShadow: isTransitioning 
              ? `0 0 60px rgba(255, 183, 77, var(--glow-opacity)), 0 25px 50px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 183, 77, 0.2)`
              : `0 15px 35px rgba(0, 0, 0, var(--shadow-opacity)), inset 0 1px 0 rgba(255, 183, 77, var(--glow-opacity))`,
            background: isTransitioning 
              ? 'radial-gradient(circle at center, rgba(255, 183, 77, 0.15) 0%, rgba(255, 183, 77, 0.08) 50%, rgba(255, 183, 77, 0.02) 100%)'
              : 'linear-gradient(135deg, rgba(255, 183, 77, 0.08) 0%, rgba(255, 183, 77, 0.04) 100%)',
            borderColor: `rgba(255, 183, 77, var(--border-opacity))`,
            
            // Smooth transition for all properties - slow start, then aggressive
            transition: isTransitioning ? 'all 2s cubic-bezier(0.25, 0.1, 0.25, 1.0)' : 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            
            // Add subtle pulse when in circle state
            // animation: isTransitioning ? 'enhancedPulse 0.5s ease-in-out infinite 1s' : 'none'
          } as React.CSSProperties}
        >
          {/* Title and Progress Container */}
          <div 
            className="opacity-100"
            style={{
              transform: `scale(${isTransitioning ? '0.1' : '1'})`,
              opacity: isTransitioning ? 0 : 1,
              transition: 'all 1s ease-out',
            }}
          >
            {/* Title */}
            <div className="mb-8">
              <h1 
                className="text-6xl md:text-8xl font-bold text-white tracking-wider"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                }}
              >
                CLAROS.FUN
              </h1>
            </div>


          </div>
       
       
       
        </div>
      </div>
            <div className='loader' style={ {
            // custom CSS variables must be quoted
            position: 'relative',
            width: '258px',
            height: '258px',
            display: 'grid',
            margin: '0 auto',
            opacity: isTransitioning ? 0 : 1,
            transform: `scale(${isTransitioning ? '10' : '1'})`,
            transition: 'all 1s ease-out',
            ['--n' as string]: '24',
            ['--f' as string]: '0.3',
            ['--p' as string]: progress.toString(),
            } as React.CSSProperties}>
              {/* Debug scale indicator */}
              {/* <div style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                fontSize: '12px',
                zIndex: 1000,
                background: 'rgba(0,0,0,0.7)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                Scale: {currentScale} | isTransitioning: {isTransitioning.toString()} | Progress: {progress}%
              </div> */}
             {/* Create individual segments */}
           
           </div>

      {/* Progress Bar Section - Under the orange border */}
      {/* <div className="w-full max-w-md mx-auto">
        <div 
          className='loader-container' 
          style={{
            position: 'relative',
            width: '120px',
            height: '230px',
            display: 'grid',
            margin: '0 auto',
          }}
        >
          <div 
            className='loader' 
            style={{
              ['--p' as string]: progress.toString(),
            } as React.CSSProperties}
          >
            {/* Create individual segments */}
            {/* {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="segment"
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '20px',
                  backgroundColor: i < (progress * 0.5) ?'rgb(241, 137, 73) ': 'rgba(136, 86, 11, 0.78)',
                  borderRadius: '4px',
                  transformOrigin: '60px 60px',
                  transform: `rotate(${i * 7.2}deg) translateY(-30px)`,
                  boxShadow: i < (progress * 0.5) ? '0 0 6px rgb(240, 189, 131)' : 'none',
                  transition: 'all 0.1s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div> */} 

      {/* Subtle particles */}
      
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      {/* TV Static Overlay */}
      <div className="tv-static"></div>
    </div>
  );
};

export default LoadingScreen;
