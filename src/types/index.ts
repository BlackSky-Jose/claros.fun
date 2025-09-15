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
