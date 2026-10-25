# Next.js Environments & Operational Configuration

This document outlines how environments and build configurations are utilized within the **Tactical Six** project.

## 🚀 Static Export Architecture
The project is configured as a **Static Export** (`output: 'export'`) to ensure compatibility with game platforms like Yandex Games and to allow for fully offline tactical engagements.

### Key Configuration (`next.config.ts`):
- **output: 'export'**: Generates a standalone `out` directory containing static HTML, CSS, and JS.
- **assetPrefix: './'**: Ensures relative pathing for assets, which is critical for deployment environments that do not serve from the domain root.
- **images.unoptimized**: Required for static exports as the default Next.js image optimization relies on a running server.

## 🔑 Environment Variables (`.env`)
While the primary tactical engine runs locally in the browser, Genkit and AI development tools utilize environment variables.

- **GEMINI_API_KEY**: Used for AI-related development and server-side flows during testing.
- **Local Development**: The `dotenv` package is used in `src/ai/dev.ts` to load keys during Genkit execution.
- **Client-Side Safety**: No sensitive keys are exposed to the client. All tactical search logic is deterministic and runs locally using the Minimax algorithm.

## 🛠 Build & Release Protocols
Deployment is handled via specialized scripts defined in `package.json` and executed by `scripts/package.sh`.

1. **`npm run build`**: Triggers the `next build` which generates the static site in the `out` directory.
2. **Post-Build Cleanup**: The release protocol automatically purges auto-generated 404 handlers that may conflict with specific game platform requirements.
3. **Compression**: The final artifacts are zipped into a versioned archive (`tactical-six-vX.X.X.zip`) located in the `archives` folder.

## 🌐 Platform Integration
The environment detects the runtime platform (e.g., Yandex Games) via the `src/lib/yandex-sdk.ts` utility. It checks for the existence of the `YaGames` global object and initializes the SDK to handle ads, leaderboards, and localization settings based on the user's environment.

---
*Operational Intelligence Report | Next.js Environment Manual v1.0*
