import type { LanguageStats } from "@/lib/types";

interface LanguagesSlideProps {
  languages: LanguageStats[];
}

export function LanguagesSlide({ languages }: LanguagesSlideProps) {
  const topLanguages = languages.slice(0, 5);

  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-center text-xl font-light text-foreground">
          Our favorite languages
        </h2>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          TypeScript leads the way
        </p>

        <div className="mt-8 w-full max-w-sm">
          <div className="flex h-3 w-full overflow-hidden rounded-full">
            {topLanguages.map((lang) => (
              <div
                key={lang.name}
                className="h-full transition-all"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
              />
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-sm text-foreground">{lang.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {lang.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
