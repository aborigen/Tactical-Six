
import React from 'react';
import { PieceIconProps } from '../types';

export const VanguardRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M12 34V12h4v3h2v-3h2v3h2v-3h2v3h4v22H12z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M12 37h21M16 20h13M16 26h13" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M22.5 15v19" stroke={strokeColor} strokeWidth="1" opacity="0.2" />
  </svg>
);
