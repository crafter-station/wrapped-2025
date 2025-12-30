import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatItem {
  label: string;
  value: string | number;
}

interface StatsSlideProps {
  title: string;
  subtitle?: string;
  stats: StatItem[];
  icon?: ReactNode;
  className?: string;
}

export function StatsSlide({ title, subtitle, stats, icon, className }: StatsSlideProps) {
  return (
    <div className={cn("flex h-dvh flex-col px-6 pt-12 pb-6", className)}>
      <div className="flex flex-1 flex-col items-center justify-center">
        {icon && <div className="mb-4">{icon}</div>}
        
        <h2 className="text-center text-xl font-light text-foreground">
          {title}
        </h2>
        
        {subtitle && (
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}

        <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border/30 bg-card/30 p-4 text-center"
            >
              <p className="text-3xl font-light tracking-tight text-foreground">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
