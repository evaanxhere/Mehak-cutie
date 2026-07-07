// ═══════════════════════════════════════════════
// WORLD PULSE · app.js
// Pure canvas 360° ball — zero CDN dependencies
// All JS runs immediately, nothing can block it
// ═══════════════════════════════════════════════

'use strict';

// ── FLAGS ────────────────────────────────────────
const FLAGS = {
  Mexico:'🇲🇽','South Africa':'🇿🇦','Korea Republic':'🇰🇷',Czechia:'🇨🇿',
  Switzerland:'🇨🇭',Canada:'🇨🇦','Bosnia and Herzegovina':'🇧🇦',Qatar:'🇶🇦',
  Brazil:'🇧🇷',Morocco:'🇲🇦',Scotland:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',Haiti:'🇭🇹',USA:'🇺🇸',
  Australia:'🇦🇺',Paraguay:'🇵🇾',Türkiye:'🇹🇷',Germany:'🇩🇪','Ivory Coast':'🇨🇮',
  Ecuador:'🇪🇨',Netherlands:'🇳🇱',Japan:'🇯🇵',Sweden:'🇸🇪',Tunisia:'🇹🇳',
  Belgium:'🇧🇪',Egypt:'🇪🇬','IR Iran':'🇮🇷','New Zealand':'🇳🇿',Spain:'🇪🇸',
  'Cape Verde':'🇨🇻',Uruguay:'🇺🇾','Saudi Arabia':'🇸🇦',France:'🇫🇷',Norway:'🇳🇴',
  Senegal:'🇸🇳',Iraq:'🇮🇶',Argentina:'🇦🇷',Austria:'🇦🇹',Algeria:'🇩🇿',Jordan:'🇯🇴',
  Colombia:'🇨🇴',Portugal:'🇵🇹','Congo DR':'🇨🇩',Uzbekistan:'🇺🇿',England:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  Croatia:'🇭🇷',Ghana:'🇬🇭',Panama:'🇵🇦'
};
const F = n => FLAGS[n] || '🏳';

// ── DATA — updated Jul 6 2026 ─────────────────────
const RECENT = [
  { home:'Morocco',  away:'Canada',    sH:3, sA:0, date:'4 Jul', stage:'R16', live:false },
  { home:'France',   away:'Paraguay',  sH:1, sA:0, date:'4 Jul', stage:'R16', live:false },
  { home:'Norway',   away:'Brazil',    sH:2, sA:1, date:'5 Jul', stage:'R16', live:false },
  { home:'England',  away:'Mexico',    sH:3, sA:2, date:'5 Jul', stage:'R16', live:false },
  { home:'Portugal', away:'Spain',     sH:null, sA:null, date:'6 Jul · 3pm ET', stage:'R16 · TODAY', live:true },
  { home:'USA',      away:'Belgium',   sH:null, sA:null, date:'6 Jul · 8pm ET', stage:'R16 · TODAY', live:true },
  { home:'Spain',    away:'Austria',   sH:3, sA:0, date:'3 Jul', stage:'R32', live:false },
  { home:'England',  away:'Congo DR',  sH:2, sA:0, date:'1 Jul', stage:'R32', live:false },
  { home:'Belgium',  away:'Senegal',   sH:3, sA:2, date:'2 Jul', stage:'R32', live:false },
  { home:'USA',      away:'Bosnia and Herzegovina', sH:2, sA:0, date:'2 Jul', stage:'R32', live:false },
];

