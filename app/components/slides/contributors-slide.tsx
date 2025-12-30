import type { Contributor } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContributorsSlideProps {
  contributors: Contributor[];
  totalCommits: number;
  totalContributors: number;
}

export function ContributorsSlide({
  contributors,
  totalCommits,
  totalContributors,
}: ContributorsSlideProps) {
  const maxContributions = contributors[0]?.contributions || 1;

  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-center text-xl font-light text-foreground">
          The people behind it
        </h2>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {totalCommits.toLocaleString()} commits from {totalContributors} contributors
        </p>

        <div className="mt-6 w-full max-w-sm space-y-2">
          {contributors.slice(0, 6).map((contributor) => {
            const percentage = (contributor.contributions / maxContributions) * 100;
            return (
              <a
                key={contributor.login}
                href={contributor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg p-2 transition-colors active:bg-muted/50"
              >
                <Avatar className="h-8 w-8 shrink-0 border border-border/30">
                  <AvatarImage src={contributor.avatarUrl} alt={contributor.login} />
                  <AvatarFallback className="text-xs">
                    {contributor.login.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-foreground">
                      {contributor.login}
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {contributor.contributions}
                    </span>
                  </div>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground/20"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
