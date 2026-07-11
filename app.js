'use strict';
// ═══════════════════════════════════════════════════
// WORLD PULSE · app.js
// Magnetic cursor · parallax · pure-canvas 3D ball
// Zero CDN dependencies — boots instantly, always works
// ═══════════════════════════════════════════════════

// ─── DATA ────────────────────────────────────────────
const FLAGS={Mexico:'🇲🇽','South Africa':'🇿🇦','Korea Republic':'🇰🇷',Czechia:'🇨🇿',Switzerland:'🇨🇭',Canada:'🇨🇦','Bosnia and Herzegovina':'🇧🇦',Qatar:'🇶🇦',Brazil:'🇧🇷',Morocco:'🇲🇦',Scotland:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',Haiti:'🇭🇹',USA:'🇺🇸',Australia:'🇦🇺',Paraguay:'🇵🇾',Türkiye:'🇹🇷',Germany:'🇩🇪','Ivory Coast':'🇨🇮',Ecuador:'🇪🇨',Netherlands:'🇳🇱',Japan:'🇯🇵',Sweden:'🇸🇪',Tunisia:'🇹🇳',Belgium:'🇧🇪',Egypt:'🇪🇬','IR Iran':'🇮🇷','New Zealand':'🇳🇿',Spain:'🇪🇸','Cape Verde':'🇨🇻',Uruguay:'🇺🇾','Saudi Arabia':'🇸🇦',France:'🇫🇷',Norway:'🇳🇴',Senegal:'🇸🇳',Iraq:'🇮🇶',Argentina:'🇦🇷',Austria:'🇦🇹',Algeria:'🇩🇿',Jordan:'🇯🇴',Colombia:'🇨🇴',Portugal:'🇵🇹','Congo DR':'🇨🇩',Uzbekistan:'🇺🇿',England:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',Croatia:'🇭🇷',Ghana:'🇬🇭',Panama:'🇵🇦'};
const F=n=>FLAGS[n]||'🏳';

const RECENT=[
  {home:'Morocco', away:'Canada',    sH:3,   sA:0,   date:'4 Jul', stage:'R16',          live:false},
  {home:'France',  away:'Paraguay',  sH:1,   sA:0,   date:'4 Jul', stage:'R16',          live:false},
  {home:'Norway',  away:'Brazil',    sH:2,   sA:1,   date:'5 Jul', stage:'R16',          live:false},
  {home:'England', away:'Mexico',    sH:3,   sA:2,   date:'5 Jul', stage:'R16',          live:false},
  {home:'Portugal',away:'Spain',     sH:null,sA:null, date:'6 Jul · 3pm ET',stage:'R16 · TODAY',live:true},
  {home:'USA',     away:'Belgium',   sH:null,sA:null, date:'6 Jul · 8pm ET',stage:'R16 · TODAY',live:true},
  {home:'Spain',   away:'Austria',   sH:3,   sA:0,   date:'3 Jul', stage:'R32',          live:false},
  {home:'England', away:'Congo DR',  sH:2,   sA:0,   date:'1 Jul', stage:'R32',          live:false},
  {home:'Belgium', away:'Senegal',   sH:3,   sA:2,   date:'2 Jul', stage:'R32',          live:false},
  {home:'USA',     away:'Bosnia and Herzegovina',sH:2,sA:0,date:'2 Jul',stage:'R32',live:false},
];

const BRACKET=[
  {home:'Morocco',    hS:3,    away:'Canada',     aS:0,   date:'4 Jul · R16',         today:false},
  {home:'France',     hS:1,    away:'Paraguay',   aS:0,   date:'4 Jul · R16',         today:false},
  {home:'Norway',     hS:2,    away:'Brazil',     aS:1,   date:'5 Jul · R16',         today:false},
  {home:'England',    hS:3,    away:'Mexico',     aS:2,   date:'5 Jul · R16',         today:false},
  {home:'Portugal',   hS:null, away:'Spain',      aS:null,date:'6 Jul · TODAY 3pm ET',today:true},
  {home:'USA',        hS:null, away:'Belgium',    aS:null,date:'6 Jul · TODAY 8pm ET',today:true},
  {home:'Argentina',  hS:null, away:'Egypt',      aS:null,date:'7 Jul · R16',         today:false},
  {home:'Switzerland',hS:null, away:'Colombia',   aS:null,date:'7 Jul · R16',         today:false},
];

