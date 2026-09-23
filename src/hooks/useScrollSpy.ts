import { useEffect, useState } from 'react';

/** Returns the id of the last section whose top has crossed the upper third of the viewport. */
export function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const update = (): void => {
      const line = window.innerHeight * 0.35;
      let current = '';
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  return active;
}
