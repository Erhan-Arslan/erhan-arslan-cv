import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getProjectShots, type ProjectShot } from '../data/projectMedia';
import type { ProjectItem } from '../data/resume';
import { Chip, IconTile } from './ui';

interface ProjectDialogProps {
  project: ProjectItem;
  /** 1-based position of the project in the list. */
  position: number;
  total: number;
  previous: ProjectItem;
  next: ProjectItem;
  onClose: () => void;
  onSelect: (id: string) => void;
}

const pad = (value: number): string => String(value).padStart(2, '0');

/* ───────────── shared bits ───────────── */
interface BlockProps {
  label: string;
  action?: ReactNode;
  children: ReactNode;
}

function Block({ label, action, children }: BlockProps) {
  return (
    <section aria-label={label} className="mt-10 sm:mt-12">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-lagoon-500">
          <span aria-hidden className="size-1.5 rounded-[2px] bg-lagoon-500 shadow-[0_0_12px_rgb(111_163_131/0.8)]" />
          {label}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}

interface RailButtonProps {
  direction: 'previous' | 'next';
  disabled: boolean;
  onClick: () => void;
}

function RailButton({ direction, disabled, onClick }: RailButtonProps) {
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'previous' ? 'Scroll screenshots left' : 'Scroll screenshots right'}
      className="group relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-white/10 text-snow enabled:active:scale-90 disabled:opacity-35 [transition:transform_160ms_ease]"
    >
      <span aria-hidden className="absolute inset-0 bg-white/[0.09] opacity-0 transition-opacity duration-200 group-enabled:group-hover:opacity-100" />
      <Icon aria-hidden className="relative size-4" />
    </button>
  );
}

/* ───────────── screenshots ───────────── */
interface ScreenshotsProps {
  title: string;
  shots: ProjectShot[];
}

