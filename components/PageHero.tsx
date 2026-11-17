'use client';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  /** Small kicker above the title. */
  eyebrow?: React.ReactNode;
  /** 'start': centered on mobile, left-aligned from lg up. 'center': always centered. */
  align?: 'center' | 'start';
  /**
   * 'overlap' adds extra bottom padding so content placed after it (via a
   * negative top margin) can float up over the banner.
   */
  variant?: 'standard' | 'overlap';
}

/** Dark page-title band shared by every secondary page. */
export default function PageHero({ title, subtitle, eyebrow, align = 'center', variant = 'standard' }: PageHeroProps) {
  const isOverlap = variant === 'overlap';
  const start = align === 'start';

  return (
    <div className={`hero-surface relative w-full ${isOverlap ? 'pb-36 pt-14 lg:pb-40 lg:pt-20' : 'py-14 sm:py-20'}`}>
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
