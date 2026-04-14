import Link from 'next/link'
import { Activity, ArrowRight, CheckCircle2, Clock, Server } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const services = [
  { name: 'Web application', detail: 'Dashboards, feeds, and profile surfaces', status: 'Operational' as const, load: 100 },
  { name: 'API gateway', detail: 'Authenticated REST traffic and rate limits', status: 'Operational' as const, load: 100 },
  { name: 'Media delivery', detail: 'Image transforms and edge caching', status: 'Operational' as const, load: 98 },
  { name: 'Notifications', detail: 'Email and in-app delivery pipeline', status: 'Operational' as const, load: 100 },
]

const incidents = [
  { date: 'Apr 2, 2026', title: 'Elevated latency on media transforms', status: 'Resolved' as const, summary: 'Mitigated by shifting traffic to a secondary edge region.' },
  { date: 'Mar 12, 2026', title: 'Delayed notifications', status: 'Resolved' as const, summary: 'Queue backlog cleared; monitoring thresholds tightened.' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved' as const, summary: 'Rebuilt incremental index after storage upgrade.' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="Live component health, recent incidents, and how we communicate when something breaks. Same calm palette as the home experience—signal without alarm."
      actions={
        <Button asChild variant="outline" className="rounded-full border-border bg-card/80">
          <Link href="/help">
            Help center
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="space-y-10">
        <Card className="overflow-hidden border-border bg-gradient-to-br from-accent/10 via-card to-muted/25 shadow-[var(--gallery-shadow-soft)]">
          <CardContent className="p-7 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
                  <Activity className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Overall</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">All systems operational</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    No active incidents affecting core browsing, publishing, or media delivery. Numbers below reflect rolling health checks from the last hour.
                  </p>
                </div>
              </div>
              <Badge className="w-fit rounded-full bg-emerald-600 px-4 py-1.5 text-emerald-50 hover:bg-emerald-600/90 dark:bg-emerald-500/90">
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Healthy
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="mb-6 flex items-center gap-2">
            <Server className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold tracking-[-0.02em]">Services</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.name} className="border-border bg-card transition hover:shadow-[var(--gallery-shadow-soft)]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{service.detail}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 rounded-full">
                      {service.status}
                    </Badge>
                  </div>
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Health</span>
                      <span>{service.load}%</span>
                    </div>
                    <Progress value={service.load} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-foreground">Incident history</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Recent events with customer impact. We post updates here and in the help center for longer postmortems.</p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {incidents.map((incident) => (
                <div
                  key={incident.title}
                  className="rounded-2xl border border-border bg-muted/25 px-5 py-4 transition hover:bg-muted/40"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{incident.date}</span>
                    <span className="rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-foreground">{incident.status}</span>
                  </div>
                  <div className="mt-2 text-base font-semibold text-foreground">{incident.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{incident.summary}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
