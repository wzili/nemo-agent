import { describe, expect, it } from 'bun:test'

import en from '../i18n/locales/en.json'
import zh from '../i18n/locales/zh.json'
import { buildMenuLabels } from '../i18n/menu-labels'

function lookup(messages: Record<string, any>, key: string): string {
  const result = key.split('.').reduce<any>((value, part) => value?.[part], messages)
  return typeof result === 'string' ? result : key
}

function createTranslator(messages: Record<string, any>) {
  return (key: string, options?: Record<string, string>) => {
    let text = lookup(messages, key)
    if (options) {
      for (const [name, value] of Object.entries(options)) {
        text = text.replaceAll(`{{${name}}}`, value)
      }
    }
    return text
  }
}

describe('buildMenuLabels', () => {
  it('returns english menu labels', () => {
    const labels = buildMenuLabels(createTranslator(en))

    expect(labels.header.openInNewWindow).toBe('Open in New Window')
    expect(labels.header.learnMore).toBe('Learn more')
    expect(labels.session.copyLink).toBe('Copy Link')
  })

  it('returns chinese menu labels and interpolates file manager name', () => {
    const labels = buildMenuLabels(createTranslator(zh), '文件管理器')

    expect(labels.source.showInApp).toBe('在文件管理器中显示')
    expect(labels.source.delete).toBe('删除数据源')
    expect(labels.skill.delete).toBe('删除技能')
    expect(labels.session.stopSharing).toBe('停止分享')
  })
})
