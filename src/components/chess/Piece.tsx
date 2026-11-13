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

/**
 * Tactical Unit Renderer
 * Programmatically constructs the visual representation of a chess piece.
 * Utilizes CSS variables for theme-aware dynamic coloring.
 */
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
  // Utilizing CSS variables defined in globals.css for high-fidelity theme integration
  const fillColor = isWhite ? 'var(--piece-white-fill)' : 'var(--piece-black-fill)';
  const strokeColor = isWhite ? 'var(--piece-white-stroke)' : 'var(--piece-black-stroke)';

  const colorClass = isWhite ? "piece-white" : "piece-black";

  return (
    <div className={cn(
      "w-full h-full piece-shadow transition-transform duration-300 flex items-end justify-center",
      colorClass,
      type === 'p' ? "scale-[0.765] origin-bottom" : "scale-90 origin-bottom",
      className
    )}>
      <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm overflow-visible">
        <CompositePieceBase type={type} fillColor={fillColor} strokeColor={strokeColor} style={baseStyle || headStyle} />
        <CompositePieceBody type={type} fillColor={fillColor} strokeColor={strokeColor} style={bodyStyle || headStyle} />
        <CompositePieceHead type={type} fillColor={fillColor} strokeColor={strokeColor} style={headStyle} />
      </svg>
    </div>
  );
};

export default Piece;