import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "ARCHIVED IMAGES", value: "42,847" },
  { label: "ACTIVE CREATORS", value: "3,291" },
  { label: "DAILY UPLOADS", value: "892" },
];

const manifesto = [
  { title: "NO ALGORITHMS", description: "We don't decide what you see. You do. Pure chronological discovery." },
  { title: "RAW & UNFILTERED", description: "No filters, no edits, no AI enhancement. Just the image as captured." },
  { title: "PERMANENT ARCHIVE", description: "Once published, it stays. No disappearing posts, no ephemeral content." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a brutalist visual archive. No algorithms, no feeds—just raw image discovery in an editorial format.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/team">Meet the Team</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="border-4 border-slate-950 bg-white p-8 shadow-[8px_8px_0_rgba(15,23,42,1)]">
          <div className="mb-6 border-b-2 border-slate-950 pb-4">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">THE ARCHIVE</p>
            <h2 className="mt-4 font-mono text-3xl font-black uppercase leading-none text-slate-950">
              RAW VISUAL DISCOVERY
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-700">
            {SITE_CONFIG.name} is not a social network. It's a brutalist visual archive. No algorithms decide what you see. No feeds manipulate your attention. Just pure, chronological image discovery in an editorial format.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="border-2 border-slate-950 bg-[#ffeb3b] p-4">
                <p className="font-mono text-2xl font-black uppercase text-slate-950">{item.value}</p>
                <p className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-950">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {manifesto.map((item) => (
            <div key={item.title} className="border-4 border-slate-950 bg-white p-6 shadow-[6px_6px_0_rgba(15,23,42,1)]">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">{item.title}</p>
              <p className="mt-3 text-base font-medium text-slate-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border-4 border-slate-950 bg-white p-8 shadow-[8px_8px_0_rgba(15,23,42,1)]">
        <div className="mb-6 border-b-2 border-slate-950 pb-4">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">THE TEAM</p>
          <h3 className="mt-4 font-mono text-2xl font-black uppercase text-slate-950">ARCHIVE OPERATORS</h3>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <div key={member.id} className="border-2 border-slate-950 bg-white p-6 shadow-[4px_4px_0_rgba(15,23,42,1)]">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 border-2 border-slate-950 bg-[#ffeb3b] flex items-center justify-center">
                  <span className="font-mono text-xl font-black uppercase text-slate-950">{member.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-mono text-sm font-bold uppercase text-slate-950">{member.name}</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-slate-700">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-700">{member.bio}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-500">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
