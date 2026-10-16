(() => {
  'use strict';

  document.documentElement.classList.add('js');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Capability gates: full 3D only on a precise pointer with motion allowed
  // and reasonable hardware. Phones/tablets get the static premium look.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lowPower = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;
  const rich = !reducedMotion && finePointer && !lowPower;

  /* ---------- Nav state + year ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Chips: stagger + mark extras hidden on mobile ---------- */
  const OPTIONAL_ON_MOBILE = ['HTML', 'CSS', 'PHP'];
  $$('.chip').forEach((chip, i) => {
    chip.style.setProperty('--i', i);
    if (OPTIONAL_ON_MOBILE.includes(chip.textContent.trim())) chip.classList.add('is-optional');
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Hero portrait: 3D tilt + layered parallax ---------- */
  const stage = $('#stage');
  const frame = $('#frame');
  // Hand transform control back to CSS once the entrance animation finishes
  frame.addEventListener('animationend', () => { frame.style.animation = 'none'; }, { once: true });

  if (rich) {
    const layers = $$('[data-depth]', stage).map((el) => ({ el, depth: parseFloat(el.dataset.depth) }));
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    const tick = () => {
      // Ease toward the target so motion feels weighted, not twitchy
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      frame.style.setProperty('--ry', `${cx * 14}deg`);
      frame.style.setProperty('--rx', `${-cy * 14}deg`);
      frame.style.setProperty('--mx', `${50 + cx * 40}%`);
      frame.style.setProperty('--my', `${30 + cy * 40}%`);
      for (const { el, depth } of layers) {
        el.style.transform = `translate3d(${cx * depth * 18}px, ${cy * depth * 18}px, 0)`;
      }
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    // Track the cursor across the whole hero, normalised to -1..1 around the portrait
    $('.hero').addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height)));
      kick();
    });
    $('.hero').addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
  }

  /* ---------- Card tilt + spotlight ---------- */
  if (rich) {
    $$('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(px - 0.5) * 8}deg`);
        card.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- Videos: lazy-loaded, paused off-screen, removed if the file is missing ---------- */
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const ext = document.createElement('video').canPlayType('video/webm; codecs="vp9"') ? 'webm' : 'mp4';
  const load = (v) => { if (!v.getAttribute('src')) v.src = `${v.dataset.video}.${ext}`; };
  const play = (v) => { load(v); const p = v.play(); if (p) p.catch(() => {}); };
  const onView = (el, cb, threshold = 0) => {
    if (!('IntersectionObserver' in window)) return cb(true);
    new IntersectionObserver(([e]) => cb(e.isIntersecting), { threshold }).observe(el);
  };

  $$('video[data-video]').forEach((v) => {
    const trailer = v.closest('.trailer');
    const card = v.closest('.card');
    v.addEventListener('loadeddata', () => v.classList.add('is-ready'), { once: true });
    v.addEventListener('error', () => {
      if (card) card.classList.remove('has-video', 'is-playing');
      (trailer || v).remove();
    }, { once: true });

    if (trailer) {
      // Muted autoplay while in view; reduced-motion visitors get the poster and press play themselves
      onView(trailer, (on) => {
        if (reducedMotion) { load(v); return; }
        if (on) play(v); else v.pause();
      }, 0.4);
      return;
    }
    if (reducedMotion || saveData) { v.remove(); return; }

    if (card) {
      card.classList.add('has-video');
      const set = (on) => {
        card.classList.toggle('is-playing', on);
        if (on) play(v); else v.pause();
      };
      if (finePointer) {
        card.addEventListener('pointerenter', () => set(true));
        card.addEventListener('pointerleave', () => set(false));
      } else {
        onView(card, set, 0.6); // touch: play the card that's on screen
      }
      return;
    }
    onView(v.parentElement, (on) => { if (on && !document.hidden) play(v); else v.pause(); });
  });

  /* ---------- Particle network behind the hero ---------- */
  const canvas = $('#particles');
  const ctx = canvas.getContext('2d');
  if (!ctx || reducedMotion) return;

  const COLORS = ['47,227,154', '255,71,102', '200,210,220'];
  let w = 0, h = 0, dpr = 1, particles = [], running = true, frameId = 0;

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Density scales with area; capped low on weaker/mobile devices
    const count = Math.round(Math.min(rich ? 70 : 28, (w * h) / (rich ? 18000 : 30000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
      c: COLORS[(Math.random() * COLORS.length) | 0],
    }));
  };

  const LINK = 120;
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},.7)`;
      ctx.fill();
      if (!rich) continue; // skip O(n²) linking on low-end/mobile
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          ctx.strokeStyle = `rgba(${p.c},${0.12 * (1 - Math.sqrt(d2) / LINK)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    if (running) frameId = requestAnimationFrame(draw);
  };

  resize();
  addEventListener('resize', () => { cancelAnimationFrame(frameId); resize(); if (running) draw(); }, { passive: true });

  // Pause the canvas when the hero is off-screen or the tab is hidden
  const setRunning = (on) => {
    if (on === running) return;
    running = on;
    if (on) draw(); else cancelAnimationFrame(frameId);
  };
  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; setRunning(heroVisible && !document.hidden); })
    .observe($('.hero'));
  document.addEventListener('visibilitychange', () => setRunning(heroVisible && !document.hidden));

  draw();
})();
