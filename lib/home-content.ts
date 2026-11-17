// Explanatory copy for the home page: how the estimate is built and an FAQ.
// Server-rendered, so it is part of what search engines and the AdSense
// crawler see. Keep every claim in line with what the product really does.

type Lang = 'ro' | 'en';

export const HOME_METHOD: Record<Lang, { title: string; intro: string; steps: { title: string; text: string }[] }> = {
  ro: {
    title: 'Cum calculăm estimarea',
    intro:
      'Costul real al unei mașini nu se vede în anunț. Îl construim din aceleași componente pe care le plătești pe parcursul unui an, pornind de la mașina ta concretă.',
    steps: [
      {
        title: 'Pornim de la mașina ta',
        text: 'Marca, modelul, anul, kilometrajul și combustibilul determină consumul, motorul și piesele care tind să cedeze. Localitatea, dacă o completezi, influențează cifrele pentru combustibil, asigurare și taxe.',
      },
      {
        title: 'Estimăm fiecare cost, pe an',
        text: 'Combustibil, întreținere și revizii, reparații neprevăzute, asigurare, taxe și pierderea de valoare, fiecare cu suma lui și ponderea din total, ca să vezi unde se duc banii.',
      },
      {
        title: 'Verificăm rezultatul',
        text: 'Estimarea generată cu ajutorul inteligenței artificiale trece printr-un pas de verificare care o poate corecta, iar la final primești un scor de încredere de la 1 la 10.',
      },
      {
        title: 'Adăugăm contextul pieței',
        text: 'Vezi și prețul mediu actual al mașinii, intervalul de preț și cum a evoluat valoarea ei în ultimii 5 ani, plus problemele frecvente ale motorului la kilometrajul tău.',
      },
    ],
  },
  en: {
    title: 'How we calculate the estimate',
    intro:
      'The real cost of a car isn’t in the advert. We build it from the same parts you pay for over a year, starting from your specific car.',
    steps: [
      {
        title: 'We start from your car',
        text: 'Make, model, year, mileage and fuel determine consumption, the engine and the parts that tend to fail. Your city, if you add it, affects the fuel, insurance and tax figures.',
      },
      {
        title: 'We estimate each cost, per year',
        text: 'Fuel, maintenance and servicing, unexpected repairs, insurance, taxes and depreciation, each with its amount and share of the total, so you see where the money goes.',
      },
      {
        title: 'We check the result',
        text: 'The AI-assisted estimate goes through a verification step that can correct it, and you get a confidence score from 1 to 10 at the end.',
      },
      {
        title: 'We add market context',
        text: 'You also see the car’s current average price, its price range and how its value has moved over the last 5 years, plus the engine’s common problems at your mileage.',
      },
    ],
  },
};

export const HOME_FAQ: Record<Lang, { title: string; items: { q: string; a: string; link?: { href: string; label: string } }[] }> = {
  ro: {
    title: 'Întrebări frecvente',
    items: [
      {
        q: 'Este gratuit?',
        a: 'Da. Calculatorul și comparația dintre două mașini sunt gratuite și funcționează fără cont. Un cont îți salvează calculele, ca să le poți redeschide mai târziu.',
      },
      {
        q: 'Cât de exacte sunt estimările?',
        a: 'Sunt orientative. Sunt generate automat, cu ajutorul inteligenței artificiale, pornind de la datele introduse de tine, și pot diferi de costurile tale reale. Folosește-le ca să compari variante și să îți faci un buget, nu ca ofertă fermă de la un service sau de la un asigurător.',
      },
      {
        q: 'Ce înseamnă scorul de încredere?',
        a: 'Arată, pe o scară de la 1 la 10, cât de sigură este estimarea. Un scor mic înseamnă că merită să verifici cifrele și din alte surse, de exemplu cu o ofertă de asigurare sau o verificare la service.',
      },
      {
        q: 'De ce contează localitatea și kilometrajul anual?',
        a: 'Prețul combustibilului, asigurarea și taxele locale diferă de la o localitate la alta, iar kilometrii parcurși pe an schimbă direct costul cu combustibilul și uzura. Dacă nu le completezi, folosim valori tipice.',
      },
      {
        q: 'Pot compara două mașini?',
        a: 'Da. Pe pagina Compară introduci două mașini și vezi costul anual al fiecăreia, diferența dintre ele, evoluția prețurilor pe același grafic și problemele frecvente, una lângă alta.',
      },
      {
        q: 'Îmi sunt salvate datele?',
        a: 'Calculele sunt salvate în istoric doar dacă ești autentificat. În browser păstrăm doar limba aleasă.',
        link: { href: '/privacy', label: 'Politica de confidențialitate' },
      },
    ],
  },
  en: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Is it free?',
        a: 'Yes. The calculator and the two-car comparison are free and work without an account. An account saves your calculations so you can reopen them later.',
      },
      {
        q: 'How accurate are the estimates?',
        a: 'They are indicative. They are generated automatically, with the help of artificial intelligence, from the details you enter, and may differ from your real costs. Use them to compare options and plan a budget, not as a firm quote from a garage or an insurer.',
      },
      {
        q: 'What does the confidence score mean?',
        a: 'It shows, on a scale of 1 to 10, how sure the estimate is. A low score means it is worth checking the figures against other sources, such as an insurance quote or a garage inspection.',
      },
      {
        q: 'Why do my city and yearly mileage matter?',
        a: 'Fuel prices, insurance and local taxes differ between places, and the kilometres you drive each year directly change fuel and wear costs. If you leave them blank, we use typical values.',
      },
      {
        q: 'Can I compare two cars?',
        a: 'Yes. On the Compare page you enter two cars and see each one’s yearly cost, the difference between them, their price trends on the same chart and their common problems side by side.',
      },
      {
        q: 'Is my data saved?',
        a: 'Calculations are saved to a history only when you are logged in. In the browser we keep only your chosen language.',
        link: { href: '/privacy', label: 'Privacy policy' },
      },
    ],
  },
};
