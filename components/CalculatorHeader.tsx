'use client';

const STEPS = ['Vehiculul tău', 'Utilizare anuală', 'Comparație costuri', 'Rezultatul tău'];

export default function CalculatorHeader() {
  return (
    <header className="mb-10 text-center lg:text-left">
      <h1 
        className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A]"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        DE LA SECOND-HAND LA SMART CHOICE
      </h1>
      <p className="mt-3 max-w-2xl text-base text-[#0F172A]/70 mx-auto lg:mx-0 font-medium">
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
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white text-[#0F172A]/50 border border-gray-200'
                }`}
              >
                {i + 1}
              </span>
              <span className={i === 0 ? 'font-semibold text-[#0F172A]' : 'font-medium text-[#0F172A]/50'}>
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <div className="ml-4 h-[1px] w-8 bg-gray-200 hidden sm:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}