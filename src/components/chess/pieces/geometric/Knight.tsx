
import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Refined Geometric Knight: Angled L-profile with a sharp tactical edge.
 */
export const GeometricKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full overflow-visible">
    <polygon 
      points="9,40 36,40 30,30 15,30" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
    <rect x="14" y="28" width="17" height="2.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    <path 
      d="M14 28V10h12l4 6-8 2v10H14z" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
    <circle cx="24" cy="14" r="1.5" fill={strokeColor} />
  </svg>
);
