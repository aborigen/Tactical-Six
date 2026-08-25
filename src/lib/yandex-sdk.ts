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
      };
    }) => void;
  };
  auth: {
    openAuthDialog: () => Promise<void>;
  };
  getPlayer: (options?: { scopes?: boolean }) => Promise<YandexPlayer>;
  getLeaderboards: () => Promise<YandexLeaderboards>;
  leaderboards?: YandexLeaderboards | Promise<YandexLeaderboards>;
  environment: {
    i18n: {
      lang: string;
      tld: string;
    };
  };
  features: {
    LoadingAPI?: {
      ready: () => void;
    };
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
  setScore: (name: string, score: number, extraData?: string) => Promise<void>;
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
        console.log('Yandex Games: SDK initialized successfully');
        return ysdkInstance;
      } catch (e) {
        console.error('Yandex Games: Failed to initialize SDK', e);
        return null;
      }
    }
    
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return tryInit(retries - 1);
    }
    
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
 * Uses LoadingAPI.ready() per latest SDK specifications.
 */
export function gameReady() {
  const sdk = getYandexSDK();
  
  if (sdk?.features?.LoadingAPI) {
    sdk.features.LoadingAPI.ready();
    console.log('Yandex Games: LoadingAPI.ready() signal sent');
  } else if (sdk?.features?.LoadingProgress) {
    // Fallback for older SDK feature versions
    sdk.features.LoadingProgress.ready();
    console.log('Yandex Games: LoadingProgress.ready() signal sent (fallback)');
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
          options?.onClose?.(); 
        },
        onOffline: () => {
          console.log('Ad offline');
          options?.onClose?.();
        }
      }
    });
  } else {
    console.warn('Yandex SDK not ready for advertisement.');
    options?.onClose?.();
  }
}

/**
 * Safely sets the leaderboard score using the correct setScore method.
 * Handles both the deprecated getLeaderboards() and the newer leaderboards property.
 */
export async function setYandexLeaderboardScore(name: string, score: number) {
  const sdk = getYandexSDK();
  if (!sdk) return;

  try {
    let lb: YandexLeaderboards | null = null;

    // 1. Try using the leaderboards property (modern way)
    if (sdk.leaderboards) {
      lb = await Promise.resolve(sdk.leaderboards);
    } 
    
    // 2. Fallback to getLeaderboards() if the property is missing or invalid
    if (!lb || (typeof (lb as any).setScore !== 'function' && typeof (lb as any).setLeaderboardScore !== 'function')) {
      if (typeof sdk.getLeaderboards === 'function') {
        lb = await sdk.getLeaderboards();
      }
    }

    // 3. Call the correct method
    if (lb) {
      if (typeof lb.setScore === 'function') {
        await lb.setScore(name, score);
        console.log(`Yandex Games: Score ${score} successfully set via setScore() for "${name}"`);
      } else if (typeof (lb as any).setLeaderboardScore === 'function') {
        // Extreme fallback for older environments if needed
        await (lb as any).setLeaderboardScore(name, score);
        console.log(`Yandex Games: Score ${score} set via fallback setLeaderboardScore() for "${name}"`);
      }
    } else {
      console.warn('Yandex Games: Leaderboards feature not found');
    }
  } catch (err) {
    console.error('Yandex Games: Leaderboard score submission failed', err);
  }
}
