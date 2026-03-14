import { useCallback } from "react"
import { useTranslation } from 'react-i18next'
import { toast } from "sonner"

interface UseSessionActionsOptions {
  onFlag?: (sessionId: string) => void
  onUnflag?: (sessionId: string) => void
  onArchive?: (sessionId: string) => void
  onUnarchive?: (sessionId: string) => void
  onDelete: (sessionId: string, skipConfirmation?: boolean) => Promise<boolean>
}

export function useSessionActions({
  onFlag,
  onUnflag,
  onArchive,
  onUnarchive,
  onDelete,
}: UseSessionActionsOptions) {
  const { t } = useTranslation()
  const handleFlagWithToast = useCallback((sessionId: string) => {
    if (!onFlag) return
    onFlag(sessionId)
    toast(t('toast.sessionFlagged'), {
      description: t('toast.sessionFlaggedDescription'),
      action: onUnflag ? {
        label: 'Undo',
        onClick: () => onUnflag(sessionId),
      } : undefined,
    })
  }, [onFlag, onUnflag])

  const handleUnflagWithToast = useCallback((sessionId: string) => {
    if (!onUnflag) return
    onUnflag(sessionId)
    toast(t('toast.flagRemoved'), {
      description: t('toast.flagRemovedDescription'),
      action: onFlag ? {
        label: 'Undo',
        onClick: () => onFlag(sessionId),
      } : undefined,
    })
  }, [onFlag, onUnflag])

  const handleArchiveWithToast = useCallback((sessionId: string) => {
    if (!onArchive) return
    onArchive(sessionId)
    toast(t('toast.sessionArchived'), {
      description: t('toast.sessionArchivedDescription'),
      action: onUnarchive ? {
        label: 'Undo',
        onClick: () => onUnarchive(sessionId),
      } : undefined,
    })
  }, [onArchive, onUnarchive])

  const handleUnarchiveWithToast = useCallback((sessionId: string) => {
    if (!onUnarchive) return
    onUnarchive(sessionId)
    toast(t('toast.sessionRestored'), {
      description: t('toast.sessionRestoredDescription'),
      action: onArchive ? {
        label: 'Undo',
        onClick: () => onArchive(sessionId),
      } : undefined,
    })
  }, [onArchive, onUnarchive])

  const handleDeleteWithToast = useCallback(async (sessionId: string): Promise<boolean> => {
    // Confirmation dialog is shown by handleDeleteSession in App.tsx
    // We await so toast only shows after successful deletion (if user confirmed)
    const deleted = await onDelete(sessionId)
    if (deleted) {
      toast(t('toast.sessionDeleted'))
    }
    return deleted
  }, [onDelete])

  return {
    handleFlagWithToast,
    handleUnflagWithToast,
    handleArchiveWithToast,
    handleUnarchiveWithToast,
    handleDeleteWithToast,
  }
}
