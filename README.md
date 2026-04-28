# Tactical Six | Advanced 6x6 Strategic Chess

Tactical Six is a sophisticated 6x6 chess variant designed for fast-paced, high-intensity strategic engagement. It features a custom-built local tactical engine, persistent mission tracking, and a modern, high-fidelity interface.

## 🚀 Key Features

- **6x6 Matrix Combat**: A condensed arena that forces tactical engagement and rewards precise positioning. Features a standard back-rank deployment (R-N-B-Q-K-R) optimized for the 6-file grid.
- **Local Tactical Engine**: Powered by a custom Minimax algorithm with Alpha-Beta pruning (Depth 3). Provides instant strategic analysis and an AI opponent without external API calls.
- **Persistent Mission Tally**: Integrated score tracking saved to `localStorage`, allowing you to monitor your campaign progress across sessions.
- **Multilingual Command**: Full localization for English and Russian, covering all interface elements, tactical hints, and rule protocols.
- **Synthesized Tactical Audio**: Real-time auditory feedback synthesized via Web Audio API for moves, captures, checks, and mission conclusions.
- **Advanced Rule Enforcement**: Comprehensive logic for Checkmate, Stalemate, and Insufficient Material draws.
- **Modern Command Interface**: 
  - **Drag & Drop**: Intuitive piece movement for desktop users.
  - **Click-to-Move**: Precise tactical deployment for all platforms.
  - **Manoeuvre Indicators**: Visual arrow overlays highlighting the most recent engagement.
- **Onboarding Protocol**: A multi-step introductory experience for new commanders, explaining the 6x6 meta and interface.
- **Mission Playback**: Review past battles with a dedicated playback controller and tactical log history.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: React Hooks & Custom Chess Logic
- **Audio**: Web Audio API (Logic-based synthesis)
- **Persistence**: Browser LocalStorage
- **Static Export**: Optimized for deployment on static hosting (e.g., GitHub Pages, Firebase Hosting).

## 🎮 How to Play

1. **Deployment**: White and Black start on opposite sides of the 6x6 grid.
2. **Matrix Rules**: Standard chess rules apply, but within a reduced 6x6 space. Note: Pawns move 1 square forward (no double-move) and capture diagonally.
3. **AI Engagement**: Toggle "VS AI" in the header to challenge the local tactical engine.
4. **Winning**: Achieve checkmate by trapping the enemy King. The mission also ends in a draw if a stalemate or insufficient material situation occurs.

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

### Error: "403 Forbidden" or "Permission Denied"
This occurs when Git uses expired or incorrect cached credentials.

#### Option A: Switch to SSH (Recommended)
1. Generate an SSH key and add it to your GitHub account.
2. Update your remote URL:
   ```bash
   git remote set-url origin git@github.com:aborigen/Tactical-Six.git
   ```

#### Option B: Clear Cached Credentials
- **macOS**: Delete `github.com` entries in **Keychain Access**.
- **Windows**: Remove `git:https://github.com` in **Credential Manager**.

### Error: "ECONNREFUSED /tmp/vscode-git-..."
This error indicates the VS Code Git credential helper socket is broken or disconnected.

1. **Restart VS Code**: Completely close and relaunch the application. This often refreshes the socket connection.
2. **The "Nuclear Option"**: If the error persists, unset the global helper which is likely pointing to the dead socket:
   ```bash
   git config --global --unset credential.helper
   ```
3. **Sign Out/In**: Go to the **Accounts** icon (bottom left) in VS Code, sign out of GitHub, and sign back in.
4. **Use OS Terminal**: Avoid the VS Code integrated terminal. Open **Terminal.app** (macOS) or **PowerShell** (Windows) and run `git push` there. This bypasses the VS Code bridge entirely.
5. **Check Remote URL**: Ensure you aren't trying to push to a URL that doesn't exist or is misspelled.

## 📦 Static Export

To generate a static build:

```bash
npm run build
```

This creates an `out` directory ready for deployment.

---
*Tactical Operational Manual v1.2.0*