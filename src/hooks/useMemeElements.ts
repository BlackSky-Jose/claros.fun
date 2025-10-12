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

export interface ExplosionEffect {
  id: string;
  x: number;
  y: number;
  size: number;
  createdAt: number;
}



// const MEME_IMAGES = [
//   "https://gateway.lighthouse.storage/ipfs/bafybeifeh3mrz56zvaygzedlol3sez7keyko3bpmwsywfzhpumew527moa/1.png",
//   "https://gateway.lighthouse.storage/ipfs/bafybeifeh3mrz56zvaygzedlol3sez7keyko3bpmwsywfzhpumew527moa/7.png",
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635167731712010/crying_arabist_wojak.png?ex=68cb3322&is=68c9e1a2&hm=b31ea1c94d15ce420b5dd2bd13a7b72b1098ea556f1133d27083228c1dd4490f&',
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635167387783348/13239-jeet.png?ex=68cb3322&is=68c9e1a2&hm=0bce3cf1732157c580390525fc33209f1df798d50ff0e41b2f58253f324d2d76&',
//   "https://gateway.lighthouse.storage/ipfs/bafybeifeh3mrz56zvaygzedlol3sez7keyko3bpmwsywfzhpumew527moa/3.png",
//   "https://gateway.lighthouse.storage/ipfs/bafybeifeh3mrz56zvaygzedlol3sez7keyko3bpmwsywfzhpumew527moa/2.png",
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635165878091848/Brr-Brr-Patapim-Viral-TikTok-Meme.png?ex=68cb3321&is=68c9e1a1&hm=c2fa2a671e612962177b5fe1dc6aff65ba04a1aa5d6224c59daf405d04fdd574&',
//   'https://static.wikia.nocookie.net/muc/images/2/22/Pepthefrog.png',
//   'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png',
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635167002165268/dfbq3d8-d327b451-ef05-494a-b455-32c0156e6a18.png?ex=68cb3322&is=68c9e1a2&hm=2c8e946d00c0682aaec1b4d1bef9f22f656b9cde5b9174fbc877279a205a4786&',
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635166716690522/328-3289174_trans-pride-flag-pixel-car-transparent.png?ex=68cb3322&is=68c9e1a2&hm=e10fe5a77d7db4b4cf4a4b5341ab0715cb13856d91c7b87a85d886831114aee7&',
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635165106077736/donald_trump_finger_raise_meme_wojak.png?ex=68cb3321&is=68c9e1a1&hm=d5d61010f4dcdbd0c4c3cbe3a0f805004572cd26aff4e95cda3f258998648df1&',
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635166406316072/Tung-Tung-Tung-Sahur-TikTok-Meme-Character-Transparent.png?ex=68cb3322&is=68c9e1a2&hm=205560567c828eefea78dcae6622d9d7880bf8132bf92137eeb1af6fcada62ec&',
//   "https://gateway.lighthouse.storage/ipfs/bafybeifeh3mrz56zvaygzedlol3sez7keyko3bpmwsywfzhpumew527moa/6.png",
//   "https://gateway.lighthouse.storage/ipfs/bafybeifeh3mrz56zvaygzedlol3sez7keyko3bpmwsywfzhpumew527moa/5.png",
//   "https://gateway.lighthouse.storage/ipfs/bafybeifeh3mrz56zvaygzedlol3sez7keyko3bpmwsywfzhpumew527moa/4.png",
//   'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/250px-DemocraticLogo.svg.png',
//   'https://specials-images.forbesimg.com/imageserve/6890d9978dc6d3c0d4c53d38/960x0.png',
//   'https://i.imgflip.com/73qvau.png',
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635168545411245/solana-sol-logo.png?ex=68cb3322&is=68c9e1a2&hm=c1349a59b9a13ea01becf00fb7b5ef3a2fc9ce0d17d2094433d961403b0512d5&',
//   'https://cdn.discordapp.com/attachments/1177655125012119603/1417635168084295851/pixel-art-1685476982.png?ex=68cb3322&is=68c9e1a2&hm=0f7e692d2c34c84962c4314e7b684921bb5e1bba5ab5f4cda95bde351aa18b39&',
// ];

