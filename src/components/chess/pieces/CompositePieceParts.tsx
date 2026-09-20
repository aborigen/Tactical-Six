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
 * High-Command Head Modules
 * Embedded vector paths for maximum reliability, cross-origin safety, and instant loading.
 */
export const CompositePieceHead: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  // 1. VANGUARD SET (Sharp, Mecha-Tactical)
  if (style === 'vanguard') {
    switch (type) {
      case 'p':
        return (
          <g>
            <path d="M22.5 12l-5 5h10z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
            <circle cx="22.5" cy="14" r="1.5" fill={strokeColor} />
          </g>
        );
      case 'r':
        return (
          <path d="M14 11h3v3h3v-3h3v3h3v-3h3v5H14z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
        );
      case 'n':
        return (
          <g>
            <path d="M15 12l6-4 5 3-2 5h-9z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
            <polygon points="22,9 24,11 20,11" fill={strokeColor} />
          </g>
        );
      case 'b':
        return (
          <g>
            <path d="M22.5 7l5 7h-10z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
            <line x1="22.5" y1="7" x2="22.5" y2="11" stroke={strokeColor} strokeWidth="2" />
          </g>
        );
      case 'q':
        return (
          <g>
            <path d="M22.5 6l3 6h5l-4 3 2 5-4-3-4 3 2-5-4-3h5z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
            <circle cx="22.5" cy="12" r="1.5" fill={strokeColor} />
          </g>
        );
      case 'k':
        return (
          <g>
            <path d="M17 10h11v5H17z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
            <path d="M22.5 6v4M20.5 8h4" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
          </g>
        );
    }
  }

  // 2. CYBER SET (Geometric HUD, Neon)
  if (style === 'cyber') {
    switch (type) {
      case 'p':
        return (
          <g>
            <circle cx="22.5" cy="13" r="4" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <rect x="21" y="11.5" width="3" height="3" fill={strokeColor} />
          </g>
        );
      case 'r':
        return (
          <g>
            <rect x="15" y="10" width="15" height="6" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <line x1="20" y1="10" x2="20" y2="16" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="25" y1="10" x2="25" y2="16" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );
      case 'n':
        return (
          <g>
            <polygon points="16,16 22.5,9 29,16" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <line x1="22.5" y1="9" x2="22.5" y2="16" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );
      case 'b':
        return (
          <g>
            <polygon points="22.5,8 17,16 28,16" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="22.5" cy="12" r="2" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );
      case 'q':
        return (
          <g>
            <circle cx="22.5" cy="13" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M15 8l4 5M30 8l-4 5M22.5 6v4" stroke={strokeColor} strokeWidth="2" />
          </g>
        );
      case 'k':
        return (
          <g>
            <rect x="16" y="11" width="13" height="5" rx="1" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M22.5 6v5M20 8.5h5" stroke={strokeColor} strokeWidth="2" />
          </g>
        );
    }
  }

  // 3. CLASSICAL SET (Elegant Staunton Curves)
  if (style === 'classical') {
    switch (type) {
      case 'p':
        return (
          <circle cx="22.5" cy="13" r="4.5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        );
      case 'r':
        return (
          <path d="M15 10h2v2h3v-2h3v2h3v-2h3v6H15z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        );
      case 'n':
        return (
          <g>
            <path d="M16 16c0-3 2-6 6-6s6 3 6 6H16z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <circle cx="25" cy="12" r="1" fill={strokeColor} />
          </g>
        );
      case 'b':
        return (
          <g>
            <path d="M22.5 8c-2.5 0-4 3-4 5.5s1.5 4.5 4 4.5 4-2 4-4.5S25 8 22.5 8z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <circle cx="22.5" cy="7" r="1.2" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          </g>
        );
      case 'q':
        return (
          <g>
            <path d="M22.5 10l-3 4-4-2 2 5h10l2-5-4 2z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <circle cx="22.5" cy="9" r="1" fill={strokeColor} />
            <circle cx="15" cy="11" r="1" fill={strokeColor} />
            <circle cx="30" cy="11" r="1" fill={strokeColor} />
          </g>
        );
      case 'k':
        return (
          <g>
            <path d="M16 14c0-4 3-5 6.5-5s6.5 1 6.5 5H16z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M22.5 5v4M20.5 7h4" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
    }
  }

  // 4. SOFT SET (Childish Bubbly Oval Forms)
  switch (type) {
    case 'p':
      return (
        <circle cx="22.5" cy="13.5" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
      );
    case 'r':
      return (
        <rect x="14" y="9" width="17" height="7" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
      );
    case 'n':
      return (
        <g>
          <ellipse cx="22.5" cy="13" rx="6" ry="4.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="18" cy="10" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          <circle cx="24" cy="13" r="1" fill={strokeColor} />
        </g>
      );
    case 'b':
      return (
        <g>
          <path d="M22.5 8a5 5 0 0 1 5 5c0 2.5-2 4.5-5 4.5s-5-2-5-4.5a5 5 0 0 1 5-5z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="22.5" cy="7.5" r="1.5" fill={strokeColor} />
        </g>
      );
    case 'q':
      return (
        <g>
          <path d="M22.5 8c3 0 5.5 2 5.5 4.5S25.5 17 22.5 17s-5.5-2-5.5-4.5S19.5 8 22.5 8z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="22.5" cy="6.5" r="2" fill={strokeColor} />
          <circle cx="15.5" cy="10" r="1.5" fill={strokeColor} />
          <circle cx="29.5" cy="10" r="1.5" fill={strokeColor} />
        </g>
      );
    case 'k':
      return (
        <g>
          <rect x="15" y="10" width="15" height="7" rx="3.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="22.5" cy="6.5" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        </g>
      );
  }
};

/**
 * Core Body Modules
 */
export const CompositePieceBody: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  // 1. VANGUARD
  if (style === 'vanguard') {
    return (
      <polygon points="17,32 20,17 25,17 28,32" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
    );
  }

  // 2. CYBER
  if (style === 'cyber') {
    return (
      <g>
        <rect x="19" y="16" width="7" height="15" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
        <line x1="16" y1="23" x2="29" y2="23" stroke={strokeColor} strokeWidth="1.5" />
      </g>
    );
  }

  // 3. CLASSICAL
  if (style === 'classical') {
    return (
      <path d="M19 17c1 4 1 11 0 14h7c-1-3-1-10 0-14H19z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
    );
  }

  // 4. SOFT (Childish Oval)
  return (
    <ellipse cx="22.5" cy="24" rx="6.5" ry="8" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
  );
};

/**
 * Stabilizer Base Modules
 */
export const CompositePieceBase: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  // 1. VANGUARD
  if (style === 'vanguard') {
    return (
      <g>
        <path d="M11 38h23v-4H11v4z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="miter" />
        <line x1="15" y1="34" x2="30" y2="34" stroke={strokeColor} strokeWidth="2" />
      </g>
    );
  }

  // 2. CYBER
  if (style === 'cyber') {
    return (
      <g>
        <rect x="10" y="33" width="25" height="6" rx="1" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
        <circle cx="14" cy="36" r="1" fill={strokeColor} />
        <circle cx="31" cy="36" r="1" fill={strokeColor} />
      </g>
    );
  }

  // 3. CLASSICAL
  if (style === 'classical') {
    return (
      <g>
        <path d="M11 37h23v-3H11v3z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        <path d="M13 34h19v-2H13v2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
      </g>
    );
  }

  // 4. SOFT (Childish Oval)
  return (
    <rect x="10" y="32" width="25" height="7" rx="3.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
  );
};
