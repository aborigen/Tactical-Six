import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Classical Bishop: Elegant Mitre with a tactical slot and rounded top ball.
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
    <path d="M17.5 17.5l9 6" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 37h17M15 33h15" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
