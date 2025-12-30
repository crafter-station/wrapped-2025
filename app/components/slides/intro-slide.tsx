"use client";

import { motion } from "motion/react";
import { CrafterStationLogo } from "@/components/logos/crafter-station";

interface IntroSlideProps {
  name: string;
  description: string;
  avatarUrl: string;
  year: number;
}

export function IntroSlide({ name, description, year }: IntroSlideProps) {
  return (
    <div className="relative flex h-dvh flex-col px-6 pt-12 pb-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-full bg-amber-500/10 blur-2xl" />
          <CrafterStationLogo className="relative h-24 w-24 drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 text-center text-2xl font-medium tracking-tight text-foreground"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2 max-w-xs text-center text-sm text-muted-foreground"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-col items-center"
        >
          <span className="text-8xl font-extralight tracking-tighter text-foreground">
            {year}
          </span>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-px w-8 bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Wrapped
            </span>
            <span className="h-px w-8 bg-border" />
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center text-xs text-muted-foreground/50"
      >
        Tap to continue
      </motion.p>
    </div>
  );
}
