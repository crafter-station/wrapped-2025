import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeroProps {
  name: string;
  description: string;
  avatarUrl: string;
  year: number;
}

export function Hero({ name, description, avatarUrl, year }: HeroProps) {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/40 via-background to-background" />
      
      <Avatar className="h-20 w-20 border-2 border-border sm:h-24 sm:w-24">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="text-2xl">CS</AvatarFallback>
      </Avatar>

      <h1 className="mt-6 text-center text-4xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl">
        {name}
      </h1>

      <p className="mt-3 max-w-md text-center text-muted-foreground">
        {description}
      </p>

      <div className="mt-8 flex items-center gap-2">
        <span className="text-7xl font-extralight tracking-tighter text-foreground sm:text-8xl md:text-9xl">
          {year}
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
          Wrapped
        </span>
      </div>
    </section>
  );
}

