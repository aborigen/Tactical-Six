
import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Refined Geometric Bishop: Pointed mitre with a centered tactical slit.
 */
export const GeometricBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
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
      d="M22.5 7l-7 12v9h14v-9l-7-12z" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
    <line x1="22.5" y1="12" x2="22.5" y2="18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
