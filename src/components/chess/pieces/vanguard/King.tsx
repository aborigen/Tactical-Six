
import React from 'react';
import { PieceIconProps } from '../types';

export const VanguardKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 12V6M19 9h7"
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinecap="square"
    />
    <path
      d="M13 34c0-12 4-18 9.5-18s9.5 6 9.5 18H13z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M11 37h23" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M22.5 16v18" stroke={strokeColor} strokeWidth="1" opacity="0.2" />
  </svg>
);
