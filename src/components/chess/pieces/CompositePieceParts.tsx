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
 * Provides optimized local vector architectures for Head, Body, and Base components.
 */

export const CompositePieceHead: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'classical') {
    switch (type) {
      case 'p': 
        return <circle cx="22.5" cy="12" r="7" fill={fillColor} stroke={strokeColor} strokeWidth="2" />;
      case 'r': 
        return <path d="M8 6h29v7H8V6zm4 7h21v2H12v-2zm-2-7v4h4V6h-4zm7 0v4h4V6h-4zm7 0v4h4V6h-4zm7 0v4h4V6h-4z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />;
      case 'n': 
        return <path d="M12 24c2-8 6-16 16-17 6 1 9 5 9 10 0 5-4 9-7 10-6-3-12-2-18-3z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />;
      case 'b': 
        return (
          <g>
            <path d="M22.5 5c-4.5 0-8 6-8 13s3.5 12 8 12 8-5 8-12-3.5-13-8-13z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <circle cx="22.5" cy="4" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <path d="M16 15l13 4" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'q': 
        return (
          <g>
            <path d="M22.5 6l-6 11-10-3 5 11 22 0 5-11-10 3-6-11z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
            <circle cx="22.5" cy="5" r="2.5" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="6.5" cy="14" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="38.5" cy="14" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );
      case 'k': 
        return (
          <g>
            <path d="M22.5 2v6M19 5h7" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M11 28c0-15 5-21 11.5-21S34 13 34 28H11z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
            <path d="M15 16h15" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
    }
  }

  if (style === 'cyber') {
    switch (type) {
      case 'p': 
        return <rect x="17.5" y="12" width="10" height="10" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />;
      case 'r': 
        return <path d="M6 6h33v10H6zm6 10h21v2H12z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeDasharray="3 1" />;
      case 'n': 
        return <path d="M10 24L22.5 5L35 24Z" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="miter" />;
      case 'b': 
        return (
          <g>
            <polygon points="22.5,4 37,24 8,24" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <line x1="22.5" y1="4" x2="22.5" y2="24" stroke={strokeColor} strokeWidth="2" strokeDasharray="2 2" />
          </g>
        );
      case 'q': 
        return (
          <g>
            <circle cx="22.5" cy="15" r="11" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <circle cx="22.5" cy="15" r="4" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );
      case 'k': 
        return (
          <g>
            <rect x="11" y="9" width="23" height="16" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <path d="M22.5 4v5M19.5 6.5h6" stroke={strokeColor} strokeWidth="2.5" />
          </g>
        );
    }
  }

  if (style === 'soft') {
    switch (type) {
      case 'p': 
        return <ellipse cx="22.5" cy="15" rx="8" ry="8" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />;
      case 'r': 
        return <rect x="9" y="8" width="27" height="13" rx="6" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />;
      case 'n': 
        return <path d="M11 25c0-11 5-17 12-17s12 5 12 11c-5-2-10-1-14 2z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />;
      case 'b': 
        return (
          <g>
            <ellipse cx="22.5" cy="15" rx="9" ry="11" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="22.5" cy="3" r="2.5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </g>
        );
      case 'q': 
        return (
          <g>
            <ellipse cx="22.5" cy="17" rx="13" ry="9" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="22.5" cy="7" r="4.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          </g>
        );
      case 'k': 
        return (
          <g>
            <circle cx="22.5" cy="16" r="10" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <ellipse cx="22.5" cy="5" rx="4" ry="2" fill={strokeColor} />
          </g>
        );
    }
  }

  // Default: Vanguard (Mecha-inspired geometry taking all space)
  switch (type) {
    case 'p': 
      return <path d="M22.5 4l-9 9v5l9 9 9-9v-5l-9-9z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />;
    case 'r': 
      return <path d="M8 6h29v10H8zm5 10h19v2H13z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />;
    case 'n': 
      return <path d="M10 24V6l15 6-7 4 7 8z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />;
    case 'b': 
      return <path d="M22.5 4l-11 13 11 7 11-7-11-13z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />;
    case 'q': 
      return (
        <g>
          <polygon points="22.5,3 38,15 29,25 16,25 7,15" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="22.5" cy="15" r="3.5" fill={strokeColor} />
        </g>
      );
    case 'k': 
      return (
        <g>
          <path d="M22.5 12V3M18 6h9" stroke={strokeColor} strokeWidth="3" strokeLinecap="square" />
          <polygon points="22.5,9 37,25 8,25" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
        </g>
      );
  }
};

export const CompositePieceBody: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'classical') {
    return <path d="M15 22c0 6 2.5 11 7.5 11s7.5-5 7.5-11-2.5-11-7.5-11-7.5 5-7.5 11z" fill={fillColor} stroke={strokeColor} strokeWidth="2" opacity="0.95" />;
  }
  if (style === 'cyber') {
    return <path d="M14 18h17v12H14zm8.5-4v20" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />;
  }
  if (style === 'soft') {
    return <rect x="16" y="16" width="13" height="17" rx="6.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" opacity="0.95" />;
  }
  // Vanguard
  return <path d="M15 18h15v14H15z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" opacity="0.9" />;
};

export const CompositePieceBase: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'classical') {
    return <path d="M4 42h37v-4H4v4zm3-7v3h31v-3H7z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
  }
  if (style === 'cyber') {
    return <rect x="4" y="34" width="37" height="7" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeDasharray="2 2" />;
  }
  if (style === 'soft') {
    return <rect x="5" y="35" width="35" height="7" rx="3.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />;
  }
  // Vanguard
  return <path d="M4 34h37v6H4z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />;
};
