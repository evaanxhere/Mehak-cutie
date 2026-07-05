// ═══════════════════════════════════════════
// WORLD PULSE · app.js
// Three.js 360° draggable football + live data
// ═══════════════════════════════════════════

// ─── DATA ───────────────────────────────────
const FLAGS={Mexico:'🇲🇽','South Africa':'🇿🇦','Korea Republic':'🇰🇷',Czechia:'🇨🇿',Switzerland:'🇨🇭',Canada:'🇨🇦','Bosnia and Herzegovina':'🇧🇦',Qatar:'🇶🇦',Brazil:'🇧🇷',Morocco:'🇲🇦',Scotland:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',Haiti:'🇭🇹',USA:'🇺🇸',Australia:'🇦🇺',Paraguay:'🇵🇾',Türkiye:'🇹🇷',Turkey:'🇹🇷',Germany:'🇩🇪','Ivory Coast':'🇨🇮',Ecuador:'🇪🇨','Curaçao':'🇨🇼',Netherlands:'🇳🇱',Japan:'🇯🇵',Sweden:'🇸🇪',Tunisia:'🇹🇳',Belgium:'🇧🇪',Egypt:'🇪🇬','IR Iran':'🇮🇷',Iran:'🇮🇷','New Zealand':'🇳🇿',Spain:'🇪🇸','Cape Verde':'🇨🇻',Uruguay:'🇺🇾','Saudi Arabia':'🇸🇦',France:'🇫🇷',Norway:'🇳🇴',Senegal:'🇸🇳',Iraq:'🇮🇶',Argentina:'🇦🇷',Austria:'🇦🇹',Algeria:'🇩🇿',Jordan:'🇯🇴',Colombia:'🇨🇴',Portugal:'🇵🇹','Congo DR':'🇨🇩',Uzbekistan:'🇺🇿',England:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',Croatia:'🇭🇷',Ghana:'🇬🇭',Panama:'🇵🇦'};
const F=n=>FLAGS[n]||'🏳';

const GROUPS={A:[{t:'Mexico',w:3,d:0,l:0,pts:9},{t:'South Africa',w:1,d:1,l:1,pts:4},{t:'Korea Republic',w:1,d:0,l:2,pts:3},{t:'Czechia',w:0,d:1,l:2,pts:1}],B:[{t:'Switzerland',w:2,d:1,l:0,pts:7},{t:'Canada',w:1,d:1,l:1,pts:4},{t:'Bosnia and Herzegovina',w:1,d:1,l:1,pts:4},{t:'Qatar',w:0,d:1,l:2,pts:1}],C:[{t:'Brazil',w:2,d:1,l:0,pts:7},{t:'Morocco',w:2,d:1,l:0,pts:7},{t:'Scotland',w:1,d:0,l:2,pts:3},{t:'Haiti',w:0,d:0,l:3,pts:0}],D:[{t:'USA',w:2,d:0,l:1,pts:6},{t:'Australia',w:1,d:1,l:1,pts:4},{t:'Paraguay',w:1,d:1,l:1,pts:4},{t:'Türkiye',w:1,d:0,l:2,pts:3}],E:[{t:'Germany',w:2,d:0,l:1,pts:6},{t:'Ivory Coast',w:2,d:0,l:1,pts:6},{t:'Ecuador',w:1,d:1,l:1,pts:4},{t:'Curaçao',w:0,d:1,l:2,pts:1}],F:[{t:'Netherlands',w:2,d:1,l:0,pts:7},{t:'Japan',w:1,d:2,l:0,pts:5},{t:'Sweden',w:1,d:1,l:1,pts:4},{t:'Tunisia',w:0,d:0,l:3,pts:0}],G:[{t:'Belgium',w:1,d:2,l:0,pts:5},{t:'Egypt',w:1,d:2,l:0,pts:5},{t:'IR Iran',w:0,d:3,l:0,pts:3},{t:'New Zealand',w:0,d:1,l:2,pts:1}],H:[{t:'Spain',w:2,d:1,l:0,pts:7},{t:'Cape Verde',w:0,d:3,l:0,pts:3},{t:'Uruguay',w:0,d:2,l:1,pts:2},{t:'Saudi Arabia',w:0,d:2,l:1,pts:2}],I:[{t:'France',w:3,d:0,l:0,pts:9},{t:'Norway',w:2,d:0,l:1,pts:6},{t:'Senegal',w:1,d:0,l:2,pts:3},{t:'Iraq',w:0,d:0,l:3,pts:0}],J:[{t:'Argentina',w:3,d:0,l:0,pts:9},{t:'Austria',w:1,d:1,l:1,pts:4},{t:'Algeria',w:1,d:1,l:1,pts:4},{t:'Jordan',w:0,d:0,l:3,pts:0}],K:[{t:'Colombia',w:2,d:1,l:0,pts:7},{t:'Portugal',w:1,d:2,l:0,pts:5},{t:'Congo DR',w:1,d:1,l:1,pts:4},{t:'Uzbekistan',w:0,d:0,l:3,pts:0}],L:[{t:'England',w:2,d:1,l:0,pts:7},{t:'Croatia',w:2,d:0,l:1,pts:6},{t:'Ghana',w:1,d:1,l:1,pts:4},{t:'Panama',w:0,d:0,l:3,pts:0}]};

