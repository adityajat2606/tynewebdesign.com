'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Menu,
  X,
  User,
  FileText,
  Building2,
  LayoutGrid,
  Tag,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MapPin,
  Plus,
  Home,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { useVisualSidebar } from '@/components/shared/visual-sidebar-context'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-black/[0.06] bg-white/80 text-foreground shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70',
    logo: 'rounded-[1.35rem] border border-black/[0.06] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]',
    active: 'bg-foreground text-background shadow-sm',
    idle: 'text-muted-foreground hover:bg-muted hover:text-foreground',
    cta: 'rounded-full bg-foreground text-background hover:bg-foreground/90',
    mobile: 'border-t border-black/[0.06] bg-white/95 backdrop-blur-xl',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-slate-200 bg-white/94 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-slate-50',
    nav: 'text-slate-600 hover:text-slate-950',
    search: 'border border-slate-200 bg-slate-50 text-slate-600',
    cta: 'bg-slate-950 text-white hover:bg-slate-800',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/96 text-[#1f2617] shadow-[0_1px_0_rgba(64,76,34,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white',
    nav: 'text-[#56604b] hover:text-[#1f2617]',
    search: 'border border-[#d7deca] bg-white text-[#56604b]',
    cta: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    post: 'border border-[#d7deca] bg-white text-[#1f2617] hover:bg-[#eef2e4]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const { collapsed, toggle } = useVisualSidebar()

  const navigation = useMemo(() => {
    if (productKind === 'visual') {
      return SITE_CONFIG.tasks.filter((task) => task.enabled && (task.key === 'image' || task.key === 'profile'))
    }
    return SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  }, [productKind])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
    contentType: task.contentType,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className={cn('flex h-12 w-12 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.24em] opacity-60">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden items-center gap-5 xl:flex">
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold transition-colors', isActive ? 'text-foreground' : palette.nav)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className={cn('flex w-full max-w-xl items-center gap-3 rounded-full px-4 py-3', palette.search)}>
              <Search className="h-4 w-4" />
              <span className="text-sm">Find businesses, spaces, and local services</span>
              <div className="ml-auto hidden items-center gap-1 text-xs opacity-75 md:flex">
                <MapPin className="h-3.5 w-3.5" />
                Local discovery
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {primaryTask ? (
              <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-75 md:inline-flex">
                <Sparkles className="h-3.5 w-3.5" />
                {primaryTask.label}
              </Link>
            ) : null}

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Listing
                  </Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              <div className={cn('mb-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium', palette.search)}>
                <Search className="h-4 w-4" />
                Find businesses, spaces, and services
              </div>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  if (productKind === 'visual') {
    const sidebarLinkClass = (active: boolean) =>
      cn(
        'flex items-center rounded-xl py-2.5 text-sm font-medium transition-colors',
        collapsed ? 'justify-center px-2' : 'gap-3 px-3',
        active ? 'bg-white/12 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
      )

    const NavRow = ({
      href,
      active,
      icon: Icon,
      label,
      contentType,
    }: {
      href: string
      active: boolean
      icon: LucideIcon
      label: string
      contentType?: string
    }) => {
      const link = (
        <Link
          href={href}
          className={sidebarLinkClass(active)}
          aria-current={active ? 'page' : undefined}
          {...(contentType ? { 'data-content-type': contentType } : {})}
        >
          <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
          {!collapsed && <span className="truncate">{label}</span>}
          {collapsed && <span className="sr-only">{label}</span>}
        </Link>
      )
      if (!collapsed) return link
      return (
        <Tooltip>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={10} className="border-white/10 bg-zinc-900 font-medium text-zinc-100">
            {label}
          </TooltipContent>
        </Tooltip>
      )
    }

    return (
      <TooltipProvider delayDuration={200}>
        <>
          <aside
            className="fixed left-0 top-0 z-50 hidden h-screen w-[var(--visual-sidebar-w)] flex-col overflow-hidden border-r border-white/10 bg-zinc-950/98 shadow-[1px_0_0_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[width] duration-200 ease-out lg:flex"
            data-visual-sidebar="true"
          >
            <div className={cn('flex h-full flex-col pb-6 pt-8', collapsed ? 'px-2' : 'px-4')}>
              <Link
                href="/"
                className={cn('flex items-center gap-3', collapsed ? 'justify-center px-0' : 'px-2')}
                data-content-type="home"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-inner">
                  <img src="/favicon.png?v=20260401" alt="" width="44" height="44" className="h-full w-full object-contain" />
                </div>
                {!collapsed && (
                  <div className="min-w-0">
                    <span className="block truncate text-base font-semibold tracking-tight text-white">{SITE_CONFIG.name}</span>
                    <span className="block truncate text-[10px] uppercase tracking-[0.22em] text-zinc-500">{siteContent.navbar.tagline}</span>
                  </div>
                )}
              </Link>

              <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label="Primary">
                <NavRow href="/" active={pathname === '/'} icon={Home} label="Home" contentType="home" />
                {primaryNavigation.map((task) => {
                  const Icon = taskIcons[task.key] || LayoutGrid
                  const isActive = pathname.startsWith(task.route)
                  return (
                    <NavRow
                      key={task.key}
                      href={task.route}
                      active={isActive}
                      icon={Icon}
                      label={task.label}
                      contentType={task.contentType}
                    />
                  )
                })}
                <NavRow href="/search" active={pathname.startsWith('/search')} icon={Search} label="Search" contentType="search" />
              </nav>

              <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={toggle}
                  className={cn(
                    'w-full border-white/15 bg-white/5 text-zinc-200 shadow-none hover:bg-white/10 hover:text-white',
                    collapsed ? 'justify-center px-0' : 'justify-between gap-2'
                  )}
                  aria-expanded={!collapsed}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {collapsed ? (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  ) : (
                    <>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em]">Collapse</span>
                      <ChevronLeft className="h-4 w-4 shrink-0" />
                    </>
                  )}
                </Button>

                {primaryTask ? (
                  collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={primaryTask.route}
                          className="flex items-center justify-center rounded-xl border border-white/12 bg-white/5 py-2.5 text-zinc-100 transition hover:bg-white/10"
                          data-content-type={primaryTask.contentType}
                        >
                          <Sparkles className="h-4 w-4 text-amber-400" />
                          <span className="sr-only">{primaryTask.label}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={10} className="border-white/10 bg-zinc-900 text-zinc-100">
                        {primaryTask.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      href={primaryTask.route}
                      className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-200 transition hover:bg-white/10"
                      data-content-type={primaryTask.contentType}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      {primaryTask.label}
                    </Link>
                  )
                ) : null}
                {isAuthenticated ? (
                  <NavbarAuthControls />
                ) : collapsed ? (
                  <div className="flex flex-col gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-full rounded-xl text-zinc-400 hover:bg-white/10 hover:text-zinc-100" asChild>
                          <Link href="/login" data-content-type="auth">
                            <User className="h-4 w-4" />
                            <span className="sr-only">Sign in</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={10} className="border-white/10 bg-zinc-900 text-zinc-100">
                        Sign in
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" className="h-10 w-full rounded-xl bg-white text-zinc-950 hover:bg-zinc-100" asChild>
                          <Link href="/register" data-content-type="auth">
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Join</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={10} className="border-white/10 bg-zinc-900 text-zinc-100">
                        Join
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Button variant="ghost" size="sm" asChild className="justify-start rounded-xl text-zinc-400 hover:bg-white/10 hover:text-zinc-100">
                      <Link href="/login" data-content-type="auth">
                        Sign in
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="rounded-xl bg-white text-zinc-950 hover:bg-zinc-100">
                      <Link href="/register" data-content-type="auth">
                        Join
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/95 px-4 backdrop-blur-xl lg:hidden">
            <Link href="/" className="flex min-w-0 items-center gap-2" data-content-type="home">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-inner">
                <img src="/favicon.png?v=20260401" alt="" width="36" height="36" className="h-full w-full object-contain" />
              </div>
              <span className="truncate text-sm font-semibold text-white">{SITE_CONFIG.name}</span>
            </Link>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:bg-white/10 hover:text-white">
                <Link href="/search" data-content-type="search">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:bg-white/10 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </header>

          {isMobileMenuOpen && (
            <div className="border-b border-white/10 bg-zinc-950 lg:hidden">
              <div className="space-y-1 px-4 py-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-100"
                  data-content-type="home"
                  aria-current={pathname === '/' ? 'page' : undefined}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                {mobileNavigation.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium',
                        isActive ? 'bg-white/12 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                      )}
                      data-content-type={item.contentType}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
                <Link
                  href="/search"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400"
                  data-content-type="search"
                >
                  <Search className="h-5 w-5" />
                  Search
                </Link>
              </div>
            </div>
          )}
        </>
      </TooltipProvider>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link
            href={primaryTask.route}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm transition hover:border-foreground/10 hover:bg-muted"
          >
            Featured surface
            <span className="text-foreground">{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}
                  data-content-type={item.contentType}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
