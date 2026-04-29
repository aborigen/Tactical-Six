# Tactical Six | Advanced 6x6 Strategic Chess

Tactical Six is a sophisticated 6x6 chess variant designed for fast-paced, high-intensity strategic engagement. It features a custom-built local tactical engine, persistent mission tracking, and a modern, high-fidelity interface.

## 🚀 Key Features

- **6x6 Matrix Combat**: A condensed arena that forces tactical engagement and rewards precise positioning. Features a standard back-rank deployment (R-N-B-Q-K-R) optimized for the 6-file grid.
- **Local Tactical Engine**: Powered by a custom Minimax algorithm with Alpha-Beta pruning (Depth 3). Provides instant strategic analysis and an AI opponent without external API calls.
- **Static Matrix Architecture**: Optimized for deployment on static hosting environments (GitHub Pages, Yandex Games). This app contains **zero Server Actions**, running entirely in the browser for maximum portability.
- **Persistent Mission Tally**: Integrated score tracking saved to `localStorage`, allowing you to monitor your campaign progress across sessions.
- **Multilingual Command**: Full localization for English and Russian, covering all interface elements, tactical hints, and rule protocols.
- **Synthesized Tactical Audio**: Real-time auditory feedback synthesized via Web Audio API for moves, captures, checks, and mission conclusions.
- **Advanced Rule Enforcement**: Comprehensive logic for Checkmate, Stalemate, and Insufficient Material draws.

## 🧠 Chess Engine Technical Logic

The AI in Tactical Six is a deterministic search engine implemented in TypeScript. It follows these core principles:

1. **Minimax Search**: The engine builds a tree of possible moves. For every move it considers, it simulates the opponent's best response, continuing this process up to a depth of 3 "plies" (half-moves).
2. **Alpha-Beta Pruning**: A critical optimization that stops evaluating a move as soon as it's determined to be worse than a previously evaluated option. This allows the engine to search 10x more positions in the same amount of time.
3. **Board Evaluation**: Positions are scored based on:
   - **Material Balance**: Each piece has a weight (P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000).
   - **Positional Advantage**: Pawns receive "Rank Bonuses" as they move closer to the 6th rank, encouraging aggressive infantry deployment and promotion.

### 📊 Engine Strength Analysis
- **Strategic Level**: Intermediate (Tactical Specialist).
- **Tactical Window**: 3 Plies. The engine identifies direct threats, forks, and hanging pieces instantly.
- **ELO Equivalent**: Estimated 800–1100. It provides a challenging experience for casual players and a solid training partner for intermediates.
- **Style**: Aggressive. The engine prioritizes material gain and pawn promotion above all else.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (Static Export Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: React Hooks & Custom Chess Logic
- **Audio**: Web Audio API (Logic-based synthesis)
- **Persistence**: Browser LocalStorage
- **SDK**: Yandex Games SDK v2 Integration

## 🏗 Architecture Note: Why no Server Actions?

To maintain compatibility with static hosting (ZIP upload for Yandex Games), this project uses a **Client-Only** architecture:
- **No `'use server'`**: Every function is executed in the browser.
- **Local Minimax**: Instead of calling a cloud LLM, the "AI" is a logic-based search running on the user's CPU.
- **Static Export**: The `next.config.ts` is set to `output: 'export'`, generating a pure HTML/JS/CSS bundle.

---
*Tactical Operational Manual v1.2.0*