const BRACKET=[
  {home:'Argentina',hS:3,away:'Jordan',aS:1,date:'28 Jun'},
  {home:'Colombia',hS:0,away:'Portugal',aS:0,date:'28 Jun'},
  {home:'England',hS:2,away:'Panama',aS:0,date:'28 Jun'},
  {home:'Croatia',hS:2,away:'Ghana',aS:1,date:'28 Jun'},
  {home:'France',hS:null,away:'Sweden',aS:null,date:'1 Jul'},
  {home:'Norway',hS:null,away:'Senegal',aS:null,date:'2 Jul'},
  {home:'Mexico',hS:null,away:'Ecuador',aS:null,date:'1 Jul'},
  {home:'Switzerland',hS:null,away:'Canada',aS:null,date:'2 Jul'},
  {home:'Brazil',hS:null,away:'Japan',aS:null,date:'29 Jun'},
  {home:'Morocco',hS:null,away:'Scotland',aS:null,date:'30 Jun'},
  {home:'Spain',hS:null,away:'Austria',aS:null,date:'3 Jul'},
  {home:'Cape Verde',hS:null,away:'Saudi Arabia',aS:null,date:'3 Jul'},
  {home:'Germany',hS:null,away:'Paraguay',aS:null,date:'30 Jun'},
  {home:'Netherlands',hS:null,away:'Morocco',aS:null,date:'30 Jun'},
  {home:'USA',hS:null,away:'Bosnia and Herzegovina',aS:null,date:'2 Jul'},
  {home:'Belgium',hS:null,away:'Egypt',aS:null,date:'2 Jul'},
];

const FIXTURES=[
  {home:'Brazil',away:'Japan',time:'29 Jun · 10:30 PM',ph:57,pa:18},
  {home:'Germany',away:'Paraguay',time:'30 Jun · 2:00 AM',ph:71,pa:11},
  {home:'Netherlands',away:'Morocco',time:'30 Jun · 6:30 AM',ph:42,pa:28},
  {home:'Ivory Coast',away:'Norway',time:'30 Jun · 10:30 PM',ph:26,pa:47},
  {home:'France',away:'Sweden',time:'1 Jul · 2:30 AM',ph:77,pa:9},
  {home:'Mexico',away:'Ecuador',time:'1 Jul · 6:30 AM',ph:43,pa:25},
  {home:'England',away:'Congo DR',time:'1 Jul · 9:30 PM',ph:76,pa:8},
  {home:'Belgium',away:'Senegal',time:'2 Jul · 1:30 AM',ph:44,pa:27},
  {home:'USA',away:'Bosnia and Herzegovina',time:'2 Jul · 5:30 AM',ph:72,pa:10},
  {home:'Spain',away:'Austria',time:'3 Jul · 12:30 AM',ph:74,pa:9},
];

