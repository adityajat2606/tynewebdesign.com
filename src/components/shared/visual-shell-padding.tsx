'use client'

import type { CSSProperties, ReactNode } from 'react'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { useVisualSidebar } from '@/components/shared/visual-sidebar-context'

export function VisualShellPadding({ children }: { children: ReactNode }) {
  const { recipe } = getFactoryState()
  const isVisual = getProductKind(recipe) === 'visual'
  const { sidebarWidth } = useVisualSidebar()

  if (!isVisual) {
    return <>{children}</>
  }

  const style = {
    '--visual-sidebar-w': sidebarWidth,
  } as CSSProperties

  return (
    <div className="min-h-screen transition-[padding] duration-200 ease-out lg:pl-[var(--visual-sidebar-w)]" style={style}>
      {children}
    </div>
  )
}
