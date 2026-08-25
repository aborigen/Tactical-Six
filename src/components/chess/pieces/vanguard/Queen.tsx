
import React from 'react';
import { PieceIconProps } from '../types';

export const VanguardQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 6l-5 8-8-2 4 10-6 4 9 8h12l9-8-6-4 4-10-8 2-5-8z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M14 37h17" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M22.5 16v12M16 22h13" stroke={strokeColor} strokeWidth="1.5" opacity="0.3" />
    <circle cx="22.5" cy="22" r="3" fill={strokeColor} />
  </svg>
);
