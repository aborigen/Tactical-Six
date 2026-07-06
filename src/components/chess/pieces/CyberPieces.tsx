import React from 'react';

interface PieceIconProps {
  fillColor: string;
  strokeColor: string;
}

export const CyberPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <circle cx="22.5" cy="22.5" r="12" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
    <circle cx="22.5" cy="22.5" r="4" fill={strokeColor} />
  </svg>
);

export const CyberRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <rect x="12" y="12" width="21" height="21" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
    <path d="M12 20h21M22.5 12v21" stroke={strokeColor} strokeWidth="1.5" />
  </svg>
);

export const CyberKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M12 33l10.5-21 10.5 21z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
    <path d="M22.5 15v15" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CyberBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 10l12 25h-24z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
    <circle cx="22.5" cy="26" r="4" fill={strokeColor} />
  </svg>
);

export const CyberQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 8l6 14 10 2-8 8 2 10-10-6-10 6 2-10-8-8 10-2z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
    <circle cx="22.5" cy="22.5" r="3" fill={strokeColor} />
  </svg>
);

export const CyberKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 6v33M6 22.5h33" stroke={fillColor} strokeWidth="4" strokeLinecap="round" />
    <rect x="12" y="12" width="21" height="21" fill="none" stroke={fillColor} strokeWidth="2" />
  </svg>
);
