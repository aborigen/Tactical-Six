
"use client";

import React from 'react';
import { PieceType, PlayerColor } from '@/lib/chess-logic';
import { cn } from '@/lib/utils';
import { CompositePieceHead, CompositePieceBody, CompositePieceBase } from './pieces/CompositePieceParts';

// Unified Piece Sets
import { GeometricPawn } from './pieces/geometric/Pawn';
import { GeometricRook } from './pieces/geometric/Rook';
import { GeometricKnight } from './pieces/geometric/Knight';
import { GeometricBishop } from './pieces/geometric/Bishop';
import { GeometricQueen } from './pieces/geometric/Queen';
import { GeometricKing } from './pieces/geometric/King';

import { VanguardPawn } from './pieces/vanguard/Pawn';
import { VanguardRook } from './pieces/vanguard/Rook';
import { VanguardKnight } from './pieces/vanguard/Knight';
import { VanguardBishop } from './pieces/vanguard/Bishop';
import { VanguardQueen } from './pieces/vanguard/Queen';
import { VanguardKing } from './pieces/vanguard/King';

import { ClassicalPawn } from './pieces/classical/Pawn';
import { ClassicalRook } from './pieces/classical/Rook';
import { ClassicalKnight } from './pieces/classical/Knight';
import { ClassicalBishop } from './pieces/classical/Bishop';
import { ClassicalQueen } from './pieces/classical/Queen';
import { ClassicalKing } from './pieces/classical/King';

import { CyberPawn } from './pieces/cyber/Pawn';
import { CyberRook } from './pieces/cyber/Rook';
import { CyberKnight } from './pieces/cyber/Knight';
import { CyberBishop } from './pieces/cyber/Bishop';
import { CyberQueen } from './pieces/cyber/Queen';
import { CyberKing } from './pieces/cyber/King';

export type PieceSetStyle = 'geometric' | 'slimes' | 'doodle' | 'school' | 'simple' | 'vanguard' | 'classical' | 'cyber';

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
  const fillColor = isWhite ? 'var(--piece-white-fill)' : 'var(--piece-black-fill)';
  const strokeColor = isWhite ? 'var(--piece-white-stroke)' : 'var(--piece-black-stroke)';
  const colorClass = isWhite ? "piece-white" : "piece-black";

  // Check if we are using a unified set or a mixed composite
  const isUnified = headStyle === bodyStyle && bodyStyle === baseStyle;
  
  const renderUnified = () => {
    const props = { fillColor, strokeColor };
    switch (headStyle) {
      case 'geometric':
        if (type === 'p') return <GeometricPawn {...props} />;
        if (type === 'r') return <GeometricRook {...props} />;
        if (type === 'n') return <GeometricKnight {...props} />;
        if (type === 'b') return <GeometricBishop {...props} />;
        if (type === 'q') return <GeometricQueen {...props} />;
        if (type === 'k') return <GeometricKing {...props} />;
        break;
      case 'vanguard':
        if (type === 'p') return <VanguardPawn {...props} />;
        if (type === 'r') return <VanguardRook {...props} />;
        if (type === 'n') return <VanguardKnight {...props} />;
        if (type === 'b') return <VanguardBishop {...props} />;
        if (type === 'q') return <VanguardQueen {...props} />;
        if (type === 'k') return <VanguardKing {...props} />;
        break;
      case 'classical':
        if (type === 'p') return <ClassicalPawn {...props} />;
        if (type === 'r') return <ClassicalRook {...props} />;
        if (type === 'n') return <ClassicalKnight {...props} />;
        if (type === 'b') return <ClassicalBishop {...props} />;
        if (type === 'q') return <ClassicalQueen {...props} />;
        if (type === 'k') return <ClassicalKing {...props} />;
        break;
      case 'cyber':
        if (type === 'p') return <CyberPawn {...props} />;
        if (type === 'r') return <CyberRook {...props} />;
        if (type === 'n') return <CyberKnight {...props} />;
        if (type === 'b') return <CyberBishop {...props} />;
        if (type === 'q') return <CyberQueen {...props} />;
        if (type === 'k') return <CyberKing {...props} />;
        break;
    }
    return null;
  };

  const unifiedComponent = isUnified ? renderUnified() : null;

  return (
    <div className={cn(
      "w-full h-full piece-shadow transition-transform duration-300 flex items-end justify-center",
      colorClass,
      type === 'p' ? "scale-[0.765] origin-bottom" : "scale-90 origin-bottom",
      className
    )}>
      {unifiedComponent ? (
        <div className="w-full h-full drop-shadow-sm overflow-visible">
          {unifiedComponent}
        </div>
      ) : (
        <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm overflow-visible">
          <CompositePieceBase type={type} fillColor={fillColor} strokeColor={strokeColor} style={baseStyle || headStyle} />
          <CompositePieceBody type={type} fillColor={fillColor} strokeColor={strokeColor} style={bodyStyle || headStyle} />
          <CompositePieceHead type={type} fillColor={fillColor} strokeColor={strokeColor} style={headStyle} />
        </svg>
      )}
    </div>
  );
};

export default Piece;
