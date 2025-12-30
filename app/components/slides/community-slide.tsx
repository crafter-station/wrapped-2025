interface CommunityStat {
  label: string;
  value: string;
  icon: string;
}

interface CommunitySlideProps {
  stats: CommunityStat[];
  newMembers: string[];
  faceReveals: string[];
}

export function CommunitySlide({ stats, newMembers, faceReveals }: CommunitySlideProps) {
  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-center text-xl font-light text-foreground">
          Community growth
        </h2>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          New country unlocked: Colombia
        </p>

        <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border/30 bg-card/30 p-3 text-center"
            >
              <span className="text-2xl">{stat.icon}</span>
              <p className="mt-1 text-2xl font-light text-foreground">{stat.value}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Welcome{" "}
            {newMembers.map((name, i) => (
              <span key={name}>
                <span className="text-foreground">{name}</span>
                {i < newMembers.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Face reveals: {faceReveals.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
