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
    <div className=" relative z-10 flex flex-col items-center justify-center h-full px-4 mb-10 pb-10">
      <MagicalParticles />
      <div className="text-center relative">
        <VibratingTitle text="Claros.fun" />
        <div className='h-3'></div>
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
