import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Classical Bishop: Elegant Merida-style mitre with a deep tactical slot.
 */
export const ClassicalBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 9c-3.5 0-6 4.5-6 10s2.5 10 6 15 6-9.5 6-15-2.5-10-6-10z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="22.5" cy="9" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    {/* Tactical mitre slot */}
    <path 
      d="M18.5 16.5l8 6" 
      stroke={strokeColor} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    <path d="M15 37h15M14 33h17" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
