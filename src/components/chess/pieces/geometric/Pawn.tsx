
import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Geometric Pawn: Clean, circular head with a trapezoidal base.
 * Follows the high-fidelity tactical grid specifications.
 */
export const GeometricPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full">
    <polygon 
      points="12,40 33,40 28,30 17,30" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
    <rect x="16" y="28" width="13" height="2.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    <circle cx="22.5" cy="20" r="8" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
  </svg>
);
