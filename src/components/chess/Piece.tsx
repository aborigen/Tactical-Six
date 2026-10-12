
"use client";

import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';
import { cn } from '@/lib/utils';
import { CompositePieceHead, CompositePieceBody, CompositePieceBase } from './pieces/CompositePieceParts';

export type PieceSetStyle = 'geometric' | 'slimes' | 'doodle' | 'school' | 'simple';

interface PieceProps {
  type: PieceType;
  color: PlayerColor;
  headStyle?: PieceSetStyle;
  bodyStyle?: PieceSetStyle;
  baseStyle?: PieceSetStyle;
  className?: string;
}

const Piece: React.FC<PieceProps> = ({ 
  type, 
  color, 
  headStyle = 'geometric', 
  bodyStyle = 'geometric',
  baseStyle = 'geometric',
  className 
}) => {
  const isWhite = color === 'white';
  
  // Tactical color parameters for composite rendering
  const fillColor = isWhite ? '#FFFFFF' : '#333333';
  const strokeColor = isWhite ? '#000000' : '#FFFFFF';

  return (
    <div className={cn(
      "w-full h-full piece-shadow transition-transform duration-300 flex items-center justify-center",
      type === 'p' ? "scale-[0.765] origin-bottom" : "scale-90",
      className
    )}>
      <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm">
        <CompositePieceBase type={type} fillColor={fillColor} strokeColor={strokeColor} style={baseStyle || headStyle} />
        <CompositePieceBody type={type} fillColor={fillColor} strokeColor={strokeColor} style={bodyStyle || headStyle} />
        <CompositePieceHead type={type} fillColor={fillColor} strokeColor={strokeColor} style={headStyle} />
      </svg>
    </div>
  );
};

export default Piece;
