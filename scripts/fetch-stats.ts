import { execSync } from "child_process";
import { writeFileSync } from "fs";
import type {
  OrganizationStats,
  Repository,
  Contributor,
  LanguageStats,
  MonthlyActivity,
} from "../lib/types";

const ORG_NAME = "crafter-station";
const YEAR = 2025;
const START_DATE = `${YEAR}-01-01T00:00:00Z`;

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Markdown: "#083fa1",
  JSON: "#292929",
  YAML: "#cb171e",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Astro: "#ff5a03",
  MDX: "#fcb32c",
};

function gh(args: string[]): string {
  try {
    const cmd = ["gh", ...args].map(a => `"${a}"`).join(" ");
    return execSync(cmd, { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024, shell: "/bin/zsh" });
  } catch {
    return "";
  }
}

function ghJson<T>(args: string[]): T | null {
  const result = gh(args);
  if (!result) return null;
  try {
    return JSON.parse(result) as T;
  } catch {
    return null;
  }
}

interface GHRepo {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string } | null;
  createdAt: string;
  pushedAt: string;
  url: string;
  isArchived: boolean;
  isFork: boolean;
}

interface GHOrg {
  login: string;
  description: string;
  avatar_url: string;
  html_url: string;
  created_at: string;
  public_repos: number;
}

interface GHContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

interface GHCommit {
  sha: string;
  commit: {
    author: {
      date: string;
    };
  };
}

interface GHPullRequest {
  number: number;
  state: string;
  merged_at: string | null;
  created_at: string;
}

interface GHIssue {
  number: number;
  state: string;
  pull_request?: object;
  created_at: string;
  closed_at: string | null;
}

