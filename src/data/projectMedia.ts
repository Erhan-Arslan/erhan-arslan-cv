export interface ProjectShot {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Screenshots are picked up automatically: drop image files into
 * `src/assets/projects/<project-id>/` (e.g. `pisp/01-vault-unlock.png`).
 * Files are sorted by name; the name (minus number prefix and extension) becomes the alt text.
 */
const files = import.meta.glob<string>('../assets/projects/*/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const humanize = (path: string): string => {
  const base = path.split('/').pop() ?? '';
  const words = base
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_.\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

export function getProjectShots(projectId: string, projectTitle: string): ProjectShot[] {
  return Object.entries(files)
    .filter(([path]) => path.split('/').at(-2) === projectId)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => {
      const caption = humanize(path) || 'Screenshot';
      return { src, alt: `${projectTitle} — ${caption}`, caption };
    });
}