const MEME_IMAGES = [
  "./meme1/a (8).png",
  "./meme1/a (9).png",
  "./meme1/a (10).png",
  "./meme1/a (11).png",
  "./meme1/a (12).png",
  "./meme1/a (13).png",
  "./meme1/a (14).png",
  "./meme1/b (1).webp",
  "./meme1/a (1).png",
  "./meme1/a (2).png",
  "./meme1/a (3).png",
  "./meme1/a (4).png",
  "./meme1/a (5).png",
  "./meme1/a (6).png",
  "./meme1/a (7).png",
  "./meme1/a (8).png",
  "./meme1/b (4).webp",
  "./meme1/b (5).webp",
  "./meme1/b (6).webp",
  "./meme1/a (9).png",
  "./meme1/a (10).png",
  "./meme1/a (11).png",
  "./meme1/a (12).png",
  "./meme1/a (13).png",
  "./meme1/a (14).png",
  "./meme1/b (1).webp",
  "./meme1/b (2).webp",
  "./meme1/b (3).webp",
  "./meme1/b (7).webp",
  "./meme1/b (8).webp",
];

// Predefined spawn points (percentage of screen width/height)
const SPAWN_POINTS = [
  // Top row
  { x: 0.08, y: 0.18 },  { x: 0.98, y: 0.65 }, { x: 0.22, y: 0.58 }, { x: 0.28, y: 0.14 }, { x: 0.45, y: 0.88 },
  { x: 0.92, y: 0.08 }, { x: 0.02, y: 0.65 }, { x: 0.65, y: 0.08 }, { x: 0.75, y: 0.75 }, { x: 0.98, y: 0.45 }, 
  { x: 0.15, y: 0.72 }, { x: 0.85, y: 0.12 }, { x: 0.05, y: 0.25 }, { x: 0.65, y: 0.88 },{ x: 0.95, y: 0.78 },
  { x: 0.15, y: 0.22 }, { x: 0.35, y: 0.85 } , { x: 0.95, y: 0.28 },{ x: 0.12, y: 0.55 }, { x: 0.55, y: 0.85 }, 
  { x: 0.88, y: 0.58 },  { x: 0.05, y: 0.75 }, { x: 0.25, y: 0.28 },{ x: 0.75, y: 0.15 }, { x: 0.45, y: 0.08 }, 
  { x: 0.25, y: 0.78 }, { x: 0.88, y: 0.22 }, { x: 0.85, y: 0.72 },{ x: 0.78, y: 0.55 }, { x: 0.78, y: 0.25 },
  {x: 0.18, y: 0.1 },{ x: 0.02, y: 0.45 }, 
];

