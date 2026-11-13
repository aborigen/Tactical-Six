
import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Geometric King: Strategic cross topping a solid circular frame.
 */
export const GeometricKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
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
        d="M22.5 11a9 9 0 1 0 0 17 9 9 0 0 0 0-17z" 
        fill={fillColor} 
        stroke={strokeColor} 
        strokeWidth="2.5" 
      />
      <path d="M22.5 4v6M19.5 7h6" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);
