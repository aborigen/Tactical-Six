'use server';
/**
 * @fileOverview This file defines a local logic-based search for suggesting a strategically sound chess move.
 * It has been updated to use a local Minimax engine instead of an external Gemini model.
 */

import { ChessGame } from '@/lib/chess-logic';
import { z } from 'genkit';

// Input Schema for the AI move suggestion.
const AIMoveSuggestionInputSchema = z.object({
  boardState: z.string().describe('The current 6x6 chess board state represented as a multi-line string.'),
  currentPlayer: z.enum(['white', 'black']).describe('The player whose turn it is to move.'),
  legalMoves: z.array(z.string()).describe('A list of all legal moves available in algebraic notation.'),
});
export type AIMoveSuggestionInput = z.infer<typeof AIMoveSuggestionInputSchema>;

// Output Schema for the AI move suggestion.
const AIMoveSuggestionOutputSchema = z.object({
  suggestedMove: z.string().describe('The strategically chosen legal move in algebraic notation.'),
  explanation: z.string().describe('A brief explanation of why this move was suggested.'),
});
export type AIMoveSuggestionOutput = z.infer<typeof AIMoveSuggestionOutputSchema>;

/**
 * Orchestrates the chess move suggestion process using a local minimax search.
 * @param input The input for the move suggestion, including board state and player.
 * @returns A promise that resolves to the suggested move and an explanation.
 */
export async function aiMoveSuggestion(input: AIMoveSuggestionInput): Promise<AIMoveSuggestionOutput> {
  const game = new ChessGame();
  
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

  const result = game.getBestMove(3);
  const algebraic = ChessGame.toAlgebraic(result.move);

  return {
    suggestedMove: algebraic,
    explanation: `Calculated via Local Tactical Engine (Depth 3). The position score is evaluated at ${(result.score / 100).toFixed(2)}. This move prioritizes material balance and positional control within the 6x6 matrix.`
  };
}
