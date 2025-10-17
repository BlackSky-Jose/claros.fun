import React from 'react';
import CleanButton from './CleanButton';
import MagicalParticles from './MagicalParticles';
import VibratingTitle from './VibratingTitle';

interface CentralBrandingProps {
  isCleaning: boolean;
  isPreparing?: boolean;
  onCleanClick: () => void;
}

const CentralBranding: React.FC<CentralBrandingProps> = ({ isCleaning, isPreparing = false, onCleanClick }) => {
  return (
    <div className=" relative z-10 flex flex-col items-center justify-center h-full px-4 mb-10 pb-10 mt-20 ">
      <div onClick={() => window.open('https://x.com/Clarosdotfun', '_blank')} className = "absolute top-2 left-2 border border-[#B476F2] rounded-md cursor-pointer !px-2 py-2 !flex items-center gap-2 text-[#B476F2] bg-black/80 backdrop-blur-sm font-bold hover:bg-black/90 hover:text-[#B476F2] transition-all duration-200" >
        <img src={'xlogo.png'} className = "w-4 h-4 "/>
        <span className="text-sm !py-2">@Clarosdotfun</span></div>
      <MagicalParticles />
      <div className="text-center relative">
        <VibratingTitle text="Claros.fun" />
        <div className='h-6'></div>
        <h1 
          className="text-lg sm:text-xl md:text-2xl mb-12 font-white uppercase text-center leading-[0.70em] outline-none"
          style={{
            fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive',
            fontWeight: 600,
            letterSpacing: '3px',
            animation: 'dimlight 5s infinite',
            WebkitBoxReflect: 'below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.27))',
          }}
        >
          Under development...
        </h1>
        <style jsx>{`
          @keyframes dimlight {
            0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92% {
              color: #4a1a5c;
              text-shadow: none;
            }
            18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100% {
              color: #fff;
              text-shadow: 0 0 10px #B476F2, 0 0 20px #B476F2, 0 0 30px #B476F2;
            }
          }
        `}</style>
        <div className="flex justify-center !mt-8">
            <CleanButton  isCleaning={isCleaning} isPreparing={isPreparing} onClick={onCleanClick} />
        </div>
      </div>
    </div>
  );
};

export default CentralBranding;
