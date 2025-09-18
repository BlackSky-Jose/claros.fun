import { useRef, useCallback } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(async () => {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioContext;
    } catch {
      console.log('Audio not supported');
    }
  }, []);

  const playHitSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(1200, audioContextRef.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContextRef.current.currentTime + 0.15);
      
      gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.15);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.15);
    } catch {
      console.log('Audio playback failed');
    }
  }, []);

  const playDisappearSound = useCallback(() => {
    try {
      const audio = new Audio('/sound.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        console.log('Sound file playback failed');
      });
    } catch {
      console.log('Sound file not found or failed to load');
    }
  }, []);

  const playHitmarkerSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      // Hitmarker sound: quick high-pitched beep
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContextRef.current.currentTime + 0.05);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContextRef.current.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.1);
    } catch {
      console.log('Hitmarker audio playback failed');
    }
  }, []);

  const playFadeSound = useCallback(() => {
    try {
      const audio = new Audio('/fade.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => {
        console.log('Fade sound file playback failed');
      });
    } catch {
      console.log('Fade sound file not found or failed to load');
    }
  }, []);

  return { initAudio, playHitSound, playDisappearSound, playHitmarkerSound, playFadeSound };
};
