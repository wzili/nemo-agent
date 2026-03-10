/**
 * SkillMenu - Shared menu content for skill actions
 *
 * Used by:
 * - SkillsListPanel (dropdown via "..." button, context menu via right-click)
 * - SkillInfoPage (title dropdown menu)
 *
 * Uses MenuComponents context to render with either DropdownMenu or ContextMenu
 * primitives, allowing the same component to work in both scenarios.
 *
 * Provides consistent skill actions:
 * - Open in New Window
 * - Show in file manager
 * - Delete
 */

import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Trash2,
  FolderOpen,
  AppWindow,
} from 'lucide-react'
import { useMenuComponents } from '@/components/ui/menu-context'
import { getFileManagerName } from '@/lib/platform'
import { buildMenuLabels } from '@/lib/i18n/menu-labels'

export interface SkillMenuProps {
  /** Skill slug */
  skillSlug: string
  /** Skill name for display */
  skillName: string
  /** Callbacks */
  onOpenInNewWindow: () => void
  onShowInFinder: () => void
  onDelete: () => void
}

/**
 * SkillMenu - Renders the menu items for skill actions
 * This is the content only, not wrapped in a DropdownMenu or ContextMenu
 */
export function SkillMenu({
  skillSlug,
  skillName,
  onOpenInNewWindow,
  onShowInFinder,
  onDelete,
}: SkillMenuProps) {
  const { t } = useTranslation()
  const labels = buildMenuLabels(t, getFileManagerName())
  // Get menu components from context (works with both DropdownMenu and ContextMenu)
  const { MenuItem, Separator } = useMenuComponents()

  return (
    <>
      {/* Open in New Window */}
      <MenuItem onClick={onOpenInNewWindow}>
        <AppWindow className="h-3.5 w-3.5" />
        <span className="flex-1">{labels.skill.openInNewWindow}</span>
      </MenuItem>

      {/* Show in file manager */}
      <MenuItem onClick={onShowInFinder}>
        <FolderOpen className="h-3.5 w-3.5" />
        <span className="flex-1">{labels.skill.showInApp}</span>
      </MenuItem>

      <Separator />

      {/* Delete */}
      <MenuItem onClick={onDelete} variant="destructive">
        <Trash2 className="h-3.5 w-3.5" />
        <span className="flex-1">{labels.skill.delete}</span>
      </MenuItem>
    </>
  )
}