const BRACKET = [
  { home:'Morocco',     hS:3,    away:'Canada',      aS:0,    date:'4 Jul · R16',        today:false },
  { home:'France',      hS:1,    away:'Paraguay',    aS:0,    date:'4 Jul · R16',        today:false },
  { home:'Norway',      hS:2,    away:'Brazil',      aS:1,    date:'5 Jul · R16',        today:false },
  { home:'England',     hS:3,    away:'Mexico',      aS:2,    date:'5 Jul · R16',        today:false },
  { home:'Portugal',    hS:null, away:'Spain',       aS:null, date:'6 Jul · TODAY 3pm ET', today:true },
  { home:'USA',         hS:null, away:'Belgium',     aS:null, date:'6 Jul · TODAY 8pm ET', today:true },
  { home:'Argentina',   hS:null, away:'Egypt',       aS:null, date:'7 Jul · R16',        today:false },
  { home:'Switzerland', hS:null, away:'Colombia',    aS:null, date:'7 Jul · R16',        today:false },
];

const GROUPS = {
  A:[{t:'Mexico',w:3,d:0,l:0,pts:9},{t:'South Africa',w:1,d:1,l:1,pts:4},{t:'Korea Republic',w:1,d:0,l:2,pts:3},{t:'Czechia',w:0,d:1,l:2,pts:1}],
  B:[{t:'Canada',w:2,d:1,l:0,pts:7},{t:'Bosnia and Herzegovina',w:1,d:1,l:1,pts:4},{t:'Switzerland',w:1,d:0,l:2,pts:3},{t:'Qatar',w:0,d:0,l:3,pts:0}],
  C:[{t:'Brazil',w:2,d:1,l:0,pts:7},{t:'Morocco',w:2,d:1,l:0,pts:7},{t:'Scotland',w:1,d:0,l:2,pts:3},{t:'Haiti',w:0,d:0,l:3,pts:0}],
  D:[{t:'USA',w:2,d:0,l:1,pts:6},{t:'Paraguay',w:1,d:1,l:1,pts:4},{t:'Australia',w:1,d:1,l:1,pts:4},{t:'Türkiye',w:1,d:0,l:2,pts:3}],
  E:[{t:'Germany',w:2,d:0,l:1,pts:6},{t:'Ivory Coast',w:2,d:0,l:1,pts:6},{t:'Ecuador',w:1,d:1,l:1,pts:4},{t:'Curaçao',w:0,d:1,l:2,pts:1}],
  F:[{t:'Netherlands',w:2,d:1,l:0,pts:7},{t:'Japan',w:1,d:2,l:0,pts:5},{t:'Sweden',w:1,d:1,l:1,pts:4},{t:'Tunisia',w:0,d:0,l:3,pts:0}],
  G:[{t:'Belgium',w:2,d:1,l:0,pts:7},{t:'Egypt',w:1,d:2,l:0,pts:5},{t:'IR Iran',w:0,d:3,l:0,pts:3},{t:'New Zealand',w:0,d:0,l:3,pts:0}],
  H:[{t:'Spain',w:2,d:1,l:0,pts:7},{t:'Cape Verde',w:0,d:3,l:0,pts:3},{t:'Uruguay',w:0,d:2,l:1,pts:2},{t:'Saudi Arabia',w:0,d:2,l:1,pts:2}],
  I:[{t:'France',w:3,d:0,l:0,pts:9},{t:'Norway',w:2,d:0,l:1,pts:6},{t:'Senegal',w:1,d:0,l:2,pts:3},{t:'Iraq',w:0,d:0,l:3,pts:0}],
  J:[{t:'Argentina',w:3,d:0,l:0,pts:9},{t:'Austria',w:1,d:1,l:1,pts:4},{t:'Algeria',w:1,d:1,l:1,pts:4},{t:'Jordan',w:0,d:0,l:3,pts:0}],
  K:[{t:'Colombia',w:2,d:1,l:0,pts:7},{t:'Portugal',w:1,d:2,l:0,pts:5},{t:'Congo DR',w:1,d:1,l:1,pts:4},{t:'Uzbekistan',w:0,d:0,l:3,pts:0}],
  L:[{t:'England',w:2,d:1,l:0,pts:7},{t:'Croatia',w:2,d:0,l:1,pts:6},{t:'Ghana',w:1,d:1,l:1,pts:4},{t:'Panama',w:0,d:0,l:3,pts:0}],
};

