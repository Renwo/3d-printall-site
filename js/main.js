/* 3D PrintAll — interactions */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = (key, vars) => (window.i18n ? window.i18n.t(key, vars) : key);

  /* ---------- Nav: scrolled state + mobile toggle ---------- */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- Scroll reveal (staggered per group) ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * 80}ms`;
      el.classList.add('is-visible');
      revealObs.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ---------- Animated counters ---------- */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const plain = el.hasAttribute('data-plain');
      const start = plain ? target - 30 : 0;
      const duration = reduceMotion ? 0 : 1600;
      const t0 = performance.now();
      const tick = (now) => {
        const p = duration ? Math.min(1, (now - t0) / duration) : 1;
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (target - start) * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

  /* ---------- Printer: prints the logo, layer by layer ---------- */
  const fill = document.querySelector('.print__fill');
  const gantry = document.querySelector('.printer__gantry');
  const pct = document.getElementById('printPct');
  const bar = document.getElementById('printBar');
  if (fill) {
    const logo = document.querySelector('#i-logo');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${logo.getAttribute('viewBox')}">${logo.innerHTML.replaceAll('currentColor', '#000')}</svg>`;
    fill.style.webkitMaskImage = fill.style.maskImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

    const PRINT = 8000, HOLD = 1400, LOOP = PRINT + HOLD;
    const t0 = performance.now();
    const frame = (now) => {
      const elapsed = reduceMotion ? PRINT : (now - t0) % LOOP;
      const p = Math.min(1, elapsed / PRINT);
      gantry.style.setProperty('--p', p);
      fill.style.clipPath = `inset(${(1 - p) * 100}% 0 0 0)`;
      const v = Math.floor(p * 100);
      pct.textContent = p < 1 ? `${v}%` : t('js.done');
      bar.style.width = `${v}%`;
      if (!reduceMotion) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  /* ---------- Hero background: isometric build-plate dots ---------- */
  const canvas = document.getElementById('heroGrid');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, mouse = { x: -9999, y: -9999 };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

    const GAP = 34;
    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

    const draw = (t) => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (let y = GAP / 2; y < h; y += GAP) {
          for (let x = GAP / 2; x < w; x += GAP) {
            const dx = x - mouse.x, dy = y - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const near = Math.max(0, 1 - d / 180);
            const wave = (Math.sin(x * 0.012 + y * 0.018 + t * 0.0012) + 1) / 2;
            const r = 1 + wave * 0.8 + near * 2.4;
            ctx.fillStyle = near > 0.02
              ? `rgba(255,106,26,${0.25 + near * 0.6})`
              : `rgba(255,255,255,${0.05 + wave * 0.08})`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  /* ---------- App showcase: feature tabs drive the phone screen ---------- */
  const featureList = document.querySelector('.app__features');
  if (featureList) {
    const features = [...featureList.querySelectorAll('.feature')];
    const shots = [...featureList.closest('.app__grid').querySelectorAll('.phone__screen img')];
    const DUR = 5000;
    let active = 0, timer, paused = false, inView = false;
    featureList.style.setProperty('--dur', `${DUR}ms`);

    const show = (i) => {
      active = (i + features.length) % features.length;
      features.forEach((f, k) => {
        const on = k === active;
        f.classList.toggle('is-active', on);
        f.setAttribute('aria-selected', on);
        // restart the progress bar animation
        const bar = f.querySelector('.feature__bar');
        bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
      });
      shots.forEach((s, k) => s.classList.toggle('is-active', k === active));
      schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      if (!reduceMotion && !paused && inView) timer = setTimeout(() => show(active + 1), DUR);
    };
    const setPaused = (v) => { paused = v; featureList.classList.toggle('is-paused', v); v ? clearTimeout(timer) : show(active); };

    features.forEach((f, k) => f.addEventListener('click', () => show(k)));
    featureList.addEventListener('mouseenter', () => setPaused(true));
    featureList.addEventListener('mouseleave', () => setPaused(false));
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? show(active) : clearTimeout(timer); }, { threshold: 0.3 })
      .observe(featureList);
  }

  /* ---------- Quote composer: prepares an email, the site sends nothing ---------- */
  const quoteSend = document.getElementById('quoteSend');
  if (quoteSend) {
    const chips = [...document.querySelectorAll('.quote .chip')];
    let service = 'print';
    chips.forEach(c => c.addEventListener('click', () => {
      service = c.dataset.service;
      chips.forEach(x => { x.classList.toggle('is-on', x === c); x.setAttribute('aria-pressed', x === c); });
    }));
    const SERVICE_KEYS = { print: 'sv.optPrint', laser: 'sv.optLaser', both: 'sv.optBoth' };
    const TO = '3d.printall.contacts@gmail.com';
    const fallback = document.getElementById('quoteFallback');
    let draft = null;

    quoteSend.addEventListener('click', () => {
      const vars = {
        service: t(SERVICE_KEYS[service]),
        qty: document.getElementById('quoteQty').value,
        file: t(document.getElementById('quoteFile').checked ? 'sv.yes' : 'sv.no'),
        desc: document.getElementById('quoteDesc').value.trim() || '—',
      };
      draft = { subject: t('sv.mailSubject', vars), body: t('sv.mailBody', vars) };
      const su = encodeURIComponent(draft.subject), bo = encodeURIComponent(draft.body);

      // mailto only works with a desktop/mobile mail app: offer webmail as a fallback
      document.getElementById('quoteGmail').href =
        `https://mail.google.com/mail/?view=cm&fs=1&to=${TO}&su=${su}&body=${bo}`;
      document.getElementById('quoteOutlook').href =
        `https://outlook.live.com/mail/0/deeplink/compose?to=${TO}&subject=${su}&body=${bo}`;
      fallback.hidden = false;
      window.location.href = `mailto:${TO}?subject=${su}&body=${bo}`;
    });

    document.getElementById('quoteCopy').addEventListener('click', async () => {
      if (!draft) return;
      const text = `${t('sv.mailTo')}: ${TO}\n${t('sv.mailSubjectLabel')}: ${draft.subject}\n\n${draft.body}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = Object.assign(document.createElement('textarea'), { value: text });
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      }
      showToast(t('sv.copiedText'));
    });
  }

  /* ---------- Copy email address ---------- */
  const copyEmail = document.getElementById('copyEmail');
  if (copyEmail) {
    copyEmail.addEventListener('click', async () => {
      const email = copyEmail.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        const ta = Object.assign(document.createElement('textarea'), { value: email });
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      }
      copyEmail.classList.add('is-copied');
      showToast(t('cta.copied'));
      setTimeout(() => copyEmail.classList.remove('is-copied'), 2000);
    });
  }

  /* ---------- Coupon copy ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  };
  document.querySelectorAll('.coupon').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.dataset.code;
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        const ta = Object.assign(document.createElement('textarea'), { value: code });
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      }
      const label = btn.querySelector('em');
      btn.classList.add('is-copied');
      label.textContent = t('js.copied');
      showToast(t('js.toast', { code }));
      setTimeout(() => { btn.classList.remove('is-copied'); label.textContent = t('deals.copy'); }, 2000);
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
