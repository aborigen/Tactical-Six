"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ChessGame, BOARD_SIZE, Position, Move } from '@/lib/chess-logic';
import Piece, { PiecePartStyle } from './Piece';
import { cn } from '@/lib/utils';
import { Trophy, Star } from 'lucide-react';

interface BoardProps {
  game: ChessGame;
  onMove: (move: Move) => void;
  hintMove?: Move | null;
  headSkin?: PiecePartStyle;
  bodySkin?: PiecePartStyle;
  baseSkin?: PiecePartStyle;
}

const Board: React.FC<BoardProps> = ({ 
  game, 
  onMove, 
  hintMove, 
  headSkin = 'simple',
  bodySkin = 'simple',
  baseSkin = 'simple'
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [legalMovesFromSelected, setLegalMovesFromSelected] = useState<Position[]>([]);

  const lastMove = game.history.length > 0 ? game.history[game.history.length - 1] : null;

  const checkSquare = useMemo(() => {
    if (game.isGameOver) return null;
    if (game.isInCheck(game.turn)) {
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          const piece = game.board[row][col];
          if (piece && piece.type === 'k' && piece.color === game.turn) {
            return { row, col };
          }
        }
      }
    }
    return null;
  }, [game]);

  const checkmateSquare = useMemo(() => {
    if (game.isGameOver && game.status.toLowerCase().includes('checkmate')) {
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          const piece = game.board[row][col];
          if (piece && piece.type === 'k' && piece.color === game.turn) {
            return { row, col };
          }
        }
      }
    }
    return null;
  }, [game]);

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

  const handleDragStart = (e: React.DragEvent, row: number, col: number) => {
    if (game.isGameOver) {
      e.preventDefault();
      return;
    }
    const piece = game.board[row][col];
    if (piece && piece.color === game.turn) {
      setSelectedSquare({ row, col });
      e.dataTransfer.setData("text/plain", JSON.stringify({ row, col }));
      e.dataTransfer.effectAllowed = "move";
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    try {
      const fromPos = JSON.parse(data) as Position;
      if (fromPos) {
        const isLegal = game.getLegalMoves(game.turn).some(m => 
          m.from.row === fromPos.row && m.from.col === fromPos.col &&
          m.to.row === row && m.to.col === col
        );
        if (isLegal) {
          onMove({ from: fromPos, to: { row, col } });
        }
      }
    } catch (err) {
      console.error("Failed to process drop:", err);
    }
    setSelectedSquare(null);
  };

  const isSquareHint = (row: number, col: number) => {
    if (!hintMove) return false;
    return (hintMove.from.row === row && hintMove.from.col === col) ||
           (hintMove.to.row === row && hintMove.to.col === col);
  };

  const getSquareCenter = (pos: Position) => ({
    x: ((pos.col + 0.5) * 100) / BOARD_SIZE,
    y: ((pos.row + 0.5) * 100) / BOARD_SIZE,
  });

  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      onContextMenu={preventContextMenu}
      className="relative aspect-square w-full max-w-[550px] max-h-full mx-auto select-none rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[12px] border-card/80 bg-card ring-1 ring-white/10 group touch-none"
    >
      <div className="chess-board-grid w-full h-full">
        {game.board.map((rowArr, row) =>
          rowArr.map((piece, col) => {
            const isDark = (row + col) % 2 === 1;
            const isSelected = selectedSquare?.row === row && selectedSquare?.col === col;
            const isLegalDest = legalMovesFromSelected.some(m => m.row === row && m.col === col);
            const isHint = isSquareHint(row, col);
            const isLastMoveFrom = lastMove?.from.row === row && lastMove?.from.col === col;
            const isLastMoveTo = lastMove?.to.row === row && lastMove?.to.col === col;
            const isCheck = checkSquare?.row === row && checkSquare?.col === col;
            const isCheckmate = checkmateSquare?.row === row && checkmateSquare?.col === col;

            return (
              <div
                key={`${row}-${col}`}
                onClick={() => handleSquareClick(row, col)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, row, col)}
                className={cn(
                  "relative transition-all duration-300 overflow-hidden",
                  isDark ? "square-dark" : "square-light",
                  isSelected && "square-highlight",
                  isHint && "square-hint animate-pulse-glow",
                  isCheck && "square-check",
                  isCheckmate && "square-checkmate",
                  (isLastMoveFrom || isLastMoveTo) && !isSelected && !isHint && !isCheck && !isCheckmate && "bg-primary/10"
                )}
              >
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

                {isCheck && (
                  <div className="absolute top-1 right-1 bg-destructive text-destructive-foreground text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center animate-bounce shadow-lg border border-white/20 z-40">
                    !
                  </div>
                )}

                {isCheckmate && (
                  <div className="absolute inset-0 flex items-center justify-center z-40">
                    <Star className="w-8 h-8 text-primary fill-primary animate-spin" />
                  </div>
                )}

                {piece && (
                  <div 
                    draggable={!game.isGameOver && piece.color === game.turn}
                    onDragStart={(e) => handleDragStart(e, row, col)}
                    className={cn(
                      "w-full h-full p-0 transition-all duration-300 flex items-center justify-center",
                      !game.isGameOver && piece.color === game.turn ? "cursor-grab active:cursor-grabbing" : "cursor-default",
                      isSelected ? "scale-105 drop-shadow-2xl z-20" : "scale-100 drop-shadow-lg",
                      isCheck || isCheckmate ? "animate-check-piece z-30" : "",
                      game.isGameOver && !isCheckmate ? "grayscale-[0.3]" : ""
                    )}
                  >
                    <Piece 
                      type={piece.type} 
                      color={piece.color} 
                      headStyle={headSkin} 
                      bodyStyle={bodySkin} 
                      baseStyle={baseSkin} 
                    />
                  </div>
                )}

                {isLegalDest && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={cn(
                      "rounded-full transition-all duration-500",
                      piece 
                        ? "w-[95%] h-[95%] border-[3px] border-accent/40 animate-pulse scale-100" 
                        : "w-3 h-3 bg-accent/40 shadow-[0_0_10px_rgba(96,222,222,0.4)]"
                    )} />
                  </div>
                )}
                
                <div className="absolute inset-0 border border-white/[0.02] pointer-events-none" />
              </div>
            );
          })
        )}
      </div>

      {game.isGameOver && game.status.toLowerCase().includes('checkmate') && (
        <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-primary/10 backdrop-blur-[2px] animate-in fade-in zoom-in duration-500">
           <Trophy className="w-32 h-32 text-primary drop-shadow-[0_0_30px_rgba(255,191,0,0.8)] animate-bounce mb-4" />
           <div className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-black text-2xl uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(255,191,0,0.5)] border-4 border-white/20">
             Victory!
           </div>
        </div>
      )}

      {lastMove && !game.isGameOver && (
        <svg className="absolute inset-0 pointer-events-none z-30 w-full h-full overflow-visible drop-shadow-[0_0_8px_rgba(46,117,184,0.4)]">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon 
                points="0 0, 10 3.5, 0 7" 
                fill="hsl(var(--primary))" 
                className="opacity-70"
              />
            </marker>
          </defs>
          <line
            x1={`${getSquareCenter(lastMove.from).x}%`}
            y1={`${getSquareCenter(lastMove.from).y}%`}
            x2={`${getSquareCenter(lastMove.to).x}%`}
            y2={`${getSquareCenter(lastMove.to).y}%`}
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            className="opacity-40 animate-in fade-in duration-500"
          />
        </svg>
      )}
    </div>
  );
};

export default Board;