export const useMemeElements = (isCleaning: boolean, playDisappearSound?: () => void, playHitmarkerSound?: () => void, playFadeSound?: () => void) => {
  const [memeElements, setMemeElements] = useState<MemeElement[]>([]);
  const [hitMarkers, setHitMarkers] = useState<HitMarker[]>([]);
  const [fogEffects, setFogEffects] = useState<FogEffect[]>([]);
  const [explosionEffects, setExplosionEffects] = useState<ExplosionEffect[]>([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState<number>(0);
  const [currentSpawnIndex, setCurrentSpawnIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateMemeElement = (): MemeElement => {
    const container = containerRef.current;
    if (!container) return {} as MemeElement;

    const containerRect = container.getBoundingClientRect();
    const size = Math.random() * 110 + 60; // 60-170px
    
    // Get the next meme in sequential order
    const src = MEME_IMAGES[currentMemeIndex];
    
    // Move to next meme index, loop back to 0 when we reach the end
    setCurrentMemeIndex((currentMemeIndex + 1) % MEME_IMAGES.length);
    
    // Get spawn point in sequential order
    const spawnPoint = SPAWN_POINTS[currentSpawnIndex];
    
    // Move to next spawn point index, loop back to 0 when we reach the end
    setCurrentSpawnIndex((currentSpawnIndex + 1) % SPAWN_POINTS.length);
    
    // Calculate actual pixel positions from percentages
    const x: number = (spawnPoint.x * containerRect.width) - (size / 2); // Center the meme on the point
    const y: number = (spawnPoint.y * containerRect.height) - (size / 2); // Center the meme on the point
    
    // Limit rotation to prevent upside-down images (-45° to +45°)
    const rotation = Math.random() * 90 - 45; // -45 to +45 degrees
    const duration = Math.random() * 4000 + 3000; // 3-7 seconds

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


  // Generate sequential meme elements
  useEffect(() => {
    const interval = setInterval(() => {
      const newElement = generateMemeElement();
      
      console.log('Generated new meme element (sequential):', newElement);
      setMemeElements(prev => {
        const updated = [...prev, newElement];
        console.log('Total meme elements:', updated.length);
        return updated;
      });

      if (isCleaning) {
        // In purging mode: animation (0.3s) + stay (0.6s) = 0.9s total, then fade out
        setTimeout(() => {
          setMemeElements(prev => {
            const element = prev.find(el => el.id === newElement.id);
            if (element) {
              // Add fog effect when element disappears in purging mode
              addFogEffect(element.x + element.size / 2, element.y + element.size / 2, element.size);
              // Play disappear sound in purging mode
              if (playDisappearSound) {
                playDisappearSound();
              }
              // Start fade out after staying visible for 0.6s
              return prev.map(el => 
                el.id === newElement.id 
                  ? { ...el, opacity: 0, isHit: true }
                  : el
              );
            }
            return prev;
          });
          
          // Remove element after fade animation
          setTimeout(() => {
            setMemeElements(prev => prev.filter(el => el.id !== newElement.id));
          }, 500);
        }, 1300); // 0.3s (animation) + 0.6s (stay) = 0.9s total
      } else {
        // Normal mode: slow fade out with fade sound
        setTimeout(() => {
          setMemeElements(prev => {
            const element = prev.find(el => el.id === newElement.id);
            if (element) {
              // Play fade sound when element starts fading out
              if (playFadeSound) {
                playFadeSound();
              }
              // Start slow fade out
              return prev.map(el => 
                el.id === newElement.id 
                  ? { ...el, opacity: 0, isHit: true }
                  : el
              );
            }
            return prev;
          });
          
          // Remove element after fade animation
          setTimeout(() => {
            setMemeElements(prev => prev.filter(el => el.id !== newElement.id));
          }, 1000); // 1 second slow fade out
        }, newElement.duration);
      }
    }, 1000); // New meme every 1 second

    return () => clearInterval(interval);
  }, [isCleaning, playDisappearSound, playFadeSound, currentMemeIndex]);

  // Auto-remove new elements in cleaning mode (backup cleanup)
  useEffect(() => {
    if (isCleaning) {
      const interval = setInterval(() => {
        setMemeElements(prev => {
          const now = Date.now();
          return prev.filter(el => {
            const age = now - el.createdAt;
            return age < 2000; // Keep elements less than 2 seconds old (backup cleanup)
          });
        });
      }, 1000);

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
        const filtered = prev.filter(fog => now - fog.createdAt < 6000); // 5 seconds max
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

  const addExplosionEffect = (x: number, y: number, size: number) => {
    const explosionId = Math.random().toString(36).substr(2, 9);
    console.log('Adding explosion effect at:', x, y, 'ID:', explosionId, 'Size:', size);
    
    setExplosionEffects(prev => [...prev, {
      id: explosionId,
      x,
      y,
      size: size * 1.5,
      createdAt: Date.now(),
    }]);
  };

  const removeExplosionEffect = (id: string) => {
    console.log('Removing explosion effect:', id);
    setExplosionEffects(prev => prev.filter(explosion => explosion.id !== id));
  };

  const handleMemeElementClick = (elementId: string) => {
    const element = memeElements.find(el => el.id === elementId);
    if (element) {
      // Add hitmarker (visual effect only)
      addHitMarker(element.x + element.size / 2, element.y + element.size / 2);
      
      // Play hitmarker sound (only for manual clicks)
      if (playHitmarkerSound) {
        playHitmarkerSound();
      }
      
      // Start fade out animation
      setMemeElements(prev => 
        prev.map(el => 
          el.id === elementId 
            ? { ...el, opacity: 0, isHit: true }
            : el
        )
      );
      
      // Remove the element after fade animation completes
      setTimeout(() => {
        setMemeElements(prev => prev.filter(el => el.id !== elementId));
      }, 500); // Match the CSS fade-out duration
    }
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

  const addHitMarker = (x: number, y: number) => {
    const markerId = Math.random().toString(36).substr(2, 9);
    setHitMarkers(prev => [...prev, {
      id: markerId,
      x,
      y,
      timestamp: Date.now(),
    }]);
  };

  return {
    memeElements,
    hitMarkers,
    fogEffects,
    explosionEffects,
    containerRef,
    cleanAllElements,
    removeFogEffect,
    removeExplosionEffect,
    handleMemeElementClick,
  };
};
