import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { contactChannels, profile, type ContactChannel } from '../data/resume';
import { GithubGlyph, IconTile, LinkedinGlyph, Reveal, Wordmark } from './ui';

function ChannelIcon({ icon }: Pick<ContactChannel, 'icon'>) {
  if (icon === 'github') return <GithubGlyph className="size-5" />;
  if (icon === 'linkedin') return <LinkedinGlyph className="size-5" />;
  const Icon = icon;
  return <Icon aria-hidden className="size-5" />;
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative pb-10 pt-16 md:pt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="surface relative overflow-hidden p-7 shadow-float sm:p-10 lg:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-32 size-[30rem] rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgb(217 137 31 / 0.28), transparent)' }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -right-20 size-[30rem] rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgb(111 163 131 / 0.14), transparent)' }}
            />
            <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
              <div>
                <p className="flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-lagoon-500">
                  <span aria-hidden className="size-1.5 rounded-[2px] bg-lagoon-500 shadow-[0_0_12px_rgb(111_163_131/0.8)]" />
                  06 — Contact
                </p>
                <h2
                  id="contact-title"
                  className="mt-4 text-[length:clamp(2.2rem,5.4vw,3.9rem)] font-extrabold leading-[1] tracking-[-0.04em] text-snow"
                >
                  Let&rsquo;s <span className="text-gradient">connect.</span>
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-haze sm:text-lg">
                  Reach out by email or phone, or find me on LinkedIn and GitHub.
                </p>

                <a
                  href={`mailto:${profile.email}`}
                  className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-electric-700 px-6 py-3.5 text-sm font-semibold text-white shadow-cta hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] [transition:transform_200ms_ease]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-b from-white/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                  <Mail aria-hidden className="relative size-4" />
                  <span className="relative">Send an email</span>
                </a>
              </div>

              <ul className="space-y-3">
                {contactChannels.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/70 p-4 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] sm:p-5 [transition:transform_240ms_ease]"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-r from-electric-500/15 to-lagoon-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                      <span className="relative">
                        <IconTile tone="electric">
                          <ChannelIcon icon={channel.icon} />
                        </IconTile>
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-dusk">
                          {channel.label}
                        </span>
                        <span className="mt-1 block truncate text-[0.95rem] font-medium text-snow sm:text-base">
                          {channel.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="relative size-5 shrink-0 text-dusk group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lagoon-300 [transition:transform_240ms_ease]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <footer className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <Wordmark className="text-2xl text-snow" />
            <span aria-hidden className="h-4 w-px bg-white/15" />
            <p className="text-sm text-dusk">
              &copy; {new Date().getFullYear()} {profile.name}
            </p>
          </div>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 font-mono text-xs text-haze hover:text-snow active:scale-95 [transition:transform_200ms_ease]"
          >
            Back to top
            <ArrowUp aria-hidden className="size-3.5 group-hover:-translate-y-0.5 [transition:transform_200ms_ease]" />
          </a>
        </footer>
      </div>
    </section>
  );
}
