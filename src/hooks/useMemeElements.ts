import { useState, useEffect, useRef } from 'react';

export interface MemeElement {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  src: string;
  alt: string;
  duration: number;
  opacity: number;
  isHit?: boolean;
  createdAt: number;
}

export interface HitMarker {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

export interface FogEffect {
  id: string;
  x: number;
  y: number;
  isActive: boolean;
  createdAt: number;
  duration: number;
  size: number;
}


const MEME_IMAGES = [
  'https://static.wikia.nocookie.net/muc/images/2/22/Pepthefrog.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/250px-DemocraticLogo.svg.png',
  'https://specials-images.forbesimg.com/imageserve/6890d9978dc6d3c0d4c53d38/960x0.png',
  'https://i.imgflip.com/73qvau.png',
];


export const useMemeElements = (isCleaning: boolean, playDisappearSound?: () => void) => {
  const [memeElements, setMemeElements] = useState<MemeElement[]>([]);
  const [hitMarkers, setHitMarkers] = useState<HitMarker[]>([]);
  const [fogEffects, setFogEffects] = useState<FogEffect[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateMemeElement = (): MemeElement => {
    const container = containerRef.current;
    if (!container) return {} as MemeElement;

    const containerRect = container.getBoundingClientRect();
    const size = Math.random() * 100 + 30; // 30-130px
    const x = Math.random() * (containerRect.width - size);
    const y = Math.random() * (containerRect.height - size);
    const rotation = Math.random() * 360; //////////////////// corrected rotation ////////////////////
    //////////////////// corrected rotation ////////////////////
    const duration = Math.random() * 4000 + 3000; // 3-7 seconds
    const src = MEME_IMAGES[Math.floor(Math.random() * MEME_IMAGES.length)];

  return {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    x,
    y,
    size,
    rotation,
    src,
    alt: 'Meme',
    duration,
    opacity: 1,
    isHit: false,
    createdAt: Date.now(),
  };
  };

  // Generate random meme elements
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCleaning) {
        const newElement = generateMemeElement();
        console.log('Generated new meme element:', newElement);
        setMemeElements(prev => {
          const updated = [...prev, newElement];
          console.log('Total meme elements:', updated.length);
          return updated;
        });

        // Remove element after duration with fog effect
        setTimeout(() => {
          setMemeElements(prev => {
            const element = prev.find(el => el.id === newElement.id);
            if (element) {
              // Add fog effect when element disappears
              addFogEffect(element.x + element.size / 2, element.y + element.size / 2, element.size);
              // Play disappear sound
              if (playDisappearSound) {
                playDisappearSound();
              }
            }
            return prev.filter(el => el.id !== newElement.id);
          });
        }, newElement.duration);
      }
    }, 1000); // New meme every 3 seconds

    return () => clearInterval(interval);
  }, [isCleaning]);

  // Auto-remove new elements in cleaning mode
  useEffect(() => {
    if (isCleaning) {
      const interval = setInterval(() => {
        setMemeElements(prev => {
          const now = Date.now();
          return prev.filter(el => {
            const age = now - el.createdAt;
            return age < 500; // Keep elements less than 0.5 seconds old
          });
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isCleaning]);

  // Clean up hit markers
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setHitMarkers(prev => prev.filter(marker => now - marker.timestamp < 1000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Clean up old fog effects (force removal after 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFogEffects(prev => {
        const filtered = prev.filter(fog => now - fog.createdAt < 5000); // 5 seconds max
        if (filtered.length < prev.length) {
          console.log('Cleaned up old fog effects, removed:', prev.length - filtered.length);
        }
        return filtered;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);




  const addFogEffect = (x: number, y: number, size: number) => {
    const fogId = Math.random().toString(36).substr(2, 9);
    const duration = 800; // 0.8 seconds fog effect - much faster
    console.log('Adding fog effect at:', x, y, 'ID:', fogId, 'Size:', size);
    
    setFogEffects(prev => [...prev, {
      id: fogId,
      x,
      y,
      isActive: true,
      createdAt: Date.now(),
      duration,
      size: size * 2.5, // Make fog much larger than the image for more impact
    }]);
  };

  const removeFogEffect = (id: string) => {
    console.log('Removing fog effect:', id);
    setFogEffects(prev => prev.filter(fog => fog.id !== id));
  };

  const cleanAllElements = () => {
    setMemeElements(prev => {
      // Add fog effects for all elements when cleaning
      prev.forEach(el => {
        addFogEffect(el.x + el.size / 2, el.y + el.size / 2, el.size);
      });
      
      // Play disappear sound for each element
      if (playDisappearSound) {
        prev.forEach(() => {
          playDisappearSound();
        });
      }
      
      // Set opacity to 0 for all elements
      return prev.map(el => ({ ...el, opacity: 0, isHit: true }));
    });

    // Remove all elements after a short delay
    setTimeout(() => {
      setMemeElements([]);
    }, 100);
  };

  return {
    memeElements,
    hitMarkers,
    fogEffects,
    containerRef,
    cleanAllElements,
    removeFogEffect,
  };
};
