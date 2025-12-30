"use client";

import {
  ProgressSlider,
  SliderContent,
  SliderWrapper,
  SliderIndicator,
  SliderNavigation,
} from "@/components/ui/progressive-carousel";
import { GithubBadge } from "./components/github-badge";
import { WhatsappBadge } from "./components/whatsapp-badge";
import {
  IntroSlide,
  StatsSlide,
  VercelSlide,
  AchievementsSlide,
  EventsSlide,
  CommunitySlide,
  LanguagesSlide,
  ActivitySlide,
  TopReposSlide,
  ContributorsSlide,
  ThankYouSlide,
} from "./components/slides";
import { DesktopWrapped } from "./components/desktop-wrapped";
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

const communityStats = [
  { label: "WhatsApp members", value: "+150", icon: "💬" },
  { label: "LinkedIn followers", value: "272", icon: "💼" },
  { label: "LinkedIn impressions", value: "4,445", icon: "👀" },
  { label: "New members", value: "2", icon: "🇨🇴" },
];

const slides = [
  "intro",
  "build-stats",
  "code-stats",
  "vercel",
  "achievements",
  "events",
  "community",
  "languages",
  "activity",
  "top-repos",
  "contributors",
  "thank-you",
];

export default function Home() {
  const busiestMonth = data.monthlyActivity.reduce((max, month) =>
    month.commits > max.commits ? month : max
  ).month;

  const totalContributorCommits = data.topContributors.reduce(
    (sum, c) => sum + c.contributions,
    0
  );

  return (
    <main className="min-h-screen bg-background">
      <WhatsappBadge />
      <GithubBadge />

      <div className="md:hidden">
        <ProgressSlider
          activeSlider="intro"
          duration={6000}
          className="h-dvh w-full overflow-hidden"
        >
          <SliderIndicator className="fixed top-4 left-4 right-4 z-50" />
          <SliderNavigation className="z-40" />

          <SliderContent>
            <SliderWrapper value="intro">
              <IntroSlide
                name={data.name}
                description={data.description}
                avatarUrl={data.avatarUrl}
                year={2025}
              />
            </SliderWrapper>

            <SliderWrapper value="build-stats">
              <StatsSlide
                title="This year we built"
                stats={[
                  { label: "Repositories", value: data.publicRepos },
                  { label: "Stars", value: data.totalStars },
                  { label: "PRs Merged", value: data.totalPRsMerged },
                  { label: "Contributors", value: data.totalContributors },
                ]}
              />
            </SliderWrapper>

            <SliderWrapper value="code-stats">
              <StatsSlide
                title="And we wrote"
                stats={[
                  { label: "Commits", value: data.totalCommits },
                  { label: "Issues Closed", value: data.totalIssuesClosed },
                  { label: "Forks", value: data.totalForks },
                  { label: "Lines of Code", value: `${Math.round(data.totalLinesOfCode / 1000)}k` },
                ]}
              />
            </SliderWrapper>

            <SliderWrapper value="vercel">
              <VercelSlide
                totalProjects={vercelStats.totalProjects}
                totalDeployments={vercelStats.totalDeployments}
                totalPageviews={vercelStats.totalPageviews}
                totalVisitors={vercelStats.totalVisitors}
                topProjects={vercelStats.projects.slice(0, 5)}
                topFrameworks={vercelStats.topFrameworks}
              />
            </SliderWrapper>

            <SliderWrapper value="achievements">
              <AchievementsSlide achievements={achievements} />
            </SliderWrapper>

            <SliderWrapper value="events">
              <EventsSlide irlEvents={irlEvents} onlineEvents={onlineEvents} />
            </SliderWrapper>

            <SliderWrapper value="community">
              <CommunitySlide
                stats={communityStats}
                newMembers={["Cris", "Nicolas"]}
                faceReveals={["Nicolas", "Jibaru"]}
              />
            </SliderWrapper>

            <SliderWrapper value="languages">
              <LanguagesSlide languages={data.languages} />
            </SliderWrapper>

            <SliderWrapper value="activity">
              <ActivitySlide data={data.monthlyActivity} busiestMonth={busiestMonth} />
            </SliderWrapper>

            <SliderWrapper value="top-repos">
              <TopReposSlide
                repos={data.topRepositories}
                newReposCount={data.newReposIn2025}
              />
            </SliderWrapper>

            <SliderWrapper value="contributors">
              <ContributorsSlide
                contributors={data.topContributors}
                totalCommits={totalContributorCommits}
                totalContributors={data.totalContributors}
              />
            </SliderWrapper>

            <SliderWrapper value="thank-you">
              <ThankYouSlide
                githubUrl={data.url}
                communityUrl="https://crafters.chat"
                generatedAt={data.generatedAt}
              />
            </SliderWrapper>
          </SliderContent>
        </ProgressSlider>
      </div>

      <div className="hidden md:block">
        <DesktopWrapped
          data={data}
          vercelStats={vercelStats}
          achievements={achievements}
          irlEvents={irlEvents}
          onlineEvents={onlineEvents}
          communityStats={communityStats}
        />
      </div>
    </main>
  );
}
