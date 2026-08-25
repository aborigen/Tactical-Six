
import React from 'react';
import { PieceIconProps } from '../types';

export const CyberKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M10 35L22.5 10L35 35Z" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" />
    <path d="M14 32l8.5-18 8.5 18z" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="miter" />
    <path d="M22.5 18v10" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <rect x="21" y="32" width="3" height="3" fill={strokeColor} />
  </svg>
);
