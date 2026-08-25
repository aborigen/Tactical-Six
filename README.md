# Tactical Six | Advanced 6x6 Strategic Chess

Tactical Six is a sophisticated 6x6 chess variant designed for fast-paced, high-intensity strategic engagement. It features a custom-built local tactical engine, persistent mission tracking, and a modern, high-fidelity interface.

## 🚀 Key Features

- **6x6 Matrix Combat**: A condensed arena that forces tactical engagement and rewards precise positioning. Features a standard back-rank deployment (R-N-B-Q-K-R) optimized for the 6-file grid.
- **Advanced Tactical Engine**: Powered by a refactored Minimax algorithm with Alpha-Beta pruning, Move Ordering (MVV-LVA), and Piece-Square Tables (PST). Includes 5 difficulty levels from **Recruit** to **Grandmaster**.
- **Static Matrix Architecture**: Optimized for deployment on static hosting environments (GitHub Pages, Yandex Games). Runs entirely in the browser for maximum portability.
- **Persistent Mission Tally**: Integrated score tracking and difficulty settings saved to `localStorage`, allowing you to monitor your campaign progress.
- **Localized Intelligence**: Full localization for English and Russian, including real-time AI tactical evaluation explanations.
- **Onboarding Protocol**: Interactive mission briefing system for new commanders.
- **Synthesized Tactical Audio**: Real-time auditory feedback synthesized via Web Audio API.
- **UI Component Matrix**: Detailed documentation of all command center components is available in [UI_MANIFEST.md](./UI_MANIFEST.md).

## 🧠 Chess Engine Technical Logic

The AI in Tactical Six is a deterministic search engine implemented in TypeScript. It follows these core principles:

1. **Minimax Search**: Builds a recursive tree of possible moves, assuming optimal play from the opponent.
2. **Alpha-Beta Pruning**: Critical optimization that stops evaluating branches once they are proven suboptimal.
3. **Move Ordering**: Evaluates captures and promotions first to trigger faster pruning.
4. **Positional Heuristics**: Uses PST to value central control and pawn structure over simple material counting.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (Static Export Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Audio**: Web Audio API (Logic-based synthesis)
- **SDK**: Yandex Games SDK v2 Integration

---
*Tactical Operational Manual v1.8.0*
