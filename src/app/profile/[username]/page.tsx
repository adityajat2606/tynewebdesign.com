import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, CheckCircle2, Globe, Layers3, Sparkles, Trophy } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";
import { getSiteExperience } from "@/lib/site-experience";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (
  raw?: string | null,
  fallback = "Profile details will appear here once available."
) => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

function renderStats(experience: ReturnType<typeof getSiteExperience>) {
  const stats = [
    { label: "Total tasks", value: "148", icon: Layers3 },
    { label: "Success rate", value: "94%", icon: CheckCircle2 },
    { label: "Level", value: "Expert", icon: Trophy },
  ];

  if (experience.key === "scoreminers") {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="border-[3px] border-slate-950 bg-[#fff5b4] px-4 py-4 shadow-[6px_6px_0_rgba(15,23,42,0.9)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-slate-950">
                <Icon className="h-4 w-4" />
                {item.label}
              </div>
              <p className="mt-3 text-3xl font-black uppercase text-slate-950">{item.value}</p>
            </div>
          );
        })}
      </div>
    );
  }

  if (experience.key === "radianpark") {
    return (
      <div className="flex flex-wrap gap-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-sm">
              <Icon className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-950">{item.value}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className={`rounded-[1.5rem] p-4 ${experience.softPanelClass}`}>
            <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${experience.mutedClass}`}>
              <Icon className="h-4 w-4" />
              {item.label}
            </div>
            <p className="mt-3 text-3xl font-semibold text-foreground">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) notFound();

  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const experience = getSiteExperience(SITE_CONFIG.baseUrl);

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Profiles", item: `${baseUrl}/profile` },
      { "@type": "ListItem", position: 3, name: brandName, item: `${baseUrl}/profile/${post.slug}` },
    ],
  };

  const coverUrl =
    typeof content.images?.[0] === "string"
      ? content.images[0]
      : typeof content.logo === "string"
        ? content.logo
        : logoUrl;

  return (
    <div className={`min-h-screen ${experience.pageClass} ${experience.fontClass}`}>
      <NavbarShell />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        {experience.key === "tynewebdesign" ? (
          <section className="mx-auto max-w-5xl border-4 border-slate-950 bg-white shadow-[8px_8px_0_rgba(15,23,42,1)]">
            <div className="grid gap-0 md:grid-cols-[1fr_320px]">
              <div className="border-b-4 border-slate-950 md:border-b-0 md:border-r-4 p-8">
                <div className="mb-6 border-b-2 border-slate-950 pb-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">PROFILE ARCHIVE</p>
                  <h1 className="mt-4 font-mono text-4xl font-black uppercase leading-none text-slate-950">{brandName}</h1>
                  {domain ? (
                    <p className="mt-2 font-mono text-sm uppercase tracking-widest text-slate-700">{domain}</p>
                  ) : null}
                </div>
                <div className="mt-6">{renderStats(experience)}</div>
              </div>
              <div className="p-8">
                <div className="relative aspect-square overflow-hidden border-4 border-slate-950 bg-[#ffeb3b]">
                  {logoUrl ? (
                    <ContentImage src={logoUrl} alt={brandName} fill className="object-cover grayscale" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-mono text-6xl font-black uppercase text-slate-950">{brandName.charAt(0)}</span>
                    </div>
                  )}
                </div>
                {coverUrl ? (
                  <div className="mt-4">
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">COVER IMAGE</p>
                    <div className="mt-2 relative aspect-[16/10] overflow-hidden border-2 border-slate-950">
                      <ContentImage src={coverUrl} alt={`${brandName} cover`} fill className="object-cover grayscale" />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : experience.key === "codepixelmedia" ? (
          <section className="overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className={`p-8 ${experience.panelClass}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Split profile</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-white">{brandName}</h1>
              {domain ? <p className="mt-3 text-sm text-slate-300">{domain}</p> : null}
              <div className="mt-8">{renderStats(experience)}</div>
            </div>
            <div className="grid bg-[#eef3ff] p-8">
              <div className="grid gap-5 rounded-[1.75rem] border border-white bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
                  {coverUrl ? <ContentImage src={coverUrl} alt={`${brandName} cover`} fill className="object-cover" /> : null}
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-[1.5rem] bg-slate-100">
                    {logoUrl ? <ContentImage src={logoUrl} alt={brandName} fill className="object-cover" /> : null}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Task data side</p>
                    <p className="mt-1 text-lg font-semibold text-slate-950">Profile assets and trust signals</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : experience.key === "radianpark" ? (
          <section className={`rounded-[2rem] p-6 ${experience.panelClass}`}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">Signal bar</p>
                  <h1 className="mt-2 text-3xl font-semibold text-zinc-950">{brandName}</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  {renderStats(experience)}
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-zinc-100">
                  {logoUrl ? <ContentImage src={logoUrl} alt={brandName} fill className="object-cover" /> : null}
                </div>
                <div className={`rounded-[1.75rem] p-6 ${experience.softPanelClass}`}>
                  <p className={`text-sm leading-8 ${experience.mutedClass}`}>Minimal header, denser stats, and a clearer trust-first profile scan.</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className={`rounded-[2.2rem] p-8 ${experience.panelClass}`}>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-6">
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
                <h1 className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">{brandName}</h1>
                {domain ? (
                  <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${experience.softPanelClass}`}>
                    <Globe className="h-4 w-4" />
                    {domain}
                  </div>
                ) : null}
                {renderStats(experience)}
              </div>
              <div className="grid gap-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted">
                  {coverUrl ? <ContentImage src={coverUrl} alt={`${brandName} cover`} fill className="object-cover" /> : null}
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-[1.75rem] bg-white shadow-lg">
                    {logoUrl ? <ContentImage src={logoUrl} alt={brandName} fill className="object-cover" /> : null}
                  </div>
                  <div className={`rounded-[1.5rem] p-4 ${experience.softPanelClass}`}>
                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] ${experience.mutedClass}`}>
                      <Sparkles className="h-4 w-4" />
                      Direct-link identity surface
                    </div>
                    <p className="mt-2 text-sm text-foreground">This profile is built to make the layout shift immediate and unmistakable.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="border-4 border-slate-950 bg-white p-8 shadow-[8px_8px_0_rgba(15,23,42,1)]">
            <div className="mb-6 border-b-2 border-slate-950 pb-4">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">PROFILE DATA</p>
            </div>
            <article
              className="article-content prose prose-p:my-4 prose-p:text-slate-700 prose-p:font-medium prose-strong:font-bold prose-strong:text-slate-950 prose-a:text-slate-950 prose-a:underline"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>

          <aside className="space-y-6">
            <div className="border-4 border-slate-950 bg-[#ffeb3b] p-6 shadow-[6px_6px_0_rgba(15,23,42,1)]">
              <div className="mb-4 border-b-2 border-slate-950 pb-4">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-950">ARCHIVE METADATA</p>
              </div>
              <p className="font-mono text-lg font-black uppercase text-slate-950">{experience.label}</p>
              <p className="mt-3 text-sm font-medium text-slate-700">
                Brutalist editorial profile system. No algorithms, no feeds—pure visual archive format.
              </p>
            </div>

            {website ? (
              <Button
                asChild
                className="w-full border-2 border-slate-950 bg-slate-950 py-4 font-mono text-sm font-bold uppercase text-white hover:bg-slate-800"
              >
                <Link href={website} target="_blank" rel="noopener noreferrer">
                  VISIT WEBSITE →
                </Link>
              </Button>
            ) : null}
          </aside>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-14">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className={`text-sm font-semibold ${experience.mutedClass}`}>
                View all
              </Link>
            </div>

            {experience.key === "codepixelmedia" || experience.key === "helloartcity" ? (
              <div className="flex gap-5 overflow-x-auto pb-2">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <div key={article.id} className="min-w-[280px] max-w-[320px] flex-none">
                    <TaskPostCard post={article} href={buildPostUrl("article", article.slug)} compact />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <TaskPostCard
                    key={article.id}
                    post={article}
                    href={buildPostUrl("article", article.slug)}
                    compact
                  />
                ))}
              </div>
            )}
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

