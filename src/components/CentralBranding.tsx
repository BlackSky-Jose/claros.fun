import React from 'react';
import CleanButton from './CleanButton';
import MagicalParticles from './MagicalParticles';
import VibratingTitle from './VibratingTitle';

interface CentralBrandingProps {
  isCleaning: boolean;
  onCleanClick: () => void;
}

const CentralBranding: React.FC<CentralBrandingProps> = ({ isCleaning, onCleanClick }) => {
  return (
    <div className=" relative z-10 flex flex-col items-center justify-center h-full px-4 mb-10 pb-10 mt-20 ">
      <div onClick={() => window.open('https://x.com/Clarosdotfun', '_blank')} className = "absolute top-2 left-2 border border-orange-500 rounded-md cursor-pointer !px-2 py-2 !flex items-center gap-2 text-orange-400 bg-black/80 backdrop-blur-sm font-bold hover:bg-black/90 hover:text-orange-300 transition-all duration-200" >
        <img src={'xlogo.png'} className = "w-4 h-4 "/>
        <span className="text-sm !py-2">@Clarosdotfun</span></div>
      <MagicalParticles />
      <div className="text-center relative">
        <VibratingTitle text="Claros.fun" />
        <div className='h-6'></div>
        <p 
          className="text-lg sm:text-xl md:text-2xl mb-12 font-white tv-subtitle"
          style={{
            color: 'white',
            WebkitTextStroke: '3px rgb(153, 41, 0)',
            filter: 'drop-shadow(3px 3px 0px rgba(255, 107, 53, 1)) drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.8))',
            textShadow: `
              3px 3px 0px rgb(252, 59, 1),
              4px 4px 0px rgba(0, 0, 0, 0.8),
              0 0 15px rgba(255, 107, 53, 0.5)
            `,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Under development...
        </p>
        <div className="flex justify-center">
            <CleanButton  isCleaning={isCleaning} onClick={onCleanClick} />
        </div>
      </div>
    </div>
  );
};

export default CentralBranding;
