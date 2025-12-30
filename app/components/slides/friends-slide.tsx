import { MoralejaDesignLogo } from "@/components/logos/moraleja-design";
import { KeboLogo } from "@/components/logos/kebo";

export function FriendsSlide() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-6">
      <h2 className="mb-2 text-center text-2xl font-light text-foreground">
        Friends we made
      </h2>
      <p className="mb-10 text-center text-sm text-muted-foreground">
        Along the way
      </p>

      <div className="relative z-50 flex items-center gap-10">
        <a
          href="https://moraleja.co"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors active:text-foreground/70"
        >
          <MoralejaDesignLogo className="h-10 w-auto" />
          <span className="text-xs">Moraleja Design</span>
        </a>

        <a
          href="https://kebo.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors active:text-foreground/70"
        >
          <KeboLogo className="h-10 w-auto" />
          <span className="text-xs">Kebo</span>
        </a>
      </div>
    </div>
  );
}
