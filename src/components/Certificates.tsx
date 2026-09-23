import { Award } from 'lucide-react';
import { certificates } from '../data/resume';
import { IconTile, Reveal, SectionHeading } from './ui';

export default function Certificates() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="certificates-title" eyebrow="05 — Courses & certificates" title="Still learning, always." />

        <ul className="grid gap-6 md:grid-cols-3">
          {certificates.map((cert, index) => (
            <li key={cert.id}>
              <Reveal delay={index * 90} className="h-full">
                <article className="surface surface-edge flex h-full flex-col p-6 hover:-translate-y-1 sm:p-7 [transition:transform_320ms_cubic-bezier(0.22,1,0.36,1)]">
                  <div className="flex items-start justify-between gap-4">
                    <IconTile tone="saffron">
                      <Award aria-hidden className="size-5" />
                    </IconTile>
                    <time className="font-mono text-xs text-dusk">{cert.date}</time>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-snow">{cert.title}</h3>
                  <p className="mt-2 text-haze">{cert.issuer}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
