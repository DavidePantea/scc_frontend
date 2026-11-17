// Privacy policy, terms and cookie policy. They describe what this codebase
// actually does (in-memory sessions, localStorage language preference,
// cookieless Vercel Analytics, Google AdSense). Review them whenever data
// handling changes - and have them checked by someone qualified.

export type LegalLang = 'ro' | 'en';

export const CONTACT_EMAIL = 'davide.pantea22@gmail.com';
export const LEGAL_UPDATED = '2026-11-17';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  links?: { label: string; href: string }[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export type LegalDocKey = 'privacy' | 'terms' | 'cookies';

const GOOGLE_ADS_SETTINGS = 'https://adssettings.google.com';
const GOOGLE_PARTNER_SITES = 'https://policies.google.com/technologies/partner-sites';
const ABOUT_ADS = 'https://www.aboutads.info/choices';
const ANSPDCP = 'https://www.dataprotection.ro';

export const LEGAL_DOCS: Record<LegalDocKey, Record<LegalLang, LegalDoc>> = {
  privacy: {
    ro: {
      title: 'Politica de confidențialitate',
      intro:
        'Această politică explică ce date prelucrează SmartCarCompare atunci când folosești site-ul, de ce le folosim și ce drepturi ai.',
      sections: [
        {
          heading: 'Cine suntem',
          paragraphs: [
            `SmartCarCompare este un serviciu online care estimează costul anual de utilizare al unei mașini. Pentru orice întrebare legată de datele tale ne poți scrie la ${CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: 'Ce date prelucrăm',
          items: [
            'Datele vehiculului pe care le introduci în calculator (marcă, model, an, kilometraj, combustibil și, opțional, localitatea, kilometrajul anual și procentul de condus urban). Le trimitem serviciului nostru de estimare ca să calculăm rezultatul.',
            'Datele contului, dacă îți creezi unul: adresa de e-mail, numele (opțional) și tipul de cont. Parola este transmisă direct serviciului nostru de autentificare.',
            'Istoricul cercetărilor, dacă ești autentificat: calculele și comparațiile tale sunt salvate în cont ca să le poți redeschide.',
            'Anunțurile vânzătorilor, dacă ai un cont de vânzător: detaliile mașinilor pe care le adaugi.',
            'Date tehnice de trafic: numărul de vizite și paginile vizitate, măsurate cu Vercel Web Analytics, care nu folosește cookie-uri și nu identifică vizitatorii individual.',
          ],
        },
        {
          heading: 'Cum folosim datele',
          items: [
            'pentru a calcula estimările de cost, valoarea de piață și evoluția prețului;',
            'pentru a-ți administra contul și istoricul cercetărilor;',
            'pentru a înțelege, agregat, cum este folosit site-ul și a-l îmbunătăți;',
            'pentru afișarea de reclame prin Google AdSense (vezi mai jos).',
          ],
          paragraphs: [
            'Estimările sunt generate automat, cu ajutorul inteligenței artificiale, pe baza datelor vehiculului. Nu luăm decizii cu efect juridic asupra ta pe baza acestor date.',
          ],
        },
        {
          heading: 'Reclame și cookie-uri Google',
          paragraphs: [
            'Folosim Google AdSense pentru a afișa reclame. Furnizori terți, inclusiv Google, folosesc cookie-uri pentru a afișa reclame pe baza vizitelor anterioare ale unui utilizator pe acest site sau pe alte site-uri.',
            'Cookie-urile de publicitate ale Google îi permit acestuia și partenerilor săi să afișeze reclame pe baza vizitelor tale pe acest site și/sau pe alte site-uri de pe internet. În Spațiul Economic European, reclamele personalizate sunt afișate doar cu acordul tău, exprimat prin mesajul de consimțământ afișat pe site.',
            'Poți renunța oricând la publicitatea personalizată din Setările pentru reclame Google sau, pentru furnizorii terți, prin aboutads.info.',
          ],
          links: [
            { label: 'Setările pentru reclame Google', href: GOOGLE_ADS_SETTINGS },
            { label: 'Cum folosește Google datele de pe site-urile partenerilor', href: GOOGLE_PARTNER_SITES },
            { label: 'Renunțare la reclame personalizate (aboutads.info)', href: ABOUT_ADS },
          ],
        },
        {
          heading: 'Stocarea în browser',
          paragraphs: [
            'Salvăm în browser (localStorage) doar limba aleasă. Sesiunea de autentificare este păstrată numai în memoria paginii: dacă reîncarci pagina sau o închizi, ești deconectat automat.',
          ],
        },
        {
          heading: 'Temeiul legal',
          items: [
            'executarea contractului: pentru calcule, cont și istoricul cercetărilor;',
            'interesul legitim: pentru securitate și statistici agregate de trafic;',
            'consimțământul: pentru cookie-urile de publicitate personalizată, pe care îl poți retrage oricând.',
          ],
        },
        {
          heading: 'Cât timp păstrăm datele',
          paragraphs: [
            'Datele contului și istoricul cercetărilor se păstrează cât timp contul este activ. Ne poți cere oricând ștergerea contului și a datelor asociate, scriindu-ne la adresa de mai sus.',
          ],
        },
        {
          heading: 'Cui transmitem datele',
          paragraphs: [
            'Folosim furnizori care ne ajută să operăm serviciul: găzduirea site-ului (Vercel), serviciile noastre de estimare și autentificare și Google pentru reclame. Unii dintre ei pot prelucra date în afara Spațiului Economic European, pe baza garanțiilor prevăzute de lege, cum ar fi clauzele contractuale standard. Nu vindem datele tale.',
          ],
        },
        {
          heading: 'Drepturile tale',
          paragraphs: [
            'Conform GDPR, ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție, precum și dreptul de a-ți retrage consimțământul. Pentru oricare dintre ele, scrie-ne. Ai și dreptul să depui o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).',
          ],
          links: [{ label: 'ANSPDCP — dataprotection.ro', href: ANSPDCP }],
        },
        {
          heading: 'Copii',
          paragraphs: ['Serviciul nu se adresează persoanelor sub 16 ani.'],
        },
        {
          heading: 'Modificări',
          paragraphs: [
            'Putem actualiza această politică atunci când serviciul se schimbă. Data ultimei actualizări apare în partea de sus a paginii.',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy policy',
      intro:
        'This policy explains what data SmartCarCompare processes when you use the site, why we use it and what rights you have.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            `SmartCarCompare is an online service that estimates the yearly running cost of a car. For any question about your data, write to us at ${CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: 'What data we process',
          items: [
            'Vehicle details you enter in the calculator (make, model, year, mileage, fuel and, optionally, city, yearly mileage and share of urban driving). We send them to our estimation service to calculate the result.',
            'Account data, if you create one: email address, name (optional) and account type. Your password is sent directly to our authentication service.',
            'Research history, if you are logged in: your calculations and comparisons are saved to your account so you can reopen them.',
            'Seller listings, if you have a seller account: the details of the cars you add.',
            'Technical traffic data: the number of visits and pages viewed, measured with Vercel Web Analytics, which uses no cookies and does not identify individual visitors.',
          ],
        },
        {
          heading: 'How we use data',
          items: [
            'to calculate cost estimates, market value and price trends;',
            'to manage your account and research history;',
            'to understand, in aggregate, how the site is used and improve it;',
            'to show advertising through Google AdSense (see below).',
          ],
          paragraphs: [
            'Estimates are generated automatically, with the help of artificial intelligence, from the vehicle details. We make no decisions with legal effect about you based on this data.',
          ],
        },
        {
          heading: 'Advertising and Google cookies',
          paragraphs: [
            'We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites.',
            'Google’s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet. In the European Economic Area, personalised ads are shown only with your consent, given through the consent message shown on the site.',
            'You can opt out of personalised advertising at any time in Google’s Ad Settings or, for third-party vendors, via aboutads.info.',
          ],
          links: [
            { label: 'Google Ad Settings', href: GOOGLE_ADS_SETTINGS },
            { label: 'How Google uses information from sites that use its services', href: GOOGLE_PARTNER_SITES },
            { label: 'Opt out of personalised ads (aboutads.info)', href: ABOUT_ADS },
          ],
        },
        {
          heading: 'Storage in your browser',
          paragraphs: [
            'We store only your chosen language in the browser (localStorage). Your login session is kept only in the page’s memory: if you reload or close the page, you are logged out automatically.',
          ],
        },
        {
          heading: 'Legal basis',
          items: [
            'performance of a contract: for calculations, your account and research history;',
            'legitimate interest: for security and aggregate traffic statistics;',
            'consent: for personalised advertising cookies, which you can withdraw at any time.',
          ],
        },
        {
          heading: 'How long we keep data',
          paragraphs: [
            'Account data and research history are kept while the account is active. You can ask us at any time to delete your account and the associated data by writing to the address above.',
          ],
        },
        {
          heading: 'Who we share data with',
          paragraphs: [
            'We use providers who help us run the service: site hosting (Vercel), our estimation and authentication services, and Google for advertising. Some of them may process data outside the European Economic Area under the safeguards provided by law, such as standard contractual clauses. We do not sell your data.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'Under the GDPR you have the right of access, rectification, erasure, restriction, portability and objection, and the right to withdraw consent. To exercise any of them, write to us. You also have the right to complain to the Romanian data protection authority (ANSPDCP).',
          ],
          links: [{ label: 'ANSPDCP — dataprotection.ro', href: ANSPDCP }],
        },
        {
          heading: 'Children',
          paragraphs: ['The service is not intended for people under 16.'],
        },
        {
          heading: 'Changes',
          paragraphs: ['We may update this policy when the service changes. The date of the last update is shown at the top of the page.'],
        },
      ],
    },
  },
  terms: {
    ro: {
      title: 'Termeni și condiții',
      intro: 'Folosind SmartCarCompare ești de acord cu termenii de mai jos. Te rugăm să îi citești cu atenție.',
      sections: [
        {
          heading: 'Serviciul',
          paragraphs: [
            'SmartCarCompare oferă estimări orientative ale costului de utilizare al unei mașini, informații despre problemele frecvente, valoarea de piață, evoluția prețului și articole informative. Calculatorul poate fi folosit gratuit, fără cont.',
          ],
        },
        {
          heading: 'Estimările sunt orientative',
          paragraphs: [
            'Rezultatele sunt generate automat, cu ajutorul inteligenței artificiale, și pot conține erori sau valori care nu se potrivesc situației tale. Ele nu reprezintă consultanță financiară, tehnică sau juridică și nu înlocuiesc o verificare la un service ori o ofertă de asigurare. Costurile reale pot varia.',
          ],
        },
        {
          heading: 'Contul tău',
          items: [
            'Ești responsabil pentru corectitudinea datelor din cont și pentru păstrarea confidențialității parolei.',
            'Tipul de cont (cumpărător sau vânzător) se alege la înregistrare.',
            'Vânzătorii garantează că informațiile despre mașinile pe care le adaugă sunt reale și că au dreptul să le folosească.',
          ],
        },
        {
          heading: 'Utilizare acceptabilă',
          items: [
            'nu folosi serviciul în scopuri ilegale sau înșelătoare;',
            'nu încerca să perturbi funcționarea site-ului sau să accesezi date ale altor utilizatori;',
            'nu extrage automat, în masă, conținutul sau rezultatele serviciului.',
          ],
        },
        {
          heading: 'Proprietate intelectuală',
          paragraphs: [
            'Conținutul site-ului (texte, articole, design, cod) aparține SmartCarCompare. Poți cita fragmente scurte, cu indicarea sursei.',
          ],
        },
        {
          heading: 'Limitarea răspunderii',
          paragraphs: [
            'Serviciul este oferit „ca atare”. În limitele permise de lege, nu răspundem pentru deciziile luate pe baza estimărilor sau pentru pierderi rezultate din folosirea lor. Nu răspundem nici pentru conținutul reclamelor sau al site-urilor terțe la care trimit acestea.',
          ],
        },
        {
          heading: 'Modificări și legea aplicabilă',
          paragraphs: [
            'Putem modifica acești termeni; versiunea actuală este întotdeauna cea de pe această pagină. Termenii sunt guvernați de legea română.',
            `Pentru întrebări: ${CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
    en: {
      title: 'Terms and conditions',
      intro: 'By using SmartCarCompare you agree to the terms below. Please read them carefully.',
      sections: [
        {
          heading: 'The service',
          paragraphs: [
            'SmartCarCompare provides indicative estimates of a car’s running cost, information about common problems, market value, price trends and informative articles. The calculator is free to use, without an account.',
          ],
        },
        {
          heading: 'Estimates are indicative',
          paragraphs: [
            'Results are generated automatically with the help of artificial intelligence and may contain errors or values that do not match your situation. They are not financial, technical or legal advice and do not replace an inspection at a garage or an insurance quote. Actual costs may vary.',
          ],
        },
        {
          heading: 'Your account',
          items: [
            'You are responsible for the accuracy of your account details and for keeping your password confidential.',
            'The account type (buyer or seller) is chosen at sign-up.',
            'Sellers guarantee that the information about the cars they add is genuine and that they are entitled to use it.',
          ],
        },
        {
          heading: 'Acceptable use',
          items: [
            'do not use the service for illegal or misleading purposes;',
            'do not try to disrupt the site or access other users’ data;',
            'do not scrape the service’s content or results in bulk.',
          ],
        },
        {
          heading: 'Intellectual property',
          paragraphs: [
            'The site’s content (text, articles, design, code) belongs to SmartCarCompare. You may quote short extracts with attribution.',
          ],
        },
        {
          heading: 'Limitation of liability',
          paragraphs: [
            'The service is provided “as is”. To the extent permitted by law, we are not liable for decisions made on the basis of the estimates or for losses resulting from their use. Nor are we responsible for the content of ads or of third-party sites they link to.',
          ],
        },
        {
          heading: 'Changes and governing law',
          paragraphs: [
            'We may change these terms; the current version is always the one on this page. These terms are governed by Romanian law.',
            `Questions: ${CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
  },
  cookies: {
    ro: {
      title: 'Politica de cookie-uri',
      intro: 'Pe scurt: SmartCarCompare nu setează cookie-uri proprii. Cookie-urile de pe site provin de la Google, pentru reclame.',
      sections: [
        {
          heading: 'Ce stocăm noi',
          items: [
            'Limba aleasă (română sau engleză), salvată în localStorage-ul browserului, ca să nu o alegi la fiecare vizită.',
            'Sesiunea de autentificare nu este salvată în cookie-uri sau în localStorage, ci doar în memoria paginii.',
          ],
        },
        {
          heading: 'Statistici de trafic',
          paragraphs: ['Folosim Vercel Web Analytics, care măsoară vizitele fără cookie-uri și fără a identifica vizitatorii individual.'],
        },
        {
          heading: 'Cookie-uri de publicitate (Google AdSense)',
          paragraphs: [
            'Google și partenerii săi pot seta cookie-uri pentru a afișa reclame, a limita de câte ori vezi aceeași reclamă și a măsura performanța reclamelor. Reclamele personalizate sunt afișate doar cu acordul tău, exprimat prin mesajul de consimțământ.',
          ],
          links: [
            { label: 'Cum folosește Google cookie-urile în publicitate', href: 'https://policies.google.com/technologies/ads' },
            { label: 'Setările pentru reclame Google', href: GOOGLE_ADS_SETTINGS },
          ],
        },
        {
          heading: 'Cum controlezi cookie-urile',
          paragraphs: [
            'Îți poți schimba oricând alegerea din mesajul de consimțământ și poți șterge sau bloca cookie-urile din setările browserului. Blocarea cookie-urilor de publicitate nu afectează funcționarea calculatorului.',
          ],
        },
      ],
    },
    en: {
      title: 'Cookie policy',
      intro: 'In short: SmartCarCompare sets no cookies of its own. The cookies on the site come from Google, for advertising.',
      sections: [
        {
          heading: 'What we store',
          items: [
            'Your chosen language (Romanian or English), saved in the browser’s localStorage so you don’t have to pick it on every visit.',
            'Your login session is not saved in cookies or localStorage, only in the page’s memory.',
          ],
        },
        {
          heading: 'Traffic statistics',
          paragraphs: ['We use Vercel Web Analytics, which measures visits without cookies and without identifying individual visitors.'],
        },
        {
          heading: 'Advertising cookies (Google AdSense)',
          paragraphs: [
            'Google and its partners may set cookies to show ads, limit how often you see the same ad and measure ad performance. Personalised ads are shown only with your consent, given through the consent message.',
          ],
          links: [
            { label: 'How Google uses cookies in advertising', href: 'https://policies.google.com/technologies/ads' },
            { label: 'Google Ad Settings', href: GOOGLE_ADS_SETTINGS },
          ],
        },
        {
          heading: 'How to control cookies',
          paragraphs: [
            'You can change your choice at any time through the consent message, and delete or block cookies in your browser settings. Blocking advertising cookies does not affect the calculator.',
          ],
        },
      ],
    },
  },
};
