/**
 * i18n configuration using react-i18next
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import zh from './locales/zh.json'

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]['code']
const defaultLanguage: SupportedLanguage = 'en'

export function normalizeSupportedLanguage(code?: string | null): SupportedLanguage {
  const normalized = String(code ?? '').trim().toLowerCase()
  if (normalized.startsWith('zh')) return 'zh'
  if (normalized.startsWith('en')) return 'en'
  return defaultLanguage
}

export function getSupportedLanguage(code?: string | null) {
  const normalized = normalizeSupportedLanguage(code)
  return supportedLanguages.find((language) => language.code === normalized) ?? supportedLanguages[0]
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],
    load: 'languageOnly',
    cleanCode: true,
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
  })

export default i18n
