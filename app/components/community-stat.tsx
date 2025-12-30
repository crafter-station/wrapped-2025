interface CommunityStatProps {
  label: string;
  value: string | number;
  icon?: string;
}

export function CommunityStat({ label, value, icon }: CommunityStatProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card p-4">
      {icon && <span className="text-2xl">{icon}</span>}
      <div>
        <p className="text-2xl font-light text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

