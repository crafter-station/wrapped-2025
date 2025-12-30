import { writeFileSync } from "fs";

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN) {
  console.error("VERCEL_TOKEN environment variable is required");
  process.exit(1);
}

let TEAM_ID: string | undefined;

interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  createdAt: number;
  updatedAt: number;
  latestDeployments?: VercelDeployment[];
}

interface VercelDeployment {
  uid: string;
  name: string;
  url: string;
  created: number;
  state: string;
  ready?: number;
}

interface VercelStats {
  totalProjects: number;
  totalDeployments: number;
  totalPageviews: number;
  totalVisitors: number;
  projects: {
    name: string;
    framework: string;
    deployments: number;
    pageviews: number;
    visitors: number;
  }[];
  deploymentsByMonth: { month: string; count: number }[];
  topFrameworks: { name: string; count: number }[];
  generatedAt: string;
}

async function fetchVercel<T>(endpoint: string): Promise<T | null> {
  try {
    const url = new URL(`https://api.vercel.com${endpoint}`);
    if (TEAM_ID) url.searchParams.set("teamId", TEAM_ID);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error(`Error fetching ${endpoint}: ${response.status}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

async function fetchAnalytics(projectId: string): Promise<{ pageviews: number; visitors: number }> {
  try {
    const url = `https://vercel.com/api/web-analytics/timeseries?teamId=${TEAM_ID}&projectId=${projectId}&from=2025-01-01&to=2025-12-31`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    });

    if (!response.ok) return { pageviews: 0, visitors: 0 };

    const data = await response.json() as {
      data?: {
        groups?: {
          all?: Array<{ total: number; devices: number }>;
        };
      };
    };

    const groups = data?.data?.groups?.all || [];
    const pageviews = groups.reduce((sum, g) => sum + (g.total || 0), 0);
    const visitors = groups.reduce((sum, g) => sum + (g.devices || 0), 0);

    return { pageviews, visitors };
  } catch {
    return { pageviews: 0, visitors: 0 };
  }
}

async function fetchStats(): Promise<VercelStats> {
  console.log("Fetching team info...");
  const teamsRes = await fetchVercel<{ teams: Array<{ id: string; slug: string }> }>("/v2/teams");
  if (teamsRes?.teams?.[0]) {
    TEAM_ID = teamsRes.teams[0].id;
    console.log(`Using team: ${teamsRes.teams[0].slug}`);
  }

  console.log("Fetching Vercel projects...");
  const projectsRes = await fetchVercel<{ projects: VercelProject[] }>("/v9/projects?limit=100");
  if (!projectsRes) throw new Error("Failed to fetch projects");

  const projects = projectsRes.projects;
  console.log(`Found ${projects.length} projects`);

  let totalDeployments = 0;
  let totalPageviews = 0;
  let totalVisitors = 0;
  const deploymentsByMonth = new Map<string, number>();
  const frameworkCounts = new Map<string, number>();
  const projectStats: VercelStats["projects"] = [];

  for (const project of projects) {
    console.log(`Processing ${project.name}...`);

    const deploymentsRes = await fetchVercel<{ deployments: VercelDeployment[] }>(
      `/v6/deployments?projectId=${project.id}&limit=100`
    );

    const deployments = deploymentsRes?.deployments || [];
    const deployments2025 = deployments.filter(
      (d) => new Date(d.created).getFullYear() === 2025
    );

    totalDeployments += deployments2025.length;

    for (const d of deployments2025) {
      const date = new Date(d.created);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      deploymentsByMonth.set(monthKey, (deploymentsByMonth.get(monthKey) || 0) + 1);
    }

    const framework = project.framework || "v0";
    frameworkCounts.set(framework, (frameworkCounts.get(framework) || 0) + 1);

    const analytics = await fetchAnalytics(project.id);
    totalPageviews += analytics.pageviews;
    totalVisitors += analytics.visitors;

    projectStats.push({
      name: project.name,
      framework,
      deployments: deployments2025.length,
      pageviews: analytics.pageviews,
      visitors: analytics.visitors,
    });
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = months.map((month, i) => ({
    month,
    count: deploymentsByMonth.get(`2025-${String(i + 1).padStart(2, "0")}`) || 0,
  }));

  const topFrameworks = Array.from(frameworkCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalProjects: projects.length,
    totalDeployments,
    totalPageviews,
    totalVisitors,
    projects: projectStats.sort((a, b) => b.pageviews - a.pageviews),
    deploymentsByMonth: monthlyData,
    topFrameworks,
    generatedAt: new Date().toISOString(),
  };
}

fetchStats()
  .then((stats) => {
    const outputPath = "./data/vercel-stats.json";
    writeFileSync(outputPath, JSON.stringify(stats, null, 2));
    console.log(`\nStats saved to ${outputPath}`);
    console.log(`\nSummary:`);
    console.log(`  Projects: ${stats.totalProjects}`);
    console.log(`  Deployments (2025): ${stats.totalDeployments}`);
    console.log(`  Pageviews: ${stats.totalPageviews.toLocaleString()}`);
    console.log(`  Visitors: ${stats.totalVisitors.toLocaleString()}`);
    console.log(`  Top framework: ${stats.topFrameworks[0]?.name || "N/A"}`);
  })
  .catch((error) => {
    console.error("Failed to fetch stats:", error);
    process.exit(1);
  });

