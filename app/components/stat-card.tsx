import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  className?: string;
}

export function StatCard({ label, value, suffix, className }: StatCardProps) {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/50 bg-card p-6 transition-all hover:border-border",
        className
      )}
    >
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 text-4xl font-light tracking-tight text-foreground md:text-5xl">
          {formattedValue}
          {suffix && (
            <span className="ml-1 text-lg text-muted-foreground">{suffix}</span>
          )}
        </p>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-transparent to-muted/20 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}

