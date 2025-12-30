interface Event {
  name: string;
  url?: string;
}

interface EventsSlideProps {
  irlEvents: Event[];
  onlineEvents: Event[];
}

export function EventsSlide({ irlEvents, onlineEvents }: EventsSlideProps) {
  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-center text-xl font-light text-foreground">
          Events we attended
        </h2>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          IRL and online
        </p>

        <div className="mt-8 w-full max-w-sm space-y-6">
          <div>
            <p className="mb-3 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
              In person
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {irlEvents.map((event) =>
                event.url ? (
                  <a
                    key={event.name}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs text-green-600 dark:text-green-400 transition-colors hover:bg-green-500/20"
                  >
                    {event.name}
                  </a>
                ) : (
                  <span
                    key={event.name}
                    className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs text-green-600 dark:text-green-400"
                  >
                    {event.name}
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            <p className="mb-3 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
              Online
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {onlineEvents.map((event) => (
                <span
                  key={event.name}
                  className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400"
                >
                  {event.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