const GROUPS={A:[{t:'Mexico',w:3,d:0,l:0,pts:9},{t:'South Africa',w:1,d:1,l:1,pts:4},{t:'Korea Republic',w:1,d:0,l:2,pts:3},{t:'Czechia',w:0,d:1,l:2,pts:1}],B:[{t:'Canada',w:2,d:1,l:0,pts:7},{t:'Bosnia and Herzegovina',w:1,d:1,l:1,pts:4},{t:'Switzerland',w:1,d:0,l:2,pts:3},{t:'Qatar',w:0,d:0,l:3,pts:0}],C:[{t:'Brazil',w:2,d:1,l:0,pts:7},{t:'Morocco',w:2,d:1,l:0,pts:7},{t:'Scotland',w:1,d:0,l:2,pts:3},{t:'Haiti',w:0,d:0,l:3,pts:0}],D:[{t:'USA',w:2,d:0,l:1,pts:6},{t:'Paraguay',w:1,d:1,l:1,pts:4},{t:'Australia',w:1,d:1,l:1,pts:4},{t:'Türkiye',w:1,d:0,l:2,pts:3}],E:[{t:'Germany',w:2,d:0,l:1,pts:6},{t:'Ivory Coast',w:2,d:0,l:1,pts:6},{t:'Ecuador',w:1,d:1,l:1,pts:4},{t:'Curaçao',w:0,d:1,l:2,pts:1}],F:[{t:'Netherlands',w:2,d:1,l:0,pts:7},{t:'Japan',w:1,d:2,l:0,pts:5},{t:'Sweden',w:1,d:1,l:1,pts:4},{t:'Tunisia',w:0,d:0,l:3,pts:0}],G:[{t:'Belgium',w:2,d:1,l:0,pts:7},{t:'Egypt',w:1,d:2,l:0,pts:5},{t:'IR Iran',w:0,d:3,l:0,pts:3},{t:'New Zealand',w:0,d:0,l:3,pts:0}],H:[{t:'Spain',w:2,d:1,l:0,pts:7},{t:'Cape Verde',w:0,d:3,l:0,pts:3},{t:'Uruguay',w:0,d:2,l:1,pts:2},{t:'Saudi Arabia',w:0,d:2,l:1,pts:2}],I:[{t:'France',w:3,d:0,l:0,pts:9},{t:'Norway',w:2,d:0,l:1,pts:6},{t:'Senegal',w:1,d:0,l:2,pts:3},{t:'Iraq',w:0,d:0,l:3,pts:0}],J:[{t:'Argentina',w:3,d:0,l:0,pts:9},{t:'Austria',w:1,d:1,l:1,pts:4},{t:'Algeria',w:1,d:1,l:1,pts:4},{t:'Jordan',w:0,d:0,l:3,pts:0}],K:[{t:'Colombia',w:2,d:1,l:0,pts:7},{t:'Portugal',w:1,d:2,l:0,pts:5},{t:'Congo DR',w:1,d:1,l:1,pts:4},{t:'Uzbekistan',w:0,d:0,l:3,pts:0}],L:[{t:'England',w:2,d:1,l:0,pts:7},{t:'Croatia',w:2,d:0,l:1,pts:6},{t:'Ghana',w:1,d:1,l:1,pts:4},{t:'Panama',w:0,d:0,l:3,pts:0}]};

const FIXTURES=[
  {home:'Argentina',   away:'Egypt',       time:'7 Jul · 12pm ET',  ph:72, pa:12},
  {home:'Switzerland', away:'Colombia',    time:'7 Jul · 4pm ET',   ph:44, pa:33},
  {home:'QF 1 Winner', away:'QF 2 Winner', time:'9 Jul · TBD',      ph:null,pa:null},
  {home:'QF 3 Winner', away:'QF 4 Winner', time:'10 Jul · TBD',     ph:null,pa:null},
  {home:'Semifinal 1', away:'Semifinal 1', time:'14 Jul · TBD',     ph:null,pa:null},
  {home:'Semifinal 2', away:'Semifinal 2', time:'15 Jul · TBD',     ph:null,pa:null},
  {home:'🏆 FINAL',   away:'🏆 FINAL',   time:'19 Jul · MetLife Stadium, NJ', ph:null,pa:null},
];

