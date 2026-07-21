'use client';

const STEPS = ['Vehiculul tău', 'Utilizare anuală', 'Comparație costuri', 'Rezultatul tău'];

export default function CalculatorHeader() {
  return (
    <div className="relative w-full pt-16 pb-40 lg:pt-24 lg:pb-48 overflow-hidden bg-[#F8FAFC]">
      
      {/* 1. Background Image - Fully visible (removed opacity and dark background) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpg')" }} 
      />
      
      {/* 2. Subtle Top Gradient - Only behind the text to ensure it stays readable */}
      <div className="absolute top-0 left-0 right-0 h-72 z-0 bg-gradient-to-b from-black/70 to-transparent" />

      {/* 3. The Bottom Fade Only - Smoothly blends the image into the page background */}
      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 z-10 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent" />

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="text-center lg:text-left">
          <h1 
            className="text-3xl font-bold tracking-tight sm:text-5xl text-white drop-shadow-lg"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            DE LA SECOND-HAND <br className="hidden sm:block" />
            <span className="text-[#2563EB]">LA SMART CHOICE</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white mx-auto lg:mx-0 font-medium drop-shadow-md">
            Compară costul total de utilizare și descoperă cât de avantajos este
            să conduci un vehicul nou.
          </p>

          {/* Step indicator */}
          <div className="mt-10 overflow-x-auto pb-4 hide-scrollbar">
            <ol className="flex min-w-max gap-x-6 text-sm">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold shadow-sm ${
                      i === 0
                        ? 'bg-[#2563EB] text-white ring-2 ring-[#2563EB] ring-offset-2 ring-offset-black/40'
                        : 'bg-white/20 text-white border border-white/40 backdrop-blur-sm'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={i === 0 ? 'font-semibold text-white drop-shadow-md' : 'font-medium text-white/90 drop-shadow-md'}>
                    {step}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className="ml-4 h-[1px] w-8 bg-white/40 hidden sm:block" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </header>
      </div>
    </div>
  );
}