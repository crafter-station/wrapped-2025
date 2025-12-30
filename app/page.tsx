"use client";

import { Hero } from "./components/hero";
import { StatCard } from "./components/stat-card";
import { LanguageBar } from "./components/language-bar";
import { ActivityChart } from "./components/activity-chart";
import { RepoCard } from "./components/repo-card";
import { ContributorList } from "./components/contributor-list";
import { AchievementCard } from "./components/achievement-card";
import { EventBadge } from "./components/event-badge";
import { CommunityStat } from "./components/community-stat";
import { GithubBadge } from "./components/github-badge";
import { WhatsappBadge } from "./components/whatsapp-badge";
import { ScrollElement } from "@/components/ui/scroll-element";
import { VercelLogo } from "@/components/logos/vercel";
import stats from "@/data/stats.json";
import vercelStats from "@/data/vercel-stats.json";
import type { OrganizationStats } from "@/lib/types";

const data = stats as OrganizationStats;

const achievements = [
  {
    icon: "🏆",
    title: "Overall Winner — Next.js Global Hackathon",
    host: "Vercel",
    project: "text0",
    location: "2025",
    url: "https://www.youtube.com/watch?v=KDRwgbwq0_c&t=1142s",
  },
  {
    icon: "🥇",
    title: "1st Place — Vercel AI Gateway Hackathon",
    host: "Vercel",
    project: "Chess Battle",
    location: "2025",
    url: "https://www.youtube.com/watch?v=yKzXoJgPenw&t=28889s",
  },
  {
    icon: "🎖️",
    title: "Finalist — Platanus Hack 25'",
    project: "Scrapi",
    location: "Chile 2025",
    url: "https://25.hack.platan.us/vote/scrapifast",
  },
  {
    icon: "🎖️",
    title: "Finalist — IA Hackathon LATAM",
    project: "GitHunter",
    location: "2025",
  },
];

const irlEvents = [
  { name: "AI Hackathon Colombia", url: "https://www.colombiatechfest.ai-hackathon.co/" },
  { name: "AI Hackathon Peru", url: "https://www.peru.ai-hackathon.co/" },
  { name: "Platanus Hack", url: "https://25.hack.platan.us/" },
];

