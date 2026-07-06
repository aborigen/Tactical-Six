import React from 'react';

interface PieceIconProps {
  fillColor: string;
  strokeColor: string;
}

/**
 * Cyber pieces are geometric representations optimized for the 6x6 arena.
 * They emphasize clarity and modern tactical aesthetic.
 */

export const CyberPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <circle cx="22.5" cy="22.5" r="10" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    <circle cx="22.5" cy="22.5" r="4" fill={strokeColor} />
  </svg>
);

export const CyberRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <rect x="12" y="12" width="21" height="21" rx="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    <path d="M12 20h21M22.5 12v21" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export const CyberKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M12 33l10.5-22 10.5 22z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M22.5 16v12" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CyberBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 9l13 26h-26z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="22.5" cy="27" r="3.5" fill={strokeColor} />
  </svg>
);

export const CyberQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 7l5.5 13.5 10 1.5-7.5 7.5 2 9.5-10-5.5-10 5.5 2-9.5-7.5-7.5 10-1.5z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="22.5" cy="22.5" r="3" fill={strokeColor} />
  </svg>
);

export const CyberKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 6v33M6 22.5h33" stroke={fillColor} strokeWidth="5" strokeLinecap="round" />
    <rect x="11" y="11" width="23" height="23" fill="none" stroke={fillColor} strokeWidth="2.5" rx="2" />
  </svg>
);
