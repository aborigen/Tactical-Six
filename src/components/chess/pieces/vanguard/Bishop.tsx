
import React from 'react';
import { PieceIconProps } from '../types';

export const VanguardBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 8l-7 12 4 4-2 10h10l-2-10 4-4-7-12z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M16 34h13M15 37h15" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M22.5 8v6" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <circle cx="22.5" cy="22" r="2" fill={strokeColor} opacity="0.3" />
  </svg>
);
