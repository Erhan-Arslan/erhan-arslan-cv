import { ArrowDownRight, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import portrait720 from '../assets/portrait-720.webp';
import portrait1080 from '../assets/portrait-1080.webp';
import { certificates, experience, profile, projects } from '../data/resume';

const intro: string = `${profile.summary.split('. ')[0]}.`;
import { GithubGlyph, LinkedinGlyph, Reveal } from './ui';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: String(experience.length).padStart(2, '0'), label: 'Internships' },
  { value: String(projects.length).padStart(2, '0'), label: 'Projects' },
  { value: String(certificates.length).padStart(2, '0'), label: 'Certificates' },
  { value: '2026', label: 'B.Sc. Computer Eng.' },
];

interface FloatingChipProps {
  label: string;
  className: string;
  delay: string;
}

function FloatingChip({ label, className, delay }: FloatingChipProps) {
  return (
    <div
      className={`glass animate-float absolute flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs text-snow shadow-float will-change-transform ${className}`}
      style={{ animationDelay: delay }}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-lagoon-500 shadow-[0_0_10px_rgb(5_206_201/0.9)]" />
      {label}
    </div>
  );
}

const btnBase =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] [transition:transform_200ms_ease]';

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip pb-20 pt-32 sm:pt-36 lg:pb-16 lg:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        {/* ── copy ── */}
        <div>
          <Reveal>
            <p className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 font-mono text-xs text-haze">
              <span aria-hidden className="size-1.5 rounded-[2px] bg-lagoon-500 shadow-[0_0_10px_rgb(5_206_201/0.8)]" />
              Computer Engineering Graduate <span className="text-dusk">·</span> <span className="text-snow">Istanbul Kultur University</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-7 text-[length:clamp(3.4rem,10.5vw,7.4rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-snow"
            >
              Erhan
              <br />
              <span className="text-gradient">Arslan</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-lagoon-300 sm:text-base">
              <span aria-hidden className="text-electric-400">
                {'>'}
              </span>
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-base leading-[1.75] text-haze sm:text-lg">{intro}</p>
          </Reveal>

          <Reveal delay={320} className="mt-9 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className={`${btnBase} bg-electric-500 text-white shadow-cta`}>
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-b from-white/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
              <Mail aria-hidden className="relative size-4" />
              <span className="relative">Get in touch</span>
            </a>

            <a href="#projects" className={`${btnBase} border border-lagoon-500/55 text-lagoon-300`}>
              <span
                aria-hidden
                className="absolute inset-0 bg-lagoon-500/12 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="relative">View projects</span>
              <ArrowDownRight aria-hidden className="relative size-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 [transition:transform_200ms_ease]" />
            </a>

            <span aria-hidden className="mx-1 hidden h-8 w-px bg-white/10 sm:block" />

            <a
              href={profile.github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="group relative inline-flex size-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-fog hover:-translate-y-0.5 hover:text-white active:translate-y-0 active:scale-95 [transition:transform_200ms_ease]"
            >
              <span aria-hidden className="absolute inset-0 bg-white/[0.08] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <GithubGlyph className="relative size-5" />
            </a>
            <a
              href={profile.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="group relative inline-flex size-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-fog hover:-translate-y-0.5 hover:text-white active:translate-y-0 active:scale-95 [transition:transform_200ms_ease]"
            >
              <span aria-hidden className="absolute inset-0 bg-white/[0.08] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <LinkedinGlyph className="relative size-5" />
            </a>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-dusk">{stat.label}</dt>
                  <dd className="font-mono text-2xl font-semibold tracking-tight text-snow">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ── portrait ── */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-[24rem] lg:max-w-none">
          <div aria-hidden className="absolute -inset-4 rotate-[4deg] rounded-[2.5rem] bg-linear-to-br from-electric-500/45 via-electric-500/5 to-lagoon-500/30 blur-2xl" />
          <div aria-hidden className="absolute -inset-px rotate-[-3deg] rounded-[2.1rem] border border-white/10 bg-white/[0.02]" />

          <figure className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-ink-900 shadow-float">
            <img
              src={portrait720}
              srcSet={`${portrait720} 720w, ${portrait1080} 1080w`}
              sizes="(min-width: 1024px) 420px, 90vw"
              alt="Portrait of Erhan Arslan"
              width={720}
              height={960}
              fetchPriority="high"
              className="size-full object-cover object-[50%_28%]"
            />
            <div aria-hidden className="absolute inset-0 bg-electric-500/[0.16] mix-blend-soft-light" />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
            <div aria-hidden className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />

            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">{profile.name}</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-fog/80">
                  <MapPin aria-hidden className="size-3.5 text-lagoon-500" />
                  {profile.location}
                </p>
              </div>
              <span aria-hidden className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/20 backdrop-blur-md">
                <ArrowUpRight className="size-4" />
              </span>
            </figcaption>
          </figure>

          <FloatingChip label="TypeScript" className="-right-1 top-10 sm:-right-6" delay="0s" />
          <FloatingChip label="React Native" className="-left-1 top-[42%] sm:-left-8" delay="-2.4s" />
          <FloatingChip label="RAG · Foundry Local" className="-right-1 bottom-28 sm:-right-8" delay="-4.6s" />
        </Reveal>
      </div>
    </section>
  );
}
