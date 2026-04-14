import Link from 'next/link'
import { ArrowRight, BookOpen, HelpCircle, Image as ImageIcon, LifeBuoy, MessageCircle, Search, User } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Getting started',
    description: 'Create your account, verify your profile, and publish your first image or update in minutes.',
    icon: BookOpen,
  },
  {
    title: 'Image sharing & galleries',
    description: 'Upload sequences, organize sets, and keep visual work easy to browse without noisy feeds.',
    icon: ImageIcon,
  },
  {
    title: 'Profiles & identity',
    description: 'Present who you are with clear roles, focus areas, and links back to your best work.',
    icon: User,
  },
  {
    title: 'Community & updates',
    description: 'Follow short signals from creators and teams, then jump into galleries when you want depth.',
    icon: MessageCircle,
  },
]

const quick = [
  { label: 'Browse image sharing', href: '/image-sharing' },
  { label: 'Explore profiles', href: '/profile' },
  { label: 'Search the site', href: '/search' },
  { label: 'System status', href: '/status' },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Guides, answers, and shortcuts—styled like the rest of the studio experience so you can move fast without visual noise."
      actions={
        <Button asChild className="rounded-full shadow-[0_8px_24px_oklch(0.5_0.15_28_/_0.15)]">
          <Link href="/contact">
            Contact support
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="space-y-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <Card className="border-border bg-card/90 shadow-[var(--gallery-shadow-soft)] backdrop-blur-sm">
            <CardContent className="flex flex-col justify-between p-7 sm:p-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <Search className="h-3.5 w-3.5" />
                  Find an answer
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">Start with what you are trying to do.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Most questions map to four areas: setting up your presence, sharing visuals, refining your profile, or following community activity. Pick a topic below and we will
                  point you to the right surface on the site.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {quick.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-gradient-to-br from-accent/10 via-card to-muted/30 shadow-[var(--gallery-shadow-soft)]">
            <CardContent className="flex h-full flex-col justify-center p-7 sm:p-8">
              <LifeBuoy className="h-10 w-10 text-accent" />
              <h3 className="mt-5 text-xl font-semibold">Still stuck?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Send a note with screenshots and the page URL. We route technical issues separately from billing so you reach the right person faster.
              </p>
              <Button asChild variant="secondary" className="mt-6 w-fit rounded-full">
                <Link href="/contact">Open contact form</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Topics</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Popular starting points</h2>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {topics.map((topic) => {
              const Icon = topic.icon
              return (
                <Card key={topic.title} className="border-border bg-card transition-transform hover:-translate-y-0.5">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{topic.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <Card className="border-border bg-card">
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-center gap-2 text-muted-foreground">
                <HelpCircle className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Frequently asked questions</h3>
              </div>
              <Accordion type="single" collapsible className="mt-5">
                {mockFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left text-[15px]">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          <div className="space-y-5">
            <Card className="border-border bg-muted/30">
              <CardContent className="p-6 sm:p-7">
                <h3 className="text-lg font-semibold">Best practices</h3>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    Use descriptive titles on visual posts so search and profiles stay easy to navigate months later.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    Keep your profile summary short—one clear sentence beats five buzzwords.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    Link out to your portfolio or storefront from your profile so visitors know where to convert.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-dashed border-border bg-card/60">
              <CardContent className="p-6 sm:p-7">
                <p className="text-sm font-medium text-foreground">Developers</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Looking for endpoints, webhooks, or integration patterns? The developer hub outlines how our APIs behave and how errors are structured.
                </p>
                <Button asChild variant="outline" className="mt-4 rounded-full">
                  <Link href="/developers">
                    Visit developers
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
