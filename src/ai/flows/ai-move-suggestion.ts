'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting a strategically sound chess move on a 6x6 board.
 *
 * - aiMoveSuggestion - A function that handles the AI chess move suggestion process.
 * - AIMoveSuggestionInput - The input type for the aiMoveSuggestion function.
 * - AIMoveSuggestionOutput - The return type for the aiMoveSuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema for the AI move suggestion.
const AIMoveSuggestionInputSchema = z.object({
  boardState: z.string().describe(`The current 6x6 chess board state represented as a multi-line string.
  Each line represents a rank, from rank 6 down to rank 1.
  Example:
  'rnbqkn'
  'pppppp'
  '......'
  '......'
  'PPPPPP'
  'RNBQKN'
  Lowercase letters for black pieces (p, n, b, r, q, k).
  Uppercase letters for white pieces (P, N, B, R, Q, K).
  '.' for an empty square.`),
  currentPlayer: z.enum(['white', 'black']).describe('The player whose turn it is to move.'),
  legalMoves: z.array(z.string()).describe('A list of all legal moves available in algebraic notation (e.g., "e2e4", "g1f3"). The suggested move MUST be one of these.'),
});
export type AIMoveSuggestionInput = z.infer<typeof AIMoveSuggestionInputSchema>;

// Output Schema for the AI move suggestion.
const AIMoveSuggestionOutputSchema = z.object({
  suggestedMove: z.string().describe('The AI-suggested legal move in algebraic notation, chosen from the provided list of legal moves.'),
  explanation: z.string().describe('A brief explanation of why this move was suggested, highlighting its strategic advantages.'),
});
export type AIMoveSuggestionOutput = z.infer<typeof AIMoveSuggestionOutputSchema>;

/**
 * Orchestrates the AI chess move suggestion process.
 * It takes the current board state, active player, and a list of legal moves as input,
 * and returns a strategically sound suggested move with an explanation.
 * @param input The input for the AI move suggestion, including board state, current player, and legal moves.
 * @returns A promise that resolves to the AI's suggested move and an explanation.
 */
export async function aiMoveSuggestion(input: AIMoveSuggestionInput): Promise<AIMoveSuggestionOutput> {
  return aiMoveSuggestionFlow(input);
}

const aiMoveSuggestionPrompt = ai.definePrompt({
  name: 'aiMoveSuggestionPrompt',
  input: { schema: AIMoveSuggestionInputSchema },
  output: { schema: AIMoveSuggestionOutputSchema },
  prompt: `You are an expert chess grandmaster tasked with suggesting the best possible move on a 6x6 chess board.\n\nCurrent Player: {{{currentPlayer}}}\n\nCurrent Board State:\n{{{boardState}}}\n\nLegal Moves:\n{{#each legalMoves}}- {{{this}}}\n{{/each}}\n\nBased on the current player, the board state, and the provided list of legal moves, suggest a single strategically sound move. Your suggested move MUST be present in the 'Legal Moves' list. Provide a brief explanation for your choice.`,
});

const aiMoveSuggestionFlow = ai.defineFlow(
  {
    name: 'aiMoveSuggestionFlow',
    inputSchema: AIMoveSuggestionInputSchema,
    outputSchema: AIMoveSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await aiMoveSuggestionPrompt(input);
    if (!output) {
      throw new Error('AI did not provide a valid move suggestion.');
    }
    return output;
  }
);
