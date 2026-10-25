
# Tactical Six | Multi-Platform Integration Manual

This document outlines the architecture for deploying **Tactical Six** to various game platforms using build-time environment selection.

## 🚀 Supported Platforms
- **Yandex Games**: Full support for ads, leaderboards, and localization.
- **VK Games**: Integration via VK Bridge for social features and ads.
- **Sber Devices**: Optimized for Canvas SDK and voice-enabled devices.
- **Web**: Standard standalone build for web browsers.

## 🛠 Build Commands
To build the project for a specific platform, use the following scripts:

```bash
# Build for Yandex Games
npm run build:yandex

# Build for VK Games
npm run build:vk

# Build for Sber Devices
npm run build:sber
```

## 🧠 Architectural Logic
1.  **Environment Selection**: The `NEXT_PUBLIC_PLATFORM` variable is injected during the build process.
2.  **Configuration**: `src/lib/platform-config.ts` detects this variable and provides the correct SDK script URL to the layout.
3.  **Conditional Scripts**: `src/app/layout.tsx` injects the required `<Script>` tag (e.g., Yandex SDK or VK Bridge) before the application mounts.
4.  **SDK Orchestration**: `src/lib/platform-sdk.ts` provides a unified interface (`PlatformSDK`) for common game actions like `showFullscreenAd()` or `gameReady()`.

## 📡 Common SDK Methods
Use `PlatformSDK` throughout the app to ensure cross-platform compatibility:

- `PlatformSDK.initialize()`: Boots the specific platform's bridge or SDK.
- `PlatformSDK.showFullscreenAd()`: Triggers the platform's interstitial ad system.
- `PlatformSDK.gameReady()`: Signals that tactical assets are loaded.
- `PlatformSDK.setLeaderboardScore()`: Syncs commander EXP to the platform's global ranking.

---
*Operational Intelligence Report | Platform Integration v1.0*
