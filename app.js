'use strict';

// ── STARFIELD BG ─────────────────────────────────────
// Very subtle. Not dramatic. Just quiet depth.
(function stars() {
  const c = document.getElementById('bg');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H;

  function resize() {
    W = c.width  = window.innerWidth;
    H = c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Generate stars once
  const STARS = Array.from({ length: 90 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.4 + Math.random() * 0.9,
    a: 0.1 + Math.random() * 0.35,
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.6,
  }));

  // A few drifting blush particles
  const DUST = Array.from({ length: 12 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vy: 0.00015 + Math.random() * 0.0002,
    vx: (Math.random() - 0.5) * 0.0001,
    r: 1 + Math.random() * 2,
    a: 0.08 + Math.random() * 0.12,
  }));

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;

    // Stars — gentle twinkle
    STARS.forEach(s => {
      const alpha = s.a * (0.6 + 0.4 * Math.sin(s.phase + t * s.speed));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,224,240,${alpha})`;
      ctx.fill();
    });

    // Drifting rose dust particles
    DUST.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.y > 1) { d.y = -0.02; d.x = Math.random(); }
      ctx.beginPath();
      ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196,122,138,${d.a})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ── REVEALS ──────────────────────────────────────────
(function reveals() {
  // Opening sequence
  const tag   = document.querySelector('.open-tag');
  const title = document.querySelector('.open-title');
  const sub   = document.querySelector('.open-sub');

  setTimeout(() => tag   && tag.classList.add('in'),   150);
  setTimeout(() => title && title.classList.add('in'),  350);
  setTimeout(() => sub   && sub.classList.add('in'),    900);

  // Wrap block content
  document.querySelectorAll('.hl,.accent,.bd,.c-small,.c-big,.c-sig').forEach(el => {
    el.classList.add('rev');
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add('in'), 60);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.rev').forEach(el => obs.observe(el));
})();
