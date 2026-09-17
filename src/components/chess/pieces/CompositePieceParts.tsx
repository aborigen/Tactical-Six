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
 * Now uses external SVG sprite files for optimized rendering.
 */

export const CompositePieceHead: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  return (
    <use 
      href={`/pieces/${style}.svg#${type}-head`}
      style={{ '--piece-fill': fillColor, '--piece-stroke': strokeColor } as React.CSSProperties}
    />
  );
};

export const CompositePieceBody: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  return (
    <use 
      href={`/pieces/${style}.svg#body`}
      style={{ '--piece-fill': fillColor, '--piece-stroke': strokeColor } as React.CSSProperties}
    />
  );
};

export const CompositePieceBase: React.FC<PartProps> = ({ type, fillColor, strokeColor, style }) => {
  return (
    <use 
      href={`/pieces/${style}.svg#base`}
      style={{ '--piece-fill': fillColor, '--piece-stroke': strokeColor } as React.CSSProperties}
    />
  );
};
