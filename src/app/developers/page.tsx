import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Code2, KeyRound, Layers, Terminal, Webhook } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/developers',
    title: `Developers — ${SITE_CONFIG.name}`,
    description:
      'Integration overview for REST endpoints, webhooks, authentication, and embedding—aligned with the same studio visual language as the rest of the product.',
  })
}

const pillars = [
  {
    title: 'HTTP API',
    description:
      'Resource-oriented endpoints for posts, profiles, and media metadata. Versioned paths, predictable pagination, and consistent error shapes.',
    icon: Code2,
  },
  {
    title: 'Webhooks',
    description:
      'Subscribe to create, update, and publish events. Retries with backoff, signing secrets, and a clear delivery log for debugging.',
    icon: Webhook,
  },
  {
    title: 'Access & keys',
    description:
      'Scoped API keys and optional OAuth-style flows for partner apps. Rotate keys without downtime and audit usage from the dashboard.',
    icon: KeyRound,
  },
  {
    title: 'Embeds & widgets',
    description:
      'Drop-in gallery and profile snippets for marketing sites. Responsive by default and theme-aware so they match your brand surface.',
    icon: Layers,
  },
]

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.92_0.05_28_/_0.25),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur-sm">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              Developer platform
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
              Build on the same calm, gallery-first foundation as {SITE_CONFIG.name}.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
              Whether you are automating publishing, syncing CRM data, or embedding visual work on your own site, these interfaces are designed to stay out of the way—structured
              responses, readable docs patterns, and tooling that respects your time.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6 shadow-[0_8px_24px_oklch(0.5_0.15_28_/_0.2)]">
                <Link href="/contact">
                  Talk integrations
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full border-border bg-card/80 px-6 backdrop-blur-sm">
                <Link href="/help">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Help center
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Capabilities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Everything you need to ship a dependable integration.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The sections below mirror how teams actually work: ship a read-only integration first, add webhooks when workflows need to react in real time, then harden with scoped
              credentials and embeds for customer-facing surfaces.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <Card key={pillar.title} className="border-border bg-card/90 shadow-[var(--gallery-shadow-soft)] backdrop-blur-sm transition-transform hover:-translate-y-0.5">
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-muted/50">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="border-t border-border/60 bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Request shape</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Predictable JSON, explicit errors.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Successful responses return typed payloads with stable field names. Errors include a machine-readable code, a human-readable message, and optional detail for support.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    Pagination uses cursor tokens—no fragile offsets when content shifts.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    Rate limits return standard headers so clients can back off gracefully.
                  </li>
                </ul>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-[oklch(0.16_0.02_260)] shadow-[var(--gallery-shadow)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-500">example-response.json</span>
                </div>
                <pre className="max-h-[320px] overflow-x-auto overflow-y-auto p-5 font-mono text-[11px] leading-relaxed text-zinc-200 sm:text-xs">
{`{
  "data": {
    "id": "post_8f3a",
    "title": "North Shore — blue hour",
    "slug": "north-shore-blue-hour",
    "task": "image",
    "updatedAt": "2026-04-14T09:12:04Z"
  },
  "meta": {
    "requestId": "req_2k9c",
    "cursor": "eyJwIjoiMjMifQ"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-card p-8 shadow-[var(--gallery-shadow-soft)] sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">Operational transparency</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Check live component status before you cut a release, or subscribe to updates when maintenance is scheduled.
              </p>
            </div>
            <Button asChild variant="secondary" className="rounded-full">
              <Link href="/status">
                View status
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
