'use client';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  /** 'start': centered on mobile, left-aligned from lg up. 'center': always centered. */
  align?: 'center' | 'start';
  /**
   * 'overlap' adds extra bottom padding so content placed after it (via a
   * negative top margin) can float up over the banner — used on the pages
   * with card grids.
   */
  variant?: 'standard' | 'overlap';
}

export default function PageHero({ title, subtitle, align = 'center', variant = 'standard' }: PageHeroProps) {
  const isOverlap = variant === 'overlap';

  return (
    <div
      className={`relative w-full bg-[#0F172A] ${
        isOverlap ? 'overflow-hidden pt-16 pb-40 lg:pt-24 lg:pb-48' : 'py-16 sm:py-20'
      }`}
    >
      <div
        className={`relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${
          align === 'start' ? 'text-center lg:text-left' : 'text-center'
        }`}
      >
        <h1
          className={`font-heading font-bold tracking-tight text-white ${
            isOverlap ? 'text-3xl sm:text-5xl' : 'text-3xl sm:text-4xl'
          }`}
        >
          {title}
        </h1>
        <p
          className={`mx-auto mt-4 max-w-2xl text-base font-medium text-white/70 sm:text-lg ${
            align === 'start' ? 'lg:mx-0' : ''
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
