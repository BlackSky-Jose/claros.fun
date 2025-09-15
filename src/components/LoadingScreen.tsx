import React, { useState, useEffect, useMemo } from 'react';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFallingChars, setShowFallingChars] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);


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
    if (progress >= 100 && isComplete && !isTransitioning) {
      setIsTransitioning(true);
      
      // Add smooth rotation during transition
      const rotationInterval = setInterval(() => {
        setRotationAngle(prev => prev + 1);
      }, 30);
      
      // Start circle transition after a longer delay to see the full process
      setTimeout(() => {
        clearInterval(rotationInterval);
        // Trigger TV turn-on effect
        const container = document.querySelector('.loading-container');
        if (container) {
          container.classList.add('tv-turn-on');
          setTimeout(() => {
            onStart();
          }, 2000); // Wait for TV effect to complete
        }
      }, 1000); // Wait 2 seconds for circle transition
    }
  }, [progress, isComplete, onStart, isTransitioning]);


  return (
    <div className="loading-container fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
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
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Orange Border Container */}
        <div 
          className="border-orange-300 bg-orange-100/5"
          style={{
            // Smooth interpolation using CSS custom properties
            '--border-radius': isTransitioning ? '50%' : '12px',
            '--width': isTransitioning ? '200px' : 'auto',
            '--height': isTransitioning ? '200px' : 'auto',
            '--min-width': isTransitioning ? '200px' : '400px',
            '--min-height': isTransitioning ? '200px' : '200px',
            '--padding': isTransitioning ? '0' : '40px 80px',
            '--border-width': isTransitioning ? '12px' : '6px',
            '--scale': isTransitioning ? '1.15' : '1',
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
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(var(--scale))`,
            boxShadow: isTransitioning 
              ? `0 0 60px rgba(255, 183, 77, var(--glow-opacity)), 0 25px 50px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 183, 77, 0.2)`
              : `0 15px 35px rgba(0, 0, 0, var(--shadow-opacity)), inset 0 1px 0 rgba(255, 183, 77, var(--glow-opacity))`,
            background: isTransitioning 
              ? 'radial-gradient(circle at center, rgba(255, 183, 77, 0.15) 0%, rgba(255, 183, 77, 0.08) 50%, rgba(255, 183, 77, 0.02) 100%)'
              : 'linear-gradient(135deg, rgba(255, 183, 77, 0.08) 0%, rgba(255, 183, 77, 0.04) 100%)',
            borderColor: `rgba(255, 183, 77, var(--border-opacity))`,
            
            // Smooth transition for all properties
            transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            
            // Add subtle pulse when in circle state
            animation: isTransitioning ? 'enhancedPulse 2s ease-in-out infinite 1.5s' : 'none'
          } as React.CSSProperties}
        >
          {/* Title and Progress Container */}
          <div 
            className={`${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            style={{
              transition: 'all 0.1s ease-out',
              transitionDelay: isTransitioning ? '0ms' : '0ms'
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

            {/* Modern Progress Container */}
            <div className="w-full max-w-2xl mx-auto px-8">
              {/* Progress Bar */}
              <div className="relative">
              {/* Progress Background */}
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                {/* Progress Fill */}
                <div 
                  className="h-full bg-gradient-to-r from-white-500 to-yellow-900 rounded-full transition-all duration-300 ease-out relative"
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  {/* Shimmer effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    style={{
                      animation: 'shimmer 2s ease-in-out infinite',
                      transform: 'translateX(-100%)'
                    }}
                  />
                </div>
              </div>
              
                {/* Progress Text */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-400 font-mono">0%</span>
                  <span className="text-sm text-white font-mono font-bold">
                    {Math.round(progress)}%
                  </span>
                  <span className="text-sm text-gray-400 font-mono">100%</span>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm tracking-wider uppercase">
                {progress < 100 ? 'Loading...' : 'Complete'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
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
