import { useRef } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { projects, type ProjectItem } from '../data/resume';
import { useProjectRoute } from '../hooks/useProjectRoute';
import ProjectDialog from './ProjectDialog';
import { Chip, IconTile, Reveal, SectionHeading } from './ui';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpen: (id: string) => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { icon: Icon, featured = false } = project;
  const inDevelopment = project.status !== undefined;
  const ctaRef = useRef<HTMLButtonElement>(null);

  const header = (
    <header className="relative flex items-start justify-between gap-4">
      <IconTile tone={featured ? 'electric' : inDevelopment ? 'saffron' : 'lagoon'}>
        <Icon aria-hidden className="size-5" />
      </IconTile>
      {inDevelopment ? (
        <Chip tone="saffron">
          <span aria-hidden className="mr-2 size-1.5 rounded-full bg-saffron shadow-[0_0_10px_rgb(254_203_110/0.9)]" />
          {project.status}
        </Chip>
      ) : (
        <span className="font-mono text-xs text-dusk">{project.period ?? project.platform}</span>
      )}
    </header>
  );

  const title = (
    <>
      <h3
        className={`relative mt-6 font-bold leading-tight tracking-[-0.03em] text-snow ${
          featured ? 'text-3xl sm:text-5xl' : 'text-xl sm:text-2xl'
        }`}
      >
        {project.title}
      </h3>
      <p className={`relative mt-3 leading-relaxed text-snow/85 ${featured ? 'max-w-md text-lg' : ''}`}>{project.summary}</p>
    </>
  );

  const bullets = (
    <ul
      className={`relative space-y-3.5 ${
        featured ? 'rounded-2xl border border-white/[0.07] bg-ink-950/45 p-6 sm:p-7' : 'mt-6'
      }`}
    >
      {project.bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3 text-[0.95rem] leading-relaxed text-haze">
          <Check aria-hidden className="mt-1 size-4 shrink-0 text-lagoon-500" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );

  const stack = (
    <ul aria-label={`${project.title} technologies`} className={`relative flex flex-wrap gap-2 ${featured ? 'mt-8' : 'mt-auto pt-8'}`}>
      {project.stack.map((tech) => (
        <li key={tech}>
          <Chip tone={featured ? 'electric' : 'neutral'}>{tech}</Chip>
        </li>
      ))}
    </ul>
  );

  const cta = (
    <button
      ref={ctaRef}
      type="button"
      aria-haspopup="dialog"
      onClick={() => onOpen(project.id)}
      className="relative mt-7 inline-flex w-fit items-center gap-2 overflow-hidden rounded-xl border border-lagoon-500/50 px-4 py-2.5 text-sm font-semibold text-lagoon-300 group-active/card:scale-[0.97] [transition:transform_200ms_ease]"
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-lagoon-500/12 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-within/card:opacity-100"
      />
      <span className="relative">
        View details<span className="sr-only"> of {project.title}</span>
      </span>
      <ArrowUpRight
        aria-hidden
        className="relative size-4 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 [transition:transform_200ms_ease]"
      />
    </button>
  );

  return (
    <Reveal delay={index * 100} className={featured ? 'lg:col-span-2' : ''}>
      <article
        className={`surface surface-edge group/card flex h-full flex-col overflow-hidden p-6 hover:-translate-y-1 sm:p-8 [transition:transform_320ms_cubic-bezier(0.22,1,0.36,1)] ${
          featured ? 'lg:p-12' : ''
        }`}
      >
        {/* whole-card click target; the button below is the keyboard/screen-reader entry point */}
        <span
          aria-hidden
          onClick={() => {
            ctaRef.current?.focus({ preventScroll: true }); // so focus returns here when the dialog closes
            onOpen(project.id);
          }}
          className="absolute inset-0 z-10 cursor-pointer"
        />

        {featured ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-28 -top-28 size-[26rem] rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgb(108 91 232 / 0.3), transparent)' }}
            />
            <svg
              aria-hidden
              viewBox="0 0 200 200"
              className="pointer-events-none absolute -right-12 -top-12 size-72 text-electric-400/25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="100" cy="100" r="96" />
              <circle cx="100" cy="100" r="72" />
              <circle cx="100" cy="100" r="48" />
              <circle cx="100" cy="100" r="24" />
              <path d="M100 4v192M4 100h192" strokeDasharray="2 6" />
            </svg>

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
              <div>
                {header}
                {title}
                {stack}
                {cta}
              </div>
              {bullets}
            </div>
          </>
        ) : (
          <>
            {header}
            {title}
            {bullets}
            {stack}
            {cta}
          </>
        )}
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const route = useProjectRoute();
  const activeIndex = projects.findIndex((project) => project.id === route.slug);
  const active: ProjectItem | null = activeIndex >= 0 ? projects[activeIndex] : null;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="projects-title"
          eyebrow="03 — Projects"
          title="From encrypted vaults to e-commerce storefronts — with a life-saving app in between."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={route.open} />
          ))}
        </div>
      </div>

      {active ? (
        <ProjectDialog
          project={active}
          position={activeIndex + 1}
          total={projects.length}
          previous={projects[(activeIndex - 1 + projects.length) % projects.length]}
          next={projects[(activeIndex + 1) % projects.length]}
          onClose={route.close}
          onSelect={route.replace}
        />
      ) : null}
    </section>
  );
}
