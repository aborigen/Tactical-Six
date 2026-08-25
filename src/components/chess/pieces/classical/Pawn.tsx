
import React from 'react';
import { PieceIconProps } from '../types';

export const ClassicalPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 9c-2.4 0-4 2-4 4.5 0 1.5 1 2.8 2.2 3.5-2 2-3.7 5.5-3.7 10 0 3.5 1.5 6 5.5 6s5.5-2.5 5.5-6c0-4.5-1.7-8-3.7-10 1.2-.7 2.2-2 2.2-3.5 0-2.5-1.6-4.5-4-4.5z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M15 36h15" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