// ─── MAGNETIC CURSOR ─────────────────────────────────
function initCursor() {
  const outer = document.getElementById('cursor-outer');
  const inner = document.getElementById('cursor-inner');
  const label = document.getElementById('cursor-text');
  if (!outer || !inner) return;

  let mx = -200, my = -200;  // mouse pos
  let ox = -200, oy = -200;  // outer pos (lerped)

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    inner.style.left = mx + 'px';
    inner.style.top  = my + 'px';
    label.style.left = mx + 'px';
    label.style.top  = my + 'px';
  });

  // Lerp outer cursor
  (function lerpCursor() {
    ox += (mx - ox) * 0.1;
    oy += (my - oy) * 0.1;
    outer.style.left = ox + 'px';
    outer.style.top  = oy + 'px';
    requestAnimationFrame(lerpCursor);
  })();

  // Magnetic effect on [data-magnet] elements
  document.querySelectorAll('[data-magnet]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      el.style.transform = `translate(${dx}px,${dy}px)`;
      document.body.classList.add('cur-hover');
      label.textContent = el.textContent.trim().toUpperCase();
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      document.body.classList.remove('cur-hover');
    });
  });

  // Hover state for other interactive elements
  document.querySelectorAll('a:not([data-magnet]),button,.mcard,.b-card,.gtab').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
  });

  document.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
}

