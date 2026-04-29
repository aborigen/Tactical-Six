/**
 * @fileOverview This file defines a local logic-based search for suggesting a strategically sound chess move.
 * It runs entirely on the client to support static export environments.
 */

import { ChessGame } from '@/lib/chess-logic';

export interface AIMoveSuggestionInput {
  boardState: string;
  currentPlayer: 'white' | 'black';
  legalMoves: string[];
  depth?: number;
}

export interface AIMoveSuggestionOutput {
  suggestedMove: string;
  explanation: string;
  depth: number;
}

/**
 * Orchestrates the chess move suggestion process using a local minimax search.
 * @param input The input for the move suggestion, including board state and player.
 * @returns A promise that resolves to the suggested move and an explanation.
 */
export async function aiMoveSuggestion(input: AIMoveSuggestionInput): Promise<AIMoveSuggestionOutput> {
  // We use a small delay to simulate calculation and ensure UI responsiveness
  await new Promise(resolve => setTimeout(resolve, 300));

  const game = new ChessGame();
  const searchDepth = input.depth || 3;
  
  // Reconstruct board from string
  const ranks = input.boardState.split('\n');
  for (let r = 0; r < ranks.length; r++) {
    for (let c = 0; c < ranks[r].length; c++) {
      const char = ranks[r][c];
      if (char === '.') {
        game.board[r][c] = null;
      } else {
        const isWhite = char === char.toUpperCase();
        game.board[r][c] = {
          type: char.toLowerCase() as any,
          color: isWhite ? 'white' : 'black'
        };
      }
    }
  }
  game.turn = input.currentPlayer;

  const result = game.getBestMove(searchDepth);
  
  if (!result.move) {
    throw new Error("No legal moves available for AI");
  }

  const algebraic = ChessGame.toAlgebraic(result.move);

  return {
    suggestedMove: algebraic,
    explanation: `Calculated via Local Tactical Engine (Depth ${searchDepth}). The position score is evaluated at ${(result.score / 100).toFixed(2)}. This move prioritizes material balance and positional control within the 6x6 matrix.`,
    depth: searchDepth
  };
}