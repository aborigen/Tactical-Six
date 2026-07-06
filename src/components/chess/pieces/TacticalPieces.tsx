import React from 'react';

interface PieceIconProps {
  fillColor: string;
  strokeColor: string;
}

/**
 * Vanguard Piece Set: A modern, high-fidelity professional chess set.
 * Designed with a clean silhouette and consistent 2px stroke weight.
 */

export const TacticalPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 12c-2.5 0-4.5 2-4.5 4.5 0 1.5.8 2.8 2 3.5-2.5 2-3.5 5-3.5 9v4h12v-4c0-4-1-7-3.5-9 1.2-.7 2-2 2-3.5 0-2.5-2-4.5-4.5-4.5z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M16 36h13" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TacticalRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M13 33V15h2v-4h3v3h3v-3h3v3h3v-3h3v4h2v18H13z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M12 37h21" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 19h13M16 26h13" stroke={strokeColor} strokeWidth="1.5" opacity="0.3" />
  </svg>
);

export const TacticalKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M14 33c0-8 2-15 10-18 6-2 10 2 10 8 0 4-3 7-5 8l-2 10h-13z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M14 37h17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <circle cx="26" cy="18" r="1.5" fill={strokeColor} />
  </svg>
);

export const TacticalBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 9c-3.5 0-6 4-6 9s2.5 9 6 15 6-10 6-15-2.5-9-6-9z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M16 33h13M15 37h15" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <path d="M22.5 9v4" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TacticalQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 9l-4 7-6-2 3 9-5 3 8 7h8l8-7-5-3 3-9-6 2-4-7z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M14 37h17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <circle cx="22.5" cy="18" r="2" fill={strokeColor} />
  </svg>
);

export const TacticalKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 13v-4M20.5 11h4"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M13 33c0-10 4-15 9.5-15s9.5 5 9.5 15H13z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M12 37h21" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
