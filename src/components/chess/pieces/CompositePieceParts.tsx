import React from 'react';
import { PieceType } from '@/lib/chess-logic';
import { PiecePartStyle } from '../Piece';

interface PartProps {
  type: PieceType;
  fillColor: string;
  strokeColor: string;
  style: PiecePartStyle;
}

/**
 * Composite piece parts library.
 * Now references individual .svg files for each part to allow easy graphical editing.
 * Uses relative paths for maximum compatibility with CDN hosting like Yandex Games.
 */

export const CompositePieceHead: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  const headMap: Record<PieceType, string> = {
    'p': 'pawn',
    'r': 'rook',
    'n': 'knight',
    'b': 'bishop',
    'q': 'queen',
    'k': 'king'
  };
  
  return (
    <use 
      href={`pieces/${style}/head-${headMap[type]}.svg#part`}
      style={{ '--piece-fill': fillColor, '--piece-stroke': strokeColor } as React.CSSProperties}
    />
  );
};

export const CompositePieceBody: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  return (
    <use 
      href={`pieces/${style}/body.svg#part`}
      style={{ '--piece-fill': fillColor, '--piece-stroke': strokeColor } as React.CSSProperties}
    />
  );
};

export const CompositePieceBase: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  return (
    <use 
      href={`pieces/${style}/base.svg#part`}
      style={{ '--piece-fill': fillColor, '--piece-stroke': strokeColor } as React.CSSProperties}
    />
  );
};