const STADIUMS=[
  {name:'MetLife Stadium',city:'New Jersey, USA',cap:'82,500',matches:'8',role:'FINAL VENUE'},
  {name:'SoFi Stadium',city:'Los Angeles, USA',cap:'70,240',matches:'7',role:'SEMI FINAL'},
  {name:'Estadio Azteca',city:'Mexico City, MX',cap:'87,523',matches:'5',role:'OPENING MATCH'},
  {name:'AT&T Stadium',city:'Dallas, USA',cap:'80,000',matches:'6',role:'QTR FINAL'},
  {name:'BC Place',city:'Vancouver, CAN',cap:'54,500',matches:'6',role:'SEMI FINAL'},
  {name:'BMO Field',city:'Toronto, CAN',cap:'45,736',matches:'6',role:'GROUP STAGE'},
];

const FALLBACK=[
  {home:'Cape Verde',away:'Saudi Arabia',sH:0,sA:0,date:'27 Jun',status:'Full Time',live:false},
  {home:'New Zealand',away:'Belgium',sH:1,sA:5,date:'27 Jun',status:'Full Time',live:false},
  {home:'Egypt',away:'IR Iran',sH:1,sA:1,date:'27 Jun',status:'Full Time',live:false},
  {home:'Panama',away:'England',sH:0,sA:2,date:'28 Jun',status:'Full Time',live:false},
  {home:'Croatia',away:'Ghana',sH:2,sA:1,date:'28 Jun',status:'Full Time',live:false},
  {home:'Colombia',away:'Portugal',sH:0,sA:0,date:'28 Jun',status:'Full Time',live:false},
  {home:'Congo DR',away:'Uzbekistan',sH:3,sA:1,date:'28 Jun',status:'Full Time',live:false},
  {home:'Jordan',away:'Argentina',sH:1,sA:3,date:'28 Jun',status:'Full Time',live:false},
  {home:'Algeria',away:'Austria',sH:3,sA:3,date:'28 Jun',status:'Full Time',live:false},
  {home:'South Africa',away:'Canada',sH:0,sA:1,date:'29 Jun',status:'Full Time',live:false},
];

