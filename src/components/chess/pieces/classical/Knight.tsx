import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Refined Classical Knight: Merida-inspired Staunton geometry.
 * Features a more expressive silhouette with a distinct snout, ears, and mane.
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
    {/* Merida Snout & Jawline */}
    <path 
      d="M24 18c2.5 0 5 1.5 5 4.5s-2 4-5 4" 
      fill="none" 
      stroke={strokeColor} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    {/* Distinct Merida Ear */}
    <path 
      d="M20 12l-2.5-3.5L15 12" 
      fill={fillColor} 
      stroke={strokeColor} 
      strokeWidth="1.5" 
      strokeLinejoin="round" 
    />
    {/* Expressive Eye */}
    <circle cx="27.5" cy="16.5" r="1.2" fill={strokeColor} />
    {/* Detailed Mane */}
    <path 
      d="M14.5 28c-1.5-6 1-12 5-14.5" 
      fill="none" 
      stroke={strokeColor} 
      strokeWidth="1" 
      strokeDasharray="2 1" 
      opacity="0.6"
    />
    <path d="M11 37h23" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
  </svg>
);
