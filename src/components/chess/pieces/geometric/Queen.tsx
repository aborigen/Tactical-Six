
import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Refined Geometric Queen: Radial crown unit with centered high-command sphere.
 */
export const GeometricQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
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
      d="M13 28l-2-12 5 4 6.5-12 6.5 12 5-4-2 12H13z" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
    <circle cx="22.5" cy="20" r="3" fill={strokeColor} />
  </svg>
);
