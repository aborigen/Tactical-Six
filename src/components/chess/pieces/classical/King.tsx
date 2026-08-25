import React from 'react';
import { PieceIconProps } from '../types';

/**
 * Classical King: Elegant Merida silhouette with a prominent tactical cross.
 */
export const ClassicalKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 5v5M20 7.5h5" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M13 33c0-12 4-18 9.5-18s9.5 6 9.5 18H13z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M16 22h13M11 37h23M12 33h21" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
