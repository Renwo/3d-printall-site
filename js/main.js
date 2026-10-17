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

  /* ---------- Printer: cycles through maker objects, layer by layer ---------- */
  const fill = document.querySelector('.print__fill');
  const gantry = document.querySelector('.printer__gantry');
  const pct = document.getElementById('printPct');
  const bar = document.getElementById('printBar');
  const file = document.getElementById('printFile');
  if (fill) {
    const svg = (viewBox, body) =>
      `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`)}")`;
    const logo = document.querySelector('#i-logo');
    const OBJECTS = [
      {
        name: '3dbenchy.gcode', f1: '#2dff60', f2: '#13b83f',
        shape: svg('0 0 100 100',
          '<path d="M3 60 L97 53 L90 76 Q84 94 68 100 L20 100 Q8 98 5 84 Z"/>' +
          '<path fill-rule="evenodd" d="M20 59 L20 30 L64 30 L64 57 Z M27 37 h12 v12 h-12 Z M46 37 h11 v12 h-11 Z"/>' +
          '<path d="M15 30 L69 30 L66 23 L18 23 Z M28 23 L28 6 Q33 3 38 6 L38 23 Z"/>'),
      },
      {
        nameKey: 'js.gear', f1: '#00d4ff', f2: '#0086b3',
        shape: svg('0 0 100 100',
          '<path fill-rule="evenodd" d="M41.5,14.9 44.6,6.3 55.4,6.3 58.5,14.9 61.7,15.8 68.7,9.9 78.0,15.3 76.4,24.3 78.7,26.6 87.7,25.0 93.1,34.3 87.2,41.3 88.1,44.5 96.7,47.6 96.7,58.4 88.1,61.5 87.2,64.7 93.1,71.7 87.7,81.0 78.7,79.4 76.4,81.7 78.0,90.7 68.7,96.1 61.7,90.2 58.5,91.1 55.4,99.7 44.6,99.7 41.5,91.1 38.3,90.2 31.3,96.1 22.0,90.7 23.6,81.7 21.3,79.4 12.3,81.0 6.9,71.7 12.8,64.7 11.9,61.5 3.3,58.4 3.3,47.6 11.9,44.5 12.8,41.3 6.9,34.3 12.3,25.0 21.3,26.6 23.6,24.3 22.0,15.3 31.3,9.9 38.3,15.8ZM39.0,53.0a11,11 0 1,0 22,0a11,11 0 1,0 -22,0ZM44.0,29.0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM64.8,41.0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM64.8,65.0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM44.0,77.0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM23.2,65.0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0ZM23.2,41.0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0Z"/>'),
      },
      {
        name: '3d_printall.gcode', f1: '#2dff60', f2: '#13b83f',
        shape: svg(logo.getAttribute('viewBox'), logo.innerHTML.replaceAll('currentColor', '#000')),
      },
    ];

    const PRINT = 8000, HOLD = 1400, LOOP = PRINT + HOLD;
    let current = -1;
    const setObject = (i) => {
      const o = OBJECTS[i];
      fill.style.webkitMaskImage = fill.style.maskImage = o.shape;
      fill.style.setProperty('--f1', o.f1);
      fill.style.setProperty('--f2', o.f2);
      file.textContent = o.nameKey ? t(o.nameKey) : o.name;
      current = i;
    };

    document.addEventListener('langchange', () => current >= 0 && setObject(current));

    const t0 = performance.now();
    const frame = (now) => {
      const elapsed = reduceMotion ? PRINT : (now - t0) % LOOP;
      const i = reduceMotion ? 0 : Math.floor((now - t0) / LOOP) % OBJECTS.length;
      if (i !== current) setObject(i);
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
    const shots = [...document.querySelectorAll('.phone__screen img')];
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
