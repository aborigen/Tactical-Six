/**
 * @fileOverview This component renders chess pieces using multiple high-fidelity styles.
 * Supports 'tactical' (Merida-style) and 'cyber' (geometric) piece sets.
 */

import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';
import * as Tactical from './pieces/TacticalPieces';
import * as Cyber from './pieces/CyberPieces';

export type PieceSetStyle = 'tactical' | 'cyber';

interface PieceProps {
  type: PieceType;
  color: PlayerColor;
  style?: PieceSetStyle;
  className?: string;
}

const Piece: React.FC<PieceProps> = ({ type, color, style = 'tactical', className }) => {
  const isWhite = color === 'white';
  
  // Tactical color palette integration
  // White pieces: Pure white fill with primary blue stroke
  // Black pieces: Cyan accent fill with deep background stroke
  const fillColor = isWhite ? '#FFFFFF' : 'hsl(var(--accent))';
  const strokeColor = isWhite ? 'hsl(var(--primary))' : 'hsl(var(--background))';

  const props = { fillColor, strokeColor };

  if (style === 'cyber') {
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

  switch (type) {
    case 'p': return <Tactical.TacticalPawn {...props} />;
    case 'r': return <Tactical.TacticalRook {...props} />;
    case 'n': return <Tactical.TacticalKnight {...props} />;
    case 'b': return <Tactical.TacticalBishop {...props} />;
    case 'q': return <Tactical.TacticalQueen {...props} />;
    case 'k': return <Tactical.TacticalKing {...props} />;
    default: return null;
  }
};

export default Piece;