// ─── THREE.JS 360° DRAGGABLE FOOTBALL ───────
function initThree() {
  const canvas = document.getElementById('threeCanvas');
  if (!canvas || !window.THREE) {
    console.warn('Three.js not loaded');
    return;
  }

  const W = () => canvas.clientWidth;
  const H = () => canvas.clientHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H(), false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W() / H(), 0.1, 100);
  camera.position.set(0, 0, 6);

  // ── Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.PointLight(0x00d97e, 4, 25);
  key.position.set(5, 5, 5);
  scene.add(key);
  const fill = new THREE.PointLight(0x4299ff, 2, 20);
  fill.position.set(-5, -3, 4);
  scene.add(fill);
  const rim = new THREE.PointLight(0xffffff, 1.5, 20);
  rim.position.set(0, -5, -4);
  scene.add(rim);

  // ── Ball group (draggable)
  const ballGroup = new THREE.Group();
  scene.add(ballGroup);

  // Main sphere
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 64, 64),
    new THREE.MeshPhongMaterial({ color: 0xf0f0f0, shininess: 90, specular: new THREE.Color(0.25, 0.25, 0.25) })
  );
  ballGroup.add(sphere);

  // Pentagon patches
  const patchMat = new THREE.MeshPhongMaterial({ color: 0x0a0a0a, shininess: 30 });
  [
    [0,1,0],[0,-1,0],[1,0.5,0],[-1,0.5,0],[1,-0.5,0],[-1,-0.5,0],
    [0,0.5,1],[0,-0.5,1],[0,0.5,-1],[0,-0.5,-1],
    [0.9,0,0.9],[-0.9,0,0.9],[0.9,0,-0.9],[-0.9,0,-0.9]
  ].forEach(([x,y,z]) => {
    const patch = new THREE.Mesh(new THREE.CircleGeometry(0.32, 5), patchMat);
    const dir = new THREE.Vector3(x, y, z).normalize();
    patch.position.copy(dir.clone().multiplyScalar(1.62));
    patch.lookAt(dir.clone().multiplyScalar(10));
    ballGroup.add(patch);
  });

  // Glow rings around ball
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00d97e, transparent: true, opacity: 0.2 });
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x4299ff, transparent: true, opacity: 0.12 });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.04, 16, 100), ringMat1);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.025, 16, 100), ringMat2);
  ring1.rotation.x = Math.PI / 2;
  ring2.rotation.x = Math.PI / 3;
  scene.add(ring1, ring2);

  // Particle field
  const pCount = 250;
  const pos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const r = 2.4 + Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i*3+2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pGeo,
    new THREE.PointsMaterial({ color: 0x00d97e, size: 0.022, transparent: true, opacity: 0.5 })
  );
  scene.add(particles);

  // Position ball to right half
  ballGroup.position.set(2.2, 0, 0);

  // ── 360° DRAG ──
  let isDragging = false;
  let prevMouse = { x: 0, y: 0 };
  let rotVelX = 0, rotVelY = 0;
  let autoRotate = true;

  // Mouse drag
  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    autoRotate = false;
    prevMouse = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    rotVelY = dx * 0.012;
    rotVelX = dy * 0.012;
    ballGroup.rotation.y += rotVelY;
    ballGroup.rotation.x += rotVelX;
    prevMouse = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = '';
    // Resume auto after 2s of no drag
    setTimeout(() => { autoRotate = true; }, 2000);
  });

  // Touch drag
  canvas.addEventListener('touchstart', e => {
    isDragging = true;
    autoRotate = false;
    prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - prevMouse.x;
    const dy = e.touches[0].clientY - prevMouse.y;
    rotVelY = dx * 0.012;
    rotVelX = dy * 0.012;
    ballGroup.rotation.y += rotVelY;
    ballGroup.rotation.x += rotVelX;
    prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  window.addEventListener('touchend', () => {
    isDragging = false;
    setTimeout(() => { autoRotate = true; }, 2000);
  });

  // Resize
  window.addEventListener('resize', () => {
    renderer.setSize(W(), H(), false);
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
  });

  // ── Animate
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (autoRotate) {
      ballGroup.rotation.y += 0.006;
      ballGroup.rotation.x += 0.002;
    } else if (!isDragging) {
      // Momentum decay
      rotVelX *= 0.92;
      rotVelY *= 0.92;
      ballGroup.rotation.x += rotVelX;
      ballGroup.rotation.y += rotVelY;
    }

    // Float
    ballGroup.position.y = Math.sin(t * 0.7) * 0.1;

    // Ring animations
    ring1.rotation.z = t * 0.35;
    ring2.rotation.z = -t * 0.2;
    ring2.rotation.x = Math.PI/3 + Math.sin(t * 0.4) * 0.08;

    // Particle drift
    particles.rotation.y = t * 0.06;
    particles.rotation.x = t * 0.03;

    // Pulse glow
    ringMat1.opacity = 0.15 + Math.sin(t * 1.4) * 0.07;
    key.intensity = 3.5 + Math.sin(t * 0.8) * 0.8;

    renderer.render(scene, camera);
  }
  animate();
}

