export const locales = ['en', 'es', 'zh', 'ja', 'ru', 'uk', 'fr', 'ko'] as const;
export type Locale = typeof locales[number];

export const defaultLocale = 'en' as const;

export const localeNames = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  ja: '日本語',
  ru: 'Русский',
  uk: 'Українська',
  fr: 'Français',
  ko: '한국어',
} as const;

export const localeFlags = {
  en: '🇺🇸',
  es: '🇪🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ru: '🇷🇺',
  uk: '🇺🇦',
  fr: '🇫🇷',
  ko: '🇰🇷',
} as const;

