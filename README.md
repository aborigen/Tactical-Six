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

### Error: "403 Forbidden" or "Permission Denied to aborigen"
This error occurs when Git tries to use cached credentials (like a Personal Access Token) from a different account or an expired token.

#### Option A: Switch to SSH (Recommended)
SSH keys are more reliable than HTTPS tokens.
1. Generate an SSH key and add it to your GitHub account.
2. Update your remote URL:
   ```bash
   git remote set-url origin git@github.com:aborigen/Tactical-Six.git
   ```
3. Push again: `git push -u origin main`.

#### Option B: Clear Cached Credentials (HTTPS)
If you prefer HTTPS, you must clear the stored credentials so Git asks for them again.
- **macOS**: 
  1. Open **Keychain Access**.
  2. Search for `github.com`.
  3. Delete the entries (Internet Password).
- **Windows**: 
  1. Open **Credential Manager**.
  2. Select **Windows Credentials**.
  3. Find `git:https://github.com` and click **Remove**.

#### Option C: Force Authenticated URL
You can force Git to use your username in the URL, which often triggers the credential prompt:
```bash
git remote set-url origin https://aborigen@github.com/aborigen/Tactical-Six.git
git push -u origin main
```
*Note: When prompted for a password, use a **Personal Access Token (PAT)**, not your GitHub password.*

## 📦 Static Export

To generate a static build for production deployment:

```bash
npm run build
```

This will create an `out` directory ready for deployment to any static web host.

---
*Tactical Operational Manual v1.2.0*
