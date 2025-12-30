import type { MonthlyActivity } from "@/lib/types";

interface ActivitySlideProps {
  data: MonthlyActivity[];
  busiestMonth: string;
}

export function ActivitySlide({ data, busiestMonth }: ActivitySlideProps) {
  const maxCommits = Math.max(...data.map((d) => d.commits), 1);

  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-center text-xl font-light text-foreground">
          Month by month
        </h2>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {busiestMonth} was our busiest month
        </p>

        <div className="mt-8 w-full max-w-sm">
          <div className="flex h-32 items-end gap-1">
            {data.map((month) => {
              const heightPercent = (month.commits / maxCommits) * 100;
              return (
                <div
                  key={month.month}
                  className="group relative flex-1"
                  style={{ height: "100%" }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t bg-foreground/15 transition-all"
                    style={{
                      height: `${Math.max(heightPercent, 3)}%`,
                    }}
                  />
                  <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
                    {month.commits}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between gap-1">
            {data.map((month) => (
              <span
                key={month.month}
                className="flex-1 text-center text-[9px] text-muted-foreground"
              >
                {month.month.slice(0, 1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
