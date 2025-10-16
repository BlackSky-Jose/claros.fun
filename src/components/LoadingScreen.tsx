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
  const [showParticles, setShowParticles] = useState(false);
  const [showLiquid, setShowLiquid] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3500; // 3.5 seconds for premium feel
    
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

  // Show particles when progress starts
  useEffect(() => {
    if (progress > 5) {
      setShowParticles(true);
    }
  }, [progress]);

  // Show liquid effect when progress is significant
  useEffect(() => {
    if (progress > 30) {
      setShowLiquid(true);
    }
  }, [progress]);

  // Auto-transition to main page when complete
  useEffect(() => {
    if (isComplete) {
      // Show title animation
      setTimeout(() => {
        setTitleVisible(true);
      }, 400);
      
      // Start zoom animation after title grows
      setTimeout(() => {
        setIsZooming(true);
        
        // Go to main page after zoom animation
          setTimeout(() => {
            onStart();
        }, 1800); // Wait for zoom animation to complete
      }, 2500); // Wait for title to grow first
    }
  }, [isComplete, onStart]);


  return (
    <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-all duration-1500 ${
      isZooming ? 'scale-[12] opacity-0' : 'scale-100 opacity-100'
    }`}>
      {/* Ultra-Modern Glassmorphism Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, 
              rgba(139, 51, 255, 0.3) 0%, 
              transparent 50%
            ),
            radial-gradient(ellipse at 80% 80%, 
              rgba(221, 119, 187, 0.2) 0%, 
              transparent 50%
            ),
            radial-gradient(ellipse at center, 
              #1a0a2a 0%, 
              #0d0515 50%, 
              #000000 100%
            )
          `,
        }}
      />
      
      {/* Glassmorphism Overlay */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(139, 51, 255, 0.1) 0%, 
              rgba(221, 119, 187, 0.05) 50%,
              rgba(139, 51, 255, 0.1) 100%
            )
          `,
        }}
      />
      
      {/* Vintage Radio TV Frame */}
      <div 
        className="absolute inset-4 md:inset-8"
        style={{
          background: `
            linear-gradient(145deg, 
              #2a2a2a 0%, 
              #1a1a1a 30%,
              #0a0a0a 70%,
              #000000 100%
            )
          `,
          borderRadius: '15px',
          border: '8px solid #3a3a3a',
          boxShadow: `
            inset 0 0 50px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(0, 0, 0, 0.6),
            0 8px 16px rgba(0, 0, 0, 0.8)
          `
        }}
      />
      
      {/* Vintage TV Screen */}
      <div 
        className="absolute inset-12 md:inset-16"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              #1a1a1a 0%, 
              #0d0d0d 60%, 
              #000000 100%
            )
          `,
          borderRadius: '8px',
          border: '3px solid #2a2a2a',
          boxShadow: `
            inset 0 0 30px rgba(0, 0, 0, 0.9),
            0 0 20px rgba(0, 0, 0, 0.5)
          `
        }}
      />
      
      {/* Vintage TV Controls */}
      <div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        style={{
          width: '200px',
          height: '20px',
          background: 'linear-gradient(90deg, #3a3a3a 0%, #2a2a2a 50%, #3a3a3a 100%)',
          borderRadius: '10px',
          border: '2px solid #4a4a4a',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Vintage knobs */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 rounded-full"
          style={{
            width: '12px',
            height: '12px',
            background: 'linear-gradient(45deg, #5a5a5a 0%, #3a3a3a 50%, #5a5a5a 100%)',
            left: '20px',
            border: '1px solid #6a6a6a',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
          }}
        />
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 rounded-full"
          style={{
            width: '12px',
            height: '12px',
            background: 'linear-gradient(45deg, #5a5a5a 0%, #3a3a3a 50%, #5a5a5a 100%)',
            right: '20px',
            border: '1px solid #6a6a6a',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
          }}
        />
      </div>
      
      {/* Enhanced TV Static Background */}
      <div className="tv-static"></div>
      
      {/* Vintage CRT Scanlines */}
      <div 
        className="absolute inset-12 md:inset-16 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0, 255, 0, 0.05) 1px,
              rgba(0, 255, 0, 0.05) 2px
            )
          `,
          animation: 'scanlines 0.1s linear infinite',
          borderRadius: '8px',
        }}
      />
      
      {/* Vintage TV Curvature Effect */}
      <div 
        className="absolute inset-12 md:inset-16 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              transparent 0%, 
              transparent 85%,
              rgba(0, 0, 0, 0.1) 100%
            )
          `,
          borderRadius: '8px',
        }}
      />
      
      {/* Vintage Film Grain */}
      <div 
        className="absolute inset-12 md:inset-16 pointer-events-none opacity-15"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 30px 30px, 70px 70px, 40px 40px',
          animation: 'filmGrain 0.2s steps(10) infinite',
          borderRadius: '8px',
        }}
      />
      
      {/* Vintage Radio Frequency Lines */}
      <div 
        className="absolute inset-12 md:inset-16 pointer-events-none opacity-20"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(0, 255, 0, 0.1) 3px,
              rgba(0, 255, 0, 0.1) 4px
            )
          `,
          animation: 'radioFrequency 2s ease-in-out infinite',
          borderRadius: '8px',
        }}
      />
      
      {/* Classic Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              transparent 0%, 
              transparent 60%, 
              rgba(0, 0, 0, 0.3) 100%
            )
          `,
        }}
      />

      {/* Classic + Modern Floating Particles */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Modern gradient particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`modern-${i}`}
              className="absolute rounded-full opacity-70"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: `linear-gradient(45deg, 
                  rgba(139, 51, 255, 0.8) 0%, 
                  rgba(221, 119, 187, 0.6) 50%,
                  rgba(139, 51, 255, 0.8) 100%
                )`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: `0 0 10px rgba(139, 51, 255, 0.5)`,
              }}
            />
          ))}
          
          {/* Classic retro particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`retro-${i}`}
              className="absolute opacity-60"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                background: `rgba(0, 255, 0, 0.8)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `retroFloat ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: `0 0 5px rgba(0, 255, 0, 0.6)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              }}
            />
          ))}
          
          {/* Classic star particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute opacity-80"
              style={{
                width: '3px',
                height: '3px',
                background: `rgba(255, 255, 255, 0.9)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `starTwinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 1}s`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            />
          ))}
        </div>
      )}

      {/* Liquid Morphing Effect */}
      {showLiquid && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute rounded-full opacity-30"
            style={{
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, 
                rgba(139, 51, 255, 0.4) 0%, 
                rgba(221, 119, 187, 0.2) 50%,
                transparent 100%
              )`,
              left: '20%',
              top: '30%',
              animation: 'liquidMorph 4s ease-in-out infinite',
              filter: 'blur(20px)',
            }}
          />
          <div
            className="absolute rounded-full opacity-25"
            style={{
              width: '150px',
              height: '150px',
              background: `radial-gradient(circle, 
                rgba(221, 119, 187, 0.3) 0%, 
                rgba(139, 51, 255, 0.2) 50%,
                transparent 100%
              )`,
              right: '25%',
              bottom: '20%',
              animation: 'liquidMorph 5s ease-in-out infinite reverse',
              filter: 'blur(15px)',
            }}
          />
      </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Ultra-Modern Morphing Progress Bar */}
        {!isComplete && (
          <div className="mx-auto mb-20">
            <div 
              className="segmented-loading-bar"
              style={{
                width: '400px',
                background: `
                  linear-gradient(90deg, 
                    rgba(26, 10, 42, 0.8) 0%, 
                    rgba(42, 26, 58, 0.6) 50%, 
                    rgba(26, 10, 42, 0.8) 100%
                  )
                `,
                padding: '4px',
                border: '2px solid rgba(139, 51, 255, 0.4)',
                borderRadius: '20px',
                boxShadow: `
                  0 0 40px rgba(139, 51, 255, 0.4),
                  inset 0 0 30px rgba(139, 51, 255, 0.1),
                  0 0 80px rgba(139, 51, 255, 0.2),
                  0 8px 32px rgba(0, 0, 0, 0.3)
                `,
                margin: 'auto',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Animated liquid background */}
              <div 
                className="absolute inset-0 opacity-20"
          style={{
            background: `
                    linear-gradient(90deg, 
                      transparent 0%, 
                      rgba(139, 51, 255, 0.3) 25%,
                      rgba(221, 119, 187, 0.2) 50%,
                      rgba(139, 51, 255, 0.3) 75%,
                      transparent 100%
                    )
                  `,
                  animation: 'liquidFlow 3s ease-in-out infinite',
                }}
              />
              
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  background: `
                    linear-gradient(90deg, 
                      transparent 0%, 
                      rgba(255, 255, 255, 0.1) 50%, 
                      transparent 100%
                    )
                  `,
                  animation: 'shimmer 2s ease-in-out infinite',
                }}
              />
              
              {/* Classic CRT glow effect */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    linear-gradient(90deg, 
                      transparent 0%, 
                      rgba(0, 255, 0, 0.1) 25%,
                      rgba(0, 255, 0, 0.2) 50%,
                      rgba(0, 255, 0, 0.1) 75%,
                      transparent 100%
                    )
                  `,
                  animation: 'crtGlow 3s ease-in-out infinite',
                }}
              />
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

        {/* Enhanced Claros.fun title - shows when complete with dramatic animation */}
        {isComplete && (
          <div 
            className={`mb-16 transition-all duration-1500 ${
              titleVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-5'
            }`}
            style={{
              transform: titleVisible ? 'scale(1) rotate(0deg)' : 'scale(0.05) rotate(-180deg)',
              transition: 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: titleVisible ? 'blur(0px) brightness(1)' : 'blur(20px) brightness(3)',
            }}
          >
            <div className="relative">
              {/* Glow effect behind title */}
              <div 
                className="absolute inset-0 opacity-50"
                style={{
                  background: 'radial-gradient(ellipse, rgba(139, 51, 255, 0.4) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  transform: 'scale(1.5)',
                }}
              />
              <VibratingTitle text="Claros.fun" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
