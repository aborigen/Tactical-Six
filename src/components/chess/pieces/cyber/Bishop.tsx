
import React from 'react';
import { PieceIconProps } from '../types';

export const CyberBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 8l15 28h-30z" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />
    <path d="M22.5 12l11 20h-22z" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="miter" />
    <circle cx="22.5" cy="24" r="4" fill="none" stroke={strokeColor} strokeWidth="1.5" />
    <path d="M22.5 12v4" stroke={strokeColor} strokeWidth="2" />
  </svg>
);