// ─── LOADER CANVAS ──────────────────────────
function initLoader() {
  const c = document.getElementById('loaderCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let a = 0;
  const draw = () => {
    ctx.clearRect(0, 0, 100, 100);
    ctx.strokeStyle = '#1a2236';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(50, 50, 38, 0, Math.PI * 2); ctx.stroke();
    const g = ctx.createLinearGradient(0, 0, 100, 100);
    g.addColorStop(0, '#00d97e'); g.addColorStop(1, '#4299ff');
    ctx.strokeStyle = g;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(50, 50, 38, a, a + Math.PI * 1.4); ctx.stroke();
    a += 0.06;
    requestAnimationFrame(draw);
  };
  draw();
}

// ─── CURSOR ─────────────────────────────────
function initCursor() {
  const dot = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!dot || !trail) return;
  let cx = -100, cy = -100, tx = -100, ty = -100;
  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px'; dot.style.top = ty + 'px';
  });
  (function lerp() {
    cx += (tx - cx) * 0.13; cy += (ty - cy) * 0.13;
    trail.style.left = cx + 'px'; trail.style.top = cy + 'px';
    requestAnimationFrame(lerp);
  })();
  document.addEventListener('mousedown', () => document.body.classList.add('clicking'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('clicking'));
  document.querySelectorAll('a,button,.mcard,.b-match,.stadium-card,.gtab').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

// ─── CARD GLOW ──────────────────────────────
function initCardGlow() {
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.mcard').forEach(card => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

// ─── NAV ────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
}

// ─── COUNT UP ───────────────────────────────
function countUp(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const target = parseInt(el.dataset.count);
  const start = performance.now();
  const dur = 1400;
  const ease = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(ease(p) * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

// ─── INTERSECTION OBSERVER REVEALS ──────────
function initReveal() {
  // General .reveal elements
  new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
  }, { threshold: 0.15 }).observe(document.querySelector('.hero-content') || document.body);

  // Cards stagger
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.mcard,.b-match,.frow,.stadium-card').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), i * 55);
      });
      cardObs.unobserve(e.target);
    });
  }, { threshold: 0.08 });

  ['scoresGrid','bracketGrid','fixturesList','stadiumsGrid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) cardObs.observe(el);
  });

  // Count up when hero stats visible
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.querySelectorAll('[data-count]').forEach(countUp);
    });
  }, { threshold: 0.5 }).observe(document.querySelector('.hero-stats') || document.body);
}

// ─── TICKER ─────────────────────────────────
function buildTicker(matches) {
  const el = document.getElementById('ticker');
  if (!el) return;
  const html = matches.map(m =>
    `<span class="ticker-item">${F(m.home)} ${m.home} <span class="ticker-score">${m.sH}–${m.sA}</span> ${m.away} ${F(m.away)}</span>`
  ).join('');
  el.innerHTML = html + html;
}

