import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';
import { CompositePieceHead, CompositePieceBody, CompositePieceBase } from './pieces/CompositePieceParts';

export type PiecePartStyle = 'simple' | 'classical' | 'soft' | 'doodle' | 'school';

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
  headStyle = 'simple', 
  bodyStyle = 'simple', 
  baseStyle = 'simple',
  className 
}) => {
  const isWhite = color === 'white';
  
  const fillColor = isWhite ? '#FFFFFF' : 'hsl(var(--accent))';
  const strokeColor = isWhite ? 'hsl(var(--primary))' : 'hsl(var(--background))';
  
  const props = { type, fillColor, strokeColor };
  const isSimplePawn = type === 'p' && headStyle === 'simple';

  return (
    <svg 
      viewBox="0 0 45 45" 
      className={`w-full h-full piece-shadow transition-transform duration-300 ${className || ''}`} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={isSimplePawn ? "translate(22.5, 38) scale(0.75) translate(-22.5, -38)" : undefined}>
        <CompositePieceBase {...props} style={baseStyle} />
        <CompositePieceBody {...props} style={bodyStyle} />
        <CompositePieceHead {...props} style={headStyle} />
      </g>
    </svg>
  );
};

export default Piece;