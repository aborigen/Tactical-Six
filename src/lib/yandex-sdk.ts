/**
 * @fileOverview Utility wrapper for Yandex Games SDK v2.
 * Provides safe access to SDK features in a Next.js environment.
 */

export interface YandexSDK {
  adv: {
    showFullscreenAdv: (options: {
      callbacks: {
        onOpen?: () => void;
        onClose?: (wasShown: boolean) => void;
        onError?: (error: string) => void;
        onOffline?: () => void;
      };
    }) => void;
    showRewardedVideo: (options: {
      callbacks: {
        onOpen?: () => void;
        onRewarded?: () => void;
        onClose?: () => void;
        onError?: (error: string) => void;
      };
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
  features: {
    LoadingProgress?: {
      ready: () => void;
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
 * Initializes the Yandex Games SDK with a retry mechanism if the script is still loading.
 */
export async function initYandexSDK(): Promise<YandexSDK | null> {
  if (typeof window === 'undefined') return null;
  if (ysdkInstance) return ysdkInstance;

  const tryInit = async (retries = 15): Promise<YandexSDK | null> => {
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
    
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return tryInit(retries - 1);
    }
    
    console.warn('Yandex Games SDK script not found after retries.');
    return null;
  };

  return tryInit();
}

/**
 * Gets the current SDK instance.
 */
export function getYandexSDK(): YandexSDK | null {
  return ysdkInstance;
}

/**
 * Signals to Yandex that the game is ready and finished loading.
 */
export function gameReady() {
  const sdk = getYandexSDK();
  if (sdk && sdk.features && sdk.features.LoadingProgress) {
    sdk.features.LoadingProgress.ready();
    console.log('Yandex Games: Game Ready signal sent');
  } else {
    console.warn('Yandex Games: Ready signal could not be sent (SDK or Feature missing)');
  }
}

/**
 * Shows a fullscreen advertisement with standard callbacks for game state management.
 */
export function showFullscreenAd(options?: { onOpen?: () => void; onClose?: () => void }) {
  const sdk = getYandexSDK();
  if (sdk) {
    sdk.adv.showFullscreenAdv({
      callbacks: {
        onOpen: () => {
          console.log('Ad opened');
          options?.onOpen?.();
        },
        onClose: (wasShown) => {
          console.log('Ad closed, was shown:', wasShown);
          options?.onClose?.();
        },
        onError: (err) => {
          console.error('Ad error:', err);
          options?.onClose?.(); // Ensure game resumes even on error
        },
        onOffline: () => {
          console.log('Ad offline');
          options?.onClose?.();
        }
      }
    });
  } else {
    // Fallback if SDK not initialized
    console.warn('Yandex SDK not ready for advertisement.');
    options?.onClose?.();
  }
}
