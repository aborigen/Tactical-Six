import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Classical Rook: Solid battlement tower with clean Staunton crenellations.
 */
export const ClassicalRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M9 39h27v-3H9v3zM12 36v-21h21v21H12zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M14 32h17M14 17h17" stroke={strokeColor} strokeWidth="1" opacity="0.4" />
  </svg>
);
