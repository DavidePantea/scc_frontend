import type { Language } from './language-context';

export const translations = {
  'nav.compare': { ro: 'Compară', en: 'Compare' },
  'nav.howItWorks': { ro: 'Cum Funcționează', en: 'How It Works' },
  'nav.advantages': { ro: 'Avantaje', en: 'Advantages' },
  'nav.contact': { ro: 'Contact', en: 'Contact' },
  'nav.sellerDashboard': { ro: 'Panou vânzător', en: 'Seller dashboard' },
  'nav.myAccount': { ro: 'Contul meu', en: 'My account' },
  'nav.menu': { ro: 'Meniu', en: 'Menu' },

  'account.login': { ro: 'Autentificare', en: 'Log in' },
  'account.signup': { ro: 'Creează cont', en: 'Sign up' },
  'account.logout': { ro: 'Deconectare', en: 'Log out' },

  'footer.tagline': {
    ro: 'Alegerea inteligentă pentru viitorul tău auto. Compară costurile și descoperă avantajele trecerii la o mașină nouă.',
    en: 'The smart choice for your automotive future. Compare costs and discover the advantages of switching to a new car.',
  },
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

  'field.advancedOptions': { ro: 'Opțiuni avansate (opțional)', en: 'Advanced options (optional)' },
  'field.yearlyKm': { ro: 'Kilometraj anual estimat', en: 'Estimated yearly mileage' },
  'field.yearlyKmPlaceholder': { ro: 'ex. 15000', en: 'e.g. 15000' },
  'field.city': { ro: 'Localitate principală', en: 'Primary city' },
  'field.cityPlaceholder': { ro: 'ex. București', en: 'e.g. Bucharest' },

  'disclaimer.estimateOnly': {
    ro: 'Aceste rezultate sunt estimări orientative generate de AI și nu constituie consultanță financiară. Costurile reale pot varia.',
    en: 'These results are AI-generated, indicative estimates and do not constitute financial advice. Actual costs may vary.',
  },

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
  'auth.signup.accountType': { ro: 'Tip de cont', en: 'Account type' },
  'auth.signup.accountType.buyer': { ro: 'Cumpărător', en: 'Buyer' },
  'auth.signup.accountType.buyerHint': {
    ro: 'Compară costuri și cercetează mașini.',
    en: 'Compare costs and research cars.',
  },
  'auth.signup.accountType.seller': { ro: 'Vânzător', en: 'Seller' },
  'auth.signup.accountType.sellerHint': {
    ro: 'Adaugă mașini de vânzare și compară-le cu altele.',
    en: 'List cars for sale and compare them against others.',
  },
  'auth.signup.accountType.fixedNotice': {
    ro: 'Tipul de cont nu poate fi schimbat ulterior.',
    en: 'The account type cannot be changed later.',
  },

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
  'account.estimates.loading': { ro: 'Se încarcă estimările tale...', en: 'Loading your estimates...' },
  'account.estimates.typeSingle': { ro: 'Estimare simplă', en: 'Single estimate' },
  'account.estimates.typeComparison': { ro: 'Comparație', en: 'Comparison' },

  'history.loginRequired': {
    ro: 'Trebuie să fii autentificat pentru a vedea această estimare salvată.',
    en: 'You need to be logged in to view this saved estimate.',
  },

  'seller.dashboard.title': { ro: 'Mașinile tale de vânzare', en: 'Your cars for sale' },
  'seller.dashboard.subtitle': {
    ro: 'Adaugă, editează și compară mașinile din inventarul tău.',
    en: 'Add, edit, and compare the cars in your inventory.',
  },
  'seller.dashboard.addNew': { ro: 'Adaugă mașină', en: 'Add a car' },
  'seller.dashboard.loading': { ro: 'Se încarcă inventarul tău...', en: 'Loading your inventory...' },
  'seller.dashboard.empty': {
    ro: 'Nu ai nicio mașină adăugată încă.',
    en: "You haven't added any cars yet.",
  },
  'seller.card.research': { ro: 'Cercetează', en: 'Research' },
  'seller.card.compare': { ro: 'Compară', en: 'Compare' },
  'seller.card.edit': { ro: 'Editează', en: 'Edit' },
  'seller.card.delete': { ro: 'Șterge', en: 'Delete' },
  'seller.card.deleteConfirm': {
    ro: 'Sigur vrei să ștergi această mașină? Estimările salvate pentru ea vor fi șterse și ele.',
    en: 'Delete this car? Any saved research about it will be deleted too.',
  },

  'seller.form.addTitle': { ro: 'Mașină nouă', en: 'New car' },
  'seller.form.editTitle': { ro: 'Editează mașina', en: 'Edit car' },
  'seller.form.price': { ro: 'Preț (LEI)', en: 'Price (LEI)' },
  'seller.form.vin': { ro: 'Serie șasiu (VIN, opțional)', en: 'VIN (optional)' },
  'seller.form.location': { ro: 'Localitate (opțional)', en: 'Location (optional)' },
  'seller.form.condition': { ro: 'Stare (opțional)', en: 'Condition (optional)' },
  'seller.form.conditionNone': { ro: 'Nespecificată', en: 'Unspecified' },
  'seller.form.description': { ro: 'Descriere (opțional)', en: 'Description (optional)' },
  'seller.form.photoUrls': { ro: 'Link-uri poze (opțional, unul pe linie)', en: 'Photo URLs (optional, one per line)' },
  'seller.form.status': { ro: 'Stare anunț', en: 'Listing status' },
  'seller.form.save': { ro: 'Salvează', en: 'Save' },
  'seller.form.saving': { ro: 'Se salvează...', en: 'Saving...' },
  'seller.form.cancel': { ro: 'Anulează', en: 'Cancel' },

  'seller.condition.excellent': { ro: 'Excelentă', en: 'Excellent' },
  'seller.condition.good': { ro: 'Bună', en: 'Good' },
  'seller.condition.fair': { ro: 'Satisfăcătoare', en: 'Fair' },
  'seller.condition.poor': { ro: 'Slabă', en: 'Poor' },

  'seller.status.active': { ro: 'Activ', en: 'Active' },
  'seller.status.sold': { ro: 'Vândut', en: 'Sold' },
  'seller.status.draft': { ro: 'Ciornă', en: 'Draft' },

  'seller.mode.toggleLabel': { ro: 'Mod vânzător', en: 'Seller mode' },
  'seller.mode.yourCar': { ro: 'Mașina ta', en: 'Your car' },
  'seller.mode.sellingPoints': { ro: 'Argumente de vânzare', en: 'Selling points' },
  'seller.mode.generating': { ro: 'Se generează argumentele de vânzare...', en: 'Generating selling points...' },
  'seller.mode.none': {
    ro: 'Nu s-au găsit argumente clare în favoarea acestei mașini.',
    en: 'No clear advantages were found for this car.',
  },
  'seller.mode.buyerNote': {
    ro: 'Vizibil doar pentru tine — dezactivează modul vânzător înainte de a arăta ecranul cumpărătorului.',
    en: 'Only visible to you — turn off seller mode before turning the screen toward the buyer.',
  },

  'source.standard': { ro: 'Mașină standard', en: 'Standard car' },
  'source.myInventory': { ro: 'Din inventarul meu', en: 'From my inventory' },
  'source.selectListing': { ro: 'Alege o mașină din inventar', en: 'Choose a car from your inventory' },
  'source.noListings': {
    ro: 'Nu ai nicio mașină în inventar încă.',
    en: "You don't have any cars in your inventory yet.",
  },
  'source.goToDashboard': { ro: 'Mergi la panoul de vânzător', en: 'Go to your seller dashboard' },

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
  'api.error.marketValueBadRequest': {
    ro: 'Vehiculul specificat nu pare a fi o mașină reală, așa că nu am putut estima valoarea de piață.',
    en: 'The specified vehicle does not appear to be a real car, so we could not estimate its market value.',
  },

  'marketValue.title': { ro: 'Valoare medie de piață', en: 'Average market value' },
  'marketValue.idle': {
    ro: 'Completează detaliile mașinii tale pentru a vedea valoarea medie de piață.',
    en: "Fill in your car's details to see its average market value.",
  },
  'marketValue.loading': { ro: 'Se caută...', en: 'Looking up...' },
  'marketValue.retry': { ro: 'Încearcă din nou', en: 'Retry' },
  'marketValue.in': { ro: 'în', en: 'in' },

  'howItWorks.heroTitle': { ro: 'Cum Funcționează', en: 'How It Works' },
  'howItWorks.heroSubtitle': {
    ro: 'De la câteva detalii despre mașina ta, la o decizie informată — în trei pași simpli.',
    en: 'From a few details about your car to an informed decision — in three simple steps.',
  },
  'howItWorks.step1Title': { ro: 'Completează detaliile mașinii', en: "Fill in your car's details" },
  'howItWorks.step1Desc': {
    ro: 'Introdu marca, modelul, anul, kilometrajul și tipul de combustibil pentru vehiculul tău actual — sau pentru două vehicule, dacă vrei să le compari.',
    en: "Enter the make, model, year, mileage, and fuel type for your current vehicle — or for two vehicles if you'd like to compare them.",
  },
  'howItWorks.step2Title': { ro: 'Primești o analiză bazată pe AI', en: 'Get an AI-powered analysis' },
  'howItWorks.step2Desc': {
    ro: 'În câteva secunde, calculăm costul total estimat — combustibil, întreținere, asigurare, taxe și depreciere — și identificăm problemele frecvente ale motorului.',
    en: 'In just a few seconds, we calculate the estimated total cost — fuel, maintenance, insurance, taxes, and depreciation — and flag common engine problems.',
  },
  'howItWorks.step3Title': { ro: 'Ia o decizie informată', en: 'Make an informed decision' },
  'howItWorks.step3Desc': {
    ro: 'Vezi rezultatul complet, însoțit de un scor de încredere, și decide dacă merită să treci la o mașină mai nouă.',
    en: 'See the full result along with a confidence score, and decide whether it’s worth switching to a newer car.',
  },
  'howItWorks.compareTitle': { ro: 'Vrei să compari două mașini?', en: 'Want to compare two cars?' },
  'howItWorks.compareDesc': {
    ro: 'Folosește pagina de comparație pentru a pune față în față vehiculul tău actual și o alternativă, cu aceleași estimări de cost și probleme frecvente afișate una lângă alta.',
    en: 'Use the comparison page to put your current vehicle head-to-head with an alternative, with the same cost estimates and common problems shown side by side.',
  },
  'howItWorks.compareCta': { ro: 'Compară vehicule', en: 'Compare vehicles' },
  'howItWorks.ctaTitle': { ro: 'Gata să afli cât te costă mașina ta?', en: 'Ready to find out what your car really costs?' },
  'howItWorks.ctaDesc': {
    ro: 'Durează mai puțin de un minut și nu necesită cont.',
    en: 'It takes less than a minute and no account is required.',
  },
  'howItWorks.ctaButton': { ro: 'Calculează estimarea', en: 'Calculate estimate' },

  'advantages.heroTitle': { ro: 'Avantaje', en: 'Advantages' },
  'advantages.heroSubtitle': {
    ro: 'De ce merită să folosești SmartCarCompare înainte de a lua o decizie despre mașina ta.',
    en: 'Why it pays off to use SmartCarCompare before making a decision about your car.',
  },
  'advantages.transparency.title': { ro: 'Transparență totală a costurilor', en: 'Full cost transparency' },
  'advantages.transparency.desc': {
    ro: 'Vezi exact cât te costă o mașină: combustibil, întreținere, asigurare, taxe și depreciere, într-un singur loc.',
    en: 'See exactly what a car costs you: fuel, maintenance, insurance, taxes, and depreciation, all in one place.',
  },
  'advantages.avoidRepairs.title': { ro: 'Evită reparațiile neprevăzute', en: 'Avoid unexpected repairs' },
  'advantages.avoidRepairs.desc': {
    ro: 'Identificăm problemele frecvente ale motorului înainte să apară, ca să nu fii luat prin surprindere.',
    en: "We flag common engine problems before they happen, so you're never caught off guard.",
  },
  'advantages.compareVehicles.title': { ro: 'Compară mai multe vehicule', en: 'Compare multiple vehicles' },
  'advantages.compareVehicles.desc': {
    ro: 'Pune două mașini față în față și vezi imediat care este alegerea mai avantajoasă.',
    en: 'Put two cars side by side and instantly see which is the smarter choice.',
  },
  'advantages.verifiedEstimates.title': { ro: 'Estimări verificate de AI', en: 'AI-verified estimates' },
  'advantages.verifiedEstimates.desc': {
    ro: 'Fiecare estimare trece printr-un proces de verificare, ca să primești un scor de încredere clar.',
    en: 'Every estimate goes through a verification process, giving you a clear confidence score.',
  },
  'advantages.warranty.title': { ro: 'Garanție extinsă și siguranță', en: 'Extended warranty and safety' },
  'advantages.warranty.desc': {
    ro: 'Mașinile mai noi vin cu garanții extinse și sisteme de siguranță avansate, reducând riscul unor costuri neașteptate.',
    en: 'Newer cars come with extended warranties and advanced safety systems, reducing the risk of unexpected costs.',
  },
  'advantages.predictable.title': { ro: 'Costuri lunare predictibile', en: 'Predictable monthly costs' },
  'advantages.predictable.desc': {
    ro: 'Cu o estimare clară a costurilor, poți bugeta lunar fără surprize neplăcute.',
    en: 'With a clear cost estimate, you can budget monthly without unpleasant surprises.',
  },
  'advantages.ctaTitle': { ro: 'Începe să compari chiar acum', en: 'Start comparing right now' },
  'advantages.ctaDesc': {
    ro: 'Vezi în câteva secunde dacă mașina ta actuală chiar merită costurile.',
    en: 'See in seconds whether your current car really is worth the costs.',
  },
  'advantages.ctaButton': { ro: 'Calculează estimarea', en: 'Calculate estimate' },

  'about.heroTitle': { ro: 'Despre Noi', en: 'About Us' },
  'about.heroSubtitle': {
    ro: 'Ajutăm oamenii care caută o mașină la mâna a doua să nu plătească mai mult decât își permit.',
    en: 'Helping people looking for a used car avoid paying more than they can afford.',
  },
  'about.mission.title': { ro: 'Misiunea noastră', en: 'Our mission' },
  'about.mission.desc': {
    ro: 'Prea mulți cumpărători aleg o mașină uitându-se doar la prețul de listare, iar apoi descoperă costuri ascunse de combustibil, întreținere, reparații și asigurare care le depășesc bugetul. SmartCarCompare a fost creat pentru a schimba asta: îți arătăm costul real, total, al unei mașini înainte să cumperi, ca decizia ta să se potrivească cu bugetul tău, nu invers.',
    en: 'Too many buyers pick a car by looking only at the listing price, then discover hidden fuel, maintenance, repair, and insurance costs that push them over budget. SmartCarCompare exists to change that: we show you the real, total cost of a car before you buy, so your decision fits your budget — not the other way around.',
  },
  'about.value1.title': { ro: 'Prețuri corecte, fără surprize', en: 'Fair prices, no surprises' },
  'about.value1.desc': {
    ro: 'Te ajutăm să vezi dincolo de prețul de vânzare, ca să nu ajungi să plătești pentru o mașină mai mult decât îți permite bugetul tău.',
    en: 'We help you look past the sale price, so you never end up paying more for a car than your budget allows.',
  },
  'about.value2.title': { ro: 'Transparență completă', en: 'Full transparency' },
  'about.value2.desc': {
    ro: 'Fiecare estimare arată clar din ce se compune costul total, ca să iei decizii informate, nu presupuneri.',
    en: 'Every estimate breaks down exactly what makes up the total cost, so you decide based on facts, not guesswork.',
  },
  'about.value3.title': { ro: 'Construit pe încredere', en: 'Built on trust' },
  'about.value3.desc': {
    ro: 'Estimările noastre sunt verificate, iar scopul nostru este să te ajutăm pe tine, nu să vindem o mașină anume.',
    en: 'Our estimates are verified, and our goal is to help you, not to sell you a particular car.',
  },
  'about.ctaTitle': { ro: 'Găsește mașina potrivită bugetului tău', en: 'Find the car that fits your budget' },
  'about.ctaDesc': {
    ro: 'Calculează în câteva secunde costul real al unei mașini, înainte să iei o decizie.',
    en: 'Calculate the real cost of a car in seconds, before you make a decision.',
  },
  'about.ctaButton': { ro: 'Calculează estimarea', en: 'Calculate estimate' },

  'contact.heroTitle': { ro: 'Contactează-ne', en: 'Contact Us' },
  'contact.heroSubtitle': {
    ro: 'Ai o întrebare, un feedback sau o sugestie? Ne-ar plăcea să auzim de la tine.',
    en: 'Have a question, feedback, or a suggestion? We would love to hear from you.',
  },
  'contact.email.title': { ro: 'Email', en: 'Email' },
  'contact.email.desc': {
    ro: 'Cel mai simplu mod de a ne contacta este prin email — de obicei răspundem în câteva zile lucrătoare.',
    en: 'The easiest way to reach us is by email — we typically reply within a few business days.',
  },
} as const satisfies Record<string, Record<Language, string>>;

export type TranslationKey = keyof typeof translations;
