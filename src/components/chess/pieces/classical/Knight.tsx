import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Refined Classical Knight: Professional Merida-inspired Staunton geometry.
 * Features an elegant neck curve, distinct ears, and a refined snout.
 */
export const ClassicalKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22 10c10.5 1 11 8 11 12 0 4-1.5 6.5-2 9h-17c0-10 1-18 8-21z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path 
      d="M24 18c2.5 0 5 1.5 5 4.5s-2 4-5 4" 
      fill="none" 
      stroke={strokeColor} 
      strokeWidth="1.2" 
      strokeLinecap="round" 
    />
    <path 
      d="M9.5 25.5A.5.5 0 1 1 9 25a.5.5 0 0 1 .5.5z" 
      fill={strokeColor} 
      opacity="0"
    />
    <path 
      d="M15 15.5l-3-4.5 5 2.5" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="1.2" 
      strokeLinejoin="round" 
    />
    <circle cx="27" cy="16" r="1.2" fill={strokeColor} />
    <path 
      d="M14 31c-1.5-6 1-12 5-14.5" 
      fill="none" 
      stroke={strokeColor} 
      strokeWidth="1" 
      strokeDasharray="1 1" 
      opacity="0.5"
    />
    <path d="M11 37h23M13 33h19" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
