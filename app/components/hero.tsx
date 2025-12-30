"use client";

import { motion } from "motion/react";
import { CrafterStationLogo } from "@/components/logos/crafter-station";

interface HeroProps {
  name: string;
  description: string;
  avatarUrl: string;
  year: number;
}

export function Hero({ name, description, year }: HeroProps) {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute -inset-8 rounded-full bg-amber-500/10 blur-3xl" />
        <CrafterStationLogo className="relative h-28 w-28 drop-shadow-lg sm:h-32 sm:w-32" />
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-8 text-center text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
      >
        {name}
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-3 max-w-md text-center text-muted-foreground"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-12 flex flex-col items-center"
      >
        <span className="text-8xl font-extralight tracking-tighter text-foreground sm:text-9xl">
          {year}
        </span>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-px w-12 bg-border" />
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Wrapped
          </span>
          <span className="h-px w-12 bg-border" />
        </div>
      </motion.div>
    </section>
  );
}