// ─── LIVE API FETCH ──────────────────────────
async function fetchScores() {
  const today = new Date();
  const days = Array.from({length: 5}, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  });
  try {
    const all = await Promise.all(days.map(async d => {
      const res = await fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${d}&s=Soccer`);
      if (!res.ok) return [];
      const json = await res.json();
      return (json.events || []).filter(e => (e.strLeague || '').toLowerCase().includes('world cup'));
    }));
    const events = all.flat().filter(e => e.intHomeScore !== null && e.intHomeScore !== undefined);
    if (!events.length) return null;
    return events.map(e => ({
      home: e.strHomeTeam,
      away: e.strAwayTeam,
      sH: e.intHomeScore,
      sA: e.intAwayScore,
      date: new Date(e.dateEvent).toLocaleDateString('en-GB', { day:'numeric', month:'short' }),
      status: ['Match Finished','FT'].includes(e.strStatus) ? 'Full Time' : (e.strStatus || 'Full Time'),
      live: !!e.strStatus && !['Match Finished','FT','NS',''].includes(e.strStatus),
    })).slice(0, 10);
  } catch {
    return null;
  }
}

// ─── RENDER SCORES ───────────────────────────
function renderScores(matches, fromAPI) {
  const grid = document.getElementById('scoresGrid');
  const meta = document.getElementById('scoreMeta');
  const pip  = document.getElementById('apiPip');
  const lbl  = document.getElementById('apiLabel');
  if (!grid) return;

  pip.className = 'pip ' + (fromAPI ? 'live' : 'dead');
  lbl.textContent = fromAPI ? 'Live data' : 'Cached data';
  if (meta) meta.textContent = fromAPI
    ? `${matches.length} matches · auto-refreshed`
    : 'API unavailable — showing recent results';

  grid.innerHTML = '';
  matches.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = 'mcard';
    div.style.transitionDelay = (i * 45) + 'ms';
    div.innerHTML = `
      <div class="mcard-status${m.live ? ' live-now' : ''}">
        <span class="mpip"></span>${m.date} · ${m.status}
      </div>
      <div class="mcard-teams">
        <div class="mcard-team">
          <span class="mcard-flag">${F(m.home)}</span>
          <span class="mcard-name">${m.home}</span>
        </div>
        <div class="mcard-score">
          <span class="msnum">${m.sH}</span>
          <span class="mssep">–</span>
          <span class="msnum">${m.sA}</span>
        </div>
        <div class="mcard-team">
          <span class="mcard-flag">${F(m.away)}</span>
          <span class="mcard-name">${m.away}</span>
        </div>
      </div>`;
    grid.appendChild(div);
  });
  buildTicker(matches);
}

// ─── RENDER BRACKET ──────────────────────────
function renderBracket() {
  const grid = document.getElementById('bracketGrid');
  if (!grid) return;
  BRACKET.forEach(m => {
    const played = m.hS !== null;
    const div = document.createElement('div');
    div.className = 'b-match';
    div.innerHTML = `
      <div class="b-date">${m.date}</div>
      <div class="b-team">
        <div class="b-info"><span class="b-flag">${F(m.home)}</span><span class="b-name">${m.home}</span></div>
        <span class="b-score${played && m.hS < m.aS ? ' lost' : ''}">${played ? m.hS : '–'}</span>
      </div>
      <div class="b-team">
        <div class="b-info"><span class="b-flag">${F(m.away)}</span><span class="b-name">${m.away}</span></div>
        <span class="b-score${played && m.aS < m.hS ? ' lost' : ''}">${played ? m.aS : '–'}</span>
      </div>`;
    grid.appendChild(div);
  });
}

// ─── RENDER GROUPS ───────────────────────────
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
      <thead><tr><th>Team</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr></thead>
      <tbody>${GROUPS[activeGroup].map((t,i) => `
        <tr class="${i < 2 ? 'q' : ''}">
          <td><div class="gt-team"><span class="gt-flag">${F(t.t)}</span><span class="gt-name">${t.t}</span></div></td>
          <td>${t.w}</td><td>${t.d}</td><td>${t.l}</td>
          <td class="gt-pts">${t.pts}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

// ─── RENDER FIXTURES ─────────────────────────
function renderFixtures() {
  const list = document.getElementById('fixturesList');
  if (!list) return;
  FIXTURES.forEach((f, i) => {
    const row = document.createElement('div');
    row.className = 'frow';
    row.style.transitionDelay = (i * 45) + 'ms';
    row.innerHTML = `
      <div class="fteam">
        <span class="fflag">${F(f.home)}</span><span class="fname">${f.home}</span>
      </div>
      <div class="fcenter">
        <span class="fvs">vs</span>
        <span class="ftime">${f.time}</span>
        <div class="fprob"><span class="ph">${f.ph}%</span><span>·</span><span class="pa">${f.pa}%</span></div>
      </div>
      <div class="fteam fteam-away">
        <span class="fflag">${F(f.away)}</span><span class="fname">${f.away}</span>
      </div>`;
    list.appendChild(row);
  });
}

// ─── RENDER STADIUMS ─────────────────────────
function renderStadiums() {
  const grid = document.getElementById('stadiumsGrid');
  if (!grid) return;
  STADIUMS.forEach(s => {
    const card = document.createElement('div');
    card.className = 'stadium-card';
    card.innerHTML = `
      <div class="stadium-img">🏟️</div>
      <div class="stadium-body">
        <div class="stadium-name">${s.name}</div>
        <div class="stadium-city">${s.city} · ${s.role}</div>
        <div class="stadium-stats">
          <div class="sstat"><strong>${s.cap}</strong><span>Capacity</span></div>
          <div class="sstat"><strong>${s.matches}</strong><span>Matches</span></div>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ─── BOOT ────────────────────────────────────
(async function boot() {
  // Run sync setup immediately — no waiting
  initLoader();
  initNav();
  initCardGlow();

  // Render static content right away
  renderBracket();
  renderGroupTabs();
  renderGroupPanel();
  renderFixtures();
  renderStadiums();

  // Three.js — THREE is already loaded sync via <script> tag above
  initThree();
  initCursor();
  initReveal();

  // Live fetch (async, doesn't block anything)
  let scores = await fetchScores();
  renderScores(scores || FALLBACK, !!scores);

  // Hide loader after minimum 1s
  setTimeout(() => document.getElementById('loader').classList.add('out'), 1000);
})();
