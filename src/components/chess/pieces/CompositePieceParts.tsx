import React from 'react';
import { PieceType } from '@/lib/chess-logic';
import { PiecePartStyle } from '../Piece';

interface PartProps {
  type: PieceType;
  fillColor: string;
  strokeColor: string;
  style: PiecePartStyle;
}

/**
 * Composite piece parts library.
 * Provides separate SVG paths for Head, Body, and Base across all visual themes.
 */

export const CompositePieceHead: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'classical') {
    switch (type) {
      case 'p': return <circle cx="22.5" cy="13.5" r="4.5" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      case 'r': return <path d="M12 10v4h21v-4h-3v2h-3v-2h-3v2h-3v-2h-3v2h-3v-2h-3z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      case 'n': return <path d="M22 10c10.5 1 11 8 11 12-4-2-8-2-12 0-3-5-1-10 1-12z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />;
      case 'b': return (
        <g>
          <path d="M22.5 9c-3.5 0-6 4.5-6 10s2.5 10 6 15 6-9.5 6-15-2.5-10-6-10z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="22.5" cy="9" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
      );
      case 'q': return (
        <g>
          <path d="M22.5 12l-4 7-6-2 3 9 8 7h8l8-7 3-9-6 2-4-7z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="22.5" cy="12" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
        </g>
      );
      case 'k': return (
        <g>
          <path d="M22.5 5v5M20 7.5h5" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M13 33c0-12 4-18 9.5-18s9.5 6 9.5 18H13z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
        </g>
      );
    }
  }

  if (style === 'cyber') {
    switch (type) {
      case 'p': return <rect x="20.5" y="20.5" width="4" height="4" fill={strokeColor} />;
      case 'r': return <path d="M13 13h19v5h-19z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />;
      case 'n': return <path d="M22.5 10v10" stroke={strokeColor} strokeWidth="3" />;
      case 'b': return <circle cx="22.5" cy="18" r="4" fill="none" stroke={strokeColor} strokeWidth="2" />;
      case 'q': return <circle cx="22.5" cy="15" r="6" fill={fillColor} stroke={strokeColor} strokeWidth="2" />;
      case 'k': return <path d="M18 18h9M22.5 14v8" stroke={strokeColor} strokeWidth="3" />;
    }
  }

  // Default: Vanguard
  switch (type) {
    case 'p': return <path d="M22.5 10l-6 6v4l6 6 6-6v-4l-6-6z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />;
    case 'r': return <path d="M16 12h13v6h-13z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />;
    case 'n': return <path d="M22 14l4 4-4 4" fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="square" />;
    case 'b': return <path d="M22.5 8l-7 12 7 4 7-4-7-12z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />;
    case 'q': return <circle cx="22.5" cy="22" r="3" fill={strokeColor} />;
    case 'k': return <path d="M22.5 12V6M19 9h7" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="square" />;
  }
};

export const CompositePieceBody: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'classical') {
    return <path d="M18 25c0 5 1.5 8 4.5 8s4.5-3 4.5-8-1.5-8-4.5-8-4.5 3-4.5 8z" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" opacity="0.9" />;
  }
  if (style === 'cyber') {
    return <path d="M22.5 15v20" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />;
  }
  // Vanguard
  return <path d="M20 22h5v12h-5z" fill={fillColor} stroke={strokeColor} strokeWidth="2" opacity="0.8" />;
};

export const CompositePieceBase: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'classical') {
    return <path d="M12 37h21M13 33h19" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />;
  }
  if (style === 'cyber') {
    return <rect x="12" y="32" width="21" height="4" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="1 1" />;
  }
  // Vanguard
  return <path d="M12 34h21v3H12z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />;
};
