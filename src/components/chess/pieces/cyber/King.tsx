
import React from 'react';
import { PieceIconProps } from '../types';

export const CyberKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 4v37M4 22.5h37" stroke={strokeColor} strokeWidth="1" opacity="0.3" strokeDasharray="2 4" />
    <rect x="12" y="12" width="21" height="21" fill={fillColor} stroke={strokeColor} strokeWidth="3" rx="1" />
    <path d="M22.5 6v6M22.5 33v6M6 22.5h6M33 22.5h6" stroke={fillColor} strokeWidth="3" strokeLinecap="square" />
    <path d="M18 22.5h9M22.5 18v9" stroke={strokeColor} strokeWidth="2" />
  </svg>
);