// ─── 3D CANVAS FOOTBALL ──────────────────────────────
function initBall() {
  const canvas = document.getElementById('ballCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, radius;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    radius = Math.min(W, H) * 0.3;
  }
  resize();
  window.addEventListener('resize', () => { ctx.resetTransform(); resize(); });

  // Ball center — right side of canvas
  const getCX = () => W * 0.68;
  const getCY = () => H * 0.48;

  // Rotation state
  let rotX = 0.25, rotY = 0.3;
  let velX = 0, velY = 0.007;
  let drag = false, auto = true;
  let lx = 0, ly = 0;
  let mouseWorldX = 0, mouseWorldY = 0;

  canvas.addEventListener('mousedown', e => {
    drag = true; auto = false;
    lx = e.clientX; ly = e.clientY;
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    // Track mouse for subtle ball reaction even without drag
    const r = canvas.getBoundingClientRect();
    mouseWorldX = ((e.clientX - r.left) / W - 0.5) * 2;
    mouseWorldY = ((e.clientY - r.top)  / H - 0.5) * 2;
    if (!drag) return;
    velY = (e.clientX - lx) * 0.013;
    velX = (e.clientY - ly) * 0.013;
    rotY += velY; rotX += velX;
    lx = e.clientX; ly = e.clientY;
  });
  window.addEventListener('mouseup', () => {
    drag = false;
    setTimeout(() => { auto = true; }, 2200);
  });
  canvas.addEventListener('touchstart', e => {
    drag = true; auto = false;
    lx = e.touches[0].clientX; ly = e.touches[0].clientY;
  }, {passive:true});
  window.addEventListener('touchmove', e => {
    if (!drag) return;
    velY = (e.touches[0].clientX - lx) * 0.013;
    velX = (e.touches[0].clientY - ly) * 0.013;
    rotY += velY; rotX += velX;
    lx = e.touches[0].clientX; ly = e.touches[0].clientY;
  }, {passive:true});
  window.addEventListener('touchend', () => { drag = false; setTimeout(() => { auto = true; }, 2200); });

  // Project 3D unit sphere point to 2D
  function project(px, py, pz, cx, cy) {
    // Rotate X
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const y1 =  py * cosX - pz * sinX;
    const z1 =  py * sinX + pz * cosX;
    // Rotate Y
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const x2 =  px * cosY + z1 * sinY;
    const z2 = -px * sinY + z1 * cosY;
    const fov = 3.8;
    const s = fov / (fov + z2 * 0.4);
    return { x: cx + x2 * radius * s, y: cy + y1 * radius * s, z: z2, s, visible: z2 > -0.9 };
  }

  // Icosahedron pentagon patch positions on unit sphere
  const patchDirs = [
    [0,1,0],[0,-1,0],
    [0.894,0.447,0],[-0.894,0.447,0],
    [0.894,-0.447,0],[-0.894,-0.447,0],
    [0.276,0.447,0.851],[0.276,0.447,-0.851],
    [-0.724,0.447,0.526],[-0.724,0.447,-0.526],
    [0.724,-0.447,0.526],[0.724,-0.447,-0.526],
    [-0.276,-0.447,0.851],[-0.276,-0.447,-0.851],
    [0,0.447,0.894],[0,0.447,-0.894],
    [0,-0.447,0.894],[0,-0.447,-0.894],
    [0.588,0.809,0],[0.588,-0.809,0],
    [-0.588,0.809,0],[-0.588,-0.809,0],
  ];

  function drawFrame(t) {
    ctx.clearRect(0, 0, W, H);

    const floatY = Math.sin(t * 0.75) * 5;
    const cx = getCX();
    const cy = getCY() + floatY;

    // Ambient glow behind ball
    const glow = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius * 2.2);
    glow.addColorStop(0, 'rgba(245,166,35,0.08)');
    glow.addColorStop(0.5, 'rgba(245,166,35,0.03)');
    glow.addColorStop(1, 'rgba(245,166,35,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Shadow
    const shadow = ctx.createRadialGradient(cx, cy + radius * 0.88, 0, cx, cy + radius * 0.88, radius * 0.9);
    shadow.addColorStop(0, 'rgba(0,0,0,0.35)');
    shadow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(cx, cy + radius * 0.88, radius * 0.88, radius * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ball base
    const ballGrad = ctx.createRadialGradient(
      cx - radius * 0.28, cy - radius * 0.28, radius * 0.04,
      cx, cy, radius
    );
    ballGrad.addColorStop(0, '#ffffff');
    ballGrad.addColorStop(0.3, '#ebebeb');
    ballGrad.addColorStop(0.65, '#c8c8c8');
    ballGrad.addColorStop(1, '#888888');

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = ballGrad;
    ctx.fill();
    ctx.clip();

    // Pentagon patches
    patchDirs.forEach(([px, py, pz]) => {
      const p = project(px, py, pz, cx, cy);
      if (!p.visible) return;
      const pr = radius * 0.2 * p.s;
      const depth = Math.max(0, (p.z + 1) * 0.5);
      const alpha = Math.min(0.92, depth * 2.1);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const bx = p.x + Math.cos(angle) * pr;
        const by = p.y + Math.sin(angle) * pr;
        i === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(12,12,12,${alpha})`;
      ctx.fill();
    });

    // Specular highlight
    const spec = ctx.createRadialGradient(
      cx - radius * 0.32, cy - radius * 0.32, 0,
      cx - radius * 0.18, cy - radius * 0.18, radius * 0.5
    );
    spec.addColorStop(0, 'rgba(255,255,255,0.62)');
    spec.addColorStop(0.45, 'rgba(255,255,255,0.14)');
    spec.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = spec;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Outer ring pulse
    const ringAlpha = 0.12 + Math.sin(t * 1.3) * 0.06;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(245,166,35,${ringAlpha})`;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Orbiting particle ring
    const orbitR = radius * 1.35;
    const pCount = 28;
    for (let i = 0; i < pCount; i++) {
      const angle = (i / pCount) * Math.PI * 2 + t * 0.4;
      const tilt  = 0.6;
      const px2 = cx + Math.cos(angle) * orbitR;
      const py2 = cy + Math.sin(angle) * orbitR * tilt;
      const depth = Math.sin(angle); // -1 to 1
      if (depth < 0) continue; // only draw front half
      const alpha2 = depth * 0.5 * (0.4 + Math.sin(t * 2 + i) * 0.1);
      const size = 1.5 + depth * 1.5;
      ctx.beginPath();
      ctx.arc(px2, py2, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,166,35,${alpha2})`;
      ctx.fill();
    }

    // Second inner orbit
    const orbit2R = radius * 1.7;
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 - t * 0.22;
      const tilt  = 0.45;
      const px2 = cx + Math.cos(angle) * orbit2R;
      const py2 = cy + Math.sin(angle) * orbit2R * tilt;
      const depth = Math.sin(angle);
      if (depth < 0) continue;
      const alpha2 = depth * 0.3;
      ctx.beginPath();
      ctx.arc(px2, py2, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,200,255,${alpha2})`;
      ctx.fill();
    }
  }

  let last = 0;
  function loop(ts) {
    const t = ts * 0.001;
    if (auto && !drag) {
      rotY += 0.007;
      rotX  = 0.25 + mouseWorldY * 0.08;
    } else if (!drag) {
      velX *= 0.94; velY *= 0.94;
      rotX += velX; rotY += velY;
    }
    rotX = Math.max(-1.1, Math.min(1.1, rotX));
    drawFrame(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ─── PARALLAX ────────────────────────────────────────
function initParallax() {
  const hero = document.getElementById('panelHero');
  const text = document.querySelector('.hero-text');
  if (!hero || !text) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const speed = 0.4;
    text.style.transform = `translateY(${y * speed}px)`;
  }, { passive: true });
}

// ─── NAV ─────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 80);
  }, { passive: true });
}

// ─── TICKER ──────────────────────────────────────────
function buildTicker(matches) {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const played = matches.filter(m => m.sH !== null);
  const html = played.map(m =>
    `<div class="tick-item">${F(m.home)} ${m.home} <span class="tick-score">${m.sH}–${m.sA}</span> ${m.away} ${F(m.away)} <span class="tick-stage">${m.stage}</span></div>`
  ).join('');
  track.innerHTML = html + html;
}

// ─── REVEALS ─────────────────────────────────────────
function initReveal() {
  // [data-reveal] elements
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('shown'), delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));

  // Card stagger
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.mcard,.b-card,.fx-row').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), i * 55);
      });
      cardObs.unobserve(e.target);
    });
  }, { threshold: 0.06 });
  ['scoresGrid','bracketGrid','fixturesList'].forEach(id => {
    const el = document.getElementById(id);
    if (el) cardObs.observe(el);
  });
}

