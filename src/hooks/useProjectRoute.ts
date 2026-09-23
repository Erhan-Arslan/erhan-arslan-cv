import { useCallback, useEffect, useState } from 'react';

const PARAM = 'project';

const readSlug = (): string | null => new URLSearchParams(window.location.search).get(PARAM);

const urlFor = (slug: string | null): string => {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set(PARAM, slug);
  else url.searchParams.delete(PARAM);
  return `${url.pathname}${url.search}${url.hash}`;
};

const ownsHistoryEntry = (): boolean => {
  const state: unknown = window.history.state;
  return typeof state === 'object' && state !== null && PARAM in state;
};

export interface ProjectRoute {
  /** Slug of the open project, or null when the dialog is closed. */
  slug: string | null;
  open: (slug: string) => void;
  /** Swap the open project without adding a history entry. */
  replace: (slug: string) => void;
  close: () => void;
}

/** Keeps the open project in `?project=<slug>` so it is deep-linkable and works with the back button. */
export function useProjectRoute(): ProjectRoute {
  const [slug, setSlug] = useState<string | null>(readSlug);

  useEffect(() => {
    const onPop = (): void => setSlug(readSlug());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const open = useCallback((next: string): void => {
    window.history.pushState({ [PARAM]: next }, '', urlFor(next));
    setSlug(next);
  }, []);

  const replace = useCallback((next: string): void => {
    window.history.replaceState({ [PARAM]: next }, '', urlFor(next));
    setSlug(next);
  }, []);

  const close = useCallback((): void => {
    if (ownsHistoryEntry()) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, '', urlFor(null));
    setSlug(null);
  }, []);

  return { slug, open, replace, close };
}
