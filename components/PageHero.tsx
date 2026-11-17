'use client';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  /** Small kicker above the title. */
  eyebrow?: React.ReactNode;
  /** 'start': centered on mobile, left-aligned from lg up. 'center': always centered. */
  align?: 'center' | 'start';
  /**
   * 'overlap' adds extra bottom padding so a card placed after it (via
   * -mt-24) floats up over the banner. 'tuck' leaves room for only a slim
   * element (e.g. a stepper, via -mt-10) to straddle the edge, so the
   * content below it sits fully on the page background.
   */
  variant?: 'standard' | 'overlap' | 'tuck';
}

/** Dark page-title band shared by every secondary page. */
export default function PageHero({ title, subtitle, eyebrow, align = 'center', variant = 'standard' }: PageHeroProps) {
  const padding = {
    standard: 'py-14 sm:py-20',
    overlap: 'pb-36 pt-14 lg:pb-40 lg:pt-20',
    tuck: 'pb-20 pt-14 lg:pb-24 lg:pt-20',
  }[variant];
  const start = align === 'start';

  return (
    <div className={`hero-surface relative w-full ${padding}`}>
      <div
        className={`relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${start ? 'text-center lg:text-left' : 'text-center'}`}
      >
        {eyebrow && <p className="eyebrow mb-3 text-brand-on-dark">{eyebrow}</p>}
        <h1 className="text-balance font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p
          className={`mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg ${
            start ? 'lg:mx-0' : ''
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
