import type { Contributor } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContributorListProps {
  contributors: Contributor[];
  maxContributions: number;
}

export function ContributorList({ contributors, maxContributions }: ContributorListProps) {
  return (
    <div className="space-y-3">
      {contributors.map((contributor, i) => {
        const percentage = (contributor.contributions / maxContributions) * 100;
        return (
          <a
            key={contributor.login}
            href={contributor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Avatar className="h-8 w-8 shrink-0 border border-border/50">
              <AvatarImage src={contributor.avatarUrl} alt={contributor.login} />
              <AvatarFallback className="text-xs">
                {contributor.login.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm text-foreground group-hover:underline">
                  {contributor.login}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {contributor.contributions}
                </span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-foreground/20 transition-all duration-700 group-hover:bg-foreground/30"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

