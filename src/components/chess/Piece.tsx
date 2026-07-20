/**
 * @fileOverview This component renders chess pieces using multiple high-fidelity styles.
 * Supports 'vanguard' (Professional), 'cyber' (Geometric), and 'classical' (Staunton) piece sets.
 */

import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';
import * as Vanguard from './pieces/VanguardPieces';
import * as Cyber from './pieces/CyberPieces';
import * as Classical from './pieces/ClassicalPieces';

export type PieceSetStyle = 'vanguard' | 'cyber' | 'classical' | 'tactical'; // 'tactical' kept for backwards compat

interface PieceProps {
  type: PieceType;
  color: PlayerColor;
  style?: PieceSetStyle;
  className?: string;
}

const Piece: React.FC<PieceProps> = ({ type, color, style = 'vanguard', className }) => {
  const isWhite = color === 'white';
  
  // Tactical color palette integration
  // White pieces: Pure white fill with primary blue stroke
  // Black pieces: Cyan accent fill with deep background stroke
  const fillColor = isWhite ? '#FFFFFF' : 'hsl(var(--accent))';
  const strokeColor = isWhite ? 'hsl(var(--primary))' : 'hsl(var(--background))';

  const props = { fillColor, strokeColor };

  const activeStyle = style === 'tactical' ? 'vanguard' : style;

  if (activeStyle === 'cyber') {
    switch (type) {
      case 'p': return <Cyber.CyberPawn {...props} />;
      case 'r': return <Cyber.CyberRook {...props} />;
      case 'n': return <Cyber.CyberKnight {...props} />;
      case 'b': return <Cyber.CyberBishop {...props} />;
      case 'q': return <Cyber.CyberQueen {...props} />;
      case 'k': return <Cyber.CyberKing {...props} />;
      default: return null;
    }
  }

  if (activeStyle === 'classical') {
    switch (type) {
      case 'p': return <Classical.ClassicalPawn {...props} />;
      case 'r': return <Classical.ClassicalRook {...props} />;
      case 'n': return <Classical.ClassicalKnight {...props} />;
      case 'b': return <Classical.ClassicalBishop {...props} />;
      case 'q': return <Classical.ClassicalQueen {...props} />;
      case 'k': return <Classical.ClassicalKing {...props} />;
      default: return null;
    }
  }

  // Default to Vanguard
  switch (type) {
    case 'p': return <Vanguard.VanguardPawn {...props} />;
    case 'r': return <Vanguard.VanguardRook {...props} />;
    case 'n': return <Vanguard.VanguardKnight {...props} />;
    case 'b': return <Vanguard.VanguardBishop {...props} />;
    case 'q': return <Vanguard.VanguardQueen {...props} />;
    case 'k': return <Vanguard.VanguardKing {...props} />;
    default: return null;
  }
};

export default Piece;
