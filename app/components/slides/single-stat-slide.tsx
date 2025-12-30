import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SingleStatSlideProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export function SingleStatSlide({ label, value, subtitle, icon, className }: SingleStatSlideProps) {
  const formattedValue = typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div className={cn("flex h-dvh flex-col px-6 pt-12 pb-6", className)}>
      <div className="flex flex-1 flex-col items-center justify-center">
        {icon && <div className="mb-6 text-4xl">{icon}</div>}

        <p className="text-center text-sm uppercase tracking-wider text-muted-foreground">
          {label}
        </p>

        <p className="mt-4 text-center text-7xl font-extralight tracking-tight text-foreground">
          {formattedValue}
        </p>

        {subtitle && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
