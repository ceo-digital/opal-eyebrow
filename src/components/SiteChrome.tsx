import type { ReactNode } from 'react'
import { AccessibilityWidget } from './AccessibilityWidget'
import { PrivacyConsent } from './PrivacyConsent'

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AccessibilityWidget />
      <PrivacyConsent />
    </>
  )
}
