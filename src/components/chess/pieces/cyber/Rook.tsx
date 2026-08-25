
import React from 'react';
import { PieceIconProps } from '../types';

export const CyberRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <rect x="10" y="10" width="25" height="25" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />
    <rect x="13" y="13" width="19" height="19" rx="1" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
    <path d="M13 22.5h19M22.5 13v19" stroke={strokeColor} strokeWidth="1.5" />
    <path d="M10 10l5 5M35 10l-5 5M10 35l5-5M35 35l-5-5" stroke={strokeColor} strokeWidth="1" />
  </svg>
);
