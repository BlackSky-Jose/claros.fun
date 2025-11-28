# Components

This directory contains all the reusable React components for the Claros.fun website.

## Components

### Background
- **File**: `Background.tsx`
- **Purpose**: Renders the animated web-like mesh background
- **Props**: None

### CentralBranding
- **File**: `CentralBranding.tsx`
- **Purpose**: Displays the main title, subtitle, and clean button
- **Props**:
  - `isCleaning: boolean` - Whether cleaning mode is active
  - `onCleanClick: () => void` - Callback for clean button click

### MemeElement
- **File**: `MemeElement.tsx`
- **Purpose**: Renders individual meme elements with animations
- **Props**:
  - `id: string` - Unique identifier
  - `x: number` - X position
  - `y: number` - Y position
  - `size: number` - Element size
  - `rotation: number` - Rotation angle
  - `src: string` - Image source URL
  - `alt: string` - Alt text
  - `opacity: number` - Opacity value
  - `isHit?: boolean` - Whether element is being hit

### HitMarker
- **File**: `HitMarker.tsx`
- **Purpose**: Renders hit marker effects when cleaning
- **Props**:
  - `id: string` - Unique identifier
  - `x: number` - X position
  - `y: number` - Y position

### CleanButton
- **File**: `CleanButton.tsx`
- **Purpose**: Interactive clean button with loading states
- **Props**:
  - `isCleaning: boolean` - Whether cleaning mode is active
  - `onClick: () => void` - Click handler

## Usage

```tsx
import { Background, CentralBranding, MemeElement, HitMarker } from '@/components';
```
## Contact
 http://x.com/BlackSky_jose