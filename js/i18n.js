/* 3D PrintAll — language handling.
   Italian lives in index.html; English translations are below.
   Elements opt in with data-i18n="key" (inner HTML) or data-i18n-attr="attr:key". */
(() => {
  const STRINGS = {
    "it": {
      "meta.title": "3D PrintAll — Stampa 3D & Fai da te",
      "meta.desc": "3D PrintAll: stampa 3D, incisione laser, elettronica e fai da te. Progetti, modelli da scaricare e offerte per maker. Oltre 500.000 follower su Instagram, TikTok, YouTube e Facebook.",
      "js.copied": "Copiato!",
      "cta.copied": "Email copiata ✓",
      "js.toast": "Codice {code} copiato ✓",
      "js.done": "COMPLETATO ✓",
      "sv.yes": "sì",
      "sv.no": "no",
      "sv.mailSubject": "Richiesta preventivo — {service}",
      "sv.copiedText": "Testo copiato ✓",
      "sv.mailTo": "A",
      "sv.mailSubjectLabel": "Oggetto",
      "sv.mailBody": "Ciao,\n\nvorrei un preventivo per: {service}\nQuantità: {qty}\nHo già il file o un disegno: {file}\n\nDescrizione:\n{desc}\n\nGrazie!"
    },
    "en": {
      "nav.models": "3D Models",
      "nav.deals": "Deals",
      "nav.collab": "Work with me",
      "hero.eyebrow": "<span class=\"dot\"></span> 3D Printing · DIY · Maker",
      "hero.t1": "Giving shape",
      "hero.t2": "to ideas.",
      "hero.lead": "3D printing, laser engraving, electronics and DIY: real projects, from idea to finished piece. I also hunt down the best projects online, build them myself and share them with over <strong>500,000 followers</strong>.",
      "hero.cta1": "Follow me on social",
      "hero.cta2": "Download the models →",
      "stats.followers": "Total followers",
      "stats.platforms": "Social platforms",
      "stats.since": "Online since",
      "social.title": "Where to find me",
      "social.sub": "New content every week. Pick your favourite platform.",
      "app.eyebrow": "// 02 — My app",
      "app.title": "How much does your print <span class=\"grad\">really</span> cost?",
      "app.sub": "<strong>3D Cost Estimation</strong> works out the price of every 3D print, FDM or resin, taking into account material, energy, printer depreciation and design hours. And it keeps track of how much filament is left on every spool.",
      "app.f1t": "A quote in seconds",
      "app.f1d": "Enter print hours, grams and printer: the app gives you the price to charge and your real costs.",
      "app.f2t": "Multicolour prints",
      "app.f2d": "Up to 4 different filaments in the same print, each with its own price per kg.",
      "app.f3t": "Your filament inventory",
      "app.f3d": "Save up to 40 spools and see at a glance how many grams are left on each one.",
      "app.f4t": "Stock always up to date",
      "app.f4d": "After every print, quantities update automatically, and the app warns you if a spool won't be enough.",
      "app.f5t": "History and PDF quotes",
      "app.f5d": "Every quote gets its own progressive number, customer and notes: find it again in your history and download it as a PDF, ready to send.",
      "app.f6t": "Tailored to you",
      "app.f6d": "Italian or English, euro or dollars, energy cost, hourly rate and depreciation. And with the backup you can move all your data to a new phone.",
      "app.f7t": "PDFs with your brand",
      "app.f7d": "Logo, business details, colour, validity and footer text: your quote speaks for you.",
      "app.f8t": "Statistics on your work",
      "app.f8d": "Revenue, margin, accepted quotes, material used and most used filaments, by month or by year.",
      "app.available": "Get it on",
      "app.free": "Free",
      "app.fdm": "FDM &amp; resin",
      "models.eyebrow": "// 04 — 3D Models",
      "models.title": "My models, ready to print",
      "models.sub": "Download STL / 3MF files from the main platforms.",
      "models.mw": "My MakerWorld page, with optimised print profiles.",
      "models.cults": "A collection of original models, free and premium.",
      "models.nex": "My projects, on Nexprint too.",
      "models.visit": "Visit the page →",
      "deals.eyebrow": "// 05 — Deals & Coupons",
      "deals.title": "Tools I use, at a special price",
      "deals.sub": "Exclusive discount codes for the community. Click a code to copy it.",
      "deals.hoto": "Smart power tools with a refined design.",
      "deals.copy": "Copy",
      "deals.shop": "Go to the shop",
      "deals.lp": "Portable laser engravers for your projects.",
      "deals.tripo": "Generate 3D models with artificial intelligence.",
      "deals.tryTripo": "Try Tripo",
      "deals.elegoo": "Combo with multicolour system.",
      "deals.see": "See the deal",
      "deals.snap": "Multicolour 3D printer with tool changer.",
      "deals.appTitle": "App: 3D print cost",
      "deals.appText": "Work out the real cost of every print. Free on Android.",
      "deals.appBtn": "Discover the app",
      "deals.disclaimer": "Some links are affiliate links: buying through them supports the channel at no extra cost to you.",
      "tg.title": "Telegram channels",
      "tg.sub": "Deals on printers, filaments and accessories, hand-picked every day.",
      "tg.itDesc": "Deals channel in Italian",
      "tg.chat": "Italian chat group",
      "tg.chatDesc": "Questions, tips and discussion",
      "cta.eyebrow": "// 07 — Collaborations",
      "cta.title": "Got a product for makers?<br><span class=\"grad\">Let’s talk.</span>",
      "cta.sub": "Reviews, sponsorships and custom projects for brands in 3D printing, laser and tools.",
      "footer.vat": "Bartiromo Giuseppe · VAT IT02753640032 · Novara, Italy",
      "nav.aria": "Main navigation",
      "nav.menu": "Open menu",
      "hero.scroll": "Scroll down",
      "app.aria": "App features",
      "footer.top": "3D PrintAll - back to top",
      "app.alt1": "Cost estimate screen showing an estimated price of €18.80",
      "app.alt2": "Estimate with two different filaments in the same print",
      "app.alt3": "List of saved filaments with the grams left",
      "app.alt4": "Summary of updated quantities after printing",
      "app.alt5": "Quote details with a button to download the PDF",
      "app.alt6": "Settings: language, currency, energy cost and design rate",
      "app.alt7": "PDF settings: logo, business details and colour",
      "app.alt8": "Statistics: revenue, margin, completed quotes and conversion and average margin gauges",
      "meta.title": "3D PrintAll — 3D Printing & DIY",
      "meta.desc": "3D PrintAll: 3D printing, laser engraving, electronics and DIY. Projects, downloadable models and deals for makers. Over 500,000 followers on Instagram, TikTok, YouTube and Facebook.",
      "js.copied": "Copied!",
      "js.toast": "Code {code} copied ✓",
      "js.done": "COMPLETE ✓",
      "teaser.sub": "<strong>3D Cost Estimation</strong> works out the price and costs of every 3D print, FDM or resin, creates PDF quotes with your logo, keeps track of how much filament is left on every spool and shows you how much you earn.",
      "teaser.btn": "Discover the app →",
      "ap.metaTitle": "3D Cost Estimation — Calculate the cost of your 3D prints",
      "ap.metaDesc": "3D Cost Estimation: the free Android app to calculate the cost and price of every 3D print, FDM or resin, manage your filament spools, create PDF quotes with your logo and keep an eye on revenue and margins.",
      "ap.eyebrow": "<span class=\"dot\"></span> Android and browser · Free",
      "ap.lead": "The app that tells you what every 3D print really costs and how much to charge for it. Material, energy, depreciation and design in a single calculation, plus your spool inventory, always up to date.",
      "ap.how": "How it works ↓",
      "ap.webBtn": "Use it in your browser →",
      "ap.webBtn2": "or use it in your browser →",
      "ap.tagPdf": "PDF quotes",
      "ap.tagStats": "Statistics",
      "ap.altHome": "Main screen of the 3D Cost Estimation app",
      "ap.n1": "Filaments per print",
      "ap.n2": "Spools in your inventory",
      "ap.n3": "Technologies: FDM and resin",
      "ap.n4": "Personal data collected",
      "ap.howEyebrow": "// 01 — How it works",
      "ap.howTitle": "From file to quote in three steps",
      "ap.s1t": "Set up once",
      "ap.s1d": "Add your printers, filaments and resins, then set energy cost, hourly design rate and depreciation.",
      "ap.s2t": "Enter the print",
      "ap.s2d": "Print hours, grams of material, number of parts and any design hours: you already have them in your slicer.",
      "ap.s3t": "Get the price",
      "ap.s3d": "The app works out price and costs: save the quote in your history and send it as a PDF with your logo. Once the job is done, your spools update automatically.",
      "ap.tryEyebrow": "// 02 — Try it",
      "ap.tryTitle": "Try it here, <span class=\"grad\">nothing to install</span>",
      "ap.trySub": "It's the real app, with the same features as the Android version: work out a quote, save your filaments, download the PDF.",
      "ap.tryP1": "Your data stays only in this browser, no account",
      "ap.tryP2": "The backup can also be imported in the Android app, and vice versa",
      "ap.tryP3": "On a smartphone it opens full screen, like an app",
      "ap.tryFull": "Open full screen ↗",
      "ap.tryOpen": "Open the app →",
      "ap.tryStart": "Try the app",
      "ap.featEyebrow": "// 03 — Features",
      "ap.costEyebrow": "// 04 — The calculation",
      "ap.costTitle": "Everything that goes into the price",
      "ap.costSub": "Not just filament: the app accounts for every cost, so you never work at a loss.",
      "ap.c1t": "Material",
      "ap.c1d": "Grams used and price per kg of every spool or resin, even with multiple materials.",
      "ap.c2t": "Energy",
      "ap.c2d": "Your printer's average power draw, print hours and the kWh cost you set.",
      "ap.c3t": "Depreciation",
      "ap.c3d": "Machine wear, as an hourly cost for every hour of printing.",
      "ap.c4t": "Design",
      "ap.c4d": "The hours spent modelling or preparing the file, at your hourly rate.",
      "ap.costNote": "The result is an estimate: use it as the basis for your quote.",
      "ap.privTitle": "Your data stays on your phone",
      "ap.privText": "No account, no tracking, no ads. Filaments, printers, quotes and statistics are saved only on your device (or in your browser, with the web version), and you export the backup yourself, wherever you like.",
      "ap.privLink": "App privacy policy",
      "ap.privShort": "App privacy",
      "ap.faqEyebrow": "// 05 — FAQ",
      "ap.faqTitle": "Frequently asked questions",
      "ap.q1": "Is the app free?",
      "ap.a1": "Yes, you can download it for free from Google Play.",
      "ap.qIos": "Is it available for iOS?",
      "ap.aIos": "There is no iPhone app, but you can use the web version in Safari. With \"Add to Home Screen\" it opens like an app.",
      "ap.qWeb": "Can I use it on my computer?",
      "ap.aWeb": "Yes, the web version works in any browser, with nothing to install and the same features as the app. Your data stays saved in that browser: export a backup now and then, which you can also import in the Android app and vice versa.",
      "ap.q2": "Do I need to create an account?",
      "ap.a2": "No. No sign-up is needed and all your data stays saved on your phone.",
      "ap.q3": "Does it work with resin printers too?",
      "ap.a3": "Yes: you can choose between FDM and resin and save your resins too. If you only print FDM, you can hide the resin section in the settings.",
      "ap.q4": "Is the calculated price final?",
      "ap.a4": "It's an estimate based on the parameters you enter. It's a great starting point for your quote, which you can then adapt to the customer.",
      "ap.q5": "Can I use it in English or in dollars?",
      "ap.a5": "Yes, in the settings you can choose Italian or English and euro or dollars.",
      "ap.q6": "Can I put my logo on the quotes?",
      "ap.a6": "Yes. In Settings &gt; Business details &amp; PDF you can add your logo, name, contacts and VAT number, choose the colour and validity of the quote and decide which details to show the customer.",
      "ap.q7": "How do the statistics work?",
      "ap.a7": "They count the quotes you mark as completed in your history, in the month you complete them: you see revenue, costs, margin, material and printing hours for the period you choose.",
      "ap.q8": "Will I lose my data if I change phone?",
      "ap.a8": "No. From Settings &gt; Backup you export all your data to a file and import it on the new phone or in the web version. On Android your data is also saved in Google's automatic backup, if it is enabled.",
      "ap.ctaTitle": "Stop <span class=\"grad\">guessing.</span>",
      "ap.ctaSub": "Download 3D Cost Estimation and put together your next quote in seconds.",
      "nav.services": "Services",
      "sv.eyebrow": "// 03 — Services",
      "sv.title": "Your project, <span class=\"grad\">made by me</span>",
      "footer.terms": "Terms of sale",
      "sv.terms": "Read the terms of sale",
      "models.shareTitle": "Printed one of my models?",
      "models.shareText": "Share a photo on social media and tag my pages: I repost your prints on my channels!",
      "cta.copyLabel": "Copy email address",
      "cta.copied": "Email copied ✓",
      "sv.audience": "For individuals and businesses",
      "sv.sub": "The same machines and the same care you see in my videos, at the service of your idea: 3D printing and laser engraving on demand.",
      "sv.printTitle": "3D printing on demand",
      "sv.printText": "From your file or from an idea we develop together: one-off parts, spare parts, prototypes and small batches.",
      "sv.p1": "Printing from STL, 3MF or STEP files",
      "sv.p2": "Prototypes, spare parts and custom objects",
      "sv.p3": "Multiple materials and colours, multicolour too",
      "sv.p4": "Advice on material and part strength",
      "sv.laserTitle": "Laser engraving",
      "sv.laserText": "Logos, names, drawings and text engraved with precision for gifts, gadgets and one-of-a-kind objects.",
      "sv.l1": "Engraving on wood, metal, leather, cardboard and other materials",
      "sv.l2": "Personalising your own items or ones I supply",
      "sv.l3": "Company logos, plaques and gadgets",
      "sv.l4": "From your vector file or an image",
      "sv.examples": "Examples",
      "sv.t1": "🎁 Personalised gifts",
      "sv.t2": "🏷️ Corporate gadgets",
      "sv.t3": "🔧 Spare parts",
      "sv.t4": "🧪 Prototypes",
      "sv.t5": "🎭 Cosplay and props",
      "sv.t6": "🪧 Plaques and signs",
      "sv.s1t": "Tell me about your project",
      "sv.s1d": "Send me the file, a photo or even just an idea.",
      "sv.s2t": "Get a quote",
      "sv.s2d": "I reply with costs, materials and timing.",
      "sv.s3t": "I make it",
      "sv.s3d": "Printing or engraving, with a final check of the part.",
      "sv.s4t": "You receive it",
      "sv.s4d": "I ship it to your door, across Italy and Europe.",
      "sv.qTitle": "Request a quote",
      "sv.qText": "Pick the service and describe what you need: I'll draft the email, you just send it from your email app.",
      "sv.qService": "Service",
      "sv.optPrint": "3D printing",
      "sv.optLaser": "Laser engraving",
      "sv.optBoth": "Both",
      "sv.qDescLabel": "What do you need?",
      "sv.qDescPh": "E.g. a phone stand in black PETG, about 10 cm",
      "sv.qQty": "Quantity",
      "sv.qFile": "I already have a file or drawing",
      "sv.qSend": "Draft the email →",
      "sv.qNote": "Your email app will open with the message already written. If you have files or photos, attach them there.",
      "sv.yes": "yes",
      "sv.no": "no",
      "sv.mailSubject": "Quote request — {service}",
      "sv.fbText": "Nothing opened? Send the email from here:",
      "sv.fbCopy": "Copy the text",
      "sv.fbTo": "Address:",
      "sv.copiedText": "Text copied ✓",
      "sv.mailTo": "To",
      "sv.mailSubjectLabel": "Subject",
      "sv.mailBody": "Hi,\n\nI would like a quote for: {service}\nQuantity: {qty}\nI already have a file or drawing: {file}\n\nDescription:\n{desc}\n\nThank you!"
    }
  };

  const STORAGE_KEY = 'lang';
  const read = () => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } };
  const save = (v) => { try { localStorage.setItem(STORAGE_KEY, v); } catch {} };

  // Italian only when the browser's preferred language is Italian; English otherwise
  const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  const stored = read();
  let lang = stored === 'it' || stored === 'en' ? stored : (/^it(-|$)/i.test(browserLang) ? 'it' : 'en');

  // Remember the Italian markup so we can switch back without a reload
  const textEls = [...document.querySelectorAll('[data-i18n]')];
  const attrEls = [...document.querySelectorAll('[data-i18n-attr]')];
  // Each page names its own title/description keys on <html>
  const titleKey = document.documentElement.dataset.i18nTitle || 'meta.title';
  const descKey = document.documentElement.dataset.i18nDesc || 'meta.desc';
  const metaDesc = document.querySelector('meta[name="description"]');
  const italian = { ...STRINGS.it };
  italian[titleKey] ??= document.title;
  if (metaDesc) italian[descKey] ??= metaDesc.getAttribute('content');
  textEls.forEach(el => { italian[el.dataset.i18n] ??= el.innerHTML; });
  attrEls.forEach(el => el.dataset.i18nAttr.split(';').forEach(pair => {
    const [attr, key] = pair.split(':');
    italian[key] ??= el.getAttribute(attr);
  }));

  const t = (key, vars = {}) => {
    const s = (lang === 'en' ? STRINGS.en[key] : italian[key]) ?? italian[key] ?? key;
    return s.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? '');
  };

  const apply = () => {
    document.documentElement.lang = lang;
    textEls.forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    attrEls.forEach(el => el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      el.setAttribute(attr, t(key));
    }));
    document.title = t(titleKey);
    metaDesc?.setAttribute('content', t(descKey));
    document.querySelectorAll('.lang-switch button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    document.querySelector('.lang-switch')?.setAttribute('data-active', lang);
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  };

  const set = (next) => {
    if (next === lang) return;
    lang = next; save(lang); apply();
  };

  document.querySelectorAll('.lang-switch button').forEach(b => b.addEventListener('click', () => set(b.dataset.lang)));

  window.i18n = { t, set, get lang() { return lang; } };
  apply();
})();
