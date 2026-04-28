import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';

interface PieceProps {
  type: PieceType;
  color: PlayerColor;
  className?: string;
}

const Piece: React.FC<PieceProps> = ({ type, color, className }) => {
  const isWhite = color === 'white';
  // Standard White: Pure white with primary blue stroke
  // Standard Black: Cyan accent with dark stroke
  const fillColor = isWhite ? '#FFFFFF' : '#60DEDE';
  const strokeColor = isWhite ? '#2E75B8' : '#161A1C';

  const renderIcon = () => {
    switch (type) {
      case 'p':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <path
              d="M22.5 11c2.5 0 4.5 2 4.5 4.5S25 20 22.5 20 18 18 18 15.5 20 11 22.5 11zM14 38c0-5 3-12 8.5-12s8.5 7 8.5 12v1H14v-1z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'r':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <path
              d="M13 39h19v-4H13v4zm2-4l1-17h2v3h3v-3h3v3h3v-3h2l1 17H15z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'n':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <path
              d="M22 11c6 1 12 5 12 28H15c0-8 6-6 6-18M15 17l4 2-1 4-3-2z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M24 19c1 2-1 4-3 5" fill="none" stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'b':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <circle cx="22.5" cy="11" r="3" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <path
              d="M16 39c0-6 2-13 6.5-20 4.5 7 6.5 14 6.5 20H16z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M19 32c2 1 5 1 7 0" fill="none" stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'q':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <path
              d="M12 39h21v-3H12v3zm2-3l2-18 6 8 2.5-16 2.5 16 6-8 2 18H14z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="22.5" cy="7" r="1.5" fill={fillColor} />
          </svg>
        );
      case 'k':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <path
              d="M22.5 6v5M20 8.5h5M12 39h21v-3H12v3zm2-3c0-9 4-14 8.5-14s8.5 5 8.5 14H14z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return <div className={className}>{renderIcon()}</div>;
};

export default Piece;
