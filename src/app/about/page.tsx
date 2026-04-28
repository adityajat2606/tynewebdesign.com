import Link from "next/link";

import { PageShell } from "@/components/shared/page-shell";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { mockTeamMembers } from "@/data/mock-data";

import { SITE_CONFIG } from "@/lib/site-config";



const highlights = [

  { label: "Visual stories shared", value: "24k+" },

  { label: "Creative profiles", value: "8.5k" },

  { label: "Community connections", value: "156k" },

];



const values = [

  { title: "Visual-first discovery", description: "Every image tells a story. We built a platform where visuals lead the conversation." },

  { title: "Creative freedom", description: "Upload, showcase, and connect through imagery without algorithmic noise." },

  { title: "Community-driven", description: "Likes, comments, and follows that mean something—real engagement between creators." },

];



export default function AboutPage() {

  return (

    <PageShell

      title={`About ${SITE_CONFIG.name}`}

      description={`${SITE_CONFIG.name} is a visual-first platform for image sharing, creative profiles, and community-driven discovery.`}

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

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        <Card className="border-border bg-card">

          <CardContent className="space-y-4 p-6">

            <Badge variant="secondary">Our Story</Badge>

            <h2 className="text-2xl font-semibold text-foreground">

              A single home for knowledge, discovery, and community.

            </h2>

            <p className="text-sm text-muted-foreground">

              {SITE_CONFIG.name} brings together publishing, listings, and social bookmarking so teams can move faster

              and keep their best resources close.

            </p>

            <div className="grid gap-4 sm:grid-cols-3">

              {highlights.map((item) => (

                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">

                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>

                  <div className="text-xs text-muted-foreground">{item.label}</div>

                </div>

              ))}

            </div>

          </CardContent>

        </Card>

        <div className="space-y-4">

          {values.map((value) => (

            <Card key={value.title} className="border-border bg-card">

              <CardContent className="p-6">

                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>



      <div className="mt-10 grid gap-6 md:grid-cols-3">

        {mockTeamMembers.map((member) => (

          <Card key={member.id} className="border-border bg-card transition-transform hover:-translate-y-1">

            <CardContent className="p-6">

              <div className="flex items-center gap-3">

                <Avatar className="h-12 w-12">

                  <AvatarImage src={member.avatar} alt={member.name} />

                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>

                </Avatar>

                <div>

                  <p className="text-sm font-semibold text-foreground">{member.name}</p>

                  <p className="text-xs text-muted-foreground">{member.role}</p>

                </div>

              </div>

              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>

              <p className="mt-3 text-xs text-muted-foreground">{member.location}</p>

            </CardContent>

          </Card>

        ))}

      </div>

    </PageShell>

  );

}

