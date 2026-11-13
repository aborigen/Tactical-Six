
import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Refined Geometric Rook: Crenellated tactical tower on a unified base.
 */
export const GeometricRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
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
      d="M13 28V10h4v3h2v-3h2v3h2v-3h4v18H13z" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="2.5" 
      strokeLinejoin="round" 
    />
  </svg>
);
