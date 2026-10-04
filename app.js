'use strict';

// ── FALLING PETALS ──────────────────────────────────
// Gentle, sparse. Not a storm — just a few.
(function initPetals() {
  const canvas = document.getElementById('petals');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Petal colors — all in the rose/blush family
  const COLORS = [
    'rgba(196,122,122,',  // blush
    'rgba(210,160,160,',  // soft rose
    'rgba(230,190,190,',  // pale pink
    'rgba(180,120,140,',  // mauve rose
  ];

  class Petal {
    constructor(init) {
      this.reset(init);
    }
    reset(fromTop) {
      this.x  = Math.random() * W;
      this.y  = fromTop ? -20 : Math.random() * H;
      this.r  = 3 + Math.random() * 5;        // radius
      this.vy = 0.4 + Math.random() * 0.5;    // fall speed — slow
      this.vx = (Math.random() - 0.5) * 0.4;  // gentle drift
      this.rot   = Math.random() * Math.PI * 2;
      this.rotV  = (Math.random() - 0.5) * 0.015;
      this.alpha = 0.18 + Math.random() * 0.25;
      this.sway  = Math.random() * Math.PI * 2; // sway phase
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update(t) {
      this.sway += 0.012;
      this.x  += this.vx + Math.sin(this.sway) * 0.4;
      this.y  += this.vy;
      this.rot += this.rotV;
      if (this.y > H + 20) this.reset(true);
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.alpha;

      // Simple oval petal
      ctx.beginPath();
      ctx.ellipse(0, 0, this.r, this.r * 1.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
      ctx.restore();
    }
  }

  // Only 18 petals — sparse is the point
  const petals = Array.from({ length: 18 }, () => new Petal(false));

  let t = 0;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    t += 0.01;
    petals.forEach(p => { p.update(t); p.draw(); });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

// ── SCROLL REVEALS ──────────────────────────────────
(function initReveals() {
  // Opening name + line
  const name = document.getElementById('openName');
  const line = document.getElementById('openLine');
  const open = document.querySelector('.open');

  // Trigger opening on load
  setTimeout(() => {
    if (name) name.classList.add('in');
    if (open) open.classList.add('in');
  }, 200);
  setTimeout(() => {
    if (line) line.classList.add('in');
  }, 700);

  // Wrap text content in chapters with reveal class
  document.querySelectorAll('.big-line, .accent-line, .body-text, .close-small, .close-big, .close-sig').forEach(el => {
    el.classList.add('reveal');
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      // Small stagger within each chapter
      setTimeout(() => {
        e.target.classList.add('in');
      }, 80);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();
