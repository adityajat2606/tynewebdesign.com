import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  MessageCircle,
  Palette,
  Shield,
  Sparkles,
  Tag,
  User,
  Users,
  Zap,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-transparent text-foreground',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-transparent text-foreground',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#edf3e4_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f4f6ef_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
  'social-editorial': 'bg-transparent text-foreground',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'profile-creator'].includes(layoutKey)
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#72594a]',
          panel: 'border border-[#dbc6b6] bg-white/90',
          soft: 'border border-[#dbc6b6] bg-[#fff8ef]',
          input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
          button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
        }
      : {
          muted: 'text-slate-600',
          panel: 'border border-slate-200 bg-white',
          soft: 'border border-slate-200 bg-slate-50',
          input: 'border border-slate-200 bg-white text-slate-950',
          button: 'bg-slate-950 text-white hover:bg-slate-800',
        }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-14">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                  <Icon className="h-3.5 w-3.5" /> Image sharing
                </div>
                <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  {taskConfig?.description || 'A calmer gallery for work that deserves the spotlight.'}
                </h1>
                <p className={`mt-5 max-w-xl text-sm leading-relaxed sm:text-[1.05rem] ${ui.muted}`}>
                  Browse a masonry-style wall of visual posts—each tile opens into the full story. Built for photographers, designers, and teams who want discovery to feel intentional, not algorithmic.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_8px_24px_oklch(0.5_0.15_28_/_0.12)] ${ui.button}`}>
                    Search the gallery
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/profile"
                    className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted`}
                  >
                    Creator profiles
                  </Link>
                </div>
                <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { k: 'Layout', v: 'Masonry grid', icon: Palette },
                    { k: 'Focus', v: 'Visual-first posts', icon: Sparkles },
                    { k: 'Trust', v: 'Linked to profiles', icon: Shield },
                  ].map(({ k, v, icon: Glyph }) => (
                    <div key={k} className={`rounded-2xl px-4 py-3 ${ui.soft}`}>
                      <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                        <Glyph className="h-3.5 w-3.5" /> {k}
                      </dt>
                      <dd className="mt-1.5 text-sm font-semibold text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={`sm:col-span-2 rounded-[1.75rem] border border-border bg-gradient-to-br from-accent/10 via-card to-muted/40 p-6 shadow-[var(--gallery-shadow-soft)] ${ui.panel}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">How to use this page</p>
                  <ul className={`mt-4 space-y-3 text-sm leading-relaxed ${ui.muted}`}>
                    <li className="flex gap-2">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Scroll the wall—tiles scale to fit so every series keeps its natural rhythm.
                    </li>
                    <li className="flex gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Open any post for full detail, credits, and related work from the same creator.
                    </li>
                  </ul>
                </div>
                <div className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">For teams</p>
                  <p className="mt-2 text-sm font-medium text-foreground">Pair galleries with public profiles so clients see both the work and the people behind it.</p>
                </div>
                <div className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">For visitors</p>
                  <p className="mt-2 text-sm font-medium text-foreground">Use search to jump to a topic, then explore visually without wading through unrelated posts.</p>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className="mb-14">
            <div className={`overflow-hidden rounded-[2.25rem] border border-border shadow-[var(--gallery-shadow)] ${ui.panel}`}>
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[280px] bg-gradient-to-br from-accent/15 via-muted/50 to-background p-8 lg:min-h-[320px]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,oklch(0.85_0.12_28_/_0.35),transparent_65%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                        <User className="h-7 w-7 text-accent" />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${ui.muted}`}>{taskConfig?.label || 'Profiles'}</p>
                        <p className="text-sm font-medium text-foreground">Public identity pages</p>
                      </div>
                    </div>
                    <div className="mt-8 space-y-3">
                      {['Verified-style cues', 'Clear roles & focus areas', 'Natural links to image work'].map((line) => (
                        <div key={line} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${ui.soft}`}>
                          <Shield className="h-4 w-4 shrink-0 text-accent" />
                          <span className="text-foreground">{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <h1 className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-[2.65rem] sm:leading-[1.12]">
                    Profiles that put people and brands before the algorithm.
                  </h1>
                  <p className={`mt-5 max-w-xl text-sm leading-relaxed sm:text-[1.02rem] ${ui.muted}`}>
                    Every profile is a trust anchor: who you are, what you ship, and how to go deeper into galleries and posts. The list below keeps the same calm rhythm as the home page—readable, scannable, and built for decisions.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/image-sharing" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${ui.button}`}>
                      Browse image sharing
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/search" className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted`}>
                      Search
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'social-editorial' ? (
          <section className="mb-14">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-card/80 p-8 shadow-[var(--gallery-shadow-soft)] backdrop-blur-sm sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                    <Users className="h-3.5 w-3.5" /> Community
                  </div>
                  <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
                    Short updates, announcements, and signals from the people you follow.
                  </h1>
                  <p className={`mt-5 max-w-xl text-sm leading-relaxed sm:text-[1.02rem] ${ui.muted}`}>
                    The community feed is built for quick scanning—perfect for release notes, behind-the-scenes notes, and lightweight conversation that still points to galleries and profiles when you want more depth.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/image-sharing" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${ui.button}`}>
                      Explore image sharing
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/help" className={`inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted`}>
                      Help center
                    </Link>
                  </div>
                </div>
                <div className="grid gap-4">
                  {[
                    { t: 'Stay in the loop', d: 'See what creators and teams publish without leaving the same visual system as the rest of the site.', icon: Zap },
                    { t: 'Go deeper anytime', d: 'Jump from a short update into profiles or image posts when you need the full context.', icon: MessageCircle },
                    { t: 'Built for clarity', d: 'Fewer noisy cards, clearer timestamps, and room for substance in every line.', icon: Sparkles },
                  ].map((item) => {
                    const ItemIcon = item.icon
                    return (
                    <div key={item.t} className={`rounded-2xl border border-border p-5 ${ui.soft}`}>
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                          <ItemIcon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.t}</p>
                          <p className={`mt-1 text-sm leading-relaxed ${ui.muted}`}>{item.d}</p>
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro &&
        layoutKey !== 'image-portfolio' &&
        layoutKey !== 'profile-business' &&
        layoutKey !== 'social-editorial' ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