async function fetchStats(): Promise<OrganizationStats> {
  console.log(`Fetching stats for ${ORG_NAME}...`);

  const org = ghJson<GHOrg>(["api", `orgs/${ORG_NAME}`]);
  if (!org) throw new Error("Failed to fetch organization info");

  console.log("Fetching repositories...");
  const repos = ghJson<GHRepo[]>([
    "repo", "list", ORG_NAME, "--limit", "100",
    "--json", "name,description,stargazerCount,forkCount,primaryLanguage,createdAt,pushedAt,url,isArchived,isFork"
  ]);
  if (!repos) throw new Error("Failed to fetch repositories");

  const activeRepos = repos.filter((r) => !r.isArchived && !r.isFork);
  console.log(`Found ${activeRepos.length} active repositories`);

  let totalStars = 0;
  let totalForks = 0;
  let totalCommits = 0;
  let totalPRs = 0;
  let totalPRsMerged = 0;
  let totalIssues = 0;
  let totalIssuesClosed = 0;
  const allContributors = new Map<string, Contributor>();
  const languageBytes = new Map<string, number>();
  const monthlyCommits = new Map<string, number>();
  let newReposIn2025 = 0;

  for (const repo of activeRepos) {
    totalStars += repo.stargazerCount;
    totalForks += repo.forkCount;

    if (new Date(repo.createdAt).getFullYear() === YEAR) {
      newReposIn2025++;
    }

    console.log(`Processing ${repo.name}...`);

    const contributors = ghJson<GHContributor[]>([
      "api", `repos/${ORG_NAME}/${repo.name}/contributors`, "--paginate"
    ]);
    if (contributors) {
      for (const c of contributors) {
        const existing = allContributors.get(c.login);
        if (existing) {
          existing.contributions += c.contributions;
        } else {
          allContributors.set(c.login, {
            login: c.login,
            avatarUrl: c.avatar_url,
            contributions: c.contributions,
            url: c.html_url,
          });
        }
      }
    }

    const commits = ghJson<GHCommit[]>([
      "api", `repos/${ORG_NAME}/${repo.name}/commits?since=${START_DATE}&per_page=100`, "--paginate"
    ]);
    if (commits && Array.isArray(commits)) {
      totalCommits += commits.length;
      for (const commit of commits) {
        const date = new Date(commit.commit.author.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        monthlyCommits.set(monthKey, (monthlyCommits.get(monthKey) || 0) + 1);
      }
    }

    const prs = ghJson<GHPullRequest[]>([
      "api", `repos/${ORG_NAME}/${repo.name}/pulls?state=all&per_page=100`, "--paginate"
    ]);
    if (prs && Array.isArray(prs)) {
      const prs2025 = prs.filter(
        (pr) => new Date(pr.created_at).getFullYear() === YEAR
      );
      totalPRs += prs2025.length;
      totalPRsMerged += prs2025.filter((pr) => pr.merged_at !== null).length;
    }

    const issues = ghJson<GHIssue[]>([
      "api", `repos/${ORG_NAME}/${repo.name}/issues?state=all&per_page=100`, "--paginate"
    ]);
    if (issues && Array.isArray(issues)) {
      const actualIssues = issues.filter((i) => !i.pull_request);
      const issues2025 = actualIssues.filter(
        (i) => new Date(i.created_at).getFullYear() === YEAR
      );
      totalIssues += issues2025.length;
      totalIssuesClosed += issues2025.filter((i) => i.state === "closed").length;
    }

    const languages = ghJson<Record<string, number>>([
      "api", `repos/${ORG_NAME}/${repo.name}/languages`
    ]);
    if (languages) {
      for (const [lang, bytes] of Object.entries(languages)) {
        languageBytes.set(lang, (languageBytes.get(lang) || 0) + bytes);
      }
    }
  }

  const totalBytes = Array.from(languageBytes.values()).reduce((a, b) => a + b, 0);
  const languages: LanguageStats[] = Array.from(languageBytes.entries())
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / totalBytes) * 100,
      color: LANGUAGE_COLORS[name] || "#6e7681",
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8);

  const monthlyActivity: MonthlyActivity[] = [];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  for (let m = 1; m <= 12; m++) {
    const key = `${YEAR}-${String(m).padStart(2, "0")}`;
    monthlyActivity.push({
      month: months[m - 1],
      commits: monthlyCommits.get(key) || 0,
    });
  }

  const topRepositories: Repository[] = activeRepos
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 5)
    .map((r) => ({
      name: r.name,
      description: r.description,
      stargazerCount: r.stargazerCount,
      forkCount: r.forkCount,
      primaryLanguage: r.primaryLanguage,
      createdAt: r.createdAt,
      pushedAt: r.pushedAt,
      url: r.url,
    }));

  const topContributors: Contributor[] = Array.from(allContributors.values())
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 10);

  const estimatedLOC = Math.round(totalBytes / 40);

  const stats: OrganizationStats = {
    name: org.login,
    description: org.description || "Open source organization",
    avatarUrl: org.avatar_url,
    url: org.html_url,
    createdAt: org.created_at,
    publicRepos: activeRepos.length,
    totalStars,
    totalForks,
    totalPRs,
    totalPRsMerged,
    totalIssues,
    totalIssuesClosed,
    totalCommits,
    totalContributors: allContributors.size,
    totalLinesOfCode: estimatedLOC,
    repositories: activeRepos.map((r) => ({
      name: r.name,
      description: r.description,
      stargazerCount: r.stargazerCount,
      forkCount: r.forkCount,
      primaryLanguage: r.primaryLanguage,
      createdAt: r.createdAt,
      pushedAt: r.pushedAt,
      url: r.url,
    })),
    topRepositories,
    topContributors,
    languages,
    monthlyActivity,
    newReposIn2025,
    generatedAt: new Date().toISOString(),
  };

  return stats;
}

fetchStats()
  .then((stats) => {
    const outputPath = "./data/stats.json";
    writeFileSync(outputPath, JSON.stringify(stats, null, 2));
    console.log(`\nStats saved to ${outputPath}`);
    console.log(`\nSummary:`);
    console.log(`  Repositories: ${stats.publicRepos}`);
    console.log(`  Stars: ${stats.totalStars}`);
    console.log(`  Contributors: ${stats.totalContributors}`);
    console.log(`  Commits (2025): ${stats.totalCommits}`);
    console.log(`  PRs (2025): ${stats.totalPRs} (${stats.totalPRsMerged} merged)`);
    console.log(`  Lines of Code: ~${stats.totalLinesOfCode.toLocaleString()}`);
  })
  .catch((error) => {
    console.error("Failed to fetch stats:", error);
    process.exit(1);
  });

