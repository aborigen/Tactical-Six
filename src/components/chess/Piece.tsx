/**
 * @fileOverview This component renders chess pieces using multiple high-fidelity styles.
 * Supports both React-based dynamic sets and static local SVG sets.
 */

import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';

// Vanguard Pieces
import { VanguardPawn } from './pieces/vanguard/Pawn';
import { VanguardRook } from './pieces/vanguard/Rook';
import { VanguardKnight } from './pieces/vanguard/Knight';
import { VanguardBishop } from './pieces/vanguard/Bishop';
import { VanguardQueen } from './pieces/vanguard/Queen';
import { VanguardKing } from './pieces/vanguard/King';

// Cyber Pieces
import { CyberPawn } from './pieces/cyber/Pawn';
import { CyberRook } from './pieces/cyber/Rook';
import { CyberKnight } from './pieces/cyber/Knight';
import { CyberBishop } from './pieces/cyber/Bishop';
import { CyberQueen } from './pieces/cyber/Queen';
import { CyberKing } from './pieces/cyber/King';

export type PieceSetStyle = 'vanguard' | 'cyber' | 'classical' | 'tactical';

interface PieceProps {
  type: PieceType;
  color: PlayerColor;
  style?: PieceSetStyle;
  className?: string;
}

const Piece: React.FC<PieceProps> = ({ type, color, style = 'vanguard', className }) => {
  const isWhite = color === 'white';
  
  // Tactical colors for modern feel in dynamic sets
  const fillColor = isWhite ? '#FFFFFF' : 'hsl(var(--accent))';
  const strokeColor = isWhite ? 'hsl(var(--primary))' : 'hsl(var(--background))';
  const props = { fillColor, strokeColor };

  // 1. Static SVG Set Handling (Classical)
  if (style === 'classical') {
    const colorPrefix = isWhite ? 'w' : 'b';
    const pieceCode = type.toUpperCase();
    const assetPath = `./pieces/classical/${colorPrefix}${pieceCode}.svg`;
    
    return (
      <div className="w-full h-full flex items-center justify-center p-1">
        <img 
          src={assetPath} 
          alt={`${color} ${type}`} 
          className="w-full h-full piece-shadow object-contain select-none"
          draggable={false}
        />
      </div>
    );
  }

  // 2. React Dynamic Set Handling (Vanguard & Cyber)
  const activeStyle = style === 'tactical' ? 'vanguard' : style;

  if (activeStyle === 'cyber') {
    switch (type) {
      case 'p': return <CyberPawn {...props} />;
      case 'r': return <CyberRook {...props} />;
      case 'n': return <CyberKnight {...props} />;
      case 'b': return <CyberBishop {...props} />;
      case 'q': return <CyberQueen {...props} />;
      case 'k': return <CyberKing {...props} />;
      default: return null;
    }
  }

  // Default to Vanguard
  switch (type) {
    case 'p': return <VanguardPawn {...props} />;
    case 'r': return <VanguardRook {...props} />;
    case 'n': return <VanguardKnight {...props} />;
    case 'b': return <VanguardBishop {...props} />;
    case 'q': return <VanguardQueen {...props} />;
    case 'k': return <VanguardKing {...props} />;
    default: return null;
  }
};

export default Piece;
