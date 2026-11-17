// Articles about the real cost of owning a car. Static content, rendered on
// the server (Romanian first - the language search engines see) with an
// English version the language toggle can switch to.
//
// Figures are deliberately given as rounded, clearly-labelled ranges with
// their assumptions stated: fuel prices, insurance and local taxes change
// often, so articles explain how costs add up rather than quote rates.

export type ArticleLang = 'ro' | 'en';

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][]; note?: string }
  | { type: 'cta'; target: 'calculator' | 'compare' };

export interface ArticleContent {
  title: string;
  description: string;
  blocks: ArticleBlock[];
}

export type ArticleCategory = 'costs' | 'fuel' | 'value' | 'buying';

export interface Article {
  slug: string;
  category: ArticleCategory;
  /** ISO dates (YYYY-MM-DD). */
  published: string;
  updated: string;
  content: Record<ArticleLang, ArticleContent>;
}

export const CATEGORY_LABELS: Record<ArticleCategory, Record<ArticleLang, string>> = {
  costs: { ro: 'Costuri', en: 'Costs' },
  fuel: { ro: 'Motorizări', en: 'Powertrains' },
  value: { ro: 'Valoare', en: 'Value' },
  buying: { ro: 'Cumpărare', en: 'Buying' },
};

export const ARTICLES: Article[] = [
  {
    slug: 'cat-costa-o-masina-pe-an-in-romania',
    category: 'costs',
    published: '2026-11-17',
    updated: '2026-11-17',
    content: {
      ro: {
        title: 'Cât costă de fapt o mașină pe an în România',
        description:
          'Combustibil, RCA, CASCO, impozit, ITP, revizii și pierderea de valoare: toate costurile unei mașini, explicate, cu un exemplu de calcul pentru o mașină de familie.',
        blocks: [
          {
            type: 'p',
            text: 'Prețul de cumpărare e doar începutul. Cei mai mulți șoferi subestimează cât îi costă mașina în fiecare an, pentru că cheltuielile vin separat: plinul săptămânal, asigurarea o dată pe an, revizia când se aprinde un martor. Adunate, ele spun cu totul altă poveste.',
          },
          { type: 'h2', text: 'Cele 7 categorii de costuri' },
          {
            type: 'ul',
            items: [
              'Combustibil sau energie: de obicei cea mai mare cheltuială lunară. Depinde de consum, de kilometrii parcurși și de cât conduci prin oraș.',
              'Asigurarea RCA: obligatorie. Prețul variază mult în funcție de clasa bonus-malus, vârsta șoferului, județ și puterea motorului.',
              'CASCO: opțională, dar des întâlnită la mașinile mai noi sau cumpărate în leasing. Costă de regulă câteva procente din valoarea mașinii pe an.',
              'Impozitul auto: plătit anual la primărie. Depinde în principal de capacitatea cilindrică și, după noile reguli fiscale, și de norma de poluare a mașinii.',
              'Rovinieta și ITP-ul: sume mici, dar recurente. ITP-ul se face în general o dată la doi ani, iar pentru mașinile mai vechi de 12 ani, anual.',
              'Întreținere și reparații: revizii, anvelope, frâne, plus reparațiile neprevăzute, care cresc odată cu kilometrajul.',
              'Pierderea de valoare: nu o plătești lunar din buzunar, dar o simți când vinzi. La mașinile mai noi este adesea cel mai mare cost dintre toate.',
            ],
          },
          { type: 'h2', text: 'Un exemplu de calcul' },
          {
            type: 'p',
            text: 'Să luăm o mașină compactă diesel din 2016, cu 150.000 km la bord, condusă 15.000 km pe an, jumătate în oraș. Cifrele sunt orientative și arată doar cum se adună costurile.',
          },
          {
            type: 'table',
            head: ['Categorie', 'Cost anual orientativ'],
            rows: [
              ['Combustibil (6 l/100 km, ~7,5 lei/l)', '~6.750 lei'],
              ['Asigurare RCA', '800 – 1.500 lei'],
              ['Impozit, rovinietă, ITP', '300 – 700 lei'],
              ['Revizii și consumabile', '1.500 – 2.500 lei'],
              ['Reparații neprevăzute', '1.500 – 4.000 lei'],
              ['Pierdere de valoare', '3.000 – 5.000 lei'],
              ['Total', '~14.000 – 20.500 lei / an'],
            ],
            note: 'Valori rotunjite, cu titlu de exemplu. Costul tău real depinde de model, oraș și stilul de condus.',
          },
          {
            type: 'p',
            text: 'Asta înseamnă între aproximativ 1.150 și 1.700 de lei pe lună, de două-trei ori mai mult decât plinul pe care îl vezi la pompă.',
          },
          { type: 'h2', text: 'Cum îți afli costul real' },
          {
            type: 'p',
            text: 'Cifrele exacte depind de modelul tău, de motor, de oraș și de cum conduci. Calculatorul SmartCarCompare pornește de la marcă, model, an, kilometraj și tipul de combustibil și îți arată costul anual estimat pe fiecare categorie, problemele frecvente ale motorului și valoarea de piață.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
      en: {
        title: 'How much does a car really cost per year in Romania',
        description:
          'Fuel, liability insurance, comprehensive cover, road tax, inspections, servicing and depreciation: every cost of running a car, explained with a worked example for a family car.',
        blocks: [
          {
            type: 'p',
            text: 'The purchase price is only the beginning. Most drivers underestimate what their car costs them each year because the bills arrive separately: the weekly fill-up, insurance once a year, a service when a warning light comes on. Added together, they tell a very different story.',
          },
          { type: 'h2', text: 'The 7 cost categories' },
          {
            type: 'ul',
            items: [
              'Fuel or energy: usually the biggest monthly expense. It depends on consumption, distance driven and how much of it is in town.',
              'Liability insurance (RCA): mandatory. The price varies widely with your bonus-malus class, age, county and engine power.',
              'Comprehensive cover (CASCO): optional, but common on newer or leased cars. It usually costs a few percent of the car’s value per year.',
              'Road tax: paid yearly to the local council. It depends mainly on engine size and, under the new tax rules, also on the car’s emissions standard.',
              'Road vignette and technical inspection (ITP): small but recurring. The inspection is generally due every two years, and every year for cars older than 12.',
              'Maintenance and repairs: servicing, tyres, brakes, plus unexpected repairs, which grow with mileage.',
              'Depreciation: you don’t pay it monthly, but you feel it when you sell. On newer cars it is often the biggest cost of all.',
            ],
          },
          { type: 'h2', text: 'A worked example' },
          {
            type: 'p',
            text: 'Take a 2016 compact diesel with 150,000 km on the clock, driven 15,000 km a year, half of it in town. The figures are indicative and only show how the costs add up.',
          },
          {
            type: 'table',
            head: ['Category', 'Indicative yearly cost'],
            rows: [
              ['Fuel (6 l/100 km, ~7.5 lei/l)', '~6,750 lei'],
              ['Liability insurance (RCA)', '800 – 1,500 lei'],
              ['Road tax, vignette, inspection', '300 – 700 lei'],
              ['Servicing and consumables', '1,500 – 2,500 lei'],
              ['Unexpected repairs', '1,500 – 4,000 lei'],
              ['Depreciation', '3,000 – 5,000 lei'],
              ['Total', '~14,000 – 20,500 lei / year'],
            ],
            note: 'Rounded example figures. Your real cost depends on the model, your city and how you drive.',
          },
          {
            type: 'p',
            text: 'That is roughly 1,150 to 1,700 lei a month, two to three times what you see at the pump.',
          },
          { type: 'h2', text: 'How to find your real cost' },
          {
            type: 'p',
            text: 'The exact figures depend on your model, engine, city and driving. The SmartCarCompare calculator starts from make, model, year, mileage and fuel type and shows your estimated yearly cost per category, the engine’s common problems and its market value.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
    },
  },
  {
    slug: 'diesel-benzina-hibrid-sau-electric-ce-e-mai-ieftin',
    category: 'fuel',
    published: '2026-11-17',
    updated: '2026-11-17',
    content: {
      ro: {
        title: 'Diesel, benzină, hibrid sau electric: ce e mai ieftin de întreținut?',
        description:
          'Comparăm costul la 100 km și costurile ascunse ale fiecărui tip de motorizare, ca să alegi în funcție de cât și cum conduci.',
        blocks: [
          {
            type: 'p',
            text: 'Nu există un răspuns valabil pentru toată lumea. Motorizarea cea mai ieftină depinde mai ales de doi factori: câți kilometri faci pe an și cât din ei sunt în oraș.',
          },
          { type: 'h2', text: 'Costul la 100 km' },
          {
            type: 'p',
            text: 'Calculul de bază e simplu: consumul înmulțit cu prețul pe litru sau pe kWh. Cu prețuri orientative, pentru o mașină compactă:',
          },
          {
            type: 'table',
            head: ['Motorizare', 'Consum tipic', 'Cost la 100 km'],
            rows: [
              ['Benzină', '7 l', '~52 lei'],
              ['Diesel', '5,5 l', '~42 lei'],
              ['Hibrid (benzină)', '5 l', '~37 lei'],
              ['Electric, încărcat acasă', '16 kWh', '~22 lei'],
              ['Electric, încărcare rapidă publică', '16 kWh', '~35 – 45 lei'],
            ],
            note: 'Prețurile la energie se schimbă des; contează ordinul de mărime, nu cifra exactă.',
          },
          { type: 'h2', text: 'Ce nu se vede la pompă' },
          {
            type: 'ul',
            items: [
              'Diesel: economic la drum lung, dar sensibil la drumurile scurte prin oraș. Filtrul de particule (DPF) și supapa EGR se pot înfunda, iar reparațiile costă adesea mii de lei.',
              'Benzină: consum mai mare, dar mecanică de obicei mai simplă și reparații mai ieftine, mai ales la motoarele fără turbo.',
              'Hibrid: excelent în oraș, unde recuperează energie la frânare. Pe autostradă avantajul scade. Bateria are de regulă o garanție lungă, dar merită verificată la mașinile second-hand.',
              'Electric: cel mai mic cost pe kilometru dacă încarci acasă și întreținere redusă, fără schimburi de ulei. În schimb, prețul de achiziție e mai mare, iar valoarea poate scădea mai repede.',
            ],
          },
          { type: 'h2', text: 'O regulă simplă' },
          {
            type: 'ul',
            items: [
              'Sub 10.000 km pe an, mai ales în oraș: benzina sau hibridul sunt de obicei alegerea sigură.',
              'Peste 20.000 km pe an, cu mult drum lung: dieselul își are încă locul.',
              'Ai unde încărca acasă: electricul devine greu de bătut la costul pe kilometru.',
            ],
          },
          {
            type: 'p',
            text: 'Pentru o decizie concretă, compară două mașini reale cap la cap. Pagina de comparație îți arată costul anual al fiecăreia și diferența dintre ele.',
          },
          { type: 'cta', target: 'compare' },
        ],
      },
      en: {
        title: 'Diesel, petrol, hybrid or electric: which is cheapest to run?',
        description:
          'We compare the cost per 100 km and the hidden costs of each powertrain, so you can choose based on how far and how you drive.',
        blocks: [
          {
            type: 'p',
            text: 'There is no answer that fits everyone. The cheapest powertrain depends mainly on two things: how many kilometres you drive a year and how much of that is in town.',
          },
          { type: 'h2', text: 'Cost per 100 km' },
          {
            type: 'p',
            text: 'The basic sum is simple: consumption multiplied by the price per litre or per kWh. With indicative prices, for a compact car:',
          },
          {
            type: 'table',
            head: ['Powertrain', 'Typical consumption', 'Cost per 100 km'],
            rows: [
              ['Petrol', '7 l', '~52 lei'],
              ['Diesel', '5.5 l', '~42 lei'],
              ['Hybrid (petrol)', '5 l', '~37 lei'],
              ['Electric, charged at home', '16 kWh', '~22 lei'],
              ['Electric, public fast charging', '16 kWh', '~35 – 45 lei'],
            ],
            note: 'Energy prices change often; the order of magnitude matters more than the exact figure.',
          },
          { type: 'h2', text: 'What the pump doesn’t show' },
          {
            type: 'ul',
            items: [
              'Diesel: economical on long trips but sensitive to short town journeys. The particulate filter (DPF) and EGR valve can clog, and repairs often cost thousands of lei.',
              'Petrol: higher consumption, but usually simpler mechanics and cheaper repairs, especially on non-turbo engines.',
              'Hybrid: excellent in town, where it recovers energy when braking. On the motorway the advantage shrinks. The battery usually has a long warranty, but check it on a used car.',
              'Electric: the lowest cost per kilometre if you charge at home, and low maintenance with no oil changes. On the other hand the purchase price is higher and value can drop faster.',
            ],
          },
          { type: 'h2', text: 'A simple rule' },
          {
            type: 'ul',
            items: [
              'Under 10,000 km a year, mostly in town: petrol or hybrid is usually the safe choice.',
              'Over 20,000 km a year with lots of long trips: diesel still has its place.',
              'You can charge at home: electric becomes hard to beat on cost per kilometre.',
            ],
          },
          {
            type: 'p',
            text: 'For a concrete decision, compare two real cars head to head. The comparison page shows each one’s yearly cost and the difference between them.',
          },
          { type: 'cta', target: 'compare' },
        ],
      },
    },
  },
  {
    slug: 'deprecierea-masinii-costul-invizibil',
    category: 'value',
    published: '2026-11-17',
    updated: '2026-11-17',
    content: {
      ro: {
        title: 'Deprecierea: cel mai mare cost al mașinii pe care nu-l vezi',
        description:
          'Câtă valoare pierde o mașină în fiecare an, de ce scade cel mai repede la început și cum alegi un model care își păstrează prețul.',
        blocks: [
          {
            type: 'p',
            text: 'Combustibilul îl plătești la pompă, asigurarea o dată pe an. Pierderea de valoare nu apare pe nicio factură, dar o descoperi în ziua în care vinzi mașina. La multe mașini mai noi este cel mai mare cost dintre toate.',
          },
          { type: 'h2', text: 'Cum arată curba' },
          {
            type: 'p',
            text: 'Deprecierea nu e liniară. O mașină nouă pierde cel mai mult în primii ani, apoi ritmul încetinește. Ca regulă orientativă des folosită:',
          },
          {
            type: 'ul',
            items: [
              'în primul an: în jur de 15 – 25% din valoare;',
              'după 3 ani: aproximativ 35 – 45%;',
              'după 5 ani: frecvent în jur de jumătate din prețul inițial.',
            ],
          },
          {
            type: 'p',
            text: 'Pentru o mașină de 100.000 de lei, asta poate însemna 20.000 de lei pierduți doar în primul an, cam cât combustibilul pe doi-trei ani.',
          },
          { type: 'h2', text: 'Ce influențează pierderea de valoare' },
          {
            type: 'ul',
            items: [
              'Marca și reputația de fiabilitate: modelele cunoscute ca durabile se vând mai ușor.',
              'Kilometrajul: fiecare prag rotund (100.000, 200.000 km) contează pentru cumpărători.',
              'Motorizarea și cererea: schimbările de reglementări și de preferințe, de exemplu față de motoarele diesel sau electrice, mută prețurile.',
              'Istoricul: un istoric de service complet și lipsa daunelor pot face o diferență de câteva mii de lei.',
              'Culoarea și dotările: culorile neutre și echiparea populară se vând mai repede.',
            ],
          },
          { type: 'h2', text: 'Cum o reduci' },
          {
            type: 'ul',
            items: [
              'Cumpără o mașină de 2 – 4 ani: primul proprietar a absorbit deja partea cea mai abruptă a curbei.',
              'Păstrează toate documentele de service.',
              'Urmărește evoluția prețului modelului înainte să cumperi.',
            ],
          },
          {
            type: 'p',
            text: 'În SmartCarCompare, după calcul vezi valoarea medie de piață a mașinii și cum a evoluat prețul ei în ultimii 5 ani, ca să știi la ce să te aștepți.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
      en: {
        title: 'Depreciation: the biggest car cost you never see',
        description:
          'How much value a car loses each year, why it drops fastest at the start, and how to choose a model that holds its price.',
        blocks: [
          {
            type: 'p',
            text: 'You pay for fuel at the pump and for insurance once a year. Depreciation never shows up on a bill, but you discover it the day you sell the car. On many newer cars it is the biggest cost of all.',
          },
          { type: 'h2', text: 'What the curve looks like' },
          {
            type: 'p',
            text: 'Depreciation isn’t linear. A new car loses the most in its first years, then the pace slows. As a commonly used rule of thumb:',
          },
          {
            type: 'ul',
            items: [
              'in the first year: around 15 – 25% of its value;',
              'after 3 years: roughly 35 – 45%;',
              'after 5 years: often around half of the original price.',
            ],
          },
          {
            type: 'p',
            text: 'For a 100,000 lei car, that can mean 20,000 lei lost in the first year alone, about as much as two to three years of fuel.',
          },
          { type: 'h2', text: 'What drives the loss in value' },
          {
            type: 'ul',
            items: [
              'Brand and reliability reputation: models known to be durable sell more easily.',
              'Mileage: every round threshold (100,000, 200,000 km) matters to buyers.',
              'Powertrain and demand: changing regulations and preferences, for example towards diesel or electric, move prices.',
              'History: a full service history and no accident damage can be worth a few thousand lei.',
              'Colour and equipment: neutral colours and popular trims sell faster.',
            ],
          },
          { type: 'h2', text: 'How to reduce it' },
          {
            type: 'ul',
            items: [
              'Buy a 2 – 4 year old car: the first owner has already absorbed the steepest part of the curve.',
              'Keep every service document.',
              'Check how the model’s price has moved before you buy.',
            ],
          },
          {
            type: 'p',
            text: 'In SmartCarCompare, after the calculation you see the car’s average market value and how its price has moved over the last 5 years, so you know what to expect.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
    },
  },
  {
    slug: 'reparatii-masina-second-hand-kilometraj-mare',
    category: 'buying',
    published: '2026-11-17',
    updated: '2026-11-17',
    content: {
      ro: {
        title: 'Mașina second-hand cu kilometraj mare: ce reparații să bugetezi',
        description:
          'Filtrul de particule, EGR, distribuția, volanta cu masă dublă și turbina: cele mai frecvente reparații după 150.000 km și cât pot costa.',
        blocks: [
          {
            type: 'p',
            text: 'O mașină cu 150.000 – 250.000 km poate fi o afacere bună, cu o condiție: să știi dinainte ce piese urmează să cedeze. Iată reparațiile care apar cel mai des și intervalele de cost orientative, cu piese și manoperă, pentru o mașină compactă sau de familie obișnuită.',
          },
          {
            type: 'table',
            head: ['Reparație', 'Când apare de obicei', 'Cost orientativ'],
            rows: [
              ['Kit distribuție (curea, role, pompă de apă)', 'la intervalul producătorului, des între 90.000 și 180.000 km', '1.200 – 3.000 lei'],
              ['Filtru de particule (DPF)', 'diesel, mai ales cu mult condus urban', '800 – 1.500 lei curățare; 3.000 – 8.000 lei înlocuire'],
              ['Supapă EGR', 'diesel, după 150.000 km', '1.000 – 3.000 lei'],
              ['Volantă cu masă dublă + ambreiaj', '150.000 – 250.000 km, la cutii manuale', '3.000 – 7.000 lei'],
              ['Turbină', '150.000 – 250.000 km, mai devreme dacă uleiul nu a fost schimbat la timp', '2.500 – 6.000 lei'],
              ['Amortizoare și bucșe', 'după 100.000 km', '1.000 – 2.500 lei'],
            ],
            note: 'La mărcile premium, aceleași lucrări pot costa de două ori mai mult.',
          },
          { type: 'h2', text: 'Cum te protejezi înainte de cumpărare' },
          {
            type: 'ul',
            items: [
              'Cere istoricul de service și verifică, pe factură, dacă distribuția a fost schimbată.',
              'Fă o verificare la un service independent, cu diagnoză computerizată.',
              'Ascultă motorul pornit la rece: zgomotele metalice la pornire pot indica probleme la distribuție sau la volantă.',
              'Fumul negru la accelerare sau martorul de motor aprins pot semnala probleme de DPF, EGR sau turbină.',
              'Negociază: o reparație care urmează în curând este un argument legitim pentru un preț mai mic.',
            ],
          },
          {
            type: 'p',
            text: 'Calculatorul SmartCarCompare listează problemele frecvente pentru motorul și kilometrajul mașinii tale, cu nivelul de risc și intervalul de cost.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
      en: {
        title: 'High-mileage used car: which repairs to budget for',
        description:
          'Particulate filter, EGR, timing belt, dual-mass flywheel and turbo: the most common repairs after 150,000 km and what they can cost.',
        blocks: [
          {
            type: 'p',
            text: 'A car with 150,000 – 250,000 km can be a good deal on one condition: knowing in advance which parts are about to fail. Here are the most common repairs and indicative cost ranges, parts and labour included, for an ordinary compact or family car.',
          },
          {
            type: 'table',
            head: ['Repair', 'Usually needed', 'Indicative cost'],
            rows: [
              ['Timing belt kit (belt, rollers, water pump)', 'at the maker’s interval, often between 90,000 and 180,000 km', '1,200 – 3,000 lei'],
              ['Diesel particulate filter (DPF)', 'diesel, especially with lots of town driving', '800 – 1,500 lei cleaning; 3,000 – 8,000 lei replacement'],
              ['EGR valve', 'diesel, after 150,000 km', '1,000 – 3,000 lei'],
              ['Dual-mass flywheel + clutch', '150,000 – 250,000 km, manual gearboxes', '3,000 – 7,000 lei'],
              ['Turbocharger', '150,000 – 250,000 km, earlier if oil changes were skipped', '2,500 – 6,000 lei'],
              ['Shock absorbers and bushes', 'after 100,000 km', '1,000 – 2,500 lei'],
            ],
            note: 'On premium brands the same work can cost twice as much.',
          },
          { type: 'h2', text: 'How to protect yourself before buying' },
          {
            type: 'ul',
            items: [
              'Ask for the service history and check, on an invoice, whether the timing belt has been replaced.',
              'Have the car checked at an independent garage, with a computer diagnostic.',
              'Listen to the engine on a cold start: metallic noises can point to the timing gear or the flywheel.',
              'Black smoke under acceleration or an engine warning light can signal DPF, EGR or turbo problems.',
              'Negotiate: a repair that is due soon is a fair argument for a lower price.',
            ],
          },
          {
            type: 'p',
            text: 'The SmartCarCompare calculator lists the common problems for your car’s engine and mileage, with their risk level and cost range.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
    },
  },
  {
    slug: 'costuri-ascunse-cumparare-masina-second-hand',
    category: 'buying',
    published: '2026-11-17',
    updated: '2026-11-17',
    content: {
      ro: {
        title: 'Costurile ascunse când cumperi o mașină second-hand',
        description:
          'Pe lângă prețul din anunț: verificările, transcrierea, asigurarea, prima revizie, anvelopele și reparațiile amânate. O listă de verificare înainte de cumpărare.',
        blocks: [
          {
            type: 'p',
            text: 'Prețul din anunț este rareori suma finală. Între semnarea contractului și momentul în care mașina e cu adevărat pregătită de drum apar o serie de cheltuieli pe care e bine să le pui în buget de la început.',
          },
          { type: 'h2', text: 'Înainte de cumpărare' },
          {
            type: 'ul',
            items: [
              'Verificarea tehnică la un service independent și diagnoza: de regulă câteva sute de lei, dar te pot scuti de mii.',
              'Verificarea istoricului (kilometraj, daune, proveniență) prin serviciile disponibile online, pe baza seriei de șasiu (VIN).',
            ],
          },
          { type: 'h2', text: 'La transfer' },
          {
            type: 'ul',
            items: [
              'Transcrierea pe numele tău și, dacă este cazul, numere noi de înmatriculare.',
              'Asigurarea RCA pe numele tău, obligatorie înainte să circuli.',
              'Pentru mașinile aduse din străinătate: înmatricularea în România, cu costurile aferente (verificare RAR, plăcuțe, eventual numere provizorii).',
            ],
          },
          { type: 'h2', text: 'În primele luni' },
          {
            type: 'ul',
            items: [
              'O revizie completă (ulei, filtre, lichid de frână), chiar dacă vânzătorul spune că „abia a fost făcută”.',
              'Anvelopele: dacă sunt mai vechi de 5 – 6 ani sau uzate, un set nou poate costa 1.500 – 4.000 lei.',
              'Plăcuțe și discuri de frână, baterie, ștergătoare: piese mici care se adună.',
              'Reparațiile amânate de fostul proprietar: martori aprinși, zgomote, aer condiționat care nu răcește.',
            ],
          },
          { type: 'h2', text: 'Regula de buget' },
          {
            type: 'p',
            text: 'Un reper prudent este să păstrezi deoparte între 10% și 15% din prețul mașinii pentru primele luni după cumpărare. La o mașină de 40.000 de lei, asta înseamnă 4.000 – 6.000 de lei.',
          },
          {
            type: 'p',
            text: 'Apoi, înainte să semnezi, verifică și costul anual de utilizare: o mașină ieftină la cumpărare poate fi scumpă de întreținut.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
      en: {
        title: 'The hidden costs of buying a used car',
        description:
          'Beyond the advertised price: inspections, registration transfer, insurance, the first service, tyres and postponed repairs. A checklist before you buy.',
        blocks: [
          {
            type: 'p',
            text: 'The advertised price is rarely the final figure. Between signing the contract and the car being truly road-ready, a series of costs appear that are worth budgeting for from the start.',
          },
          { type: 'h2', text: 'Before you buy' },
          {
            type: 'ul',
            items: [
              'A technical check at an independent garage plus a diagnostic: usually a few hundred lei, but it can save you thousands.',
              'A history check (mileage, damage, origin) through the online services that work from the chassis number (VIN).',
            ],
          },
          { type: 'h2', text: 'At transfer' },
          {
            type: 'ul',
            items: [
              'Transferring the registration to your name and, if needed, new number plates.',
              'Liability insurance (RCA) in your name, mandatory before you drive.',
              'For cars brought from abroad: registration in Romania and its costs (RAR inspection, plates, possibly temporary plates).',
            ],
          },
          { type: 'h2', text: 'In the first months' },
          {
            type: 'ul',
            items: [
              'A full service (oil, filters, brake fluid), even if the seller says it was “just done”.',
              'Tyres: if they are older than 5 – 6 years or worn, a new set can cost 1,500 – 4,000 lei.',
              'Brake pads and discs, battery, wipers: small parts that add up.',
              'Repairs the previous owner postponed: warning lights, noises, air conditioning that doesn’t cool.',
            ],
          },
          { type: 'h2', text: 'The budget rule' },
          {
            type: 'p',
            text: 'A prudent benchmark is to set aside 10% to 15% of the car’s price for the first months after buying. On a 40,000 lei car, that means 4,000 – 6,000 lei.',
          },
          {
            type: 'p',
            text: 'Then, before you sign, check the yearly running cost too: a car that is cheap to buy can be expensive to keep.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Newest first (by last update, then publication). */
export function sortedArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.updated.localeCompare(a.updated) || b.published.localeCompare(a.published));
}

/** Rounded reading time at ~200 words per minute, minimum 2. */
export function readingMinutes(content: ArticleContent): number {
  const text = content.blocks
    .map((b) => {
      if (b.type === 'p' || b.type === 'h2') return b.text;
      if (b.type === 'ul') return b.items.join(' ');
      if (b.type === 'table') return [...b.head, ...b.rows.flat(), b.note ?? ''].join(' ');
      return '';
    })
    .join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

/** What a listing card needs - keeps full bodies out of the index page bundle. */
export interface ArticleSummary {
  slug: string;
  category: ArticleCategory;
  updated: string;
  content: Record<ArticleLang, { title: string; description: string; minutes: number }>;
}

export function toSummary(article: Article): ArticleSummary {
  const pick = (lang: ArticleLang) => ({
    title: article.content[lang].title,
    description: article.content[lang].description,
    minutes: readingMinutes(article.content[lang]),
  });
  return { slug: article.slug, category: article.category, updated: article.updated, content: { ro: pick('ro'), en: pick('en') } };
}
