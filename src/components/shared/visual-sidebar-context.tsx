'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'visual-sidebar-collapsed'

type VisualSidebarContextValue = {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
  toggle: () => void
  /** True after reading localStorage (avoid hydration mismatch) */
  mounted: boolean
  sidebarWidth: string
}

const VisualSidebarContext = createContext<VisualSidebarContextValue | null>(null)

export function VisualSidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
        setCollapsed(true)
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [collapsed, mounted])

  const toggle = useCallback(() => {
    setCollapsed((c) => !c)
  }, [])

  const sidebarWidth = collapsed ? '4.75rem' : '16rem'

  const value = useMemo(
    () => ({
      collapsed,
      setCollapsed,
      toggle,
      mounted,
      sidebarWidth,
    }),
    [collapsed, mounted, toggle]
  )

  return <VisualSidebarContext.Provider value={value}>{children}</VisualSidebarContext.Provider>
}

export function useVisualSidebar(): VisualSidebarContextValue {
  const ctx = useContext(VisualSidebarContext)
  if (!ctx) {
    throw new Error('useVisualSidebar must be used within VisualSidebarProvider')
  }
  return ctx
}
