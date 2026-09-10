/**
 * @fileOverview This component renders chess pieces using a modular skin system.
 * Pieces consist of three distinct parts: Head, Body, and Base, allowing for custom combinations.
 */

import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';
import { CompositePieceHead, CompositePieceBody, CompositePieceBase } from './pieces/CompositePieceParts';

export type PiecePartStyle = 'vanguard' | 'cyber' | 'classical';

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
  
  // Tactical colors for modern feel across all sets
  const fillColor = isWhite ? '#FFFFFF' : 'hsl(var(--accent))';
  const strokeColor = isWhite ? 'hsl(var(--primary))' : 'hsl(var(--background))';
  
  const props = { type, fillColor, strokeColor };

  return (
    <svg viewBox="0 0 45 45" className={`w-full h-full piece-shadow ${className || ''}`} xmlns="http://www.w3.org/2000/svg">
      {/* 1. Base Stabilizer */}
      <CompositePieceBase {...props} style={baseStyle} />
      
      {/* 2. Core Body */}
      <CompositePieceBody {...props} style={bodyStyle} />
      
      {/* 3. Head Module */}
      <CompositePieceHead {...props} style={headStyle} />
    </svg>
  );
};

export default Piece;
