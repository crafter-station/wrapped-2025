import type { LanguageStats } from "@/lib/types";

interface LanguageBarProps {
  languages: LanguageStats[];
}

function formatPercentage(value: number): string {
  if (value >= 1) return value.toFixed(1);
  if (value >= 0.1) return value.toFixed(2);
  if (value >= 0.01) return value.toFixed(3);
  return "<0.01";
}

export function LanguageBar({ languages }: LanguageBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="h-full transition-all duration-500"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {languages.slice(0, 8).map((lang) => (
          <div key={lang.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm text-muted-foreground">
              {lang.name}{" "}
              <span className="text-foreground">
                {formatPercentage(lang.percentage)}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

