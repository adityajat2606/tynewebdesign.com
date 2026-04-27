import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Image as ImageIcon, Mail, MessageSquare, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@tynewebdesign.com'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/contact',
    title: `Contact — ${SITE_CONFIG.name}`,
    description: `Reach ${SITE_CONFIG.name} for partnerships, creator support, technical questions, and press. Same calm studio experience as the rest of the site.`,
  })
}

const contactChannels = [
  {
    title: 'DIRECT EMAIL',
    body: CONTACT_EMAIL,
    icon: Mail,
    action: `mailto:${CONTACT_EMAIL}`,
    label: 'SEND →',
  },
  {
    title: 'CREATOR SUPPORT',
    body: 'Questions about publishing, profiles, or how your work appears in the archive.',
    icon: ImageIcon,
    action: '/help',
    label: 'ACCESS →',
  },
  {
    title: 'PARTNERSHIPS',
    body: 'Sponsorships, integrations, and co-marketing opportunities.',
    icon: User,
    action: '/contact',
    label: 'LEARN →',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <NavbarShell />
      <main>
        <section className="border-b-4 border-slate-950 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="border-2 border-slate-950 bg-[#ffeb3b] inline-block px-4 py-2">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">CONTACT</p>
            </div>
            <h1 className="mt-6 font-mono text-4xl font-black uppercase leading-none text-slate-950 sm:text-5xl md:text-6xl">
              SUBMIT YOUR INQUIRY
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium text-slate-700">
              Direct communication. No forms, no queues. Choose your channel and reach us directly.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <div className="border-b-2 border-slate-950 pb-4">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">CHANNELS</p>
                <h2 className="mt-2 font-mono text-2xl font-black uppercase text-slate-950">DIRECT ACCESS</h2>
              </div>
              <div className="grid gap-4">
                {contactChannels.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.title}
                      href={item.action}
                      className="group flex items-center gap-4 border-4 border-slate-950 bg-white p-6 shadow-[6px_6px_0_rgba(15,23,42,1)] transition-all duration-200 hover:shadow-[10px_10px_0_rgba(15,23,42,1)] hover:-translate-x-1 hover:-translate-y-1"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-slate-950 bg-[#ffeb3b]">
                        <Icon className="h-6 w-6 text-slate-950" />
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-sm font-bold uppercase tracking-widest text-slate-950">{item.title}</p>
                        <p className="mt-1 text-sm font-medium text-slate-700">{item.body}</p>
                      </div>
                      <div className="font-mono text-sm font-bold uppercase text-slate-950 group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="border-4 border-slate-950 bg-white p-8 shadow-[8px_8px_0_rgba(15,23,42,1)]">
              <div className="mb-6 border-b-2 border-slate-950 pb-4">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">ALTERNATIVE</p>
                <h2 className="mt-2 font-mono text-2xl font-black uppercase text-slate-950">MESSAGE FORM</h2>
              </div>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name" className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">NAME</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="YOUR NAME"
                    className="border-2 border-slate-950 bg-white font-mono text-sm uppercase"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email" className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">EMAIL</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="YOUR@EMAIL.COM"
                    className="border-2 border-slate-950 bg-white font-mono text-sm uppercase"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-topic" className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">TOPIC</Label>
                  <Input
                    id="contact-topic"
                    name="topic"
                    placeholder="SUBJECT LINE"
                    className="border-2 border-slate-950 bg-white font-mono text-sm uppercase"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-message" className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">MESSAGE</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="YOUR MESSAGE HERE..."
                    className="min-h-[160px] border-2 border-slate-950 bg-white font-mono text-sm resize-y"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full border-2 border-slate-950 bg-slate-950 py-4 font-mono text-sm font-bold uppercase text-white hover:bg-slate-800"
                >
                  SUBMIT MESSAGE →
                </Button>
                <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
                  For urgent security issues, include "SECURITY" in the subject line.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
