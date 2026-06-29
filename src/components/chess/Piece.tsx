/**
 * @fileOverview This component renders chess pieces using high-fidelity Merida-style inline SVGs.
 * Using inline SVGs instead of external image files prevents pathing errors
 * during static web export and ensures crisp rendering at any scale.
 */

import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';

interface PieceProps {
  type: PieceType;
  color: PlayerColor;
  className?: string;
}

const Piece: React.FC<PieceProps> = ({ type, color, className }) => {
  const isWhite = color === 'white';
  
  // Tactical color palette integration
  // White: Pure white with primary blue stroke
  // Black: Cyan accent with dark stroke
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
              strokeLinecap="round"
            />
          </svg>
        );
      case 'r':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <path
              d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M34 14l-3 3H14l-3-3"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31 17v12.5H14V17"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31 29.5l1.5 2.5h-20l1.5-2.5"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 14h23"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
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
            <path
              d="M24 18c.38 2.43-1.62 4.43-3.62 5.43"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            <path
              d="M9.5 25.5A.5.5 0 1 1 9 25.5a.5.5 0 1 1 .5 0"
              fill={strokeColor}
            />
            <path
              d="M15 15.5c4.5 2 2.5 9 2.5 9-3-4.5-5.5-3-5.5-3s2-2.5-2-4.5c-4-2-4-8-4-8s2.5-2 9 6.5z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
          </svg>
        );
      case 'b':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <g
              fill="none"
              fillRule="evenodd"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g fill={fillColor} strokeLinecap="butt">
                <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 0 3-1.72 3h-23.56c-1.72 0-1.72-3-1.72-3z" />
                <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
                <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
              </g>
              <path d="M17.5 26h10M15 30h15" strokeLinejoin="miter" />
            </g>
          </svg>
        );
      case 'q':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <g
              fill={fillColor}
              fillRule="evenodd"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM45 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM11.5 30a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM37.5 30a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" />
              <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z" />
              <path d="M9 26c0 2 1.5 2 2.5 4 2.5-1 4.86-1 7.5 0 1.38-1.5 2.62-1.5 4 0 2.64-1 5 0 7.5 0 1-2 2.5-2 2.5-4" />
              <path d="M11.5 30c3.5-1 18.5-1 22 0 1.15 1 1.5.5 1.5 3.5 0 1-1.5 2-1.5 2.5H11.5c0-.5-1.5-1.5-1.5-2.5 0-3 0-2.5 1.5-3.5z" />
              <path d="M9 39h27v-3H9v3z" />
            </g>
          </svg>
        );
      case 'k':
        return (
          <svg viewBox="0 0 45 45" className="w-full h-full piece-shadow">
            <g
              fill="none"
              fillRule="evenodd"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M22.5 11.63V6M20 8h5"
                stroke={strokeColor}
                strokeLinejoin="miter"
              />
              <path
                d="M22.5 25s4.5-7.5 3-10c-1.5-2.5-6-2.5-6 0-1.5 2.5 3 10 3 10"
                fill={fillColor}
                strokeLinecap="butt"
              />
              <path
                d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-1-1-6 2.5V18c-1.5-3-8.5-3-10 0v4c-5-3.5-2-3.5-6-2.5-3 6 6 10.5 6 10.5v7z"
                fill={fillColor}
              />
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
