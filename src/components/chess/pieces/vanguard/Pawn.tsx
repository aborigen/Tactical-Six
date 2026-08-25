
import React from 'react';
import { PieceIconProps } from '../types';

export const VanguardPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 10l-6 6v4l2 2-2 10h12l-2-10 2-2v-4l-6-6z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M18 34h9" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <rect x="21" y="14" width="3" height="3" fill={strokeColor} opacity="0.4" />
  </svg>
);
