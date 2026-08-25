
import React from 'react';
import { PieceIconProps } from '../types';

export const CyberQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <circle cx="22.5" cy="22.5" r="18" fill="none" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="1 3" />
    <path d="M22.5 6l6 14 11 2-8 8 2 11-11-6-11 6 2-11-8-8 11-2z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
    <circle cx="22.5" cy="22.5" r="4" fill="none" stroke={strokeColor} strokeWidth="2" />
    <path d="M22.5 10v4M22.5 31v4M10 22.5h4M31 22.5h4" stroke={strokeColor} strokeWidth="1" />
  </svg>
);