// ─── COUNT-UP ─────────────────────────────────────────
function countUp(el) {
  if (el.dataset.done) return; el.dataset.done='1';
  const target = parseInt(el.dataset.count, 10);
  const start = performance.now(), dur = 1600;
  const ease = p => p===1 ? 1 : 1-Math.pow(2,-10*p);
  (function tick(now){
    const p = Math.min((now-start)/dur, 1);
    el.textContent = Math.floor(ease(p)*target);
    if(p<1) requestAnimationFrame(tick); else el.textContent=target;
  })(performance.now());
}

// ─── SCORES ───────────────────────────────────────────
function renderScores(matches, fromAPI) {
  const grid = document.getElementById('scoresGrid');
  const sub  = document.getElementById('scoresSub');
  const dot  = document.getElementById('liveDot');
  const lbl  = document.getElementById('liveLabel');
  if (!grid) return;
  dot.className = 'live-dot ' + (fromAPI ? 'on' : 'err');
  lbl.textContent = fromAPI ? 'Live data' : 'Jul 6 · R16 Underway';
  if (sub) sub.textContent = fromAPI
    ? `${matches.length} matches · refreshed on load`
    : 'Portugal v Spain · USA v Belgium on today';
  grid.innerHTML = '';
  matches.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'mcard';
    el.style.transitionDelay = (i*48)+'ms';
    const upcoming = m.sH===null;
    el.innerHTML=`
      <div class="mc-status${m.live?' hot':''}">
        <span class="mc-pip"></span>${m.date} · ${m.stage}${upcoming?' · UPCOMING':''}
      </div>
      <div class="mc-row">
        <div class="mc-team"><span class="mc-flag">${F(m.home)}</span><span class="mc-name">${m.home}</span></div>
        <div class="mc-vs">
          <span class="mc-num">${upcoming?'?':m.sH}</span>
          <span class="mc-sep">–</span>
          <span class="mc-num">${upcoming?'?':m.sA}</span>
        </div>
        <div class="mc-team"><span class="mc-flag">${F(m.away)}</span><span class="mc-name">${m.away}</span></div>
      </div>`;
    grid.appendChild(el);
  });
  buildTicker(matches);
}

