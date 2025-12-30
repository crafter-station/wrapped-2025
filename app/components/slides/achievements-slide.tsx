interface Achievement {
  icon: string;
  title: string;
  host?: string;
  project: string;
  location: string;
  url?: string;
}

interface AchievementsSlideProps {
  achievements: Achievement[];
}

export function AchievementsSlide({ achievements }: AchievementsSlideProps) {
  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-center text-xl font-light text-foreground">
          We won some things
        </h2>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          Hackathons and competitions
        </p>

        <div className="mt-6 w-full max-w-sm space-y-3">
          {achievements.map((achievement) => {
            const content = (
              <div
                key={achievement.title}
                className="rounded-lg border border-border/30 bg-card/30 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-foreground leading-tight">
                      {achievement.title}
                    </h3>
                    {achievement.host && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        hosted by <span className="text-foreground">{achievement.host}</span>
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        <span className="text-foreground">{achievement.project}</span>
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {achievement.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );

            if (achievement.url) {
              return (
                <a
                  key={achievement.title}
                  href={achievement.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return content;
          })}
        </div>
      </div>
    </div>
  );
}
