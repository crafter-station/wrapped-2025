import type { MonthlyActivity } from "@/lib/types";

interface ActivityChartProps {
  data: MonthlyActivity[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const maxCommits = Math.max(...data.map((d) => d.commits), 1);

  return (
    <div className="space-y-3">
      <div className="flex h-32 items-end gap-1 sm:gap-2">
        {data.map((month) => {
          const heightPercent = (month.commits / maxCommits) * 100;
          return (
            <div
              key={month.month}
              className="group relative flex-1"
              style={{ height: "100%" }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 rounded-t bg-foreground/15 transition-all duration-500 group-hover:bg-foreground/25"
                style={{
                  height: `${Math.max(heightPercent, 3)}%`,
                }}
              />
              <div className="absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                {month.commits}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between gap-1 sm:gap-2">
        {data.map((month) => (
          <span
            key={month.month}
            className="flex-1 text-center text-[10px] text-muted-foreground sm:text-xs"
          >
            {month.month}
          </span>
        ))}
      </div>
    </div>
  );
}
