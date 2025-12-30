import { VercelLogo } from "@/components/logos/vercel";

interface VercelProject {
  name: string;
  framework: string;
  pageviews: number;
}

interface Framework {
  name: string;
  count: number;
}

interface VercelSlideProps {
  totalProjects: number;
  totalDeployments: number;
  totalPageviews: number;
  totalVisitors: number;
  topProjects: VercelProject[];
  topFrameworks: Framework[];
}

export function VercelSlide({
  totalProjects,
  totalDeployments,
  totalPageviews,
  totalVisitors,
  topProjects,
  topFrameworks,
}: VercelSlideProps) {
  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <VercelLogo className="mb-4 h-6 w-6 text-foreground" />
        
        <h2 className="text-center text-xl font-light text-foreground">
          And we deployed
        </h2>

        <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/30 bg-card/30 p-3 text-center">
            <p className="text-2xl font-light text-foreground">{totalProjects}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Projects
            </p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/30 p-3 text-center">
            <p className="text-2xl font-light text-foreground">
              {totalDeployments.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Deployments
            </p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/30 p-3 text-center">
            <p className="text-2xl font-light text-foreground">
              {totalPageviews.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Pageviews
            </p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/30 p-3 text-center">
            <p className="text-2xl font-light text-foreground">
              {totalVisitors.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Visitors
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {topFrameworks.map((fw) => (
            <span
              key={fw.name}
              className="rounded-full border border-border/30 bg-card/30 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {fw.name} <span className="text-foreground">{fw.count}</span>
            </span>
          ))}
        </div>

        <div className="mt-4 w-full max-w-sm">
          <p className="mb-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
            Most visited
          </p>
          <div className="space-y-1.5">
            {topProjects.slice(0, 3).map((project, i) => (
              <div
                key={project.name}
                className="flex items-center justify-between rounded-lg border border-border/30 bg-card/30 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">
                    {project.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {project.pageviews.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