const FIXTURES = [
  { home:'Argentina',   away:'Egypt',       time:'7 Jul · 12pm ET',  ph:72, pa:12 },
  { home:'Switzerland', away:'Colombia',    time:'7 Jul · 4pm ET',   ph:44, pa:33 },
  { home:'QF Winner 1', away:'QF Winner 2', time:'9 Jul · TBD',      ph:null, pa:null },
  { home:'QF Winner 3', away:'QF Winner 4', time:'10 Jul · TBD',     ph:null, pa:null },
  { home:'Semifinal 1', away:'Semifinal 1', time:'14 Jul · TBD',     ph:null, pa:null },
  { home:'Semifinal 2', away:'Semifinal 2', time:'15 Jul · TBD',     ph:null, pa:null },
  { home:'🏆 FINAL',    away:'🏆 FINAL',   time:'19 Jul · MetLife Stadium, NJ', ph:null, pa:null },
];

// ── CANVAS FOOTBALL — pure 2D, zero dependencies ─
function initBall() {
  const canvas = document.getElementById('ballCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, cx, cy, radius;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
    H = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    cx = canvas.offsetWidth  * 0.5;
    cy = canvas.offsetHeight * 0.48;
    radius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.32;
  }
  resize();
  window.addEventListener('resize', () => { ctx.resetTransform(); resize(); });

  // 3D rotation state
  let rotX = 0.3, rotY = 0;
  let velX = 0,   velY = 0.008;
  let dragging = false;
  let lastX = 0,  lastY = 0;
  let autoSpin = true;

  // Drag handlers
  canvas.addEventListener('mousedown', e => {
    dragging = true; autoSpin = false;
    lastX = e.clientX; lastY = e.clientY;
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    velY = (e.clientX - lastX) * 0.01;
    velX = (e.clientY - lastY) * 0.01;
    rotY += velY; rotX += velX;
    lastX = e.clientX; lastY = e.clientY;
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    setTimeout(() => { autoSpin = true; }, 2500);
  });
  canvas.addEventListener('touchstart', e => {
    dragging = true; autoSpin = false;
    lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    velY = (e.touches[0].clientX - lastX) * 0.012;
    velX = (e.touches[0].clientY - lastY) * 0.012;
    rotY += velY; rotX += velX;
    lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', () => {
    dragging = false;
    setTimeout(() => { autoSpin = true; }, 2500);
  });

  // Project 3D point onto 2D canvas
  function project(px, py, pz) {
    // Rotate around X axis
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const y1 = py * cosX - pz * sinX;
    const z1 = py * sinX + pz * cosX;
    // Rotate around Y axis
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const x2 = px * cosY + z1 * sinY;
    const z2 = -px * sinY + z1 * cosY;
    // Simple perspective
    const fov = 3.5;
    const scale = fov / (fov + z2);
    return {
      x: cx + x2 * radius * scale,
      y: cy + y1 * radius * scale,
      z: z2,
      scale,
      visible: z2 > -0.85
    };
  }

  // Football patch vertices (icosahedron-based)
  // 12 pentagon centers and 20 hexagon centers approximated on unit sphere
  const PATCHES = [
    // North pole area
    { lat:  90, lng:   0 }, { lat:  58, lng:   0 }, { lat:  58, lng:  72 },
    { lat:  58, lng: 144 }, { lat:  58, lng: 216 }, { lat:  58, lng: 288 },
    // Equator area  
    { lat:  26, lng:  36 }, { lat:  26, lng: 108 }, { lat:  26, lng: 180 },
    { lat:  26, lng: 252 }, { lat:  26, lng: 324 },
    // Southern equator
    { lat: -26, lng:   0 }, { lat: -26, lng:  72 }, { lat: -26, lng: 144 },
    { lat: -26, lng: 216 }, { lat: -26, lng: 288 },
    // South pole area
    { lat: -58, lng:  36 }, { lat: -58, lng: 108 }, { lat: -58, lng: 180 },
    { lat: -58, lng: 252 }, { lat: -58, lng: 324 }, { lat: -90, lng: 0 },
  ].map(({ lat, lng }) => {
    const phi   = (90 - lat) * Math.PI / 180;
    const theta = lng * Math.PI / 180;
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.cos(phi),
      z: Math.sin(phi) * Math.sin(theta),
    };
  });

  function drawBall(t) {
    const ow = canvas.offsetWidth, oh = canvas.offsetHeight;
    ctx.clearRect(0, 0, ow, oh);

    // Float offset
    const floatY = Math.sin(t * 0.8) * 6;
    const actualCY = cy + floatY;

    // Shadow
    const shadowGrad = ctx.createRadialGradient(cx, actualCY + radius * 0.85, 0, cx, actualCY + radius * 0.85, radius * 0.9);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.28)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(cx, actualCY + radius * 0.85, radius * 0.85, radius * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Store real cy for projection (include float)
    const oldCY = cy;
    cy = actualCY;

    // Ball base gradient
    const ballGrad = ctx.createRadialGradient(
      cx - radius * 0.3, actualCY - radius * 0.3, radius * 0.05,
      cx, actualCY, radius
    );
    ballGrad.addColorStop(0, '#ffffff');
    ballGrad.addColorStop(0.35, '#e8e8e8');
    ballGrad.addColorStop(0.7, '#c4c4c4');
    ballGrad.addColorStop(1, '#8a8a8a');

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, actualCY, radius, 0, Math.PI * 2);
    ctx.fillStyle = ballGrad;
    ctx.fill();
    ctx.clip();

    // Draw patches (black pentagons)
    PATCHES.forEach(p => {
      const proj = project(p.x, p.y, p.z);
      if (!proj.visible) return;

      const pr = radius * 0.22 * proj.scale;
      const darkness = Math.max(0.05, (proj.z + 1) * 0.5);
      const alpha = Math.min(1, darkness * 1.8);

      // Pentagon shape (5 sides)
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const px2 = proj.x + Math.cos(angle) * pr;
        const py2 = proj.y + Math.sin(angle) * pr;
        i === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(18, 18, 18, ${alpha})`;
      ctx.fill();
    });

    // Specular highlight
    const specGrad = ctx.createRadialGradient(
      cx - radius * 0.35, actualCY - radius * 0.35, 0,
      cx - radius * 0.2,  actualCY - radius * 0.2,  radius * 0.55
    );
    specGrad.addColorStop(0, 'rgba(255,255,255,0.55)');
    specGrad.addColorStop(0.4, 'rgba(255,255,255,0.12)');
    specGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = specGrad;
    ctx.beginPath();
    ctx.arc(cx, actualCY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Ambient ring glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, actualCY, radius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(245,166,35,${0.12 + Math.sin(t * 1.2) * 0.06})`;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    cy = oldCY;
  }

  // Animation loop
  let lastTime = 0;
  function loop(ts) {
    const t = ts * 0.001;
    const dt = Math.min((ts - lastTime) * 0.001, 0.05);
    lastTime = ts;

    if (autoSpin && !dragging) {
      rotY += 0.008;
      rotX += 0.001;
    } else if (!dragging) {
      velX *= 0.93;
      velY *= 0.93;
      rotX += velX;
      rotY += velY;
    }
    // Clamp vertical rotation
    rotX = Math.max(-1.2, Math.min(1.2, rotX));

    drawBall(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ── NAV ──────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── COUNT-UP ─────────────────────────────────────
function countUp(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const target = parseInt(el.dataset.count, 10);
  const dur = 1600;
  const start = performance.now();
  const ease = p => p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(ease(p) * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

// ── INTERSECTION REVEALS ──────────────────────────
function initReveal() {
  // Stagger cards
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.mcard, .b-card, .frow').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), i * 60);
      });
      cardObs.unobserve(e.target);
    });
  }, { threshold: 0.06 });

  ['scoresGrid', 'bracketGrid', 'fixturesList'].forEach(id => {
    const el = document.getElementById(id);
    if (el) cardObs.observe(el);
  });

  // Count-ups
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  const heroMeta = document.querySelector('.hero-meta');
  if (heroMeta) countObs.observe(heroMeta);
}

