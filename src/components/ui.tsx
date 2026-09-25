import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

/* ───────────── Reveal ───────────── */
interface RevealProps {
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  const style: CSSProperties & { '--reveal-delay': string } = { '--reveal-delay': `${delay}ms` };
  return (
    <div ref={ref} data-visible={visible} style={style} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ───────────── Wordmark ───────────── */
interface WordmarkProps {
  className?: string;
}

export function Wordmark({ className = '' }: WordmarkProps) {
  return (
    <span className={`text-gradient font-extrabold uppercase tracking-[-0.01em] ${className}`} aria-hidden>
      EA
    </span>
  );
}

/* ───────────── Section heading ───────────── */
interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-lagoon-500">
        <span aria-hidden className="size-1.5 rounded-[2px] bg-lagoon-500 shadow-[0_0_12px_rgb(111_163_131/0.8)]" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-balance text-[length:clamp(2rem,4.6vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em] text-snow">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-haze md:text-lg">{description}</p> : null}
    </Reveal>
  );
}

/* ───────────── Chip ───────────── */
interface ChipProps {
  children: ReactNode;
  tone?: 'neutral' | 'electric' | 'saffron' | 'lagoon';
}

const chipTone: Record<NonNullable<ChipProps['tone']>, string> = {
  neutral: 'border-white/[0.08] bg-white/[0.03] text-fog',
  electric: 'border-electric-500/30 bg-electric-500/10 text-electric-300',
  saffron: 'border-saffron/30 bg-saffron/10 text-saffron',
  lagoon: 'border-lagoon-500/30 bg-lagoon-500/10 text-lagoon-300',
};

export function Chip({ children, tone = 'neutral' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-1 font-mono text-[0.75rem] leading-none ${chipTone[tone]}`}
    >
      {children}
    </span>
  );
}

/* ───────────── Icon tile ───────────── */
interface IconTileProps {
  children: ReactNode;
  tone?: 'electric' | 'lagoon' | 'saffron' | 'azure';
}

const tileTone: Record<NonNullable<IconTileProps['tone']>, string> = {
  electric: 'from-electric-500/35 to-electric-500/5 text-electric-300 ring-electric-500/30',
  lagoon: 'from-lagoon-500/30 to-lagoon-500/5 text-lagoon-300 ring-lagoon-500/25',
  saffron: 'from-saffron/30 to-saffron/5 text-saffron ring-saffron/25',
  azure: 'from-azure/30 to-azure/5 text-azure ring-azure/25',
};

export function IconTile({ children, tone = 'electric' }: IconTileProps) {
  return (
    <span
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ring-1 ring-inset ${tileTone[tone]}`}
    >
      {children}
    </span>
  );
}

/* ───────────── Brand glyphs (lucide dropped brand icons) ───────────── */
interface GlyphProps {
  className?: string;
}

export function GithubGlyph({ className = 'size-5' }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function LinkedinGlyph({ className = 'size-5' }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
