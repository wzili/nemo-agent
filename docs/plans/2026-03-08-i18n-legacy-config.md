# I18n Legacy Config Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the unfinished renderer i18n wiring by fixing locale resource parity, normalizing detected language codes, and routing shared menu labels through translation resources.

**Architecture:** Keep the existing `react-i18next` setup, add a small helper surface inside the renderer i18n module for normalized language lookup and shared menu labels, then update the shared menu components to consume those helpers. Validate with focused Bun tests so the missing config is reproduced before implementation.

**Tech Stack:** Bun test, React, react-i18next, TypeScript

---

### Task 1: Lock down the missing i18n behavior with tests

**Files:**
- Create: `apps/electron/src/renderer/lib/__tests__/i18n.test.ts`

**Step 1: Write the failing test**

Add tests that:
- assert `zh.json` contains every key used by `en.json`, including `workspace.openInNewWindow`
- assert a detected locale such as `zh-CN` resolves to the supported `zh` language

**Step 2: Run test to verify it fails**

Run: `cd apps/electron && bun test src/renderer/lib/__tests__/i18n.test.ts`
Expected: FAIL because the helper does not exist yet and the locale resources are not fully aligned.

**Step 3: Write minimal implementation**

Modify:
- `apps/electron/src/renderer/lib/i18n/index.ts`
- `apps/electron/src/renderer/lib/i18n/locales/zh.json`

Implement:
- `normalizeSupportedLanguage(code)`
- `getSupportedLanguage(code)`
- i18next init options that tolerate regional variants
- the missing `workspace.openInNewWindow` translation

**Step 4: Run test to verify it passes**

Run: `cd apps/electron && bun test src/renderer/lib/__tests__/i18n.test.ts`
Expected: PASS

### Task 2: Cover shared menu labels with translation-backed helpers

**Files:**
- Create: `apps/electron/src/renderer/lib/i18n/menu-labels.ts`
- Create: `apps/electron/src/renderer/lib/__tests__/menu-labels.test.ts`
- Modify: `apps/electron/src/renderer/lib/i18n/locales/en.json`
- Modify: `apps/electron/src/renderer/lib/i18n/locales/zh.json`

**Step 1: Write the failing test**

Add tests that:
- assert the helper returns translated labels for English and Chinese
- assert interpolation works for `Show in {{app}}`

**Step 2: Run test to verify it fails**

Run: `cd apps/electron && bun test src/renderer/lib/__tests__/menu-labels.test.ts`
Expected: FAIL because the helper and keys do not exist yet.

**Step 3: Write minimal implementation**

Add translation keys for:
- header menu actions
- source/skill menu actions
- shared session menu actions

Implement a pure helper that receives `t` and returns label strings.

**Step 4: Run test to verify it passes**

Run: `cd apps/electron && bun test src/renderer/lib/__tests__/menu-labels.test.ts`
Expected: PASS

### Task 3: Wire the shared components to the i18n helpers

**Files:**
- Modify: `apps/electron/src/renderer/components/ui/HeaderMenu.tsx`
- Modify: `apps/electron/src/renderer/components/app-shell/SourceMenu.tsx`
- Modify: `apps/electron/src/renderer/components/app-shell/SkillMenu.tsx`
- Modify: `apps/electron/src/renderer/components/app-shell/SessionMenuParts.tsx`
- Modify: `apps/electron/src/renderer/pages/settings/LanguageSettingsPage.tsx`

**Step 1: Update components**

Use `useTranslation()` and the shared helper to replace hardcoded menu labels.

For `LanguageSettingsPage`, use normalized language lookup instead of directly trusting `i18n.language`.

**Step 2: Run focused tests**

Run:
- `cd apps/electron && bun test src/renderer/lib/__tests__/i18n.test.ts src/renderer/lib/__tests__/menu-labels.test.ts`

Expected: PASS

**Step 3: Run typecheck for the Electron app**

Run: `cd apps/electron && bun run typecheck`
Expected: PASS
