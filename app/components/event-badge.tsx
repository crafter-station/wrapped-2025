interface EventBadgeProps {
  name: string;
  type: "irl" | "online";
  url?: string;
}

export function EventBadge({ name, type, url }: EventBadgeProps) {
  const content = (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-4 py-2 text-sm transition-all hover:border-border hover:bg-muted/30">
      <span className="text-xs">{type === "irl" ? "🌎" : "💻"}</span>
      <span className="text-foreground">{name}</span>
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