const onlineEvents = [
  { name: "Global Hackathon by LetsAcc" },
  { name: "Next.js Global Hackathon 2025" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <WhatsappBadge />
      <GithubBadge />
      <Hero
        name={data.name}
        description={data.description}
        avatarUrl={data.avatarUrl}
        year={2025}
      />

      <section className="flex min-h-[80vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="up">
            <h2 className="mb-8 text-center text-2xl font-light text-foreground sm:text-3xl">
              This year we built
            </h2>
          </ScrollElement>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollElement direction="left" delay={0}>
              <StatCard label="Repositories" value={data.publicRepos} />
            </ScrollElement>
            <ScrollElement direction="up" delay={0.1}>
              <StatCard label="Stars" value={data.totalStars} />
            </ScrollElement>
            <ScrollElement direction="up" delay={0.2}>
              <StatCard label="PRs Merged" value={data.totalPRsMerged} />
            </ScrollElement>
            <ScrollElement direction="right" delay={0.3}>
              <StatCard label="Contributors" value={data.totalContributors} />
            </ScrollElement>
          </div>
        </div>
      </section>

      <section className="flex min-h-[80vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="up">
            <h2 className="mb-8 text-center text-2xl font-light text-foreground sm:text-3xl">
              And we wrote
            </h2>
          </ScrollElement>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollElement direction="left" delay={0}>
              <StatCard label="Commits" value={data.totalCommits} />
            </ScrollElement>
            <ScrollElement direction="up" delay={0.1}>
              <StatCard label="Issues Closed" value={data.totalIssuesClosed} />
            </ScrollElement>
            <ScrollElement direction="up" delay={0.2}>
              <StatCard label="Forks" value={data.totalForks} />
            </ScrollElement>
            <ScrollElement direction="right" delay={0.3}>
              <StatCard
                label="Lines of Code"
                value={`${Math.round(data.totalLinesOfCode / 1000)}k`}
              />
            </ScrollElement>
          </div>
        </div>
      </section>

      <section className="flex min-h-[80vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="up">
            <div className="mb-6 flex justify-center">
              <VercelLogo className="h-8 w-8 text-foreground" />
            </div>
            <h2 className="mb-10 text-center text-2xl font-light text-foreground sm:text-3xl">
              And we deployed
            </h2>
          </ScrollElement>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollElement direction="left" delay={0}>
              <StatCard label="Projects" value={vercelStats.totalProjects} />
            </ScrollElement>
            <ScrollElement direction="up" delay={0.1}>
              <StatCard label="Deployments" value={vercelStats.totalDeployments.toLocaleString()} />
            </ScrollElement>
            <ScrollElement direction="up" delay={0.2}>
              <StatCard label="Pageviews" value={vercelStats.totalPageviews.toLocaleString()} />
            </ScrollElement>
            <ScrollElement direction="right" delay={0.3}>
              <StatCard label="Visitors" value={vercelStats.totalVisitors.toLocaleString()} />
            </ScrollElement>
          </div>
          <ScrollElement direction="up" delay={0.3}>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {vercelStats.topFrameworks.map((fw) => (
                <span
                  key={fw.name}
                  className="rounded-full border border-border/50 bg-card px-3 py-1 text-xs text-muted-foreground"
                >
                  {fw.name} <span className="text-foreground">{fw.count}</span>
                </span>
              ))}
            </div>
          </ScrollElement>
          <ScrollElement direction="up" delay={0.4}>
            <div className="mt-10">
              <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">
                Most visited
              </h3>
              <div className="space-y-3">
                {vercelStats.projects.slice(0, 5).map((project, i) => (
                  <div
                    key={project.name}
                    className="flex items-center justify-between rounded-lg border border-border/30 bg-card/30 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{i + 1}</span>
                      <span className="font-medium text-foreground">{project.name}</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {project.framework}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {project.pageviews.toLocaleString()} views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollElement>
        </div>
      </section>

      <section className="flex min-h-[80vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="up">
            <h2 className="mb-2 text-center text-2xl font-light text-foreground sm:text-3xl">
              We won some things
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              Hackathons and competitions
            </p>
          </ScrollElement>
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement, i) => (
              <ScrollElement
                key={achievement.title}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.1}
              >
                <AchievementCard {...achievement} />
              </ScrollElement>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[60vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="up">
            <h2 className="mb-2 text-center text-2xl font-light text-foreground sm:text-3xl">
              Events we attended
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              IRL and online
            </p>
          </ScrollElement>
          <div className="space-y-6">
            <ScrollElement direction="left">
              <div className="flex flex-wrap justify-center gap-3">
                {irlEvents.map((event) => (
                  <EventBadge
                    key={event.name}
                    name={event.name}
                    type="irl"
                    url={event.url}
                  />
                ))}
              </div>
            </ScrollElement>
            <ScrollElement direction="right" delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3">
                {onlineEvents.map((event) => (
                  <EventBadge key={event.name} name={event.name} type="online" />
                ))}
              </div>
            </ScrollElement>
          </div>
        </div>
      </section>

      <section className="flex min-h-[80vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="up">
            <h2 className="mb-2 text-center text-2xl font-light text-foreground sm:text-3xl">
              Community growth
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              New country unlocked: Colombia
            </p>
          </ScrollElement>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollElement direction="left" delay={0}>
              <CommunityStat label="WhatsApp members" value="+150" icon="💬" />
            </ScrollElement>
            <ScrollElement direction="up" delay={0.1}>
              <CommunityStat label="LinkedIn followers" value="272" icon="💼" />
            </ScrollElement>
            <ScrollElement direction="up" delay={0.2}>
              <CommunityStat label="LinkedIn impressions" value="4,445" icon="👀" />
            </ScrollElement>
            <ScrollElement direction="right" delay={0.3}>
              <CommunityStat label="New members" value="2" icon="🇨🇴" />
            </ScrollElement>
          </div>
          <ScrollElement direction="up" delay={0.4}>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Welcome{" "}
                <span className="text-foreground">Cris</span>,{" "}
                <span className="text-foreground">Nicolas</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Face reveals: Nicolas, Jibaru
              </p>
            </div>
          </ScrollElement>
        </div>
      </section>

      <section className="flex min-h-[60vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="left">
            <h2 className="mb-2 text-center text-2xl font-light text-foreground sm:text-3xl">
              Our favorite languages
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              TypeScript leads the way
            </p>
          </ScrollElement>
          <ScrollElement direction="right" delay={0.2}>
            <LanguageBar languages={data.languages} />
          </ScrollElement>
        </div>
      </section>

      <section className="flex min-h-[60vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="right">
            <h2 className="mb-2 text-center text-2xl font-light text-foreground sm:text-3xl">
              Month by month
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              December was our busiest month
            </p>
          </ScrollElement>
          <ScrollElement direction="left" delay={0.2}>
            <ActivityChart data={data.monthlyActivity} />
          </ScrollElement>
          <ScrollElement direction="up" delay={0.3}>
            <div className="mt-10">
              <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">
                Most starred
              </h3>
              <div className="space-y-3">
                {data.topRepositories.slice(0, 5).map((repo, i) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-border/30 bg-card/30 px-4 py-3 transition-colors hover:bg-card/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{i + 1}</span>
                      <span className="font-medium text-foreground">{repo.name}</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {repo.primaryLanguage?.name || "N/A"}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-amber-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {repo.stargazerCount}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollElement>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="up">
            <h2 className="mb-2 text-center text-2xl font-light text-foreground sm:text-3xl">
              What we shipped
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              {data.newReposIn2025} new repositories in 2025
            </p>
          </ScrollElement>
          <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
            {data.repositories
              .filter((r) => r.stargazerCount > 0 || r.description)
              .slice(0, 18)
              .map((repo, i) => {
                const directions = ["left", "up", "right"] as const;
                const direction = directions[i % 3];
                return (
                  <ScrollElement
                    key={repo.name}
                    direction={direction}
                    viewport={{ amount: 0.2, margin: "0px", once: true }}
                  >
                    <div className="mb-3 break-inside-avoid">
                      <RepoCard repo={repo} rank={i + 1} />
                    </div>
                  </ScrollElement>
                );
              })}
          </div>
        </div>
      </section>

      <section className="flex min-h-[80vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="up">
            <h2 className="mb-2 text-center text-2xl font-light text-foreground sm:text-3xl">
              The people behind it
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              {data.topContributors
                .reduce((sum, c) => sum + c.contributions, 0)
                .toLocaleString()}{" "}
              commits from {data.totalContributors} contributors
            </p>
          </ScrollElement>
          <ScrollElement direction="up" delay={0.2}>
            <ContributorList
              contributors={data.topContributors}
              maxContributions={data.topContributors[0]?.contributions || 1}
            />
          </ScrollElement>
        </div>
      </section>

      <section className="flex min-h-[50vh] items-center py-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <ScrollElement direction="none">
            <div className="text-center">
              <p className="text-4xl font-light text-foreground sm:text-5xl">
                Thank you
              </p>
              <p className="mt-4 text-muted-foreground">
                for being part of our open source journey
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-border px-6 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  Follow us on GitHub
                </a>
                <a
                  href="https://crafters.chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-border px-6 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  Join our community
                </a>
              </div>
              <p className="mt-8 text-xs text-muted-foreground/60">
                Last updated:{" "}
                {new Date(data.generatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </ScrollElement>
        </div>
      </section>
    </main>
  );
}
