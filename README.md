# Tactical Six | Advanced 6x6 Strategic Chess

Tactical Six is a sophisticated 6x6 chess variant designed for fast-paced, high-intensity strategic engagement. It features a custom-built local tactical engine, persistent mission tracking, and a modern, high-fidelity interface.

## 🚀 Key Features

- **6x6 Matrix Combat**: A condensed arena that forces tactical engagement and rewards precise positioning. Features a standard back-rank deployment (R-N-B-Q-K-R) optimized for the 6-file grid.
- **Local Tactical Engine**: Powered by a custom Minimax algorithm with Alpha-Beta pruning. Includes 3 selectable difficulty levels: **Cadet** (Depth 1), **Specialist** (Depth 3), and **Commander** (Depth 4).
- **Static Matrix Architecture**: Optimized for deployment on static hosting environments (GitHub Pages, Yandex Games). This app contains **zero Server Actions**, running entirely in the browser for maximum portability.
- **Persistent Mission Tally**: Integrated score tracking and difficulty settings saved to `localStorage`, allowing you to monitor your campaign progress across sessions.
- **Multilingual Command**: Full localization for English and Russian, covering all interface elements, tactical hints, and rule protocols.
- **Synthesized Tactical Audio**: Real-time auditory feedback synthesized via Web Audio API for moves, captures, checks, and mission conclusions.
- **Advanced Rule Enforcement**: Comprehensive logic for Checkmate, Stalemate, and Insufficient Material draws.

## 🧠 Chess Engine Technical Logic

The AI in Tactical Six is a deterministic search engine implemented in TypeScript. It follows these core principles:

1. **Minimax Search**: The engine builds a tree of possible moves. For every move it considers, it simulates the opponent's best response.
2. **Alpha-Beta Pruning**: A critical optimization that stops evaluating a move as soon as it's determined to be worse than a previously evaluated option.
3. **Variable Search Depth**:
   - **Easy (Cadet)**: Depth 1 (Immediate consequences only).
   - **Medium (Specialist)**: Depth 3 (Balanced tactical vision).
   - **Hard (Commander)**: Depth 4 (Advanced tactical foresight).

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (Static Export Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Audio**: Web Audio API (Logic-based synthesis)
- **Persistence**: Browser LocalStorage
- **SDK**: Yandex Games SDK v2 Integration

## 🛰 Deployment & Troubleshooting

### Static Export Deployment
1. Run `npm run build`.
2. The static files will be generated in the `/out` directory.
3. For Yandex Games, zip the contents of the `/out` directory and upload the archive.

### Git Troubleshooting Protocol

If you encounter errors during `git push`, follow these tactical protocols:

**Error: Permission Denied (403)**
This occurs when GitHub rejects your local credentials. Use one of the following fixes to force Git to ask for new credentials:

- **macOS (Keychain Access)**:
  1. Press **Cmd + Space**, type **"Keychain Access"**, and press Enter.
  2. In the search bar at the top right, type **`github.com`**.
  3. Find the entry labeled **"Internet Password"** for `github.com`.
  4. Right-click the entry and select **Delete "github.com"**.
  5. Close Keychain Access and return to your terminal.
  6. The next time you `git push`, Git will ask for your username and **Personal Access Token**.
- **Windows (Credential Manager)**:
  1. Open **Control Panel** > **User Accounts** > **Credential Manager**.
  2. Select **Windows Credentials**.
  3. Find `git:https://github.com` and click **Remove**.

**Error: ECONNREFUSED / socket error**
This occurs when the VS Code Git bridge is stale.
1. **Restart VS Code**: Closing and reopening the environment usually resets the communication socket.
2. **Use External Terminal**: Run your git commands from the system terminal instead of the integrated VS Code terminal to bypass the broken socket.

---
*Tactical Operational Manual v1.2.0*
