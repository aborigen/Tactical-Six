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
  if (style === 'school') {
    const HeadContent = () => {
      switch (type) {
        case 'p': // Pawn: Kid with brown hair bun
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
        case 'r': // Rook: Stacked books (Yellow, Green, Red)
          return (
            <g>
              <rect x="15" y="14" width="15" height="3.5" rx="1" fill="#ef4444" stroke={strokeColor} strokeWidth="2" />
              <rect x="16" y="10.5" width="13" height="3.5" rx="1" fill="#22c55e" stroke={strokeColor} strokeWidth="2" />
              <rect x="15.5" y="7" width="14" height="3.5" rx="1" fill="#f59e0b" stroke={strokeColor} strokeWidth="2" />
            </g>
          );
        case 'n': // Knight: Backward baseball cap student
          return (
            <g>
              <path d="M14 16.5c0-5 4-8.5 8.5-8.5s8.5 3.5 8.5 8.5" fill="#ef4444" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M21.5 8h6v2.5h-6z" fill="#ef4444" stroke={strokeColor} strokeWidth="2" />
              <circle cx="24.5" cy="7.5" r="1.5" fill="#ffffff" stroke={strokeColor} strokeWidth="1.5" />
            </g>
          );
        case 'b': // Bishop: Striped winter beanie hat
          return (
            <g>
              <path d="M15 17c0-5 3.5-8 7.5-8s7.5 3 7.5 8Z" fill="#eab308" stroke={strokeColor} strokeWidth="2.5" />
              <line x1="15" y1="13" x2="30" y2="13" stroke={strokeColor} strokeWidth="2" />
              <circle cx="22.5" cy="7" r="2.5" fill="#ef4444" stroke={strokeColor} strokeWidth="2" />
            </g>
          );
        case 'q': // Queen: Schoolgirl with side ponytail
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
        case 'k': // King: Student with red headphones
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

  if (style === 'vanguard') {
    switch (type) {
      case 'p': return (<g><path d="M22.5 12l-5 5h10z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><circle cx="22.5" cy="14" r="1.5" fill={strokeColor} /></g>);
      case 'r': return (<path d="M14 11h3v3h3v-3h3v3h3v-3h3v5H14z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />);
      case 'n': return (<g><path d="M15 12l6-4 5 3-2 5h-9z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><polygon points="22,9 24,11 20,11" fill={strokeColor} /></g>);
      case 'b': return (<g><path d="M22.5 7l5 7h-10z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><line x1="22.5" y1="7" x2="22.5" y2="11" stroke={strokeColor} strokeWidth="2" /></g>);
      case 'q': return (<g><path d="M22.5 6l3 6h5l-4 3 2 5-4-3-4 3 2-5-4-3h5z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><circle cx="22.5" cy="12" r="1.5" fill={strokeColor} /></g>);
      case 'k': return (<g><path d="M17 10h11v5H17z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><path d="M22.5 6v4M20.5 8h4" stroke={strokeColor} strokeWidth="2" /></g>);
    }
  }

  if (style === 'simple') {
    switch (type) {
      case 'p':
        return (
          <g transform="translate(22.5, 15.5) scale(1.4) translate(-22.5, -15.5)">
            <path d="M18,15.5 h9" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="22.5" cy="10.5" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          </g>
        );
      case 'r':
        return (
          <g transform="translate(22.5, 15.5) scale(1.4) translate(-22.5, -15.5)">
            <path d="M17,15.5 h11" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M19,15.5 L17.5,8.5 L20.5,8.5 L20.5,11.5 L22,11.5 L22,8.5 L23,8.5 L23,11.5 L24.5,11.5 L24.5,8.5 L27.5,8.5 L26,15.5 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          </g>
        );
      case 'n':
        return (
          <g transform="translate(22.5, 15.5) scale(1.4) translate(-22.5, -15.5)">
            <path d="M17,15.5 h11" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M19,15.5 C19,9.5 23,8.5 24.5,9 C26,11.5 26,14 25,15.5 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M22,9 C23,5.5 26.5,5.5 26.5,9.5" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          </g>
        );
      case 'b':
        return (
          <g transform="translate(22.5, 15.5) scale(1.4) translate(-22.5, -15.5)">
            <path d="M17,15.5 h11" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22.5,5.5 C26.5,10.5 26.5,15.5 22.5,15.5 C18.5,15.5 18.5,10.5 22.5,5.5 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          </g>
        );
      case 'q':
        return (
          <g transform="translate(22.5, 15.5) scale(1.4) translate(-22.5, -15.5)">
            <path d="M15,15.5 h15" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16.5,15.5 C16.5,9.5 28.5,9.5 28.5,15.5 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="22.5" cy="8.5" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </g>
        );
      case 'k':
        return (
          <g transform="translate(22.5, 15.5) scale(1.4) translate(-22.5, -15.5)">
            <path d="M15,15.5 h15" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16.5,15.5 C16.5,9.5 28.5,9.5 28.5,15.5 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M22.5,4 v6 M19.5,7 h6" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
    }
  }

  if (style === 'classical') {
    switch (type) {
      case 'p': return (<circle cx="22.5" cy="13" r="4.5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />);
      case 'r': return (<path d="M15 10h2v2h3v-2h3v2h3v-2h3v6H15z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />);
      case 'n': return (<g><path d="M16 16c0-3 2-6 6-6s6 3 6 6H16z" fill={fillColor} stroke={strokeColor} strokeWidth="2" /><circle cx="25" cy="12" r="1" fill={strokeColor} /></g>);
      case 'b': return (<g><path d="M22.5 8c-2.5 0-4 3-4 5.5s1.5 4.5 4 4.5 4-2 4-4.5S25 8 22.5 8z" fill={fillColor} stroke={strokeColor} strokeWidth="2" /><circle cx="22.5" cy="7" r="1.2" fill={fillColor} stroke={strokeColor} strokeWidth="1" /></g>);
      case 'q': return (<g><path d="M22.5 10l-3 4-4-2 2 5h10l2-5-4 2z" fill={fillColor} stroke={strokeColor} strokeWidth="2" /><circle cx="22.5" cy="9" r="1" fill={strokeColor} /><circle cx="15" cy="11" r="1" fill={strokeColor} /><circle cx="30" cy="11" r="1" fill={strokeColor} /></g>);
      case 'k': return (<g><path d="M16 14c0-4 3-5 6.5-5s6.5 1 6.5 5H16z" fill={fillColor} stroke={strokeColor} strokeWidth="2" /><path d="M22.5 5v4M20.5 7h4" stroke={strokeColor} strokeWidth="2" /></g>);
    }
  }

  switch (type) {
    case 'p': return (<circle cx="22.5" cy="13.5" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />);
    case 'r': return (<rect x="14" y="9" width="17" height="7" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />);
    case 'n': return (<g><ellipse cx="22.5" cy="13" rx="6" ry="4.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><circle cx="18" cy="10" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" /><circle cx="24" cy="13" r="1" fill={strokeColor} /></g>);
    case 'b': return (<g><path d="M22.5 8a5 5 0 0 1 5 5c0 2.5-2 4.5-5 4.5s-5-2-5-4.5a5 5 0 0 1 5-5z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><circle cx="22.5" cy="7.5" r="1.5" fill={strokeColor} /></g>);
    case 'q': return (<g><path d="M22.5 8c3 0 5.5 2 5.5 4.5S25.5 17 22.5 17s-5.5-2-5.5-4.5S19.5 8 22.5 8z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><circle cx="22.5" cy="6.5" r="2" fill={strokeColor} /><circle cx="15.5" cy="10" r="1.5" fill={strokeColor} /><circle cx="29.5" cy="10" r="1.5" fill={strokeColor} /></g>);
    case 'k': return (<g><rect x="15" y="10" width="15" height="7" rx="3.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><circle cx="22.5" cy="6.5" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" /></g>);
  }
};

/**
 * Core Body Modules
 */
export const CompositePieceBody: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  if (style === 'school') {
    const BodyContent = () => {
      switch (type) {
        case 'p': // Pawn: Blue hoodie, backpack strap, book
          return (
            <g>
              <path d="M14 34v-8c0-2.5 2-4.5 4.5-4.5h8c2.5 0 4.5 2 4.5 4.5v8Z" fill="#2563eb" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M12 25h3v7h-3Z" fill="#dc2626" stroke={strokeColor} strokeWidth="1.5" /> {/* backpack */}
              <rect x="25" y="26" width="6" height="7" rx="1" fill="#fbbf24" stroke={strokeColor} strokeWidth="1.5" /> {/* book */}
              <line x1="20" y1="21.5" x2="20" y2="25" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="25" y1="21.5" x2="25" y2="25" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        case 'r': // Rook: School Locker Box Body with face
          return (
            <g>
              <rect x="12" y="17.5" width="21" height="17" rx="1.5" fill="#3b82f6" stroke={strokeColor} strokeWidth="2.5" />
              <circle cx="18" cy="24" r="1.5" fill={strokeColor} />
              <circle cx="27" cy="24" r="1.5" fill={strokeColor} />
              <path d="M21 28c1 .5 2 .5 3 0" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <rect x="33" y="21" width="2" height="6" fill="#ef4444" stroke={strokeColor} strokeWidth="1" />
            </g>
          );
        case 'n': // Knight: Round chubby character body
          return (
            <g>
              <circle cx="22.5" cy="23.5" r="8.5" fill="#d97706" stroke={strokeColor} strokeWidth="2.5" />
              <circle cx="19.5" cy="21.5" r="2" fill="#ffffff" stroke={strokeColor} strokeWidth="1" />
              <circle cx="19.5" cy="21.5" r="1" fill={strokeColor} />
              <path d="M16 26.5c1 2 4 3 6.5 1" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          );
        case 'b': // Bishop: Green sweatshirt with white stripes, water bottle
          return (
            <g>
              <path d="M15 34v-8c0-3 3-5 7.5-5s7.5 2 7.5 5v8Z" fill="#15803d" stroke={strokeColor} strokeWidth="2.5" />
              <line x1="15" y1="27" x2="30" y2="27" stroke="#ffffff" strokeWidth="2" />
              <line x1="15" y1="31" x2="30" y2="31" stroke="#ffffff" strokeWidth="2" />
              <rect x="29.5" y="26" width="4.5" height="8" rx="1" fill="#60a5fa" stroke={strokeColor} strokeWidth="1.5" />
            </g>
          );
        case 'q': // Queen: Red jacket body, holding smartphone
          return (
            <g>
              <path d="M15 34v-7c0-3.5 3-5 7.5-5s7.5 1.5 7.5 5v7Z" fill="#dc2626" stroke={strokeColor} strokeWidth="2.5" />
              <path d="M15 22.5v5c2 0 3-1.5 3-3Z" fill="#ffffff" />
              <path d="M30 22.5v5c-2 0-3-1.5-3-3Z" fill="#ffffff" />
              <rect x="28" y="25" width="4.5" height="8" rx="1" fill="#3b82f6" stroke={strokeColor} strokeWidth="1.5" />
            </g>
          );
        case 'k': // King: Blue letterman jacket with "K", holding skateboard
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

  if (style === 'vanguard') return (<polygon points="17,32 20,17 25,17 28,32" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />);
  if (style === 'simple') return (<polygon points="20.5,15.5 24.5,15.5 33,36 12,36" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />);
  if (style === 'classical') return (<path d="M19 17c1 4 1 11 0 14h7c-1-3-1-10 0-14H19z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />);
  return (<ellipse cx="22.5" cy="24" rx="6.5" ry="8" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />);
};

/**
 * Stabilizer Base Modules
 */
export const CompositePieceBase: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
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

  if (style === 'vanguard') return (<g><path d="M11 38h23v-4H11v4z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" /><line x1="15" y1="34" x2="30" y2="34" stroke={strokeColor} strokeWidth="2" /></g>);
  if (style === 'simple') return (<rect x="10" y="35.5" width="25" height="3" rx="0.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />);
  if (style === 'classical') return (<g><path d="M11 37h23v-3H11v3z" fill={fillColor} stroke={strokeColor} strokeWidth="2" /><path d="M13 34h19v-2H13v2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" /></g>);
  return (<rect x="10" y="32" width="25" height="7" rx="3.5" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />);
};
