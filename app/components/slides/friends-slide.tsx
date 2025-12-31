import { ACCLogo } from "@/components/logos/acc";
import { KeboLogo } from "@/components/logos/kebo";
import { MoralejaDesignLogo } from "@/components/logos/moraleja-design";
import { THCLogo } from "@/components/logos/thc";

export function FriendsSlide() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-6">
      <h2 className="mb-2 text-center text-2xl font-light text-foreground">
        Friends we made
      </h2>
      <p className="mb-10 text-center text-sm text-muted-foreground">
        Along the way
      </p>

      <div className="relative z-50 flex flex-col items-center gap-8">
        {/* Row 1: Kebo + ACC */}
        <div className="flex items-center gap-10">
          <a
            href="https://kebo.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2"
          >
            <KeboLogo className="h-10 w-auto" />
            <span className="text-xs">Kebo</span>
          </a>

          <a
            href="https://letsacc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2"
          >
            <ACCLogo className="h-10 w-auto" />
            <span className="text-xs">ACC</span>
          </a>
        </div>

        {/* Row 2: Moraleja */}
        <a
          href="https://moraleja.co"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
        >
          <MoralejaDesignLogo className="h-8 w-auto" />
          <span className="text-xs">Moraleja Design</span>
        </a>

        {/* Row 3: THC */}
        <a
          href="https://hackathon.lat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
        >
          <THCLogo className="h-5 w-auto" />
          <span className="text-xs">The Hackathon Company</span>
        </a>
      </div>
    </div>
  );
}
