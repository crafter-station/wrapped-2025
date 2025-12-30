import type { Repository } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface RepoCardProps {
  repo: Repository;
  rank: number;
}

export function RepoCard({ repo, rank }: RepoCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-border hover:bg-muted/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">#{rank}</span>
            <h3 className="truncate font-medium text-foreground group-hover:underline">
              {repo.name}
            </h3>
          </div>
          {repo.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {repo.description}
            </p>
          )}
        </div>
        {repo.primaryLanguage && (
          <Badge variant="secondary" className="shrink-0">
            {repo.primaryLanguage.name}
          </Badge>
        )}
      </div>
      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
          </svg>
          {repo.stargazerCount}
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
          </svg>
          {repo.forkCount}
        </span>
      </div>
    </a>
  );
}

