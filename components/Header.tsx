import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              {/* Minimalist Brand Icon (Lightning/Flash) */}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span 
              className="text-xl font-bold tracking-tight text-[#0F172A]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              SmartCar<span className="text-[#2563EB]">Compare</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-[#0F172A]/80">
          <Link href="#" className="hover:text-[#2563EB] transition-colors">
            Cum Funcționează
          </Link>
          <Link href="#" className="hover:text-[#2563EB] transition-colors">
            Avantaje
          </Link>
          <Link href="#" className="hover:text-[#2563EB] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Call to Action (CTA) */}
        <div className="flex items-center">
          <button
            type="button"
            className="rounded-xl bg-[#F97316] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#EA580C] transition-colors focus:ring-4 focus:ring-[#F97316]/20 outline-none"
          >
            Test Drive
          </button>
        </div>
        
      </div>
    </header>
  );
}