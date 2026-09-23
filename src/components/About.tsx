import { Award, GraduationCap, MapPin } from 'lucide-react';
import { education, profile } from '../data/resume';
import { IconTile, Reveal, SectionHeading } from './ui';

const HIGHLIGHT = /(React Native|React|TypeScript|Front-End, Web, and Mobile Development)/g;

function highlight(text: string) {
  return text.split(HIGHLIGHT).map((part, index) =>
    index % 2 === 1 ? (
      <span key={`${part}-${index}`} className="font-medium text-snow">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="about-title" eyebrow="01 — About me" title="A Computer Engineering graduate who builds, not just studies." />

        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal>
            <p className="text-[length:clamp(1.15rem,2.1vw,1.55rem)] leading-[1.6] tracking-[-0.01em] text-haze">
              {highlight(profile.summary)}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <article className="surface surface-edge p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <IconTile tone="electric">
                  <GraduationCap aria-hidden className="size-5" />
                </IconTile>
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-dusk">Education</p>
                  <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-snow">{education.school}</h3>
                </div>
              </div>

              <p className="mt-5 text-haze">{education.degree}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-dusk">
                <span>{education.period}</span>
                <span className="flex items-center gap-1.5">
                  <MapPin aria-hidden className="size-3.5" />
                  {education.location}
                </span>
              </div>

              <div className="mt-6 border-t border-white/[0.07] pt-5">
                <p className="flex items-start gap-2.5 rounded-xl border border-saffron/30 bg-saffron/10 px-3.5 py-3 font-mono text-[0.78rem] leading-snug text-saffron">
                  <Award aria-hidden className="mt-px size-4 shrink-0" />
                  {education.affiliation}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
