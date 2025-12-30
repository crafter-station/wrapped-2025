import type { Repository } from "@/lib/types";

interface TopReposSlideProps {
  repos: Repository[];
  newReposCount: number;
}

export function TopReposSlide({ repos, newReposCount }: TopReposSlideProps) {
  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-center text-xl font-light text-foreground">
          Most starred repos
        </h2>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {newReposCount} new repositories in 2025
        </p>

        <div className="mt-6 w-full max-w-sm space-y-2">
          {repos.slice(0, 5).map((repo, i) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-border/30 bg-card/30 px-4 py-3 transition-colors active:bg-card/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs text-muted-foreground">{i + 1}</span>
                <span className="truncate text-sm font-medium text-foreground">
                  {repo.name}
                </span>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  {repo.primaryLanguage?.name || "N/A"}
                </span>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
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
    </div>
  );
}
