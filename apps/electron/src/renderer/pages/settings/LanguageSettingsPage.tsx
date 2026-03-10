/**
 * LanguageSettingsPage
 *
 * Language and region settings page.
 * Allows users to select their preferred language (English/Chinese).
 */

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PanelHeader } from '@/components/app-shell/PanelHeader'
import { ScrollArea } from '@/components/ui/scroll-area'
import { HeaderMenu } from '@/components/ui/HeaderMenu'
import { routes } from '@/lib/navigate'
import type { DetailsPageMeta } from '@/lib/navigation-registry'

import {
  SettingsSection,
  SettingsCard,
  SettingsRow,
} from '@/components/settings'
import { getSupportedLanguage, supportedLanguages, type SupportedLanguage } from '@/lib/i18n'

export const meta: DetailsPageMeta = {
  navigator: 'settings',
  slug: 'language',
}

// ============================================
// Main Component
// ============================================

export default function LanguageSettingsPage() {
  const { t, i18n } = useTranslation()

  const currentLanguage = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language).code

  const handleLanguageChange = useCallback(
    (lang: SupportedLanguage) => {
      void i18n.changeLanguage(lang)
    },
    [i18n]
  )

  return (
    <div className="h-full flex flex-col">
      <PanelHeader
        title={t('language.title')}
        actions={<HeaderMenu route={routes.view.settings('language')} />}
      />
      <div className="flex-1 min-h-0 mask-fade-y">
        <ScrollArea className="h-full">
          <div className="px-5 py-7 max-w-3xl mx-auto">
            <div className="space-y-8">
              {/* Language Selection */}
              <SettingsSection title={t('language.title')}>
                <SettingsCard>
                  <SettingsRow label={t('language.select')}>
                    <div className="flex flex-col gap-2">
                      {supportedLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`px-3 py-2 rounded-md text-sm text-left transition-colors ${
                            currentLanguage === lang.code
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <span className="font-medium">{lang.nativeName}</span>
                          <span className="text-muted-foreground ml-2">({lang.name})</span>
                        </button>
                      ))}
                    </div>
                  </SettingsRow>
                </SettingsCard>
              </SettingsSection>

              {/* Info */}
              <SettingsSection title={t('language.current')}>
                <SettingsCard>
                  <SettingsRow label={t('language.current')}>
                    <span className="text-muted-foreground">
                      {getSupportedLanguage(currentLanguage).nativeName}
                    </span>
                  </SettingsRow>
                </SettingsCard>
              </SettingsSection>

              <p className="text-sm text-muted-foreground">{t('language.restart')}</p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
