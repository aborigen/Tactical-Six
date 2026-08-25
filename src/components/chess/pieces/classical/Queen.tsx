import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Classical Queen: Refined Merida crown with spheres and elegant pointed silhouette.
 */
export const ClassicalQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 12l-4 7-6-2 3 9-5 3 8 7h8l8-7-5-3 3-9-6 2-4-7z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="22.5" cy="12" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <circle cx="12" cy="17" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <circle cx="33" cy="17" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <circle cx="11" cy="28" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <circle cx="34" cy="28" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <path d="M12 37h21M13 33h19" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
