/** Fixed, non-interactive atmosphere: layered radial gradients, drifting glows, grid and film grain. */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-aurora absolute inset-0" />

      <div
        className="animate-drift absolute -right-[12%] top-[-14%] size-[46rem] rounded-full opacity-70 will-change-transform"
        style={{ background: 'radial-gradient(closest-side, rgb(108 91 232 / 0.30), transparent)' }}
      />
      <div
        className="animate-drift absolute -left-[14%] top-[38%] size-[40rem] rounded-full opacity-60 will-change-transform [animation-delay:-9s] [animation-direction:alternate-reverse]"
        style={{ background: 'radial-gradient(closest-side, rgb(5 206 201 / 0.13), transparent)' }}
      />
      <div
        className="animate-drift absolute bottom-[-18%] right-[8%] size-[38rem] rounded-full opacity-70 will-change-transform [animation-delay:-14s]"
        style={{ background: 'radial-gradient(closest-side, rgb(8 29 77 / 0.95), transparent)' }}
      />

      <div className="bg-grid absolute inset-x-0 top-0 h-[70rem]" />
      <div className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
