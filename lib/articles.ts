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
  {
    slug: 'cum-calculezi-consumul-real-al-masinii',
    category: 'fuel',
    published: '2026-11-17',
    updated: '2026-11-17',
    content: {
      ro: {
        title: 'Cum calculezi consumul real al mașinii tale (și de ce diferă de catalog)',
        description:
          'Metoda plinului complet, pas cu pas, ce influențează consumul și cum transformi litrii la 100 km într-un buget anual pentru combustibil.',
        blocks: [
          {
            type: 'p',
            text: 'Consumul din cartea tehnică și cel afișat de calculatorul de bord sunt un punct de plecare, nu o garanție. Ca să știi cât te costă cu adevărat combustibilul, ai nevoie de consumul tău real, măsurat în condițiile în care conduci de obicei.',
          },
          { type: 'h2', text: 'Metoda plinului complet' },
          {
            type: 'ul',
            items: [
              'Fă plinul complet, până se oprește automat pistolul, și notează kilometrajul sau resetează contorul de parcurs.',
              'Condu normal, ca de obicei, cel puțin câteva sute de kilometri.',
              'Fă din nou plinul complet, la aceeași pompă dacă se poate, și notează câți litri au intrat.',
              'Împarte litrii la kilometrii parcurși și înmulțește cu 100. Rezultatul este consumul tău real, în litri la 100 km.',
            ],
          },
          {
            type: 'p',
            text: 'Exemplu: ai parcurs 620 km și au intrat 40,3 litri. Consumul este 40,3 ÷ 620 × 100 = 6,5 l/100 km. Repetă măsurătoarea de două-trei ori și fă media: un singur plin poate fi influențat de un drum lung sau de un ambuteiaj.',
          },
          { type: 'h2', text: 'De ce diferă de valoarea din catalog' },
          {
            type: 'p',
            text: 'Valorile oficiale sunt obținute într-un test standardizat, cu un traseu și o temperatură controlate. Testul actual (WLTP) este mai realist decât cel vechi (NEDC), dar în viața de zi cu zi consumul iese de multe ori ceva mai mare. Calculatorul de bord poate fi și el ușor optimist.',
          },
          { type: 'h2', text: 'Ce crește consumul' },
          {
            type: 'ul',
            items: [
              'Drumurile scurte cu motorul rece: în primii kilometri motorul consumă vizibil mai mult.',
              'Traficul urban, cu opriri și porniri dese.',
              'Viteza mare: rezistența aerului crește cu pătratul vitezei, așa că diferența dintre 110 și 140 km/h se simte la pompă.',
              'Presiunea scăzută în anvelope, portbagajul de plafon și greutatea suplimentară.',
              'Aerul condiționat folosit intens și un stil de condus agresiv, cu accelerări și frânări bruște.',
            ],
          },
          { type: 'h2', text: 'Din consum, în buget anual' },
          {
            type: 'p',
            text: 'Formula este simplă: consumul real × kilometrii pe an ÷ 100 × prețul pe litru. La 6,5 l/100 km, 12.000 km pe an și un preț orientativ de 7,5 lei/l, rezultă 780 de litri, adică aproximativ 5.850 de lei pe an, sau aproape 490 de lei pe lună.',
          },
          {
            type: 'p',
            text: 'Combustibilul este însă doar una dintre cele șase categorii mari de costuri ale unei mașini. Calculatorul SmartCarCompare le estimează pe toate, inclusiv asigurarea, reparațiile și pierderea de valoare.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
      en: {
        title: 'How to work out your car’s real fuel consumption (and why it differs from the brochure)',
        description:
          'The full-tank method step by step, what affects consumption, and how to turn litres per 100 km into a yearly fuel budget.',
        blocks: [
          {
            type: 'p',
            text: 'The figure in the brochure and the one on the trip computer are a starting point, not a guarantee. To know what fuel really costs you, you need your real consumption, measured in the conditions you usually drive in.',
          },
          { type: 'h2', text: 'The full-tank method' },
          {
            type: 'ul',
            items: [
              'Fill the tank completely, until the nozzle clicks off, and note the odometer or reset the trip counter.',
              'Drive normally, as you usually do, for at least a few hundred kilometres.',
              'Fill up completely again, at the same pump if you can, and note how many litres went in.',
              'Divide the litres by the kilometres driven and multiply by 100. The result is your real consumption in litres per 100 km.',
            ],
          },
          {
            type: 'p',
            text: 'Example: you drove 620 km and 40.3 litres went in. Consumption is 40.3 ÷ 620 × 100 = 6.5 l/100 km. Repeat the measurement two or three times and take the average: a single tank can be skewed by one long trip or a traffic jam.',
          },
          { type: 'h2', text: 'Why it differs from the official figure' },
          {
            type: 'p',
            text: 'Official values come from a standardised test with a controlled route and temperature. The current test (WLTP) is more realistic than the old one (NEDC), but in everyday driving consumption often comes out somewhat higher. The trip computer can also be slightly optimistic.',
          },
          { type: 'h2', text: 'What increases consumption' },
          {
            type: 'ul',
            items: [
              'Short trips with a cold engine: the engine uses noticeably more in the first few kilometres.',
              'Town traffic, with frequent stopping and starting.',
              'High speed: air resistance grows with the square of speed, so the difference between 110 and 140 km/h shows at the pump.',
              'Low tyre pressure, a roof box and extra weight.',
              'Heavy use of air conditioning and an aggressive driving style with hard acceleration and braking.',
            ],
          },
          { type: 'h2', text: 'From consumption to a yearly budget' },
          {
            type: 'p',
            text: 'The formula is simple: real consumption × kilometres per year ÷ 100 × price per litre. At 6.5 l/100 km, 12,000 km a year and an indicative 7.5 lei/l, that is 780 litres, or about 5,850 lei a year, nearly 490 lei a month.',
          },
          {
            type: 'p',
            text: 'Fuel is only one of the six big cost categories of a car, though. The SmartCarCompare calculator estimates all of them, including insurance, repairs and depreciation.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
    },
  },
  {
    slug: 'revizia-masinii-ce-include-cat-de-des-cat-costa',
    category: 'costs',
    published: '2026-11-17',
    updated: '2026-11-17',
    content: {
      ro: {
        title: 'Revizia mașinii: ce include, cât de des o faci și cât costă',
        description:
          'Diferența dintre revizia mică și cea mare, intervalele obișnuite, costurile orientative și de ce un istoric de service complet îți crește prețul la vânzare.',
        blocks: [
          {
            type: 'p',
            text: 'Revizia este cea mai previzibilă cheltuială a unei mașini și, paradoxal, cea mai des amânată. Făcută la timp, te ferește de reparațiile mari; amânată, le aduce mai aproape.',
          },
          { type: 'h2', text: 'Cât de des' },
          {
            type: 'p',
            text: 'Intervalul exact este cel din cartea de service a mașinii tale. Ca reper general, revizia cu schimb de ulei se face de obicei la 10.000 – 15.000 km sau o dată pe an, ce apare întâi. Unele motoare au intervale „long life”, de până la 30.000 km, dar dacă mergi mult în oraș sau pe distanțe scurte, mulți mecanici recomandă intervale mai scurte.',
          },
          { type: 'h2', text: 'Ce include' },
          {
            type: 'table',
            head: ['Operațiune', 'Revizie mică', 'Revizie mare'],
            rows: [
              ['Ulei de motor și filtru de ulei', 'da', 'da'],
              ['Filtru de aer', 'verificare', 'înlocuire'],
              ['Filtru de habitaclu (polen)', 'des, da', 'da'],
              ['Filtru de combustibil (mai ales la diesel)', 'nu', 'la interval'],
              ['Bujii (la benzină)', 'nu', 'la interval'],
              ['Lichid de frână', 'verificare', 'înlocuire, de regulă la 2 ani'],
              ['Verificare frâne, suspensie, lumini, scurgeri', 'da', 'da'],
            ],
            note: 'Distribuția și lichidul de răcire au intervale proprii, separate de revizia anuală.',
          },
          { type: 'h2', text: 'Cât costă' },
          {
            type: 'table',
            head: ['Lucrare', 'Cost orientativ (piese + manoperă)'],
            rows: [
              ['Revizie mică (ulei + filtre)', '400 – 900 lei'],
              ['Revizie mare', '800 – 1.800 lei'],
              ['Schimb lichid de frână', '150 – 350 lei'],
              ['Kit de distribuție (separat, la interval)', '1.200 – 3.000 lei'],
            ],
            note: 'Pentru mașini compacte și de familie obișnuite. La mărcile premium și la service-urile autorizate prețurile pot fi mai mari.',
          },
          { type: 'h2', text: 'De ce merită să păstrezi facturile' },
          {
            type: 'ul',
            items: [
              'Un istoric de service complet este unul dintre primele lucruri pe care le verifică un cumpărător și poate face diferența de câteva mii de lei la vânzare.',
              'Dovedește că distribuția a fost schimbată la timp, una dintre cele mai scumpe lucrări amânate.',
              'Te ajută să urmărești ce urmează: dacă știi ce s-a schimbat și când, poți bugeta din timp următoarea lucrare.',
            ],
          },
          {
            type: 'p',
            text: 'Întreținerea și reviziile sunt o categorie separată în estimarea SmartCarCompare, alături de reparațiile neprevăzute care cresc odată cu kilometrajul.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
      en: {
        title: 'Car servicing: what it includes, how often, and what it costs',
        description:
          'The difference between a minor and a major service, typical intervals, indicative costs and why a full service history raises your resale price.',
        blocks: [
          {
            type: 'p',
            text: 'Servicing is a car’s most predictable expense and, oddly, the one most often put off. Done on time it keeps big repairs away; postponed, it brings them closer.',
          },
          { type: 'h2', text: 'How often' },
          {
            type: 'p',
            text: 'The exact interval is the one in your car’s service book. As a general guide, a service with an oil change is usually due every 10,000 – 15,000 km or once a year, whichever comes first. Some engines have “long life” intervals of up to 30,000 km, but if you drive mostly in town or on short trips, many mechanics recommend shorter intervals.',
          },
          { type: 'h2', text: 'What it includes' },
          {
            type: 'table',
            head: ['Job', 'Minor service', 'Major service'],
            rows: [
              ['Engine oil and oil filter', 'yes', 'yes'],
              ['Air filter', 'check', 'replace'],
              ['Cabin (pollen) filter', 'often, yes', 'yes'],
              ['Fuel filter (especially diesel)', 'no', 'at interval'],
              ['Spark plugs (petrol)', 'no', 'at interval'],
              ['Brake fluid', 'check', 'replace, usually every 2 years'],
              ['Check brakes, suspension, lights, leaks', 'yes', 'yes'],
            ],
            note: 'The timing belt and coolant have their own intervals, separate from the yearly service.',
          },
          { type: 'h2', text: 'What it costs' },
          {
            type: 'table',
            head: ['Job', 'Indicative cost (parts + labour)'],
            rows: [
              ['Minor service (oil + filters)', '400 – 900 lei'],
              ['Major service', '800 – 1,800 lei'],
              ['Brake fluid change', '150 – 350 lei'],
              ['Timing belt kit (separate, at interval)', '1,200 – 3,000 lei'],
            ],
            note: 'For ordinary compact and family cars. Premium brands and main dealers can charge more.',
          },
          { type: 'h2', text: 'Why it pays to keep the invoices' },
          {
            type: 'ul',
            items: [
              'A full service history is one of the first things a buyer checks and can be worth a few thousand lei at resale.',
              'It proves the timing belt was changed on time, one of the most expensive jobs people postpone.',
              'It helps you track what is coming: if you know what was replaced and when, you can budget for the next job early.',
            ],
          },
          {
            type: 'p',
            text: 'Maintenance and servicing is its own category in the SmartCarCompare estimate, alongside the unexpected repairs that grow with mileage.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
    },
  },
  {
    slug: 'asigurarea-rca-ce-influenteaza-pretul',
    category: 'costs',
    published: '2026-11-17',
    updated: '2026-11-17',
    content: {
      ro: {
        title: 'Asigurarea RCA: ce influențează prețul și cum plătești mai puțin',
        description:
          'Clasa bonus-malus, vârsta, localitatea și motorul: factorii care decid prețul RCA, ce este decontarea directă și când merită o poliță CASCO.',
        blocks: [
          {
            type: 'p',
            text: 'RCA-ul este obligatoriu pentru orice mașină înmatriculată, dar prețul lui poate varia de câteva ori între doi șoferi cu aceeași mașină. Diferența vine din factorii pe care asigurătorii îi folosesc pentru a estima riscul.',
          },
          { type: 'h2', text: 'Ce influențează prețul' },
          {
            type: 'ul',
            items: [
              'Clasa bonus-malus: istoricul tău de daune. Pornești dintr-o clasă neutră, urci în clasele bonus pentru fiecare perioadă fără daune din vina ta și cobori în clasele malus după o daună. Clasa te urmează când schimbi asigurătorul.',
              'Vârsta și experiența: șoferii tineri sau cu permis recent plătesc de obicei mai mult.',
              'Localitatea și județul: în orașele mari, cu trafic intens, riscul de accident și prețul sunt mai mari.',
              'Mașina: capacitatea cilindrică și puterea motorului contează.',
              'Durata poliței: polițele pe 12 luni sunt adesea mai avantajoase, raportat la lună, decât cele pe 1 sau 6 luni.',
            ],
          },
          { type: 'h2', text: 'Decontarea directă' },
          {
            type: 'p',
            text: 'Este o opțiune suplimentară, cu cost în plus, care îți permite ca, într-un accident în care nu ești vinovat, să fii despăgubit direct de propriul asigurător, nu de cel al vinovatului. De obicei înseamnă o instrumentare mai rapidă și mai simplă a daunei.',
          },
          { type: 'h2', text: 'Cum plătești mai puțin' },
          {
            type: 'ul',
            items: [
              'Compară mai multe oferte, la aceleași opțiuni, înainte să reînnoiești. Diferențele dintre asigurători pot fi mari pentru același profil.',
              'Alege, dacă îți permiți, polița pe 12 luni.',
              'Ai grijă la clasa bonus-malus: un istoric fără daune este cel mai bun mod de a reduce prețul în timp.',
              'Verifică dacă datele din poliță sunt corecte: localitatea, utilizarea mașinii și datele șoferului influențează prețul.',
            ],
          },
          { type: 'h2', text: 'RCA sau și CASCO?' },
          {
            type: 'p',
            text: 'RCA-ul acoperă pagubele pe care le produci altora. Pentru propria mașină ai nevoie de CASCO, care este opțională și costă de regulă câteva procente din valoarea mașinii pe an. Merită mai ales la mașinile noi, scumpe sau cumpărate în leasing, unde este adesea obligatorie. O franșiză mai mare scade prețul poliței, dar crește suma pe care o plătești tu la o daună.',
          },
          {
            type: 'p',
            text: 'Asigurarea este una dintre categoriile din estimarea anuală SmartCarCompare. Dacă îți completezi localitatea, estimarea ține cont de ea.',
          },
          { type: 'cta', target: 'calculator' },
        ],
      },
      en: {
        title: 'RCA liability insurance: what drives the price and how to pay less',
        description:
          'Bonus-malus class, age, location and engine: the factors behind the price of RCA, what direct settlement is and when comprehensive (CASCO) cover is worth it.',
        blocks: [
          {
            type: 'p',
            text: 'RCA liability insurance is mandatory for every registered car in Romania, but its price can vary several times over between two drivers with the same car. The difference comes from the factors insurers use to estimate risk.',
          },
          { type: 'h2', text: 'What affects the price' },
          {
            type: 'ul',
            items: [
              'Bonus-malus class: your claims history. You start in a neutral class, move up into bonus classes for each period without at-fault claims and drop into malus classes after one. Your class follows you when you change insurer.',
              'Age and experience: young or newly licensed drivers usually pay more.',
              'City and county: in big cities with heavy traffic, the risk of an accident and the price are higher.',
              'The car: engine size and power matter.',
              'Policy length: 12-month policies are often better value per month than 1- or 6-month ones.',
            ],
          },
          { type: 'h2', text: 'Direct settlement' },
          {
            type: 'p',
            text: 'An optional extra, at additional cost, that lets you be compensated directly by your own insurer, rather than the at-fault driver’s, after an accident that wasn’t your fault. It usually means faster and simpler claims handling.',
          },
          { type: 'h2', text: 'How to pay less' },
          {
            type: 'ul',
            items: [
              'Compare several quotes, with the same options, before renewing. Differences between insurers can be large for the same profile.',
              'Choose a 12-month policy if you can afford it.',
              'Look after your bonus-malus class: a claim-free record is the best way to lower the price over time.',
              'Check that the details on the policy are correct: location, how the car is used and driver details all affect the price.',
            ],
          },
          { type: 'h2', text: 'RCA only, or CASCO too?' },
          {
            type: 'p',
            text: 'RCA covers damage you cause to others. For your own car you need CASCO comprehensive cover, which is optional and usually costs a few percent of the car’s value per year. It is most worthwhile on new, expensive or leased cars, where it is often required. A higher excess lowers the premium but raises what you pay yourself on a claim.',
          },
          {
            type: 'p',
            text: 'Insurance is one of the categories in the SmartCarCompare yearly estimate. If you add your city, the estimate takes it into account.',
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
