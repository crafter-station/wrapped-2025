# AGENTS.md - AI Coding Agent Guidelines

This document provides guidelines for AI coding agents working in the wrapped-2025 codebase.

## Project Overview

A Next.js 16 application displaying GitHub organization statistics in a "Spotify Wrapped" style presentation. Built with React 19, Tailwind CSS v4, and TypeScript.

## Build/Lint/Test Commands

```bash
# Development
bun run dev          # Start Next.js dev server (localhost:3000)
npm run dev          # Alternative with npm

# Build
bun run build        # Production build
npm run build

# Linting
bun run lint         # Run ESLint
npm run lint

# Data Scripts (Bun required)
bun run fetch-stats      # Fetch GitHub org stats via gh CLI
bun run fetch-vercel     # Fetch Vercel deployment stats
bun run generate-assets  # Generate image assets

# No test framework configured
# No single test run command available
```

### Prerequisites

- Node.js 20+
- Bun runtime (for scripts)
- GitHub CLI (`gh`) authenticated for fetch-stats script
- VERCEL_TOKEN env var for fetch-vercel script

## Project Structure

```
app/                    # Next.js App Router
  components/           # App-specific components
    slides/             # Slide components with barrel export (index.ts)
  globals.css           # Global styles, Tailwind theme
  layout.tsx            # Root layout
  page.tsx              # Main entry point
components/
  logos/                # Logo SVG components
  ui/                   # shadcn/ui components
data/                   # Static JSON data files
lib/
  types.ts              # TypeScript interfaces
  utils.ts              # Utility functions (cn)
scripts/                # Bun scripts for data fetching
```

## Code Style Guidelines

### Imports

Order imports as follows:
1. Node built-ins (`child_process`, `fs`)
2. External packages (`react`, `next`, `motion/react`)
3. Internal modules using `@/` path alias
4. Relative imports (avoid when `@/` can be used)

```typescript
// Type imports use the `type` keyword
import type { OrganizationStats } from "@/lib/types";

// Named imports
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
```

### TypeScript

- **Strict mode enabled** - all code must pass strict type checking
- **Interfaces preferred** over type aliases for object shapes
- **Explicit typing** on complex function parameters and return types
- **Union types** for nullable values: `string | null`
- **Generic functions** with explicit type parameters when needed

```typescript
// Interface definition pattern
export interface Repository {
  name: string;
  description: string | null;
  stargazerCount: number;
  primaryLanguage: { name: string } | null;
}

// Generic function pattern
function ghJson<T>(args: string[]): T | null {
  // ...
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `StatCard`, `IntroSlide` |
| Component files | kebab-case | `stat-card.tsx`, `intro-slide.tsx` |
| Interfaces | PascalCase | `StatCardProps`, `OrganizationStats` |
| Variables/functions | camelCase | `totalStars`, `fetchStats` |
| Constants | SCREAMING_SNAKE_CASE | `YEAR`, `ORG_NAME` |

### Component Patterns

```typescript
"use client"; // Only when client-side features needed

import { cn } from "@/lib/utils";

// Props interface defined before component
interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  className?: string;
}

// Named export, function declaration
export function StatCard({ label, value, suffix, className }: StatCardProps) {
  return (
    <div className={cn("base-classes", className)}>
      {/* ... */}
    </div>
  );
}
```

Key patterns:
- `"use client"` directive at top for client components
- Props interface defined inline before component
- Named exports (not default exports)
- Barrel exports via `index.ts` for grouped components
- `cn()` utility for className merging

### Formatting

- **2-space indentation**
- **Double quotes** for strings
- **Semicolons** required
- **Trailing commas** in multi-line arrays/objects
- No Prettier config - uses ESLint + editor defaults

### Error Handling

```typescript
// Try-catch with null return for recoverable errors
try {
  return JSON.parse(result) as T;
} catch {
  return null;
}

// Guard clauses with early exit for critical errors
if (!VERCEL_TOKEN) {
  console.error("VERCEL_TOKEN environment variable is required");
  process.exit(1);
}

// Promise catch handlers
fetchStats()
  .then((stats) => { /* ... */ })
  .catch((error) => {
    console.error("Failed to fetch stats:", error);
    process.exit(1);
  });
```

### Styling (Tailwind CSS v4)

- CSS custom properties for theming in `globals.css`
- OKLCH color space for colors
- Dark mode via `.dark` class on html element
- Use `cn()` for conditional classes: `cn("base", conditional && "extra", className)`
- Responsive prefixes: `sm:`, `md:`, `lg:`

### Animation (Motion/Framer Motion)

```typescript
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.5 }}
>
```

## Dependencies

### Key Packages
- `next` 16.1.1 - App Router, Server Components
- `react` 19.2.3 - Latest React
- `tailwindcss` v4 - Utility-first CSS
- `motion` - Animations (Framer Motion)
- `@radix-ui/*` - Accessible primitives
- `lucide-react` - Icons
- `class-variance-authority` - Component variants

### shadcn/ui Configuration
- Style: `new-york`
- Base color: `neutral`
- CSS variables enabled
- RSC (React Server Components) support enabled

## Common Tasks

### Adding a new slide component

1. Create `app/components/slides/my-slide.tsx`
2. Export from `app/components/slides/index.ts`
3. Add to slide sequence in `app/page.tsx`

### Adding a new UI component

Use shadcn/ui CLI or create in `components/ui/`:
```bash
npx shadcn@latest add button
```

### Updating GitHub stats

```bash
bun run fetch-stats
# Outputs to data/stats.json
```
