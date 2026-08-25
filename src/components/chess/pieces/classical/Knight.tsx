
import React from 'react';
import { PieceIconProps } from '../types';

export const ClassicalKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22 10c10.5 1 11 8 11 12 0 4-1.5 6.5-2 9h-17c0-10 1-18 8-21z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M24 18c0.5-2 3-2 3.5 0"
      stroke={strokeColor}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M13 31l4-1.5 3 2.5"
      stroke={strokeColor}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M14 31c-1-5 1-10 4-12"
      stroke={strokeColor}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M20 12l-2-2-2 3"
      stroke={strokeColor}
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      opacity="0.8"
    />
    <circle cx="27" cy="16" r="1.2" fill={strokeColor} />
    <path d="M11 37h23" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
  </svg>
);
