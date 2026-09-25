import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems, profile } from '../data/resume';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrolled } from '../hooks/useScrolled';
import { Wordmark } from './ui';

const sectionIds: readonly string[] = navItems.map((item) => item.id);

export default function Navbar() {
  const scrolled = useScrolled();
  const active = useScrollSpy(sectionIds);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onResize = (): void => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <div className="relative mx-auto max-w-6xl">
        <span
          aria-hidden
          className={`glass absolute inset-0 rounded-2xl shadow-float transition-opacity duration-300 ${
            scrolled || open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <nav aria-label="Primary" className="relative flex items-center justify-between gap-4 px-4 py-2.5 sm:px-5">
          <a
            href="#top"
            aria-label={`${profile.name} — back to top`}
            className="rounded-lg text-[1.6rem] leading-none text-snow active:scale-95"
          >
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative inline-flex rounded-full px-3.5 py-2 text-sm font-medium active:scale-95 ${
                      isActive ? 'text-snow' : 'text-haze hover:text-snow'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 rounded-full bg-white/[0.07] transition-opacity duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="group relative hidden items-center gap-1.5 overflow-hidden rounded-xl bg-electric-700 px-4 py-2 text-sm font-semibold text-white shadow-cta hover:-translate-y-px active:translate-y-0 active:scale-[0.97] sm:inline-flex [transition:transform_200ms_ease]"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-b from-white/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="relative">Email me</span>
              <ArrowUpRight aria-hidden className="relative size-4 group-hover:translate-x-px group-hover:-translate-y-px [transition:transform_200ms_ease]" />
            </a>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
              className="relative inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-snow hover:bg-white/[0.09] active:scale-90 md:hidden"
            >
              {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          inert={!open}
          className={`relative px-2 pb-2 md:hidden [transition:opacity_220ms_ease,transform_220ms_ease] ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
          } ${open ? '' : 'h-0 overflow-hidden pb-0'}`}
        >
          <ul className="flex flex-col gap-1 border-t border-white/[0.06] pt-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium active:scale-[0.98] ${
                    active === item.id ? 'bg-white/[0.07] text-snow' : 'text-haze hover:bg-white/[0.05] hover:text-snow'
                  }`}
                >
                  {item.label}
                  <ArrowUpRight aria-hidden className="size-4 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
