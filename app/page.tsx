"use client";

import { Hero } from "./components/hero";
import { StatCard } from "./components/stat-card";
import { LanguageBar } from "./components/language-bar";
import { ActivityChart } from "./components/activity-chart";
import { RepoCard } from "./components/repo-card";
import { ContributorList } from "./components/contributor-list";
import { ScrollElement } from "@/components/ui/scroll-element";
import stats from "@/data/stats.json";
import type { OrganizationStats } from "@/lib/types";

const data = stats as OrganizationStats;

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full border border-border px-6 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                Follow us on GitHub
              </a>
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
