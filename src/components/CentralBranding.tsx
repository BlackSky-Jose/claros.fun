import React, { useState, useEffect } from 'react';
import CleanButton from './CleanButton';
import MagicalParticles from './MagicalParticles';
import VibratingTitle from './VibratingTitle';

interface CentralBrandingProps {
  isCleaning: boolean;
  onCleanClick: () => void;
}

const CentralBranding: React.FC<CentralBrandingProps> = ({ isCleaning, onCleanClick }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Under development...';

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    const typingInterval = setInterval(() => {
      if (isPaused) {
        return; // Do nothing during pause
      }

      if (!isDeleting && currentIndex <= fullText.length) {
        // Typing forward
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
        
        // Pause when fully typed
        if (currentIndex > fullText.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = true;
          }, 2000); // Wait 2 seconds at full text
        }
      } else if (isDeleting && currentIndex > 0) {
        // Deleting backward
        currentIndex--;
        setDisplayedText(fullText.slice(0, currentIndex));
        
        // Pause when fully deleted, then restart
        if (currentIndex === 0) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = false;
          }, 500); // Short pause before retyping
        }
      }
    }, 100); // 100ms per character

    return () => clearInterval(typingInterval);
  }, []);
  return (
    <div className=" relative z-10 flex flex-col items-center justify-center h-full px-4 mb-10 pb-10 mt-20 ">
      <div onClick={() => window.open('https://x.com/Clarosdotfun', '_blank')} className = "absolute top-2 left-2 border border-[#B476F2] rounded-md cursor-pointer !px-2 py-2 !flex items-center gap-2 text-[#B476F2] bg-black/80 backdrop-blur-sm font-bold hover:bg-black/90 hover:text-[#B476F2] transition-all duration-200" >
        <img src={'xlogo.png'} className = "w-4 h-4 "/>
        <span className="text-sm !py-2">@Clarosdotfun</span></div>
      <MagicalParticles />
      <div className="text-center relative">
        <VibratingTitle text="Claros.fun" />
        <div className='h-6'></div>
        <p 
          className="text-lg sm:text-xl md:text-3xl mb-12 font-white"
          style={{
            color: 'white',
            fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}
        >
          {displayedText}
          <span 
            style={{
              animation: 'blink 0.8s infinite',
              marginLeft: '2px'
            }}
          >
            |
          </span>
        </p>
        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
        <div className="flex justify-center">
            <CleanButton  isCleaning={isCleaning} onClick={onCleanClick} />
        </div>
      </div>
    </div>
  );
};

export default CentralBranding;
