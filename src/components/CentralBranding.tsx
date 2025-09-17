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
      <div className = "absolute top-2 left-2 border-3 rounded-md cursor-pointer  !px-1 !flex justify-between items-center text-black bg-gray-300 opacity-50 shadow-md shadow-green-900 font-bold hover:opacity-90 hover:shadow-green-300" >
        <img src={'/x.svg'} className = "w-6 h-6"/>
        <span>@Claros</span></div>
      <MagicalParticles />
      <div className="text-center relative">
        <VibratingTitle text="Claros.fun" />
        <div className='h-6'></div>
        <p className="text-lg sm:text-xl md:text-2xl mb-12 font-light tv-subtitle">
          Coming soon...
        </p>
        <div className="flex justify-center">
            <CleanButton  isCleaning={isCleaning} onClick={onCleanClick} />
        </div>
      </div>
    </div>
  );
};

export default CentralBranding;
