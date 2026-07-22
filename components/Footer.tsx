export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] py-12 text-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Brand & Description */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="font-heading mb-4 text-xl font-bold tracking-tight text-white">
              SmartCarCompare
            </h3>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-white/70">
              Alegerea inteligentă pentru viitorul tău auto. Compară costurile și descoperă avantajele trecerii la o mașină nouă.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading mb-4 text-sm font-bold uppercase tracking-wider text-[#2563EB]">
              Informații Utile
            </h4>
            <ul className="space-y-3 text-sm font-medium text-white/70">
              <li>
                <a href="#" className="rounded-sm hover:text-[#F97316] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40">Despre Noi</a>
              </li>
              <li>
                <a href="#" className="rounded-sm hover:text-[#F97316] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40">Termeni și Condiții</a>
              </li>
              <li>
                <a href="#" className="rounded-sm hover:text-[#F97316] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40">Politica de Confidențialitate</a>
              </li>
              <li>
                <a href="#" className="rounded-sm hover:text-[#F97316] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40">Politica Cookie</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading mb-4 text-sm font-bold uppercase tracking-wider text-[#2563EB]">
              Contact
            </h4>
            <ul className="space-y-3 text-sm font-medium text-white/70">
              <li>
                <span className="block text-xs text-white/50 uppercase tracking-wider mb-0.5">Telefon</span>
                <a href="tel:+40700000000" className="hover:text-white transition-colors">+40 700 000 000</a>
              </li>
              <li>
                <span className="block text-xs text-white/50 uppercase tracking-wider mb-0.5">Email</span>
                <a href="mailto:contact@smartcarcompare.com" className="hover:text-white transition-colors">contact@smartcarcompare.com</a>
              </li>
              <li>
                <span className="block text-xs text-white/50 uppercase tracking-wider mb-0.5">Adresă</span>
                <span>București, România</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-white/50">
            &copy; {currentYear} SmartCarCompare. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}