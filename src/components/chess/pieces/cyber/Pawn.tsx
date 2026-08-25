
import React from 'react';
import { PieceIconProps } from '../types';

export const CyberPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <circle cx="22.5" cy="22.5" r="12" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 2" />
    <circle cx="22.5" cy="22.5" r="8" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    <rect x="20.5" y="20.5" width="4" height="4" fill={strokeColor} />
  </svg>
);
