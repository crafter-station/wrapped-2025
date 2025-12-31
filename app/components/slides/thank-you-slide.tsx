interface ThankYouSlideProps {
  githubUrl: string;
  communityUrl: string;
  generatedAt: string;
}

export function ThankYouSlide({ githubUrl, communityUrl, generatedAt }: ThankYouSlideProps) {
  return (
    <div className="flex h-dvh flex-col px-6 pt-12 pb-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-4xl font-light text-foreground">Thank you</p>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          for being part of our open source journey
        </p>

        <div className="relative z-50 mt-8 flex flex-col gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-2.5 text-center text-sm text-foreground transition-colors active:bg-muted"
          >
            Follow us on GitHub
          </a>
          <a
            href={communityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-2.5 text-center text-sm text-foreground transition-colors active:bg-muted"
          >
            Join our community
          </a>
        </div>
      </div>

      <p className="text-center text-[10px] text-muted-foreground/60">
        Last updated:{" "}
        {new Date(generatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
