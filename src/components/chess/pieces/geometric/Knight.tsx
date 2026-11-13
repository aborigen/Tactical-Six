
import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Geometric Knight: Abstract L-shaped profile with a tactical arc.
 */
export const GeometricKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full">
    <polygon 
      points="9,40 36,40 30,30 15,30" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
    <rect x="14" y="28" width="17" height="2.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    <g>
      <path 
        d="M26 28 L14 28 C14 28, 14 10, 26 10 L26 28 Z" 
        fill={fillColor} 
        stroke={strokeColor} 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
      />
      <path 
        d="M26 5 A 11 11 0 0 1 26 27" 
        fill="none" 
        stroke={strokeColor} 
        strokeWidth="3.5" 
        strokeLinecap="butt" 
      />
      <path 
        d="M22 5.5 H28" 
        stroke={strokeColor} 
        strokeWidth="3.5" 
        strokeLinecap="butt" 
      />
    </g>
  </svg>
);
