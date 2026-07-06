import React from 'react';

interface PieceIconProps {
  fillColor: string;
  strokeColor: string;
}

/**
 * Classical Piece Set: Traditional Staunton-inspired chess pieces.
 * Optimized for recognition and classic tactical feel.
 */

export const ClassicalPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 9c-2.2 0-4 1.8-4 4 0 1.5 1 2.7 2.2 3.5C18 19 16 23 16 29c0 3 1.5 5 6.5 5s6.5-2 6.5-5c0-6-2-10-4.7-12.5 1.2-.8 2.2-2 2.2-3.5 0-2.2-1.8-4-4-4z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
    />
    <path d="M14 36h17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ClassicalRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M12 33V12h3v-3h4v3h3v-3h4v3h3v21H12z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
    />
    <path d="M10 37h25" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ClassicalKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M14 33c0-10 4-18 14-20 4 0 6 3 6 8 0 4-2 7-5 9l-2 10h-13z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M11 37h23" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <circle cx="25" cy="18" r="1" fill={strokeColor} />
  </svg>
);

export const ClassicalBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 7c-3 0-6 5-6 10s3 10 6 16 6-11 6-16S25.5 7 22.5 7z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
    />
    <path d="M15 37h15M14 33h17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <path d="M22.5 7v4" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ClassicalQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 7a2 2 0 1 0 0 4 2 2 0 1 0 0-4zM9 26c8.5-1.5 21-1.5 27 0l-4-15-7 5-3-9-3 9-7-5-4 15z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M11 37h23" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ClassicalKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 5v5M20 7.5h5" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    <path
      d="M13 33c0-12 4-18 9.5-18s9.5 6 9.5 18H13z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
    />
    <path d="M11 37h23" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