// ── SCOREBOARD STRIP ──────────────────────────────
function buildScoreboard(matches) {
  const strip = document.getElementById('scoreboardStrip');
  if (!strip) return;
  const played = matches.filter(m => m.sH !== null);
  const html = played.map(m =>
    `<div class="sb-item">
      ${F(m.home)} ${m.home}
      <span class="sb-score">${m.sH}–${m.sA}</span>
      ${m.away} ${F(m.away)}
      <span class="sb-stage">${m.stage}</span>
    </div>`
  ).join('');
  const inner = document.createElement('div');
  inner.className = 'sb-inner';
  inner.innerHTML = html + html; // duplicate for seamless loop
  strip.appendChild(inner);
}

// ── RENDER SCORES ─────────────────────────────────
function renderScores(matches, fromAPI) {
  const grid = document.getElementById('scoresGrid');
  const sub  = document.getElementById('scoresSub');
  const dot  = document.getElementById('statusDot');
  const txt  = document.getElementById('statusText');
  if (!grid) return;

  dot.className = 'status-dot ' + (fromAPI ? 'live' : 'dead');
  txt.textContent = fromAPI ? 'Live data' : 'Latest known · Jul 6';
  if (sub) sub.textContent = fromAPI
    ? `${matches.length} matches · refreshed on load`
    : 'Round of 16 underway — Portugal v Spain, USA v Belgium today';

  grid.innerHTML = '';
  matches.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = 'mcard';
    div.style.transitionDelay = (i * 50) + 'ms';
    const upcoming = m.sH === null;
    div.innerHTML = `
      <div class="mcard-status${m.live ? ' live-now' : ''}">
        <span class="mpip"></span>
        ${m.date} · ${m.stage}${upcoming ? ' · UPCOMING' : ''}
      </div>
      <div class="mcard-matchup">
        <div class="mcard-team">
          <span class="mcard-flag">${F(m.home)}</span>
          <span class="mcard-name">${m.home}</span>
        </div>
        <div class="mcard-vs">
          <span class="mcard-num">${upcoming ? '?' : m.sH}</span>
          <span class="mcard-sep">–</span>
          <span class="mcard-num">${upcoming ? '?' : m.sA}</span>
        </div>
        <div class="mcard-team">
          <span class="mcard-flag">${F(m.away)}</span>
          <span class="mcard-name">${m.away}</span>
        </div>
      </div>`;
    grid.appendChild(div);
  });

  buildScoreboard(matches);
}

