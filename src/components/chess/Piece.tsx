/**
 * @fileOverview This component renders chess pieces using a modular skin system.
 * Pieces consist of three distinct parts: Head, Body, and Base, allowing for custom combinations.
 * Vector assets are loaded from external local SVG files.
 */

import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';
import { CompositePieceHead, CompositePieceBody, CompositePieceBase } from './pieces/CompositePieceParts';

export type PiecePartStyle = 'vanguard' | 'cyber' | 'classical' | 'soft';

interface PieceProps {
  type: PieceType;
  color: PlayerColor;
  headStyle?: PiecePartStyle;
  bodyStyle?: PiecePartStyle;
  baseStyle?: PiecePartStyle;
  className?: string;
}

const Piece: React.FC<PieceProps> = ({ 
  type, 
  color, 
  headStyle = 'vanguard', 
  bodyStyle = 'vanguard', 
  baseStyle = 'vanguard',
  className 
}) => {
  const isWhite = color === 'white';
  
  // Tactical colors mapping
  const fillColor = isWhite ? '#FFFFFF' : 'hsl(var(--accent))';
  const strokeColor = isWhite ? 'hsl(var(--primary))' : 'hsl(var(--background))';
  
  const props = { type, fillColor, strokeColor };

  return (
    <svg 
      viewBox="0 0 45 45" 
      className={`w-full h-full piece-shadow transition-transform duration-300 ${className || ''}`} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stabilizer Base Module */}
      <CompositePieceBase {...props} style={baseStyle} />
      
      {/* Core Body Module */}
      <CompositePieceBody {...props} style={bodyStyle} />
      
      {/* High-Command Head Module */}
      <CompositePieceHead {...props} style={headStyle} />
    </svg>
  );
};

export default Piece;
