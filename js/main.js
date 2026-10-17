/* 3D PrintAll — interactions */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ---------- Printer: gantry height + object growth, 8s loop ---------- */
  const fill = document.querySelector('.print__fill');
  const gantry = document.querySelector('.printer__gantry');
  const pct = document.getElementById('printPct');
  const bar = document.getElementById('printBar');
  if (fill) {
    const LOOP = 8000;
    const t0 = performance.now();
    const frame = (now) => {
      const p = reduceMotion ? 1 : ((now - t0) % LOOP) / LOOP;
      gantry.style.setProperty('--p', p);
      fill.style.height = `${p * 100}%`;
      fill.style.webkitMaskSize = fill.style.maskSize = `100% ${(1 / Math.max(p, 0.001)) * 100}%`;
      const v = Math.floor(p * 100);
      pct.textContent = `${v}%`;
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
      label.textContent = 'Copiato!';
      showToast(`Codice ${code} copiato ✓`);
      setTimeout(() => { btn.classList.remove('is-copied'); label.textContent = 'Copia'; }, 2000);
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
