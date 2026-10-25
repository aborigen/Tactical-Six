
/**
 * @fileOverview Unified Tactical SDK Orchestrator.
 * Abstracts platform-specific APIs into a single interface.
 */

import { CURRENT_PLATFORM } from './platform-config';
import { initYandexSDK, showFullscreenAd as showYandexAd, gameReady as yandexReady } from './yandex-sdk';

export interface PlatformInterface {
  initialize: () => Promise<void>;
  showFullscreenAd: () => void;
  gameReady: () => void;
  setLeaderboardScore: (name: string, score: number) => Promise<void>;
}

export const PlatformSDK: PlatformInterface = {
  async initialize() {
    console.log(`[PlatformSDK] Initializing tactical environment: ${CURRENT_PLATFORM.toUpperCase()}`);
    
    switch (CURRENT_PLATFORM) {
      case 'yandex':
        await initYandexSDK();
        break;
      case 'vk':
        if (typeof window !== 'undefined' && (window as any).vkBridge) {
          await (window as any).vkBridge.send('VKWebAppInit');
        }
        break;
      case 'sber':
        // Sber Canvas SDK initialization would go here
        break;
      default:
        console.log('[PlatformSDK] Running in standard web mode.');
    }
  },

  showFullscreenAd() {
    switch (CURRENT_PLATFORM) {
      case 'yandex':
        showYandexAd();
        break;
      case 'vk':
        if (typeof window !== 'undefined' && (window as any).vkBridge) {
          (window as any).vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' });
        }
        break;
      default:
        console.log('[PlatformSDK] Ad suppressed on this platform.');
    }
  },

  gameReady() {
    switch (CURRENT_PLATFORM) {
      case 'yandex':
        yandexReady();
        break;
      case 'sber':
        // Signal ready to Sber
        break;
      default:
        console.log('[PlatformSDK] System ready.');
    }
  },

  async setLeaderboardScore(name: string, score: number) {
    switch (CURRENT_PLATFORM) {
      case 'yandex':
        // Existing yandex leaderboard logic
        const { setYandexLeaderboardScore } = await import('./yandex-sdk');
        await setYandexLeaderboardScore(name, score);
        break;
      case 'vk':
        // VK leaderboard entry
        break;
    }
  }
};
