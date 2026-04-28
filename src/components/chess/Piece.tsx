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
              d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
          </svg>
        );
      case 'r':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <path
              d="M9 39h27v-3H9v3zM12 36h21l-2-10H14l-2 10zM11 14V9h4v2h5V9h5v2h5V9h4v5"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            <path d="M34 14l-3 3H14l-3-3" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <path d="M31 17v9H14v-9" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
          </svg>
        );
      case 'n':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <path
              d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            <path d="M24 18c.38 2.43-1.09 4.88-3.4 5.92" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            <path d="M9.5 25.5A.5.5 0 1 1 9 25.5a.5.5 0 1 1 .5 0" fill={strokeColor} />
            <path d="M15 15.5c4.5 2 5 2 5 2s0-5-2.5-11c-4 1-5.5 5.5-2.5 9z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
          </svg>
        );
      case 'b':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <g fill={fillColor} stroke={strokeColor} strokeWidth="1.5">
              <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2v3H9v-3z" />
              <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
              <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0" />
            </g>
          </svg>
        );
      case 'q':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <g fill={fillColor} stroke={strokeColor} strokeWidth="1.5">
              <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z" />
              <path d="M9 26c0 2 1.5 2 2.5 4 2.5 5 1.5 5.5 1.5 5.5h19s-1 0 1.5-5.5c1-2 2.5-2 2.5-4 0-2-1.5-2-2.5-4-2.5-5-1.5-5.5-1.5-5.5h-19s1 0-1.5 5.5c-1 2-2.5 2-2.5 4z" />
              <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" />
            </g>
          </svg>
        );
      case 'k':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <g fill={fillColor} stroke={strokeColor} strokeWidth="1.5">
              <path d="M22.5 11.63V6M20 8h5" />
              <path d="M22.5 25s4.5-7.5 3-10c-1.5-2.5-6-2.5-6 0-1.5 2.5 3 10 3 10" />
              <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-1-1-1 0 0 0-1.5-1.5-2.5-.5-.8 1-1.2 2.5-1.2 2.5s-1.5 0-2 .5c-.5.5-1 2-1 2s-3-2.5-9-2.5-9 2.5-9 2.5-1 0-1.5-2c-.5-.5-1-2-1-2s-1.5 0-2-.5c-.5-.5-1.5-2.5-1.2-2.5-.1-.1-1.1-.1-2.5.5-3 6 6 10.5 6 10.5v7z" />
              <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return <div className={className}>{renderIcon()}</div>;
};

export default Piece;
