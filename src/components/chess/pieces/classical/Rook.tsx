import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Classical Rook: Solid, Staunton-inspired battlement geometry.
 */
export const ClassicalRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M12 33V13h2v-3h3v3h3v-3h3v3h3v-3h3v3h2v20H12z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M11 37h23" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
    <path d="M14 33h17M14 16h17" stroke={strokeColor} strokeWidth="1" opacity="0.4" />
  </svg>
);
