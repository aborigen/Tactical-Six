import React from 'react';

interface PieceIconProps {
  fillColor: string;
  strokeColor: string;
}

/**
 * Classical Piece Set: Refined Merida-inspired Staunton pieces.
 * Features elegant curves and traditional tactical geometry.
 */

export const ClassicalPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 9c-2.4 0-4 2-4 4.5 0 1.5 1 2.8 2.2 3.5-2 2-3.7 5.5-3.7 10 0 3.5 1.5 6 5.5 6s5.5-2.5 5.5-6c0-4.5-1.7-8-3.7-10 1.2-.7 2.2-2 2.2-3.5 0-2.5-1.6-4.5-4-4.5z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M15 36h15" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

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

export const ClassicalBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 9c-3.5 0-6 4.5-6 10s2.5 10 6 15 6-9.5 6-15-2.5-10-6-10z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="22.5" cy="9" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <path d="M18 19l9 4M15 37h15M14 33h17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ClassicalQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 12l-4 7-6-2 3 9-5 3 8 7h8l8-7-5-3 3-9-6 2-4-7z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="22.5" cy="12" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <circle cx="12" cy="17" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <circle cx="33" cy="17" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <circle cx="11" cy="28" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <circle cx="34" cy="28" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
    <path d="M12 37h21M13 33h19" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

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
    <path d="M16 22h13M11 37h23M12 33h21" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
