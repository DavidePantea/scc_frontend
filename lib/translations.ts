import type { Language } from './language-context';

export const translations = {
  'nav.compare': { ro: 'Compară', en: 'Compare' },
  'nav.howItWorks': { ro: 'Cum Funcționează', en: 'How It Works' },
  'nav.advantages': { ro: 'Avantaje', en: 'Advantages' },
  'nav.contact': { ro: 'Contact', en: 'Contact' },

  'account.login': { ro: 'Autentificare', en: 'Log in' },
  'account.signup': { ro: 'Creează cont', en: 'Sign up' },
  'account.logout': { ro: 'Deconectare', en: 'Log out' },

  'footer.tagline': {
    ro: 'Alegerea inteligentă pentru viitorul tău auto. Compară costurile și descoperă avantajele trecerii la o mașină nouă.',
    en: 'The smart choice for your automotive future. Compare costs and discover the advantages of switching to a new car.',
  },
  'footer.usefulLinks': { ro: 'Informații Utile', en: 'Useful Links' },
  'footer.about': { ro: 'Despre Noi', en: 'About Us' },
  'footer.terms': { ro: 'Termeni și Condiții', en: 'Terms & Conditions' },
  'footer.privacy': { ro: 'Politica de Confidențialitate', en: 'Privacy Policy' },
  'footer.cookiePolicy': { ro: 'Politica Cookie', en: 'Cookie Policy' },
  'footer.contact': { ro: 'Contact', en: 'Contact' },
  'footer.phone': { ro: 'Telefon', en: 'Phone' },
  'footer.email': { ro: 'Email', en: 'Email' },
  'footer.address': { ro: 'Adresă', en: 'Address' },
  'footer.addressValue': { ro: 'București, România', en: 'Bucharest, Romania' },
  'footer.rightsReserved': { ro: 'Toate drepturile rezervate.', en: 'All rights reserved.' },

  'hero.titleLine1': { ro: 'DE LA SECOND-HAND', en: 'FROM SECOND-HAND' },
  'hero.titleLine2': { ro: 'LA SMART CHOICE', en: 'TO SMART CHOICE' },
  'hero.subtitle': {
    ro: 'Compară costul total de utilizare și descoperă cât de avantajos este să conduci un vehicul nou.',
    en: 'Compare the total cost of ownership and discover how advantageous it is to drive a new vehicle.',
  },

  'form.step1Title': { ro: 'Vehiculul tău actual', en: 'Your current vehicle' },
  'form.step1Subtitle': {
    ro: 'Completează detaliile de mai jos ca să vedem cât te costă cu adevărat mașina ta.',
    en: 'Fill in the details below so we can see how much your car really costs you.',
  },
  'field.make': { ro: 'Marcă', en: 'Make' },
  'field.makePlaceholder': { ro: 'ex. BMW', en: 'e.g. BMW' },
  'field.model': { ro: 'Model', en: 'Model' },
  'field.modelPlaceholder': { ro: 'ex. X5', en: 'e.g. X5' },
  'field.year': { ro: 'An fabricație', en: 'Year' },
  'field.km': { ro: 'Kilometraj (km)', en: 'Mileage (km)' },
  'field.fuel': { ro: 'Tip combustibil', en: 'Fuel type' },
  'field.drivingEnv': { ro: 'Mediu de condus predominant', en: 'Predominant driving environment' },
  'field.rural': { ro: 'Rural', en: 'Rural' },
  'field.urban': { ro: 'Urban', en: 'Urban' },

  'fuel.petrol': { ro: 'Benzină', en: 'Petrol' },
  'fuel.diesel': { ro: 'Diesel', en: 'Diesel' },
  'fuel.hybrid': { ro: 'Hibrid', en: 'Hybrid' },
  'fuel.electric': { ro: 'Electric', en: 'Electric' },

  'action.calculate': { ro: 'Calculează estimarea', en: 'Calculate estimate' },
  'action.calculating': { ro: 'Se calculează...', en: 'Calculating...' },

  'results.title': { ro: 'Analiza Estimării', en: 'Estimate Analysis' },
  'results.idle': {
    ro: 'Completează detaliile mașinii tale și apasă „Calculează estimarea” pentru a vedea analiza completă.',
    en: 'Fill in your car’s details and press "Calculate estimate" to see the full analysis.',
  },
  'results.loading': {
    ro: 'Se generează estimarea ta. Poate dura câteva secunde.',
    en: 'Generating your estimate. This may take a few seconds.',
  },
  'results.details': { ro: 'Detalii', en: 'Details' },

  'error.generic': {
    ro: 'A apărut o eroare neașteptată. Te rugăm să încerci din nou.',
    en: 'An unexpected error occurred. Please try again.',
  },

  'problems.title': { ro: 'Probleme frecvente', en: 'Common Problems' },
  'problems.idle': {
    ro: 'Problemele frecvente ale motorului vor apărea aici după calcularea estimării.',
    en: 'Common engine problems will appear here after calculating the estimate.',
  },
  'problems.loading': { ro: 'Se identifică problemele frecvente...', en: 'Identifying common problems...' },
  'problems.error': { ro: 'Analiza nu a putut fi generată.', en: 'The analysis could not be generated.' },
  'problems.none': {
    ro: 'Nu au fost identificate probleme frecvente notabile.',
    en: 'No notable common problems were identified.',
  },

  'severity.low': { ro: 'Risc scăzut', en: 'Low risk' },
  'severity.medium': { ro: 'Risc mediu', en: 'Medium risk' },
  'severity.high': { ro: 'Risc ridicat', en: 'High risk' },

  'period.annual': { ro: '/ an', en: '/ year' },
  'period.monthly': { ro: '/ lună', en: '/ month' },

  'costItem.total': { ro: 'Cost total anual estimat', en: 'Estimated total annual cost' },
  'costItem.fuel': { ro: 'Combustibil', en: 'Fuel' },
  'costItem.maintenance': { ro: 'Întreținere & Revizii', en: 'Maintenance & Servicing' },
  'costItem.repair': { ro: 'Reparații neprevăzute', en: 'Unforeseen Repairs' },
  'costItem.insurance': { ro: 'Asigurare (CASCO + RCA)', en: 'Insurance (Comprehensive + Liability)' },
  'costItem.tax': { ro: 'Taxe & Impozite', en: 'Taxes & Duties' },
  'costItem.depreciation': { ro: 'Pierdere valoare', en: 'Depreciation' },

  'result.title': { ro: 'Rezultatul Tău', en: 'Your Result' },
  'result.estimatedCost': { ro: 'Cost estimat', en: 'Estimated cost' },
  'result.confidence': { ro: 'Încredere estimare', en: 'Estimate confidence' },
  'result.verified': { ro: 'Estimare verificată', en: 'Verified estimate' },
  'result.revisions': { ro: 'revizii', en: 'revisions' },
  'result.placeholder': {
    ro: 'Completează formularul și apasă „Calculează estimarea” pentru a vedea costul estimat.',
    en: 'Fill in the form and press "Calculate estimate" to see the estimated cost.',
  },

  'trust.warranty': { ro: 'Garanție extinsă și siguranță', en: 'Extended warranty and safety' },
  'trust.predictable': { ro: 'Costuri predictibile lunare', en: 'Predictable monthly costs' },
  'trust.tech': { ro: 'Tehnologie și confort avansat', en: 'Advanced technology and comfort' },

  'cta.testDrive': { ro: 'Programează un test drive', en: 'Schedule a test drive' },
  'cta.download': { ro: 'Descarcă rezultatul', en: 'Download the result' },

  'stepper.step1': { ro: 'Selectează vehiculele', en: 'Select the vehicles' },
  'stepper.step2': { ro: 'Compară rezultatele', en: 'Compare the results' },

  'compare.titleA': { ro: 'Vehiculul tău', en: 'Your vehicle' },
  'compare.titleB': { ro: 'Vehiculul de comparat', en: 'Vehicle to compare' },
  'compare.subtitleA': {
    ro: 'Completează detaliile mașinii tale actuale.',
    en: 'Fill in the details of your current car.',
  },
  'compare.subtitleB': {
    ro: 'Completează detaliile vehiculului cu care vrei să compari.',
    en: 'Fill in the details of the vehicle you want to compare against.',
  },
  'compare.submit': { ro: 'Compară vehiculele', en: 'Compare vehicles' },
  'compare.editVehicles': { ro: '← Modifică vehiculele', en: '← Edit vehicles' },
  'compare.resultPlaceholder': {
    ro: 'Rezultatul va apărea aici după calcularea estimării.',
    en: 'The result will appear here after calculating the estimate.',
  },

  'auth.emailLabel': { ro: 'Email', en: 'Email' },
  'auth.passwordLabel': { ro: 'Parolă', en: 'Password' },

  'auth.login.title': { ro: 'Autentificare', en: 'Log in' },
  'auth.login.subtitle': {
    ro: 'Introdu datele contului tău pentru a continua.',
    en: 'Enter your account details to continue.',
  },
  'auth.login.submitting': { ro: 'Se autentifică...', en: 'Logging in...' },
  'auth.login.noAccount': { ro: 'Nu ai cont încă?', en: "Don't have an account yet?" },
  'auth.login.createOne': { ro: 'Creează unul', en: 'Create one' },

  'auth.signup.title': { ro: 'Creează cont', en: 'Create account' },
  'auth.signup.subtitle': { ro: 'Durează mai puțin de un minut.', en: 'It takes less than a minute.' },
  'auth.signup.nameLabel': { ro: 'Nume (opțional)', en: 'Name (optional)' },
  'auth.signup.passwordHint': { ro: 'Minim 8 caractere.', en: 'Minimum 8 characters.' },
  'auth.signup.submitting': { ro: 'Se creează contul...', en: 'Creating account...' },
  'auth.signup.haveAccount': { ro: 'Ai deja cont?', en: 'Already have an account?' },
  'auth.signup.login': { ro: 'Autentifică-te', en: 'Log in' },

  'account.welcomeBack': { ro: 'Bine ai revenit', en: 'Welcome back' },
  'account.subtitle': { ro: 'Contul tău SmartCarCompare.', en: 'Your SmartCarCompare account.' },
  'account.info.title': { ro: 'Informații cont', en: 'Account information' },
  'account.info.name': { ro: 'Nume', en: 'Name' },
  'account.info.email': { ro: 'Email', en: 'Email' },
  'account.info.emailStatus': { ro: 'Stare email', en: 'Email status' },
  'account.info.verified': { ro: 'Verificat', en: 'Verified' },
  'account.info.unverified': { ro: 'Neverificat', en: 'Unverified' },
  'account.info.memberSince': { ro: 'Membru din', en: 'Member since' },
  'account.estimates.title': { ro: 'Estimările tale', en: 'Your estimates' },
  'account.estimates.empty': {
    ro: 'Nu ai nicio estimare salvată încă. Calculează costul unei mașini pentru a o vedea aici.',
    en: "You don't have any saved estimates yet. Calculate a car's cost to see it here.",
  },
  'account.estimates.cta': { ro: 'Mergi la calculator', en: 'Go to calculator' },

  'auth.error.invalidCredentials': { ro: 'Email sau parolă incorectă.', en: 'Incorrect email or password.' },
  'auth.error.emailTaken': {
    ro: 'Există deja un cont cu acest email.',
    en: 'An account with this email already exists.',
  },
  'auth.error.invalidRequest': {
    ro: 'Te rugăm să completezi corect toate câmpurile (email valid, parolă de minim 8 caractere).',
    en: 'Please fill in all fields correctly (valid email, password with at least 8 characters).',
  },
  'auth.error.sessionExpired': {
    ro: 'Sesiunea ta a expirat. Te rugăm să te autentifici din nou.',
    en: 'Your session has expired. Please log in again.',
  },
  'auth.error.tooManyAttempts': {
    ro: 'Prea multe încercări. Te rugăm să încerci din nou peste câteva minute.',
    en: 'Too many attempts. Please try again in a few minutes.',
  },
  'auth.error.notConfigured': {
    ro: 'Adresa serviciului de autentificare nu este configurată (NEXT_PUBLIC_AUTH_API_URL).',
    en: 'The authentication service address is not configured (NEXT_PUBLIC_AUTH_API_URL).',
  },
  'auth.error.networkError': {
    ro: 'Nu am putut contacta serviciul de autentificare. Verifică-ți conexiunea la internet.',
    en: 'Could not reach the authentication service. Check your internet connection.',
  },

  'api.error.badRequest': {
    ro: 'Te rugăm să completezi toate câmpurile: marcă, model, an, kilometraj și tip combustibil.',
    en: 'Please fill in all fields: make, model, year, mileage, and fuel type.',
  },
  'api.error.serviceUnavailable': {
    ro: 'Serviciul de estimare este momentan indisponibil. Te rugăm să încerci din nou puțin mai târziu.',
    en: 'The estimate service is currently unavailable. Please try again later.',
  },
  'api.error.estimateFailed': {
    ro: 'Nu am reușit să generăm o estimare de cost chiar acum. Te rugăm să încerci din nou.',
    en: 'We could not generate a cost estimate right now. Please try again.',
  },
  'api.error.notConfigured': {
    ro: 'Adresa serviciului de estimare nu este configurată (NEXT_PUBLIC_API_URL).',
    en: 'The estimate service address is not configured (NEXT_PUBLIC_API_URL).',
  },
  'api.error.networkError': {
    ro: 'Nu am putut contacta serviciul de estimare. Verifică-ți conexiunea la internet.',
    en: 'Could not reach the estimate service. Check your internet connection.',
  },
  'api.error.unreadableResponse': {
    ro: 'Răspunsul primit de la serviciul de estimare nu a putut fi citit.',
    en: 'The response from the estimate service could not be read.',
  },
  'api.error.unexpectedResponse': {
    ro: 'Răspuns neașteptat de la serviciul de estimare.',
    en: 'Unexpected response from the estimate service.',
  },
} as const satisfies Record<string, Record<Language, string>>;

export type TranslationKey = keyof typeof translations;
