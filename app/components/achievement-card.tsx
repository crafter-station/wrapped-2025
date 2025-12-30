interface AchievementCardProps {
  icon: string;
  title: string;
  host?: string;
  project: string;
  location: string;
  url?: string;
}

export function AchievementCard({
  icon,
  title,
  host,
  project,
  location,
  url,
}: AchievementCardProps) {
  const content = (
    <div className="group rounded-lg border border-border/50 bg-card p-5 transition-all hover:border-border hover:bg-muted/30">
      <div className="flex items-start gap-4">
        <span className="text-3xl">{icon}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-foreground">{title}</h3>
          {host && (
            <p className="mt-1 text-sm text-muted-foreground">
              hosted by <span className="text-foreground">{host}</span>
            </p>
          )}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              project: <span className="text-foreground">{project}</span>
            </span>
            <span className="text-xs text-muted-foreground">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