// ─── BRACKET ──────────────────────────────────────────
function renderBracket() {
  const grid = document.getElementById('bracketGrid');
  if (!grid) return;
  BRACKET.forEach(m => {
    const played = m.hS !== null;
    const el = document.createElement('div');
    el.className = 'b-card' + (m.today ? ' today' : '');
    el.innerHTML=`
      <div class="b-date">${m.date}</div>
      <div class="b-team">
        <div class="b-info"><span class="b-flag">${F(m.home)}</span><span class="b-name">${m.home}</span></div>
        <span class="b-score ${played&&m.hS<m.aS?'lost':''} ${!played?'tbd':''}">${played?m.hS:'–'}</span>
      </div>
      <div class="b-team">
        <div class="b-info"><span class="b-flag">${F(m.away)}</span><span class="b-name">${m.away}</span></div>
        <span class="b-score ${played&&m.aS<m.hS?'lost':''} ${!played?'tbd':''}">${played?m.aS:'–'}</span>
      </div>`;
    grid.appendChild(el);
  });
}

// ─── GROUPS ───────────────────────────────────────────
let AG = 'A';
function renderGroupTabs() {
  const tabs = document.getElementById('groupTabs');
  if (!tabs) return;
  Object.keys(GROUPS).forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'gtab' + (l===AG?' active':'');
    btn.textContent = l;
    btn.addEventListener('click', () => {
      AG = l;
      tabs.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderGroupPanel();
    });
    tabs.appendChild(btn);
  });
}
function renderGroupPanel() {
  const p = document.getElementById('groupPanel');
  if (!p) return;
  p.innerHTML = `<table class="gtable">
    <thead><tr><th>Team</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr></thead>
    <tbody>${GROUPS[AG].map((t,i)=>`
      <tr class="${i<2?'q':''}">
        <td><div class="gt-team"><span class="gt-flag">${F(t.t)}</span><span class="gt-name">${t.t}</span></div></td>
        <td>${t.w}</td><td>${t.d}</td><td>${t.l}</td><td class="gt-pts">${t.pts}</td>
      </tr>`).join('')}
    </tbody></table>`;
}

// ─── FIXTURES ─────────────────────────────────────────
function renderFixtures() {
  const list = document.getElementById('fixturesList');
  if (!list) return;
  FIXTURES.forEach((f, i) => {
    const el = document.createElement('div');
    el.className = 'fx-row';
    el.style.transitionDelay = (i*50)+'ms';
    el.innerHTML=`
      <div class="fx-team"><span class="fx-flag">${F(f.home)}</span><span class="fx-name">${f.home}</span></div>
      <div class="fx-center">
        <span class="fx-vs">vs</span>
        <span class="fx-time">${f.time}</span>
        ${f.ph?`<div class="fx-prob"><span class="fx-ph">${f.ph}%</span><span style="color:var(--chalk3)">·</span><span class="fx-pa">${f.pa}%</span></div>`:''}
      </div>
      <div class="fx-team fx-team-r"><span class="fx-flag">${F(f.away)}</span><span class="fx-name">${f.away}</span></div>`;
    list.appendChild(el);
  });
}

// ─── LIVE FETCH ───────────────────────────────────────
async function fetchLive() {
  const days = Array.from({length:5},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-i);
    return d.toISOString().split('T')[0];
  });
  try {
    const all = await Promise.all(days.map(async d => {
      const r = await fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${d}&s=Soccer`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (!r.ok) return [];
      const json = await r.json();
      return (json.events||[]).filter(e=>(e.strLeague||'').toLowerCase().includes('world cup'));
    }));
    const events = all.flat().filter(e=>e.intHomeScore!==null&&e.intHomeScore!==undefined);
    if (!events.length) return null;
    return events.map(e=>({
      home:e.strHomeTeam, away:e.strAwayTeam,
      sH:parseInt(e.intHomeScore), sA:parseInt(e.intAwayScore),
      date:new Date(e.dateEvent).toLocaleDateString('en-GB',{day:'numeric',month:'short'}),
      stage:'Match',
      live:!!e.strStatus&&!['Match Finished','FT','NS',''].includes(e.strStatus),
    })).slice(0,10);
  } catch { return null; }
}

// ─── BOOT ─────────────────────────────────────────────
(async function boot() {
  // Render all static content immediately — page is never blank
  renderScores(RECENT, false);
  renderBracket();
  renderGroupTabs();
  renderGroupPanel();
  renderFixtures();

  // Visuals
  initBall();
  initCursor();
  initParallax();
  initNav();
  initReveal();

  // Live fetch in background
  fetchLive().then(live => {
    if (live && live.length) renderScores(live, true);
  }).catch(()=>{});
})();