// ── RENDER BRACKET ────────────────────────────────
function renderBracket() {
  const grid = document.getElementById('bracketGrid');
  if (!grid) return;
  BRACKET.forEach(m => {
    const played = m.hS !== null;
    const div = document.createElement('div');
    div.className = 'b-card' + (m.today ? ' today' : '');
    div.innerHTML = `
      <div class="b-date">${m.date}</div>
      <div class="b-team">
        <div class="b-info">
          <span class="b-flag">${F(m.home)}</span>
          <span class="b-name">${m.home}</span>
        </div>
        <span class="b-score ${played && m.hS < m.aS ? 'lost' : ''} ${!played ? 'tbd' : ''}">${played ? m.hS : '–'}</span>
      </div>
      <div class="b-team">
        <div class="b-info">
          <span class="b-flag">${F(m.away)}</span>
          <span class="b-name">${m.away}</span>
        </div>
        <span class="b-score ${played && m.aS < m.hS ? 'lost' : ''} ${!played ? 'tbd' : ''}">${played ? m.aS : '–'}</span>
      </div>`;
    grid.appendChild(div);
  });
}

// ── RENDER GROUPS ─────────────────────────────────
let activeGroup = 'A';
function renderGroupTabs() {
  const tabs = document.getElementById('groupTabs');
  if (!tabs) return;
  Object.keys(GROUPS).forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'gtab' + (letter === activeGroup ? ' active' : '');
    btn.textContent = letter;
    btn.addEventListener('click', () => {
      activeGroup = letter;
      tabs.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderGroupPanel();
    });
    tabs.appendChild(btn);
  });
}
function renderGroupPanel() {
  const panel = document.getElementById('groupPanel');
  if (!panel) return;
  panel.innerHTML = `
    <table class="gtable">
      <thead><tr>
        <th>Team</th><th>W</th><th>D</th><th>L</th><th>Pts</th>
      </tr></thead>
      <tbody>${GROUPS[activeGroup].map((t, i) => `
        <tr class="${i < 2 ? 'q' : ''}">
          <td><div class="gt-team">
            <span class="gt-flag">${F(t.t)}</span>
            <span class="gt-name">${t.t}</span>
          </div></td>
          <td>${t.w}</td><td>${t.d}</td><td>${t.l}</td>
          <td class="gt-pts">${t.pts}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

// ── RENDER FIXTURES ───────────────────────────────
function renderFixtures() {
  const list = document.getElementById('fixturesList');
  if (!list) return;
  FIXTURES.forEach((f, i) => {
    const row = document.createElement('div');
    row.className = 'frow';
    row.style.transitionDelay = (i * 50) + 'ms';
    const tbd = !f.ph;
    row.innerHTML = `
      <div class="fteam">
        <span class="fflag">${F(f.home)}</span>
        <span class="fname">${f.home}</span>
      </div>
      <div class="fcenter">
        <span class="fvs">vs</span>
        <span class="ftime">${f.time}</span>
        ${!tbd ? `<div class="fprob"><span class="ph">${f.ph}%</span><span>·</span><span class="pa">${f.pa}%</span></div>` : ''}
      </div>
      <div class="fteam fteam-away">
        <span class="fflag">${F(f.away)}</span>
        <span class="fname">${f.away}</span>
      </div>`;
    list.appendChild(row);
  });
}

// ── LIVE API FETCH ─────────────────────────────────
async function fetchLive() {
  const today = new Date();
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  });
  try {
    const results = await Promise.all(days.map(async d => {
      const r = await fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${d}&s=Soccer`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (!r.ok) return [];
      const json = await r.json();
      return (json.events || []).filter(e =>
        (e.strLeague || '').toLowerCase().includes('world cup')
      );
    }));
    const events = results.flat()
      .filter(e => e.intHomeScore !== null && e.intHomeScore !== undefined);
    if (!events.length) return null;
    return events.map(e => ({
      home:  e.strHomeTeam,
      away:  e.strAwayTeam,
      sH:    parseInt(e.intHomeScore),
      sA:    parseInt(e.intAwayScore),
      date:  new Date(e.dateEvent).toLocaleDateString('en-GB', { day:'numeric', month:'short' }),
      stage: 'Match',
      live:  !!e.strStatus && !['Match Finished','FT','NS',''].includes(e.strStatus),
    })).slice(0, 10);
  } catch {
    return null;
  }
}

// ── BOOT — runs immediately, nothing can block it ─
(async function boot() {
  // 1. Render everything synchronously right now
  renderBracket();
  renderGroupTabs();
  renderGroupPanel();
  renderFixtures();

  // 2. Show fallback scores immediately so page is never empty
  renderScores(RECENT, false);

  // 3. Init all visuals — pure canvas, no CDN
  initBall();
  initNav();
  initReveal();

  // 4. Try live API in background — update if it works
  fetchLive().then(live => {
    if (live && live.length) {
      renderScores(live, true);
      buildScoreboard(live);
    }
  }).catch(() => {});
})();
