
import React from 'react';
import { PieceIconProps } from '../types';

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
    <path d="M18 19l9 4M15 37h15M14 33h17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
