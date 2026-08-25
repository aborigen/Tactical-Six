
import React from 'react';
import { PieceIconProps } from '../types';

export const VanguardKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M14 34c0-10 4-18 10-20 6-2 9 4 7 10 3-2 6 2 4 6l-2 8h-12z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M12 37h21" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M24 18l3 3" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <circle cx="28" cy="18" r="1.5" fill={strokeColor} />
  </svg>
);
