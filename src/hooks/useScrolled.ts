import { useEffect, useState } from 'react';

/** True once the page has been scrolled past `offset` pixels. */
export function useScrolled(offset = 12): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const update = (): void => setScrolled(window.scrollY > offset);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [offset]);

  return scrolled;
}
