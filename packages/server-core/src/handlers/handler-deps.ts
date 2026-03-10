import type { PlatformServices } from '../runtime/platform'
import type { ISessionManager } from './session-manager-interface'
import type { IOAuthFlowStore } from './oauth-flow-store-interface'
import type { IBrowserPaneManager } from './browser-pane-manager-interface'
import type { IWindowManager } from './window-manager-interface'

/**
 * Deep link handler function type.
 * Provided by Electron GUI to handle craftagents:// URLs.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DeepLinkHandler = (url: string, windowManager: any, sink?: any, resolveClientId?: any, preferredClientId?: string) => Promise<{ success: boolean; error?: string; windowId?: number }>

/**
 * Generic handler dependency bag.
 * Concrete hosts specialize these generics to their runtime implementations.
 *
 * TSessionManager defaults to ISessionManager, TOAuthFlowStore
 * defaults to IOAuthFlowStore, TWindowManager defaults to IWindowManager,
 * and TBrowserPaneManager defaults to IBrowserPaneManager so core handlers
 * get typed access without specialization.  Electron narrows all to their
 * concrete implementations.
 */
export interface HandlerDeps<
  TSessionManager extends ISessionManager = ISessionManager,
  TOAuthFlowStore extends IOAuthFlowStore = IOAuthFlowStore,
  TWindowManager extends IWindowManager = IWindowManager,
  TBrowserPaneManager extends IBrowserPaneManager = IBrowserPaneManager,
> {
  sessionManager: TSessionManager
  platform: PlatformServices
  windowManager?: TWindowManager
  browserPaneManager?: TBrowserPaneManager
  oauthFlowStore: TOAuthFlowStore
  /** Optional deep link handler for craftagents:// URLs (Electron GUI only) */
  handleDeepLink?: DeepLinkHandler
  /** Optional client ID resolver for deep link navigation (Electron GUI only) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolveClientId?: (webContentsId: number) => string | undefined
}
