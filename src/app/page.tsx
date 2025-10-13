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
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const { initAudio, playHitSound, playDisappearSound, playHitmarkerSound, playFadeSound, playVacuumSound } = useAudio();
  const { memeElements, hitMarkers, fogEffects, explosionEffects, containerRef, cleanAllElements, removeFogEffect, removeExplosionEffect, handleMemeElementClick } = useMemeElements(isCleaning, playDisappearSound, playHitmarkerSound, );

  // Initialize audio
  useEffect(() => {
    initAudio();
  }, [initAudio]);

  const handleStart = () => {
    setIsLoading(false);
    // Start fade-up animation
    setIsAnimatingIn(true);
  };

  const handleCleanClick = () => {
    if (!isCleaning) {
      // Play vacuum cleaner sound immediately
      const vacuumAudio = playVacuumSound();
      
      // Add screen vibration effect immediately
      const container = containerRef.current;
      if (container) {
        container.style.animation = 'screenShake 1s ease-in-out';
        setTimeout(() => {
          container.style.animation = '';
        }, 1000);
      }
      
      // Wait for vacuum sound to finish, then explode memes
      const vacuumDuration = vacuumAudio ? (vacuumAudio.duration * 500) : 2000; // Default 3s if can't get duration
      
      // Use a fixed duration since audio.duration might not be available immediately
      setTimeout(() => {
        // Play hit sound for each element
        memeElements.forEach(() => {
          playHitSound();
        });
        
        // Clean all elements (trigger explosion)
        cleanAllElements();
      }, 2000); // Wait 3 seconds for vacuum sound to finish
    }
    
    setIsCleaning(!isCleaning);
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onStart={handleStart} />;
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-screen overflow-hidden bg-black transition-all duration-1000 ease-out ${
        isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
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
