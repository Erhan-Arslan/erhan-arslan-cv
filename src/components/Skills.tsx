import { skillGroups, type SkillGroup } from '../data/resume';
import { Chip, IconTile, Reveal, SectionHeading } from './ui';

type Tone = 'electric' | 'lagoon' | 'azure' | 'saffron';

const groupTone: Record<string, Tone> = {
  frontend: 'electric',
  mobile: 'lagoon',
  ai: 'azure',
  tools: 'electric',
  languages: 'saffron',
};

const groupSpan: Record<string, string> = {
  frontend: 'lg:col-span-3',
  mobile: 'lg:col-span-3',
  ai: 'lg:col-span-2',
  tools: 'lg:col-span-2',
  languages: 'lg:col-span-2',
};

interface SkillCardProps {
  group: SkillGroup;
  index: number;
}

function SkillCard({ group, index }: SkillCardProps) {
  const { icon: Icon } = group;
  const tone: Tone = groupTone[group.id] ?? 'electric';

  return (
    <Reveal delay={index * 80} className={groupSpan[group.id] ?? 'lg:col-span-2'}>
      <article className="surface surface-edge h-full p-6 sm:p-7">
        <header className="flex items-center gap-4">
          <IconTile tone={tone}>
            <Icon aria-hidden className="size-5" />
          </IconTile>
          <h3 className="text-lg font-semibold tracking-tight text-snow">{group.label}</h3>
        </header>

        <ul className="mt-6 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li key={item}>
              <Chip tone={group.id === 'languages' ? 'saffron' : 'neutral'}>{item}</Chip>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="skills-title" eyebrow="04 — Technical skills" title="The stack that makes it all work." />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