function Screenshots({ title, shots }: ScreenshotsProps) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState<boolean>(true);
  const [atEnd, setAtEnd] = useState<boolean>(false);

  const update = useCallback((): void => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update, shots]);

  const page = (direction: 1 | -1): void => {
    const rail = railRef.current;
    if (rail) rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Block
      label="Screenshots"
      action={
        <div className="flex items-center gap-2">
          <span className="mr-1 hidden font-mono text-xs text-dusk sm:inline">{shots.length} screens</span>
          <RailButton direction="previous" disabled={atStart} onClick={() => page(-1)} />
          <RailButton direction="next" disabled={atEnd} onClick={() => page(1)} />
        </div>
      }
    >
      <ul
        ref={railRef}
        onScroll={update}
        tabIndex={0}
        aria-label={`${title} screenshots`}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 [scrollbar-color:rgb(255_255_255/0.18)_transparent] [scrollbar-width:thin] sm:-mx-10 sm:px-10"
      >
        {shots.map((shot) => (
          <li key={shot.src} className="w-[13.5rem] shrink-0 snap-start scroll-ml-5 sm:w-[15.5rem] sm:scroll-ml-10">
            <figure>
              <div className="relative overflow-hidden rounded-[1.6rem] bg-ink-950 shadow-card">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[625/1350] w-full object-cover"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/35 via-transparent to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/15" />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-haze">{shot.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Block>
  );
}

/* ───────────── dialog ───────────── */
export default function ProjectDialog({ project, position, total, previous, next, onClose, onSelect }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const pressedOnBackdrop = useRef<boolean>(false);

  const { icon: Icon, caseStudy, metrics, challenges, libraries } = project;
  const shots = useMemo(() => getProjectShots(project.id, project.title), [project.id, project.title]);
  const steps = project.architecture;
  const columns: CSSProperties & { '--cols': number } = { '--cols': steps.length };

  // Open as a true modal (focus trap, inert page, Esc) before first paint; restore focus on unmount.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (triggerRef.current === null && document.activeElement instanceof HTMLElement) {
      triggerRef.current = document.activeElement;
    }
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    document.documentElement.classList.add('modal-open');
    return () => {
      document.documentElement.classList.remove('modal-open');
      // The modal is still in the top layer during cleanup, so wait until it is gone.
      const trigger = triggerRef.current;
      window.setTimeout(() => trigger?.focus({ preventScroll: true }), 0);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const handlePointerDown = (event: PointerEvent<HTMLDialogElement>): void => {
    pressedOnBackdrop.current = event.target === event.currentTarget;
  };
  const handleClick = (event: MouseEvent<HTMLDialogElement>): void => {
    if (event.target === event.currentTarget && pressedOnBackdrop.current) onClose();
    pressedOnBackdrop.current = false;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      className="project-dialog"
      onClose={onClose}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <div ref={scrollRef} className="h-full max-h-[inherit] overflow-y-auto overscroll-contain">
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-ink-900/85 px-5 py-3.5 backdrop-blur-xl sm:px-10">
          <p className="font-mono text-xs text-dusk">
            <span className="text-lagoon-500">{pad(position)}</span> / {pad(total)}
            <span aria-hidden> — </span>
            Project details
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="group relative inline-flex size-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 text-snow active:scale-90 [transition:transform_160ms_ease]"
          >
            <span aria-hidden className="absolute inset-0 bg-white/[0.09] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <X aria-hidden className="relative size-5" />
          </button>
        </div>

        <div className="px-5 pb-10 pt-8 sm:px-10 sm:pt-10">
          {/* ── heading ── */}
          <div className="flex items-start gap-5">
            <IconTile tone={project.featured ? 'electric' : project.status ? 'saffron' : 'lagoon'}>
              <Icon aria-hidden className="size-5" />
            </IconTile>
            <div className="min-w-0">
              <h2
                id="project-dialog-title"
                className="text-balance text-[length:clamp(2rem,6vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-snow"
              >
                {project.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip tone="electric">{project.platform}</Chip>
                {project.period ? <Chip>{project.period}</Chip> : null}
                {project.role ? <Chip tone="lagoon">{project.role}</Chip> : null}
                {project.team ? <Chip>{project.team}</Chip> : null}
                {project.status ? (
                  <Chip tone="saffron">
                    <span aria-hidden className="mr-2 size-1.5 rounded-full bg-saffron shadow-[0_0_10px_rgb(240_194_75/0.9)]" />
                    {project.status}
                  </Chip>
                ) : null}
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-snow/90 sm:text-xl">{project.summary}</p>

          {/* ── metrics ── */}
          {metrics && metrics.length > 0 ? (
            <dl
              className={`mt-8 grid gap-3 sm:gap-4 ${
                metrics.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'
              }`}
            >
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col-reverse justify-end rounded-2xl border border-white/[0.07] bg-linear-to-b from-white/[0.05] to-transparent p-4 sm:p-5"
                >
                  <dt className="mt-2 text-[0.8rem] leading-snug text-haze">{metric.label}</dt>
                  <dd className="text-gradient w-fit font-mono text-[1.65rem] font-semibold leading-none tracking-tight sm:text-3xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {/* ── problem → approach → result ── */}
          {caseStudy ? (
            <Block label="Problem → Approach → Result">
              <dl className="divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-ink-950/45">
                {(
                  [
                    ['Problem', caseStudy.problem, 'text-saffron'],
                    ['Approach', caseStudy.approach, 'text-electric-300'],
                    ['Result', caseStudy.result, 'text-lagoon-300'],
                  ] as const
                ).map(([label, text, tone]) => (
                  <div key={label} className="grid gap-2 p-5 sm:p-7 md:grid-cols-[7.5rem_1fr] md:gap-6">
                    <dt className={`font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] md:pt-1 ${tone}`}>{label}</dt>
                    <dd className="leading-relaxed text-haze">{text}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          ) : null}

          {/* ── screenshots ── */}
          {shots.length > 0 ? <Screenshots title={project.title} shots={shots} /> : null}

          {/* ── what I built ── */}
          <Block label="What I built">
            <ul className="space-y-3.5 rounded-2xl border border-white/[0.07] bg-ink-950/45 p-5 sm:p-7">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 leading-relaxed text-haze">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-lagoon-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Block>

          {/* ── how it fits together ── */}
          <Block label="How it fits together">
            <ol style={columns} className="grid gap-4 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="relative rounded-2xl border border-white/[0.07] bg-linear-to-b from-white/[0.04] to-transparent p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-electric-500/15 text-electric-300 ring-1 ring-inset ring-electric-500/25">
                        <StepIcon aria-hidden className="size-[1.1rem]" />
                      </span>
                      <span className="font-mono text-xs text-dusk">{pad(index + 1)}</span>
                    </div>
                    <h4 className="mt-4 font-semibold tracking-tight text-snow">{step.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-haze">{step.detail}</p>
                    {index < steps.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute -right-[1.15rem] top-1/2 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full bg-ink-800 text-lagoon-300 ring-1 ring-white/10 md:flex"
                      >
                        <ChevronRight className="size-3.5" />
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </Block>

          {/* ── role & challenges ── */}
          {project.roleSummary || (challenges && challenges.length > 0) ? (
            <Block label="My role & challenges">
              {project.roleSummary ? (
                <p className="max-w-3xl leading-relaxed text-snow/85">{project.roleSummary}</p>
              ) : null}

              {challenges && challenges.length > 0 ? (
                <ul className={`space-y-4 ${project.roleSummary ? 'mt-7' : ''}`}>
                  {challenges.map((item, index) => (
                    <li key={item.title} className="rounded-2xl border border-white/[0.07] bg-ink-950/45 p-5 sm:p-7">
                      <h4 className="flex items-baseline gap-3 font-semibold tracking-tight text-snow">
                        <span className="font-mono text-xs text-dusk">{pad(index + 1)}</span>
                        {item.title}
                      </h4>
                      <dl className="mt-4 grid gap-5 md:grid-cols-2 md:gap-8">
                        <div>
                          <dt className="mb-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-saffron">Challenge</dt>
                          <dd className="text-[0.95rem] leading-relaxed text-haze">{item.challenge}</dd>
                        </div>
                        <div>
                          <dt className="mb-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-lagoon-300">Solution</dt>
                          <dd className="text-[0.95rem] leading-relaxed text-snow/85">{item.solution}</dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Block>
          ) : null}

          {/* ── tech stack ── */}
          <Block label="Tech stack">
            <ul aria-label={`${project.title} technologies`} className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Chip tone="electric">{tech}</Chip>
                </li>
              ))}
              {libraries?.map((lib) => (
                <li key={lib}>
                  <Chip>{lib}</Chip>
                </li>
              ))}
            </ul>
          </Block>

          {/* ── links ── */}
          {project.links && project.links.length > 0 ? (
            <Block label="Links">
              <ul className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-electric-700 px-5 py-3 text-sm font-semibold text-white shadow-cta active:scale-[0.97] [transition:transform_200ms_ease]"
                    >
                      <span aria-hidden className="absolute inset-0 bg-linear-to-b from-white/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <span className="relative">{link.label}</span>
                      <ArrowUpRight aria-hidden className="relative size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
        </div>

        {total > 1 ? (
          <nav
            aria-label="Other projects"
            className="sticky bottom-0 z-20 grid grid-cols-2 gap-3 border-t border-white/[0.06] bg-ink-900/90 px-4 py-3 backdrop-blur-xl sm:px-10"
          >
            <button
              type="button"
              onClick={() => onSelect(previous.id)}
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 px-4 py-3 text-left active:scale-[0.98] [transition:transform_160ms_ease]"
            >
              <span aria-hidden className="absolute inset-0 bg-white/[0.06] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <ArrowLeft aria-hidden className="relative size-4 shrink-0 text-lagoon-500 group-hover:-translate-x-0.5 [transition:transform_200ms_ease]" />
              <span className="relative min-w-0">
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dusk">Previous</span>
                <span className="block truncate text-sm font-semibold text-snow">{previous.title}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => onSelect(next.id)}
              className="group relative flex items-center justify-end gap-3 overflow-hidden rounded-xl border border-white/10 px-4 py-3 text-right active:scale-[0.98] [transition:transform_160ms_ease]"
            >
              <span aria-hidden className="absolute inset-0 bg-white/[0.06] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <span className="relative min-w-0">
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dusk">Next</span>
                <span className="block truncate text-sm font-semibold text-snow">{next.title}</span>
              </span>
              <ArrowRight aria-hidden className="relative size-4 shrink-0 text-lagoon-500 group-hover:translate-x-0.5 [transition:transform_200ms_ease]" />
            </button>
          </nav>
        ) : null}
      </div>
    </dialog>
  );
}
