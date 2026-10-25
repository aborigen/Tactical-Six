
/**
 * @fileOverview Defines the active tactical deployment platform.
 * Controlled via NEXT_PUBLIC_PLATFORM environment variable at build time.
 */

export type Platform = 'yandex' | 'vk' | 'sber' | 'web';

export const CURRENT_PLATFORM: Platform = (process.env.NEXT_PUBLIC_PLATFORM as Platform) || 'web';

export const PLATFORM_DETAILS = {
  yandex: {
    name: 'Yandex Games',
    script: 'https://yandex.ru/games/sdk/v2',
    isSupported: true,
  },
  vk: {
    name: 'VK Games',
    script: 'https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js',
    isSupported: true,
  },
  sber: {
    name: 'Sber Devices',
    script: 'https://smartapp-code.sberdevices.ru/canvas-sdk.js',
    isSupported: true,
  },
  web: {
    name: 'Standalone Web',
    script: null,
    isSupported: true,
  }
};
