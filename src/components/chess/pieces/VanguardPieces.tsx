import React from 'react';

interface PieceIconProps {
  fillColor: string;
  strokeColor: string;
}

/**
 * Vanguard Piece Set: Redesigned with a "Mecha-Tactical" aesthetic.
 * Features aggressive silhouettes, sharp angles, and tech-inspired details.
 */

export const VanguardPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 10l-6 6v4l2 2-2 10h12l-2-10 2-2v-4l-6-6z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M18 34h9" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <rect x="21" y="14" width="3" height="3" fill={strokeColor} opacity="0.4" />
  </svg>
);

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

export const VanguardKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M14 34c0-10 4-18 10-20 6-2 9 4 7 10 3-2 6 2 4 6l-2 8h-12z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M12 37h21" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M24 18l3 3" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <circle cx="28" cy="18" r="1.5" fill={strokeColor} />
  </svg>
);

export const VanguardBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 8l-7 12 4 4-2 10h10l-2-10 4-4-7-12z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M16 34h13M15 37h15" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M22.5 8v6" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <circle cx="22.5" cy="22" r="2" fill={strokeColor} opacity="0.3" />
  </svg>
);

export const VanguardQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 6l-5 8-8-2 4 10-6 4 9 8h12l9-8-6-4 4-10-8 2-5-8z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M14 37h17" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M22.5 16v12M16 22h13" stroke={strokeColor} strokeWidth="1.5" opacity="0.3" />
    <circle cx="22.5" cy="22" r="3" fill={strokeColor} />
  </svg>
);

export const VanguardKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path
      d="M22.5 12V6M19 9h7"
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinecap="square"
    />
    <path
      d="M13 34c0-12 4-18 9.5-18s9.5 6 9.5 18H13z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinejoin="miter"
    />
    <path d="M11 37h23" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <path d="M22.5 16v18" stroke={strokeColor} strokeWidth="1" opacity="0.2" />
  </svg>
);
