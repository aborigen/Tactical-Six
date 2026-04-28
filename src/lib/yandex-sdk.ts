/**
 * @fileOverview Utility wrapper for Yandex Games SDK v2.
 * Provides safe access to SDK features in a Next.js environment.
 */

export interface YandexSDK {
  adv: {
    showFullscreenAdv: (callbacks: {
      onOpen?: () => void;
      onClose?: (wasShown: boolean) => void;
      onError?: (error: string) => void;
      onOffline?: () => void;
    }) => void;
    showRewardedVideo: (callbacks: {
      onOpen?: () => void;
      onRewarded?: () => void;
      onClose?: () => void;
      onError?: (error: string) => void;
    }) => void;
  };
  auth: {
    openAuthDialog: () => Promise<void>;
  };
  getPlayer: (options?: { scopes?: boolean }) => Promise<YandexPlayer>;
  getLeaderboards: () => Promise<YandexLeaderboards>;
  environment: {
    i18n: {
      lang: string;
      tld: string;
    };
  };
}

export interface YandexPlayer {
  getName: () => string;
  getPhoto: (size: 'small' | 'medium' | 'large') => string;
  getUniqueID: () => string;
  setData: (data: any, flush?: boolean) => Promise<void>;
  getData: (keys?: string[]) => Promise<any>;
}

export interface YandexLeaderboards {
  setLeaderboardScore: (name: string, score: number, extraData?: string) => Promise<void>;
  getLeaderboardEntries: (name: string, options?: any) => Promise<any>;
}

declare global {
  interface Window {
    YaGames?: {
      init: () => Promise<YandexSDK>;
    };
  }
}

let ysdkInstance: YandexSDK | null = null;

/**
 * Initializes the Yandex Games SDK.
 */
export async function initYandexSDK(): Promise<YandexSDK | null> {
  if (typeof window === 'undefined') return null;
  if (ysdkInstance) return ysdkInstance;

  if (window.YaGames) {
    try {
      ysdkInstance = await window.YaGames.init();
      console.log('Yandex Games SDK initialized');
      return ysdkInstance;
    } catch (e) {
      console.error('Failed to initialize Yandex Games SDK', e);
      return null;
    }
  }
  return null;
}

/**
 * Gets the current SDK instance.
 */
export function getYandexSDK(): YandexSDK | null {
  return ysdkInstance;
}

/**
 * Shows a fullscreen advertisement.
 */
export function showFullscreenAd() {
  const sdk = getYandexSDK();
  if (sdk) {
    sdk.adv.showFullscreenAdv({
      onClose: (wasShown) => {
        console.log('Ad closed, was shown:', wasShown);
      },
      onError: (err) => {
        console.error('Ad error:', err);
      }
    });
  }
}
