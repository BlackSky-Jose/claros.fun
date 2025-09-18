'use client';

import { useState, useEffect } from 'react';
import { Background, CentralBranding, MemeElement, FogEffect, TunnelEffect, ExplosionEffect, HitMarker } from '@/components';
import MagicalOrbs from '@/components/MagicalOrbs';
import ScanlineEffect from '@/components/ScanlineEffect';
import LoadingScreen from '@/components/LoadingScreen';
import SpaceEffect from '@/components/SpaceEffect';
import { useAudio, useMemeElements } from '@/hooks';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCleaning, setIsCleaning] = useState(false);
  const { initAudio, playHitSound, playDisappearSound, playHitmarkerSound, playFadeSound } = useAudio();
  const { memeElements, hitMarkers, fogEffects, explosionEffects, containerRef, cleanAllElements, removeFogEffect, removeExplosionEffect, handleMemeElementClick } = useMemeElements(isCleaning, playDisappearSound, playHitmarkerSound, );

  // Initialize audio
  useEffect(() => {
    initAudio();
  }, [initAudio]);

  const handleStart = () => {
    setIsLoading(false);
  };

  const handleCleanClick = () => {
    if (!isCleaning) {
      // Play hit sound for each element
      memeElements.forEach(() => {
        playHitSound();
      });
      
      // Add screen vibration effect
      const container = containerRef.current;
      if (container) {
        container.style.animation = 'screenShake 1s ease-in-out';
        setTimeout(() => {
          container.style.animation = '';
        }, 1000);
      }
      
      
      // Clean all elements
      cleanAllElements();
    }
    
    setIsCleaning(!isCleaning);
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onStart={handleStart} />;
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <SpaceEffect />
      <TunnelEffect />
      {/* <Background /> */}
      <MagicalOrbs />
      {/* <ScanlineEffect /> */}
      {/* <MouseTail isActive={!isLoading} /> */}
      <CentralBranding isCleaning={isCleaning} onCleanClick={handleCleanClick} />
      
      {memeElements.map((element) => (
        <MemeElement
          key={element.id}
          id={element.id}
          x={element.x}
          y={element.y}
          size={element.size}
          rotation={element.rotation}
          src={element.src}
          alt={element.alt}
          opacity={element.opacity}
          isHit={element.isHit}
          onClick={handleMemeElementClick}
        />
      ))}

      {/* Fog Effects */}
      {fogEffects.map((fog) => (
        <FogEffect
          key={fog.id}
          x={fog.x}
          y={fog.y}
          size={fog.size}
          duration={fog.duration}
          onComplete={() => removeFogEffect(fog.id)}
        />
      ))}

      {/* Hit Markers */}
      {hitMarkers.map((marker) => (
        <HitMarker
          key={marker.id}
          x={marker.x}
          y={marker.y}
          onComplete={() => {
            // HitMarker will be auto-removed by the cleanup effect in useMemeElements
          }}
        />
      ))}

    </div>
  );
}
