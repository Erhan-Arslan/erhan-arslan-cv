import { Briefcase, MapPin } from 'lucide-react';
import { experience } from '../data/resume';
import { Reveal, SectionHeading } from './ui';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="experience-title"
          eyebrow="02 — Experience"
          title="Real teams, real deadlines — from AI research to public-sector support."
        />

        <ol className="relative space-y-6 md:space-y-8">
          <span
            aria-hidden
            className="absolute bottom-3 left-[7px] top-3 w-px bg-linear-to-b from-electric-500/80 via-white/10 to-transparent md:left-[9px]"
          />

          {experience.map((job, index) => (
            <li key={job.id} className="relative pl-9 md:pl-14">
              <span
                aria-hidden
                className={`absolute left-0 top-8 flex size-[15px] items-center justify-center rounded-full border md:left-0.5 md:size-[19px] ${
                  job.current ? 'border-lagoon-500 bg-ink-950' : 'border-electric-500/60 bg-ink-950'
                }`}
              >
                <span
                  className={`size-1.5 rounded-full md:size-2 ${
                    job.current ? 'bg-lagoon-500 shadow-[0_0_12px_rgb(111_163_131/0.9)]' : 'bg-electric-400'
                  }`}
                />
              </span>

              <Reveal delay={index * 90}>
                <article className="surface surface-edge p-6 sm:p-8">
                  <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-xl font-semibold leading-snug tracking-tight text-snow sm:text-2xl">{job.role}</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-haze">
                        <span className="flex items-center gap-1.5">
                          <Briefcase aria-hidden className="size-4 text-electric-400" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-xs text-dusk">
                          <MapPin aria-hidden className="size-3.5" />
                          {job.location}
                        </span>
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs ${
                        job.current
                          ? 'border-lagoon-500/35 bg-lagoon-500/10 text-lagoon-300'
                          : 'border-white/10 bg-white/[0.03] text-haze'
                      }`}
                    >
                      {job.current ? (
                        <span aria-hidden className="size-1.5 rounded-full bg-lagoon-500 shadow-[0_0_10px_rgb(111_163_131/0.9)]" />
                      ) : null}
                      {job.period}
                    </span>
                  </header>

                  <ul className="mt-6 space-y-3">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3.5 leading-relaxed text-haze">
                        <span aria-hidden className="mt-[0.72em] h-px w-3.5 shrink-0 bg-lagoon-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
