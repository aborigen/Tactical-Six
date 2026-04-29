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
- **Modern Command Interface**: 
  - **Drag & Drop**: Intuitive piece movement for desktop users.
  - **Click-to-Move**: Precise tactical deployment for all platforms.
  - **Manoeuvre Indicators**: Visual arrow overlays highlighting the most recent engagement.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (Static Export Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: React Hooks & Custom Chess Logic
- **Audio**: Web Audio API (Logic-based synthesis)
- **Persistence**: Browser LocalStorage
- **SDK**: Yandex Games SDK v2 Integration

## 🎮 How to Play

1. **Deployment**: White and Black start on opposite sides of the 6x6 grid.
2. **Matrix Rules**: Standard chess rules apply, but within a reduced 6x6 space. Note: Pawns move 1 square forward (no double-move) and capture diagonally.
3. **AI Engagement**: Toggle "VS AI" in the header to challenge the local tactical engine.
4. **Winning**: Achieve checkmate by trapping the enemy King. The mission also ends in a draw if a stalemate or insufficient material situation occurs.

## 🏗 Architecture Note: Why no Server Actions?

To maintain compatibility with static hosting (ZIP upload for Yandex Games), this project uses a **Client-Only** architecture:
- **No `'use server'`**: Every function is executed in the browser.
- **Local Minimax**: Instead of calling a cloud LLM, the "AI" is a logic-based search running on the user's CPU.
- **Static Export**: The `next.config.ts` is set to `output: 'export'`, generating a pure HTML/JS/CSS bundle.

## 🛠 Development

To start the development environment:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## 🛰 Connecting to GitHub

If you need to reconnect your local repository to GitHub, follow these tactical steps:

1. **Verify Current Remote**:
   ```bash
   git remote -v
   ```

2. **Remove Old Remote (if needed)**:
   ```bash
   git remote remove origin
   ```

3. **Establish New Connection**:
   ```bash
   git remote add origin https://github.com/aborigen/Tactical-Six.git
   ```

4. **Synchronize Main Branch**:
   ```bash
   git push -u origin main
   ```

## 🔐 Troubleshooting: Git Access Errors

### Error: "403 Forbidden" (No anonymous write access)
This occurs when Git uses incorrect or expired credentials.
- **Option A (Recommended)**: Switch to SSH. Update your remote: `git remote set-url origin git@github.com:aborigen/Tactical-Six.git`.
- **Option B**: Clear cached credentials in macOS Keychain Access or Windows Credential Manager.

### Error: "ECONNREFUSED /tmp/vscode-git-..."
- **Fix**: Restart VS Code or run your `git push` command from a standalone OS terminal instead of the integrated VS Code terminal.

---
*Tactical Operational Manual v1.2.0*