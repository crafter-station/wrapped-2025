export interface Repository {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string } | null;
  createdAt: string;
  pushedAt: string;
  url: string;
}

export interface Contributor {
  login: string;
  avatarUrl: string;
  contributions: number;
  url: string;
}

export interface LanguageStats {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
}

export interface MonthlyActivity {
  month: string;
  commits: number;
}

export interface OrganizationStats {
  name: string;
  description: string;
  avatarUrl: string;
  url: string;
  createdAt: string;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  totalPRs: number;
  totalPRsMerged: number;
  totalIssues: number;
  totalIssuesClosed: number;
  totalCommits: number;
  totalContributors: number;
  totalLinesOfCode: number;
  repositories: Repository[];
  topRepositories: Repository[];
  topContributors: Contributor[];
  languages: LanguageStats[];
  monthlyActivity: MonthlyActivity[];
  newReposIn2025: number;
  generatedAt: string;
}

