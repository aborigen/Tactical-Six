import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
  className 
}) => {
  const isWhite = color === 'white';
  const prefix = isWhite ? 'w' : 'b';
  const pieceChar = type.toUpperCase();
  
  const set = headStyle === 'slimes' ? 'slimes' : 'geometric';
  const src = `/pieces/${set}/${prefix}${pieceChar}.svg`;

  return (
    <div className={cn(
      "w-full h-full piece-shadow transition-transform duration-300 flex items-center justify-center",
      type === 'p' && set === 'geometric' && "scale-[0.85] origin-bottom",
      className
    )}>
      <Image 
        src={src} 
        alt={`${color} ${type}`}
        width={45}
        height={45}
        className="w-full h-full"
        priority
      />
    </div>
  );
};

export default Piece;
