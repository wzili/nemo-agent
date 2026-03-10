import { describe, expect, it } from 'bun:test'

import en from '../i18n/locales/en.json'
import zh from '../i18n/locales/zh.json'
import { getSupportedLanguage, normalizeSupportedLanguage } from '../i18n'

function flatten(object: Record<string, unknown>, prefix = '', result: Record<string, unknown> = {}) {
  for (const [key, value] of Object.entries(object)) {
    const nextKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value as Record<string, unknown>, nextKey, result)
      continue
    }
    result[nextKey] = value
  }
  return result
}

describe('renderer i18n config', () => {
  it('keeps zh locale keys aligned with en locale keys', () => {
    const enKeys = Object.keys(flatten(en as Record<string, unknown>)).sort()
    const zhKeys = new Set(Object.keys(flatten(zh as Record<string, unknown>)))

    expect(enKeys.filter((key) => !zhKeys.has(key))).toEqual([])
  })

  it('normalizes regional language codes to supported languages', () => {
    expect(normalizeSupportedLanguage('zh-CN')).toBe('zh')
    expect(normalizeSupportedLanguage('en-US')).toBe('en')
    expect(normalizeSupportedLanguage(undefined)).toBe('en')
  })

  it('returns supported language metadata for regional language codes', () => {
    expect(getSupportedLanguage('zh-Hans-CN')?.code).toBe('zh')
    expect(getSupportedLanguage('en-GB')?.code).toBe('en')
  })
})
