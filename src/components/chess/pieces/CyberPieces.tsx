import React from 'react';

interface PieceIconProps {
  fillColor: string;
  strokeColor: string;
}

/**
 * Cyber pieces: Redesigned with a "Neon-Hacker" HUD aesthetic.
 * They use complex geometric overlays and split paths for a digital feel.
 */

export const CyberPawn: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <circle cx="22.5" cy="22.5" r="12" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 2" />
    <circle cx="22.5" cy="22.5" r="8" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    <rect x="20.5" y="20.5" width="4" height="4" fill={strokeColor} />
  </svg>
);

export const CyberRook: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <rect x="10" y="10" width="25" height="25" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />
    <rect x="13" y="13" width="19" height="19" rx="1" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
    <path d="M13 22.5h19M22.5 13v19" stroke={strokeColor} strokeWidth="1.5" />
    <path d="M10 10l5 5M35 10l-5 5M10 35l5-5M35 35l-5-5" stroke={strokeColor} strokeWidth="1" />
  </svg>
);

export const CyberKnight: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M10 35L22.5 10L35 35Z" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" />
    <path d="M14 32l8.5-18 8.5 18z" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="miter" />
    <path d="M22.5 18v10" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
    <rect x="21" y="32" width="3" height="3" fill={strokeColor} />
  </svg>
);

export const CyberBishop: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 8l15 28h-30z" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />
    <path d="M22.5 12l11 20h-22z" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="miter" />
    <circle cx="22.5" cy="24" r="4" fill="none" stroke={strokeColor} strokeWidth="1.5" />
    <path d="M22.5 12v4" stroke={strokeColor} strokeWidth="2" />
  </svg>
);

export const CyberQueen: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <circle cx="22.5" cy="22.5" r="18" fill="none" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="1 3" />
    <path d="M22.5 6l6 14 11 2-8 8 2 11-11-6-11 6 2-11-8-8 11-2z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
    <circle cx="22.5" cy="22.5" r="4" fill="none" stroke={strokeColor} strokeWidth="2" />
    <path d="M22.5 10v4M22.5 31v4M10 22.5h4M31 22.5h4" stroke={strokeColor} strokeWidth="1" />
  </svg>
);

export const CyberKing: React.FC<PieceIconProps> = ({ fillColor, strokeColor }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
    <path d="M22.5 4v37M4 22.5h37" stroke={strokeColor} strokeWidth="1" opacity="0.3" strokeDasharray="2 4" />
    <rect x="12" y="12" width="21" height="21" fill={fillColor} stroke={strokeColor} strokeWidth="3" rx="1" />
    <path d="M22.5 6v6M22.5 33v6M6 22.5h6M33 22.5h6" stroke={fillColor} strokeWidth="3" strokeLinecap="square" />
    <path d="M18 22.5h9M22.5 18v9" stroke={strokeColor} strokeWidth="2" />
  </svg>
);
