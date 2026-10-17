/* 3D PrintAll — language handling.
   Italian lives in index.html; English translations are below.
   Elements opt in with data-i18n="key" (inner HTML) or data-i18n-attr="attr:key". */
(() => {
  const STRINGS = {
    "it": {
      "meta.title": "3D PrintAll — Stampa 3D & Fai da te",
      "meta.desc": "3D PrintAll: stampa 3D, incisione laser, elettronica e fai da te. Progetti, modelli da scaricare e offerte per maker. Oltre 500.000 follower su Instagram, TikTok, YouTube e Facebook.",
      "js.copied": "Copiato!",
      "js.toast": "Codice {code} copiato ✓",
      "js.done": "COMPLETATO ✓",
      "js.gear": "ingranaggio.gcode"
    },
    "en": {
      "nav.models": "3D Models",
      "nav.deals": "Deals",
      "nav.collab": "Work with me",
      "hero.eyebrow": "<span class=\"dot\"></span> 3D Printing · DIY · Maker",
      "hero.t1": "Giving shape",
      "hero.t2": "to ideas.",
      "hero.lead": "3D printing, laser engraving, electronics and DIY: real projects, from idea to finished piece. Every day, layer by layer, with a community of over <strong>500,000 makers</strong>.",
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
      "app.f5d": "Find every quote again and download it as a PDF, ready to send to your customer.",
      "app.f6t": "Tailored to you",
      "app.f6d": "Italian or English, euro or dollars, energy cost, hourly rate and depreciation.",
      "app.available": "Get it on",
      "app.free": "Free",
      "app.fdm": "FDM &amp; resin",
      "models.eyebrow": "// 03 — 3D Models",
      "models.title": "My models, ready to print",
      "models.sub": "Download STL / 3MF files from the main platforms.",
      "models.mw": "My MakerWorld page, with optimised print profiles.",
      "models.cults": "A collection of original models, free and premium.",
      "models.nex": "My projects, on Nexprint too.",
      "models.visit": "Visit the page →",
      "deals.eyebrow": "// 04 — Deals & Coupons",
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
      "cta.eyebrow": "// 06 — Collaborations",
      "cta.title": "Got a product for makers?<br><span class=\"grad\">Let’s talk.</span>",
      "cta.sub": "Reviews, sponsorships and custom projects for brands in 3D printing, laser and tools.",
      "footer.vat": "Bartiromo Giuseppe · VAT IT02753640032",
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
      "meta.title": "3D PrintAll — 3D Printing & DIY",
      "meta.desc": "3D PrintAll: 3D printing, laser engraving, electronics and DIY. Projects, downloadable models and deals for makers. Over 500,000 followers on Instagram, TikTok, YouTube and Facebook.",
      "js.copied": "Copied!",
      "js.toast": "Code {code} copied ✓",
      "js.done": "COMPLETE ✓",
      "js.gear": "gear.gcode"
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
  const italian = { ...STRINGS.it };
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
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.desc'));
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
