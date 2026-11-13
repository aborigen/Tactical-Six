
import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Refined Geometric King: High-Command cross on a solid circular head.
 */
export const GeometricKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full overflow-visible">
    <polygon 
      points="9,40 36,40 30,30 15,30" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
    <rect x="14" y="28" width="17" height="2.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    <g>
      <circle cx="22.5" cy="18" r="9" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
      <path d="M22.5 4v6M19.5 7h6" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);
