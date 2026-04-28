"use client";

import React, { useState, useEffect } from 'react';
import { ChessGame, BOARD_SIZE, Position, Move } from '@/lib/chess-logic';
import Piece from './Piece';
import { cn } from '@/lib/utils';

interface BoardProps {
  game: ChessGame;
  onMove: (move: Move) => void;
  hintMove?: Move | null;
}

const Board: React.FC<BoardProps> = ({ game, onMove, hintMove }) => {
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [legalMovesFromSelected, setLegalMovesFromSelected] = useState<Position[]>([]);

  useEffect(() => {
    if (selectedSquare) {
      const moves = game.getLegalMoves(game.turn)
        .filter(m => m.from.row === selectedSquare.row && m.from.col === selectedSquare.col)
        .map(m => m.to);
      setLegalMovesFromSelected(moves);
    } else {
      setLegalMovesFromSelected([]);
    }
  }, [selectedSquare, game]);

  const handleSquareClick = (row: number, col: number) => {
    if (game.isGameOver) return;

    if (selectedSquare) {
      const isLegal = legalMovesFromSelected.some(m => m.row === row && m.col === col);
      if (isLegal) {
        onMove({ from: selectedSquare, to: { row, col } });
        setSelectedSquare(null);
      } else {
        const piece = game.board[row][col];
        if (piece && piece.color === game.turn) {
          setSelectedSquare({ row, col });
        } else {
          setSelectedSquare(null);
        }
      }
    } else {
      const piece = game.board[row][col];
      if (piece && piece.color === game.turn) {
        setSelectedSquare({ row, col });
      }
    }
  };

  const isSquareHint = (row: number, col: number) => {
    if (!hintMove) return false;
    return (hintMove.from.row === row && hintMove.from.col === col) ||
           (hintMove.to.row === row && hintMove.to.col === col);
  };

  return (
    <div className="relative aspect-square w-full max-w-[550px] mx-auto select-none rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[12px] border-card/80 bg-card ring-1 ring-white/10 group">
      <div className="chess-board-grid w-full h-full">
        {game.board.map((rowArr, row) =>
          rowArr.map((piece, col) => {
            const isDark = (row + col) % 2 === 1;
            const isSelected = selectedSquare?.row === row && selectedSquare?.col === col;
            const isLegalDest = legalMovesFromSelected.some(m => m.row === row && m.col === col);
            const isHint = isSquareHint(row, col);

            return (
              <div
                key={`${row}-${col}`}
                onClick={() => handleSquareClick(row, col)}
                className={cn(
                  "relative cursor-pointer transition-all duration-300 overflow-hidden",
                  isDark ? "square-dark" : "square-light",
                  isSelected && "square-highlight",
                  isHint && "square-hint animate-pulse-glow"
                )}
              >
                {/* Square Coordinates Labels */}
                {col === 0 && (
                  <span className={cn(
                    "absolute top-1 left-1.5 text-[10px] font-black opacity-20 transition-opacity group-hover:opacity-40",
                    isDark ? "text-slate-400" : "text-slate-600"
                  )}>
                    {BOARD_SIZE - row}
                  </span>
                )}
                {row === BOARD_SIZE - 1 && (
                  <span className={cn(
                    "absolute bottom-1 right-1.5 text-[10px] font-black opacity-20 transition-opacity group-hover:opacity-40",
                    isDark ? "text-slate-400" : "text-slate-600"
                  )}>
                    {String.fromCharCode(97 + col).toUpperCase()}
                  </span>
                )}

                {/* Piece Rendering */}
                {piece && (
                  <div className={cn(
                    "w-full h-full p-2.5 transition-all duration-300",
                    isSelected ? "scale-110 drop-shadow-2xl z-20" : "scale-100 drop-shadow-lg",
                    game.isGameOver ? "grayscale-[0.3]" : ""
                  )}>
                    <Piece type={piece.type} color={piece.color} />
                  </div>
                )}

                {/* Legal Move Indicator */}
                {isLegalDest && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={cn(
                      "rounded-full transition-all duration-500",
                      piece 
                        ? "w-[85%] h-[85%] border-[3px] border-accent/40 animate-pulse scale-95" 
                        : "w-4 h-4 bg-accent/30 shadow-[0_0_10px_rgba(96,222,222,0.3)]"
                    )} />
                  </div>
                )}
                
                {/* Subtle Inner Square Border */}
                <div className="absolute inset-0 border border-white/[0.02] pointer-events-none" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Board;
