type Translate = (key: string, options?: Record<string, string>) => string

export function buildMenuLabels(t: Translate, appName?: string) {
  return {
    header: {
      openInNewWindow: t('common.openInNewWindow'),
      learnMore: t('common.learnMore'),
    },
    source: {
      openInNewWindow: t('common.openInNewWindow'),
      showInApp: t('menu.showInApp', { app: appName ?? 'File Manager' }),
      delete: t('source.deleteSource'),
    },
    skill: {
      openInNewWindow: t('common.openInNewWindow'),
      showInApp: t('menu.showInApp', { app: appName ?? 'File Manager' }),
      delete: t('skill.deleteSkill'),
    },
    session: {
      share: t('session.share'),
      shared: t('session.shared'),
      status: t('session.status'),
      labels: t('session.labels'),
      flag: t('session.flag'),
      unflag: t('session.unflag'),
      archive: t('session.archive'),
      unarchive: t('session.unarchive'),
      markAsUnread: t('session.markAsUnread'),
      rename: t('session.rename'),
      regenerateTitle: t('session.regenerateTitle'),
      openInNewPanel: t('session.openInNewPanel'),
      openInNewWindow: t('common.openInNewWindow'),
      showInApp: t('menu.showInApp', { app: appName ?? 'File Manager' }),
      copyPath: t('session.copyPath'),
      delete: t('common.delete'),
      openInBrowser: t('menu.openInBrowser'),
      copyLink: t('menu.copyLink'),
      updateShare: t('menu.updateShare'),
      stopSharing: t('menu.stopSharing'),
      linkCopied: t('menu.linkCopied'),
      shareUpdated: t('menu.shareUpdated'),
      failedToUpdateShare: t('menu.failedToUpdateShare'),
      sharingStopped: t('menu.sharingStopped'),
      failedToStopSharing: t('menu.failedToStopSharing'),
      failedToShare: t('menu.failedToShare'),
      open: t('menu.open'),
      pathCopied: t('menu.pathCopied'),
      titleRefreshed: t('menu.titleRefreshed'),
      failedToRefreshTitle: t('menu.failedToRefreshTitle'),
      unknownError: t('errors.unknownError'),
    },
  }
}
