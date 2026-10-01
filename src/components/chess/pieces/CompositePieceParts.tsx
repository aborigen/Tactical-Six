import React from 'react';
import { PieceType } from '@/lib/chess-logic';
import { PiecePartStyle } from '../Piece';

interface PartProps {
  type: PieceType;
  fillColor: string;
  strokeColor: string;
  style: PiecePartStyle;
}

const DoodleFace = ({ strokeColor }: { strokeColor: string }) => (
  <g stroke={strokeColor} strokeWidth="1.5" fill="none">
    <line x1="20" y1="18" x2="20" y2="21" strokeLinecap="round" />
    <line x1="25" y1="18" x2="25" y2="21" strokeLinecap="round" />
    <path d="M20 25c1 1.5 4 1.5 5 0" strokeLinecap="round" />
  </g>
);

/**
 * High-Command Head Modules
 */
export const CompositePieceHead: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'soft') {
    const EyePair = ({ cy = 22, r = 4 }: { cy?: number; r?: number }) => (
      <g>
        <circle cx="17.5" cy={cy} r={r} fill="white" stroke={strokeColor} strokeWidth="1.2" />
        <circle cx="17.5" cy={cy} r={r * 0.4} fill={strokeColor} />
        <circle cx="27.5" cy={cy} r={r} fill="white" stroke={strokeColor} strokeWidth="1.2" />
        <circle cx="27.5" cy={cy} r={r * 0.4} fill={strokeColor} />
      </g>
    );

    const Tentacles = () => (
      <g fill={fillColor} stroke={strokeColor} strokeWidth="2">
        <path d="M12 22 C8 20, 6 25, 10 28" strokeLinecap="round" />
        <path d="M33 22 C37 20, 39 25, 35 28" strokeLinecap="round" />
      </g>
    );

    switch (type) {
      case 'p':
        return (
          <g>
            <path d="M15 28 C15 15, 30 15, 30 28" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <EyePair cy={22} r={3} />
          </g>
        );
      case 'r':
        return (
          <g>
            <path d="M13 28 V12 H32 V28" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M13 12 L16 8 H29 L32 12" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <EyePair cy={20} r={3.5} />
            <circle cx="22.5" cy="16" r="1.5" fill={strokeColor} />
          </g>
        );
      case 'n':
        return (
          <g>
            <path d="M14 28 C14 10, 32 10, 32 28" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M31 15 C36 12, 38 18, 33 22" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <EyePair cy={21} r={3.5} />
          </g>
        );
      case 'b':
        return (
          <g>
            <path d="M22.5 8 C15 18, 15 28, 22.5 28 C30 28, 30 18, 22.5 8 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <EyePair cy={18} r={3.5} />
          </g>
        );
      case 'q':
        return (
          <g>
            <path d="M13 28 C13 10, 32 10, 32 28" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <Tentacles />
            <path d="M22.5 6 A4 4 0 0 1 22.5 14" fill="none" stroke={strokeColor} strokeWidth="2" />
            <EyePair cy={20} r={4.5} />
          </g>
        );
      case 'k':
        return (
          <g>
            <path d="M12 28 C12 8, 33 8, 33 28" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <Tentacles />
            <path d="M18 8 L22.5 4 L27 8" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <EyePair cy={18} r={5} />
          </g>
        );
    }
  }

  if (style === 'geometric') {
    switch (type) {
      case 'p':
        return (
          <circle cx="22.5" cy="20" r="9" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
        );
      case 'r':
        return (
          <path 
            d="M14 28V10h3v4h5v-4h5v4h4v14H14z" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />
        );
      case 'n':
        return (
          <g>
            <path 
              d="M26 28 L14 28 C14 28, 14 10, 26 10 L26 28 Z" 
              fill={fillColor} 
              stroke={strokeColor} 
              strokeWidth="2.5" 
              strokeLinejoin="round" 
            />
            <path 
              d="M26 5 A 11 11 0 0 1 26 27" 
              fill="none" 
              stroke={strokeColor} 
              strokeWidth="3.5" 
              strokeLinecap="butt" 
            />
            <path 
              d="M22 5.5 H28" 
              stroke={strokeColor} 
              strokeWidth="3.5" 
              strokeLinecap="butt" 
            />
          </g>
        );
      case 'b':
        return (
          <path 
            d="M22.5 7c-6 10-6 21 0 21s6-11 0-21z" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />
        );
      case 'q':
        return (
          <g>
            <path 
              d="M22.5 11a9 9 0 1 0 0 17 9 9 0 0 0 0-17z" 
              fill={fillColor} 
              stroke={strokeColor} 
              strokeWidth="2.5" 
            />
            <circle cx="22.5" cy="9" r="2.5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </g>
        );
      case 'k':
        return (
          <g>
            <path 
              d="M22.5 11a9 9 0 1 0 0 17 9 9 0 0 0 0-17z" 
              fill={fillColor} 
              stroke={strokeColor} 
              strokeWidth="2.5" 
            />
            <path d="M22.5 4v6M19.5 7h6" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
    }
  }

  if (style === 'school') {
    const HeadContent = () => {
      switch (type) {
        case 'p': 
          return (
            <g>
              <circle cx="22.5" cy="16" r="6.5" fill="#fcd34d" stroke={strokeColor} strokeWidth="2.5" />
              <circle cx="15.5" cy="14" r="2.5" fill="#78350f" stroke={strokeColor} strokeWidth="2" />
              <path d="M17 11.5c2-2 7-2 9 0 2 2 2 6 0 7.5" fill="#78350f" stroke={strokeColor} strokeWidth="1.5" />
              <circle cx="20.5" cy="15.5" r="1" fill={strokeColor} />
              <circle cx="24.5" cy="15.5" r="1" fill={strokeColor} />
              <path d="M21 18.5c.5.5 1.5.5 2 0" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          );
        case 'r': 
          return (
            <g>
              <rect x="15" y="14" width="15" height="3.5" rx="1" fill="#ef4444" stroke={strokeColor} strokeWidth="2" />
              <rect x="16" y="10.5" width="13" height="3.5" rx="1" fill="#22c55e" stroke={strokeColor} strokeWidth="2" />
              <rect x="15.5" y="7" width="14" height="3.5" rx="1" fill="#f59e0b" stroke={strokeColor} strokeWidth="2" />
            </g>
          );
        case 'n': 
          return (
            <g>
              <path d="M14 16.5c0-5 4-8.5 8.5-8.5s8.5 3.5 8.5 8.5" fill="#ef4444" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M21.5 8h6v2.5h-6z" fill="#ef4444" stroke={strokeColor} strokeWidth="2" />
              <circle cx="24.5" cy="7.5" r="1.5" fill="#ffffff" stroke={strokeColor} strokeWidth="1.5" />
            </g>
          );
        case 'b': 
          return (
            <g>
              <path d="M15 17c0-5 3.5-8 7.5-8s7.5 3 7.5 8Z" fill="#eab308" stroke={strokeColor} strokeWidth="2.5" />
              <line x1="15" y1="13" x2="30" y2="13" stroke={strokeColor} strokeWidth="2" />
              <circle cx="22.5" cy="7" r="2.5" fill="#ef4444" stroke={strokeColor} strokeWidth="2" />
            </g>
          );
        case 'q': 
          return (
            <g>
              <circle cx="22.5" cy="16" r="6.5" fill="#fde047" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M16.5 12c1-2.5 5-3 7-1.5s3.5 3.5 2.5 5.5" fill="#a16207" stroke={strokeColor} strokeWidth="2" />
              <circle cx="30" cy="14" r="3.5" fill="#a16207" stroke={strokeColor} strokeWidth="2" />
              <circle cx="20.5" cy="16" r="1" fill={strokeColor} />
              <circle cx="24.5" cy="16" r="1" fill={strokeColor} />
              <path d="M21 19c.5.5 1.5.5 2 0" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          );
        case 'k': 
          return (
            <g>
              <circle cx="22.5" cy="16" r="6.5" fill="#fed7aa" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M17 11.5c2-2 7-2 9 0" fill="none" stroke={strokeColor} strokeWidth="2" />
              <path d="M14 13.5c0-1.5 1-2.5 2-2.5s1 1 1 2.5v4c0 1.5-1 2.5-2 2.5s-2-1-2-2.5Z" fill="#ef4444" stroke={strokeColor} strokeWidth="2" />
              <path d="M28 13.5c0-1.5 1-2.5 2-2.5s2 1 2 2.5v4c0 1.5-1 2.5-2 2.5s-2-1-2-2.5Z" fill="#ef4444" stroke={strokeColor} strokeWidth="2" />
              <circle cx="20.5" cy="16" r="1" fill={strokeColor} />
              <circle cx="24.5" cy="16" r="1" fill={strokeColor} />
              <path d="M21 19c.5.5 1.5.5 2 0" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          );
        default: return null;
      }
    };
    return (
      <g transform="translate(22.5, 15) scale(1.3) translate(-22.5, -15)">
        <HeadContent />
      </g>
    );
  }

  if (style === 'doodle') {
    switch (type) {
      case 'p':
        return (
          <g>
            <circle cx="22.5" cy="20" r="8" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <DoodleFace strokeColor={strokeColor} />
          </g>
        );
      case 'r':
        return (
          <g>
            <path d="M14 11h17v13h-17z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M14 11v-3h4v3h3v-3h3v3h3v-3h4v3" fill="none" stroke={strokeColor} strokeWidth="2.5" />
            <DoodleFace strokeColor={strokeColor} />
          </g>
        );
      case 'n':
        return (
          <g>
            <path d="M15 12c5-8 15-5 15 5v7h-15z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M25 8l2-4M30 10l3-3" stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="19" cy="18" r="1.5" fill={strokeColor} />
            <circle cx="26" cy="18" r="1.5" fill={strokeColor} />
            <path d="M22 22h1" stroke={strokeColor} strokeWidth="2" />
          </g>
        );
      case 'b':
        return (
          <g>
            <path d="M15 24c0-15 15-15 15 0z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M15 12h15M20 12v-4M25 12v-4" stroke={strokeColor} strokeWidth="1.5" />
            <DoodleFace strokeColor={strokeColor} />
          </g>
        );
      case 'q':
        return (
          <g>
            <circle cx="22.5" cy="20" r="9" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="22.5" cy="11" r="2.5" fill={strokeColor} />
            <DoodleFace strokeColor={strokeColor} />
          </g>
        );
      case 'k':
        return (
          <g>
            <path d="M14 12h17v12h-17z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M22.5 5v7M20 8h5" stroke={strokeColor} strokeWidth="2.5" />
            <DoodleFace strokeColor={strokeColor} />
          </g>
        );
    }
  }

  if (style === 'simple') {
    switch (type) {
      case 'p':
        return (
          <circle cx="22.5" cy="20" r="7.5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        );
      case 'r':
        return (
          <g>
            <rect x="14" y="10" width="17" height="15" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M14 10v-3h4v3 M22 10v-3h4v3 M28 10v-3h3v3" fill="none" stroke={strokeColor} strokeWidth="2" />
          </g>
        );
      case 'n':
        return (
          <path d="M18 28 C18 10, 32 10, 32 18 C32 24, 28 28, 18 28 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
        );
      case 'b':
        return (
          <path d="M22.5 7 C16 18, 16 28, 22.5 28 C29 28, 29 18, 22.5 7 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        );
      case 'q':
        return (
          <g>
            <circle cx="22.5" cy="18" r="8" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <circle cx="22.5" cy="7" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </g>
        );
      case 'k':
        return (
          <g>
            <circle cx="22.5" cy="18" r="8" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M22.5 4 v5 M20 6.5 h5" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
    }
  }
  return null;
};

/**
 * Core Body Modules
 */
export const CompositePieceBody: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'soft') {
    const mainWidth = type === 'p' ? 12 : 18;
    return (
      <path 
        d={`M${22.5-mainWidth} 34 Q22.5 30, ${22.5+mainWidth} 34 L${22.5+mainWidth} 28 Q22.5 24, ${22.5-mainWidth} 28 Z`} 
        fill={fillColor} 
        stroke={strokeColor} 
        strokeWidth="2.5" 
      />
    );
  }

  if (style === 'geometric') {
    return (
      <rect x="14" y="28" width="17" height="2.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    );
  }

  if (style === 'school') {
    const BodyContent = () => {
      switch (type) {
        case 'p': 
          return (
            <g>
              <path d="M14 34v-8c0-2.5 2-4.5 4.5-4.5h8c2.5 0 4.5 2 4.5 4.5v8Z" fill="#2563eb" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M12 25h3v7h-3Z" fill="#dc2626" stroke={strokeColor} strokeWidth="1.5" />
              <rect x="25" y="26" width="6" height="7" rx="1" fill="#fbbf24" stroke={strokeColor} strokeWidth="1.5" />
              <line x1="20" y1="21.5" x2="20" y2="25" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="25" y1="21.5" x2="25" y2="25" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        case 'r': 
          return (
            <g>
              <rect x="12" y="17.5" width="21" height="17" rx="1.5" fill="#3b82f6" stroke={strokeColor} strokeWidth="2.5" />
              <circle cx="18" cy="24" r="1.5" fill={strokeColor} />
              <circle cx="27" cy="24" r="1.5" fill={strokeColor} />
              <path d="M21 28c1 .5 2 .5 3 0" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <rect x="33" y="21" width="2" height="6" fill="#ef4444" stroke={strokeColor} strokeWidth="1" />
            </g>
          );
        case 'n': 
          return (
            <g>
              <circle cx="22.5" cy="23.5" r="8.5" fill="#d97706" stroke={strokeColor} strokeWidth="2.5" />
              <circle cx="19.5" cy="21.5" r="2" fill="#ffffff" stroke={strokeColor} strokeWidth="1" />
              <circle cx="19.5" cy="21.5" r="1" fill={strokeColor} />
              <path d="M16 26.5c1 2 4 3 6.5 1" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          );
        case 'b': 
          return (
            <g>
              <path d="M15 34v-8c0-3 3-5 7.5-5s7.5 2 7.5 5v8Z" fill="#15803d" stroke={strokeColor} strokeWidth="2.5" />
              <line x1="15" y1="27" x2="30" y2="27" stroke="#ffffff" strokeWidth="2" />
              <line x1="15" y1="31" x2="30" y2="31" stroke="#ffffff" strokeWidth="2" />
              <rect x="29.5" y="26" width="4.5" height="8" rx="1" fill="#60a5fa" stroke={strokeColor} strokeWidth="1.5" />
            </g>
          );
        case 'q': 
          return (
            <g>
              <path d="M15 34v-7c0-3.5 3-5 7.5-5s7.5 1.5 7.5 5v7Z" fill="#dc2626" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M15 22.5v5c2 0 3-1.5 3-3Z" fill="#ffffff" />
              <path d="M30 22.5v5c-2 0-3-1.5-3-3Z" fill="#ffffff" />
              <rect x="28" y="25" width="4.5" height="8" rx="1" fill="#3b82f6" stroke={strokeColor} strokeWidth="1.5" />
            </g>
          );
        case 'k': 
          return (
            <g>
              <path d="M15 34v-7c0-3.5 3-5 7.5-5s7.5 1.5 7.5 5v7Z" fill="#1d4ed8" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M15 22v6h2.5v-6Z" fill="#ffffff" />
              <path d="M30 22v6h-2.5v-6Z" fill="#ffffff" />
              <text x="20.5" y="29.5" fill="#ffffff" fontSize="8" fontWeight="900" fontFamily="sans-serif">K</text>
              <rect x="31" y="23" width="3" height="11" rx="0.5" fill="#f59e0b" stroke={strokeColor} strokeWidth="1.5" />
            </g>
          );
        default: return null;
      }
    };
    return (
      <g transform="translate(22.5, 28) scale(0.75) translate(-22.5, -28)">
        <BodyContent />
      </g>
    );
  }

  if (style === 'doodle') {
    return (
      <path d="M16 32l1-8h11l1 8z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
    );
  }

  if (style === 'simple') {
    return (
      <rect x="12" y="28" width="21" height="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
    );
  }

  return null;
};

/**
 * Stabilizer Base Modules
 */
export const CompositePieceBase: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'soft') {
    return (
      <g>
        <ellipse cx="22.5" cy="38" rx="15" ry="4" fill="black" opacity="0.2" />
        <path d="M10 34 C10 38, 35 38, 35 34 Q22.5 40, 10 34 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
      </g>
    );
  }

  if (style === 'geometric') {
    return (
      <polygon 
        points="9,40 36,40 30,30 15,30" 
        fill={fillColor} 
        stroke={strokeColor} 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
      />
    );
  }

  if (style === 'school') {
    return (
      <rect x="4" y="34" width="37" height="6.5" rx="3.2" fill="#fefaf0" stroke={strokeColor} strokeWidth="2.5" />
    );
  }

  if (style === 'doodle') {
    return (
      <g>
        <rect x="10" y="37" width="25" height="4" rx="1" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
        <rect x="12" y="33" width="21" height="4" rx="1" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
      </g>
    );
  }

  if (style === 'simple') {
    return (
      <polygon points="10,40 35,40 29,30 16,30" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
    );
  }

  return null;
};
