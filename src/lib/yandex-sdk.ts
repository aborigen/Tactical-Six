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
  /**
   * Sets a new score for the player in the specified leaderboard.
   * @param leaderboardName Unique identifier of the leaderboard.
   * @param score Numerical value of the score.
   * @param extraData Additional string-based tactical data.
   */
  setScore: (leaderboardName: string, score: number, extraData?: string) => Promise<void>;
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
 */
export function gameReady() {
  const sdk = getYandexSDK();
  if (sdk?.features?.LoadingAPI) {
    sdk.features.LoadingAPI.ready();
  } else if (sdk?.features?.LoadingProgress) {
    sdk.features.LoadingProgress.ready();
  }
}

/**
 * Shows a fullscreen advertisement.
 */
export function showFullscreenAd(options?: { onOpen?: () => void; onClose?: () => void }) {
  const sdk = getYandexSDK();
  if (sdk) {
    sdk.adv.showFullscreenAdv({
      callbacks: {
        onOpen: () => options?.onOpen?.(),
        onClose: () => options?.onClose?.(),
        onError: () => options?.onClose?.(),
        onOffline: () => options?.onClose?.()
      }
    });
  } else {
    options?.onClose?.();
  }
}

/**
 * Safely sets the leaderboard score using the correct setScore() method.
 * Following Yandex Games SDK v2 documentation and provided signature.
 */
export async function setYandexLeaderboardScore(name: string, score: number, extraData?: string) {
  const sdk = getYandexSDK();
  if (!sdk) return;

  try {
    let lb: YandexLeaderboards;

    // Use the non-deprecated leaderboards property if available, otherwise fallback to getLeaderboards()
    if (sdk.leaderboards) {
      lb = await Promise.resolve(sdk.leaderboards);
    } else {
      lb = await sdk.getLeaderboards();
    }

    if (lb && typeof lb.setScore === 'function') {
      await lb.setScore(name, score, extraData);
      console.log(`Yandex Games: Score ${score} successfully set for "${name}"`);
    } else {
      console.warn('Yandex Games: Leaderboard setScore() method not found.');
    }
  } catch (err) {
    console.error('Yandex Games: Leaderboard score submission failed', err);
  }
}
