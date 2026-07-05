// ════════════════════════════════════════
// WORLD PULSE · app.js
// Three.js 3D football + live scores + all interactions
// ════════════════════════════════════════

// ── DATA ────────────────────────────────
const FLAGS = {
  Mexico:'🇲🇽','South Africa':'🇿🇦','Korea Republic':'🇰🇷',Czechia:'🇨🇿',
  Switzerland:'🇨🇭',Canada:'🇨🇦','Bosnia and Herzegovina':'🇧🇦',Qatar:'🇶🇦',
  Brazil:'🇧🇷',Morocco:'🇲🇦',Scotland:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',Haiti:'🇭🇹',USA:'🇺🇸',
  Australia:'🇦🇺',Paraguay:'🇵🇾',Türkiye:'🇹🇷',Turkey:'🇹🇷',Germany:'🇩🇪',
  'Ivory Coast':'🇨🇮',Ecuador:'🇪🇨','Curaçao':'🇨🇼',Netherlands:'🇳🇱',Japan:'🇯🇵',
  Sweden:'🇸🇪',Tunisia:'🇹🇳',Belgium:'🇧🇪',Egypt:'🇪🇬','IR Iran':'🇮🇷',Iran:'🇮🇷',
  'New Zealand':'🇳🇿',Spain:'🇪🇸','Cape Verde':'🇨🇻',Uruguay:'🇺🇾','Saudi Arabia':'🇸🇦',
  France:'🇫🇷',Norway:'🇳🇴',Senegal:'🇸🇳',Iraq:'🇮🇶',Argentina:'🇦🇷',Austria:'🇦🇹',
  Algeria:'🇩🇿',Jordan:'🇯🇴',Colombia:'🇨🇴',Portugal:'🇵🇹','Congo DR':'🇨🇩',
  Uzbekistan:'🇺🇿',England:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',Croatia:'🇭🇷',Ghana:'🇬🇭',Panama:'🇵🇦',
  Poland:'🇵🇱',Romania:'🇷🇴',Serbia:'🇷🇸',Ukraine:'🇺🇦'
};
const F = n => FLAGS[n] || '🏳';
const A = n => (n||'').split(' ').map(w=>w[0]).join('').slice(0,3).toUpperCase();

const GROUPS = {
  A:[{t:'Mexico',w:3,d:0,l:0,pts:9},{t:'South Africa',w:1,d:1,l:1,pts:4},{t:'Korea Republic',w:1,d:0,l:2,pts:3},{t:'Czechia',w:0,d:1,l:2,pts:1}],
  B:[{t:'Switzerland',w:2,d:1,l:0,pts:7},{t:'Canada',w:1,d:1,l:1,pts:4},{t:'Bosnia and Herzegovina',w:1,d:1,l:1,pts:4},{t:'Qatar',w:0,d:1,l:2,pts:1}],
  C:[{t:'Brazil',w:2,d:1,l:0,pts:7},{t:'Morocco',w:2,d:1,l:0,pts:7},{t:'Scotland',w:1,d:0,l:2,pts:3},{t:'Haiti',w:0,d:0,l:3,pts:0}],
  D:[{t:'USA',w:2,d:0,l:1,pts:6},{t:'Australia',w:1,d:1,l:1,pts:4},{t:'Paraguay',w:1,d:1,l:1,pts:4},{t:'Türkiye',w:1,d:0,l:2,pts:3}],
  E:[{t:'Germany',w:2,d:0,l:1,pts:6},{t:'Ivory Coast',w:2,d:0,l:1,pts:6},{t:'Ecuador',w:1,d:1,l:1,pts:4},{t:'Curaçao',w:0,d:1,l:2,pts:1}],
  F:[{t:'Netherlands',w:2,d:1,l:0,pts:7},{t:'Japan',w:1,d:2,l:0,pts:5},{t:'Sweden',w:1,d:1,l:1,pts:4},{t:'Tunisia',w:0,d:0,l:3,pts:0}],
  G:[{t:'Belgium',w:1,d:2,l:0,pts:5},{t:'Egypt',w:1,d:2,l:0,pts:5},{t:'IR Iran',w:0,d:3,l:0,pts:3},{t:'New Zealand',w:0,d:1,l:2,pts:1}],
  H:[{t:'Spain',w:2,d:1,l:0,pts:7},{t:'Cape Verde',w:0,d:3,l:0,pts:3},{t:'Uruguay',w:0,d:2,l:1,pts:2},{t:'Saudi Arabia',w:0,d:2,l:1,pts:2}],
  I:[{t:'France',w:3,d:0,l:0,pts:9},{t:'Norway',w:2,d:0,l:1,pts:6},{t:'Senegal',w:1,d:0,l:2,pts:3},{t:'Iraq',w:0,d:0,l:3,pts:0}],
  J:[{t:'Argentina',w:3,d:0,l:0,pts:9},{t:'Austria',w:1,d:1,l:1,pts:4},{t:'Algeria',w:1,d:1,l:1,pts:4},{t:'Jordan',w:0,d:0,l:3,pts:0}],
  K:[{t:'Colombia',w:2,d:1,l:0,pts:7},{t:'Portugal',w:1,d:2,l:0,pts:5},{t:'Congo DR',w:1,d:1,l:1,pts:4},{t:'Uzbekistan',w:0,d:0,l:3,pts:0}],
  L:[{t:'England',w:2,d:1,l:0,pts:7},{t:'Croatia',w:2,d:0,l:1,pts:6},{t:'Ghana',w:1,d:1,l:1,pts:4},{t:'Panama',w:0,d:0,l:3,pts:0}],
};

// Round of 32 bracket (current confirmed)
const BRACKET = [
  {home:'Argentina',hScore:3,away:'Jordan',aScore:1,date:'28 Jun'},
  {home:'Colombia',hScore:0,away:'Portugal',aScore:0,date:'28 Jun'},
  {home:'England',hScore:2,away:'Panama',aScore:0,date:'28 Jun'},
  {home:'Croatia',hScore:2,away:'Ghana',aScore:1,date:'28 Jun'},
  {home:'France',hScore:null,away:'Sweden',aScore:null,date:'1 Jul'},
  {home:'Norway',hScore:null,away:'Senegal',aScore:null,date:'2 Jul'},
  {home:'Mexico',hScore:null,away:'Ecuador',aScore:null,date:'1 Jul'},
  {home:'Switzerland',hScore:null,away:'Canada',aScore:null,date:'2 Jul'},
  {home:'Brazil',hScore:null,away:'Japan',aScore:null,date:'29 Jun'},
  {home:'Morocco',hScore:null,away:'Scotland',aScore:null,date:'30 Jun'},
  {home:'Spain',hScore:null,away:'Austria',aScore:null,date:'3 Jul'},
  {home:'Cape Verde',hScore:null,away:'Saudi Arabia',aScore:null,date:'3 Jul'},
  {home:'Germany',hScore:null,away:'Paraguay',aScore:null,date:'30 Jun'},
  {home:'Netherlands',hScore:null,away:'Morocco',aScore:null,date:'30 Jun'},
  {home:'USA',hScore:null,away:'Bosnia and Herzegovina',aScore:null,date:'2 Jul'},
  {home:'Belgium',hScore:null,away:'Egypt',aScore:null,date:'2 Jul'},
];

const FIXTURES = [
  {home:'Brazil',away:'Japan',time:'29 Jun · 10:30 PM IST',ph:57,pa:18},
  {home:'Germany',away:'Paraguay',time:'30 Jun · 2:00 AM IST',ph:71,pa:11},
  {home:'Netherlands',away:'Morocco',time:'30 Jun · 6:30 AM IST',ph:42,pa:28},
  {home:'Ivory Coast',away:'Norway',time:'30 Jun · 10:30 PM IST',ph:26,pa:47},
  {home:'France',away:'Sweden',time:'1 Jul · 2:30 AM IST',ph:77,pa:9},
  {home:'Mexico',away:'Ecuador',time:'1 Jul · 6:30 AM IST',ph:43,pa:25},
  {home:'England',away:'Congo DR',time:'1 Jul · 9:30 PM IST',ph:76,pa:8},
  {home:'Belgium',away:'Senegal',time:'2 Jul · 1:30 AM IST',ph:44,pa:27},
  {home:'USA',away:'Bosnia and Herzegovina',time:'2 Jul · 5:30 AM IST',ph:72,pa:10},
  {home:'Spain',away:'Austria',time:'3 Jul · 12:30 AM IST',ph:74,pa:9},
];

const STADIUMS = [
  {name:'MetLife Stadium',city:'New Jersey, USA',cap:'82,500',matches:'8',role:'FINAL VENUE',icon:'🏟️'},
  {name:'SoFi Stadium',city:'Los Angeles, USA',cap:'70,240',matches:'7',role:'SEMI FINAL',icon:'🏟️'},
  {name:'Estadio Azteca',city:'Mexico City, MX',cap:'87,523',matches:'5',role:'OPENING MATCH',icon:'🏟️'},
  {name:'AT&T Stadium',city:'Dallas, USA',cap:'80,000',matches:'6',role:'QUARTER FINAL',icon:'🏟️'},
  {name:'BC Place',city:'Vancouver, CAN',cap:'54,500',matches:'6',role:'SEMI FINAL',icon:'🏟️'},
  {name:'BMO Field',city:'Toronto, CAN',cap:'45,736',matches:'6',role:'GROUP STAGE',icon:'🏟️'},
];

const FALLBACK_SCORES = [
  {home:'CPV',away:'KSA',sH:0,sA:0,date:'27 Jun',status:'Full Time',live:false},
  {home:'NZL',away:'BEL',sH:1,sA:5,date:'27 Jun',status:'Full Time',live:false},
  {home:'EGY',away:'IRN',sH:1,sA:1,date:'27 Jun',status:'Full Time',live:false},
  {home:'PAN',away:'ENG',sH:0,sA:2,date:'28 Jun',status:'Full Time',live:false},
  {home:'CRO',away:'GHA',sH:2,sA:1,date:'28 Jun',status:'Full Time',live:false},
  {home:'COL',away:'POR',sH:0,sA:0,date:'28 Jun',status:'Full Time',live:false},
  {home:'COD',away:'UZB',sH:3,sA:1,date:'28 Jun',status:'Full Time',live:false},
  {home:'JOR',away:'ARG',sH:1,sA:3,date:'28 Jun',status:'Full Time',live:false},
  {home:'DZA',away:'AUT',sH:3,sA:3,date:'28 Jun',status:'Full Time',live:false},
  {home:'RSA',away:'CAN',sH:0,sA:1,date:'29 Jun',status:'Full Time',live:false},
];

// ── THREE.JS FOOTBALL ────────────────────
function initThree() {
  const canvas = document.getElementById('threeCanvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  const key = new THREE.PointLight(0x00d97e, 3, 20);
  key.position.set(4, 4, 4);
  scene.add(key);
  const fill = new THREE.PointLight(0x4299ff, 1.5, 20);
  fill.position.set(-4, -2, 3);
  scene.add(fill);
  const rim = new THREE.PointLight(0xffffff, 1, 20);
  rim.position.set(0, -4, -3);
  scene.add(rim);

  // Football group
  const group = new THREE.Group();
  scene.add(group);

  // Main sphere
  const geo = new THREE.SphereGeometry(1.5, 64, 64);
  const mat = new THREE.MeshPhongMaterial({
    color: 0xf5f5f5,
    shininess: 80,
    specular: new THREE.Color(0.3, 0.3, 0.3),
  });
  const ball = new THREE.Mesh(geo, mat);
  group.add(ball);

  // Pentagon patches (approximated with icosahedron faces)
  const patchMat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 40 });
  const pentagonPositions = [
    [0,1.5,0], [0,-1.5,0],
    [1.43,0.5,0], [-1.43,0.5,0],
    [1.43,-0.5,0], [-1.43,-0.5,0],
    [0,0.5,1.43], [0,-0.5,1.43],
    [0,0.5,-1.43], [0,-0.5,-1.43],
    [1.0,0,1.05], [-1.0,0,1.05],
  ];
  pentagonPositions.forEach(([x,y,z]) => {
    const pg = new THREE.CircleGeometry(0.34, 5);
    const pm = new THREE.Mesh(pg, patchMat);
    const dir = new THREE.Vector3(x,y,z).normalize();
    pm.position.copy(dir.clone().multiplyScalar(1.52));
    pm.lookAt(dir.multiplyScalar(10));
    group.add(pm);
  });

  // Outer glow ring
  const ringGeo = new THREE.TorusGeometry(2.0, 0.04, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00d97e, transparent: true, opacity: 0.25 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // Second ring
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.02, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x4299ff, transparent: true, opacity: 0.12 })
  );
  ring2.rotation.x = Math.PI / 4;
  group.add(ring2);

  // Particle field around ball
  const pCount = 200;
  const pPositions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const r = 2.2 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pPositions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    pPositions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    pPositions[i*3+2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x00d97e, size: 0.025, transparent: true, opacity: 0.6 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // Position group to right side of screen
  group.position.set(2.5, 0, 0);

  // Mouse interaction
  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Resize
  window.addEventListener('resize', () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  // Animate
  const clock = new THREE.Clock();
  let targetRotX = 0, targetRotY = 0;

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Auto rotation + mouse influence
    targetRotX += (-my * 0.3 - targetRotX) * 0.05;
    targetRotY += (mx * 0.3 - targetRotY) * 0.05;

    ball.rotation.x = t * 0.3 + targetRotX;
    ball.rotation.y = t * 0.5 + targetRotY;

    ring.rotation.z = t * 0.4;
    ring2.rotation.z = -t * 0.25;
    ring2.rotation.x = Math.PI / 4 + Math.sin(t * 0.5) * 0.1;

    points.rotation.y = t * 0.08;
    points.rotation.x = t * 0.04;

    // Subtle float
    group.position.y = Math.sin(t * 0.7) * 0.12;

    // Pulse glow
    ringMat.opacity = 0.18 + Math.sin(t * 1.5) * 0.08;
    key.intensity = 2.5 + Math.sin(t * 0.9) * 0.5;

    renderer.render(scene, camera);
  }
  animate();
}

// ── LOADER CANVAS ────────────────────────
function initLoaderCanvas() {
  const c = document.getElementById('loaderCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let angle = 0;
  function draw() {
    ctx.clearRect(0,0,120,120);
    ctx.strokeStyle = '#1a2236';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(60,60,46,0,Math.PI*2); ctx.stroke();
    const grad = ctx.createLinearGradient(0,0,120,120);
    grad.addColorStop(0,'#00d97e'); grad.addColorStop(1,'#4299ff');
    ctx.strokeStyle = grad;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(60,60,46,angle,angle+Math.PI*1.4); ctx.stroke();
    angle += 0.05;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── CUSTOM CURSOR ────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;
  let cx=0,cy=0,tx=0,ty=0;
  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    cursor.style.left = tx+'px'; cursor.style.top = ty+'px';
  });
  function lerpTrail() {
    cx += (tx-cx) * 0.12; cy += (ty-cy) * 0.12;
    trail.style.left = cx+'px'; trail.style.top = cy+'px';
    requestAnimationFrame(lerpTrail);
  }
  lerpTrail();
  document.addEventListener('mousedown', () => document.body.classList.add('clicking'));
  document.addEventListener('mouseup', () => document.body.classList.remove('clicking'));
  document.querySelectorAll('a,button,.mcard,.b-match,.stadium-card,.gtab').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

// ── CARD MOUSE GLOW ──────────────────────
function initCardGlow() {
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.mcard').forEach(card => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
      card.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
    });
  });
}

// ── NAV SCROLL ───────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── COUNT UP ─────────────────────────────
function countUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const target = parseInt(el.dataset.count);
  const dur = 1400;
  const start = performance.now();
  const ease = t => t === 1 ? 1 : 1 - Math.pow(2, -10*t);
  const tick = now => {
    const t = Math.min((now-start)/dur, 1);
    el.textContent = Math.floor(ease(t) * target);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

// ── INTERSECTION REVEAL ──────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('anim-in'), delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-anim]').forEach(el => obs.observe(el));

  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const parent = e.target;
      parent.querySelectorAll('.mcard,.b-match,.frow,.stadium-card').forEach((el,i) => {
        setTimeout(() => el.classList.add('in'), i * 50);
      });
      cardObs.unobserve(parent);
    });
  }, { threshold: 0.1 });

  ['scoresGrid','bracketGrid','fixturesList','stadiumsGrid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) cardObs.observe(el);
  });

  // Count-ups
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('[data-count]').forEach(countUp);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hero-stats,.hero-numbers').forEach(el => countObs.observe(el));
}

// ── TICKER ───────────────────────────────
function buildTicker(matches) {
  const t = document.getElementById('ticker');
  if (!t) return;
  const items = matches.map(m =>
    `<span class="ticker-item">${F(m.home)||m.home} ${m.home} <span class="ticker-score">${m.sH} – ${m.sA}</span> ${m.away} ${F(m.away)||m.away}</span>`
  ).join('');
  t.innerHTML = items + items;
}

// ── LIVE SCORES ──────────────────────────
async function fetchScores() {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(today); d.setDate(d.getDate()-i);
    days.push(d.toISOString().split('T')[0]);
  }
  try {
    const results = await Promise.all(days.map(async date => {
      const r = await fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${date}&s=Soccer`);
      const data = await r.json();
      return (data.events || []).filter(e => (e.strLeague||'').toLowerCase().includes('world cup'));
    }));
    const events = results.flat();
    if (!events.length) throw new Error('no wc events');
    return events
      .filter(e => e.intHomeScore !== null && e.intHomeScore !== undefined)
      .map(e => ({
        home: e.strHomeTeam, away: e.strAwayTeam,
        sH: e.intHomeScore, sA: e.intAwayScore,
        date: new Date(e.dateEvent).toLocaleDateString('en-GB',{day:'numeric',month:'short'}),
        status: ['Match Finished','FT'].includes(e.strStatus) ? 'Full Time' : (e.strStatus || 'Full Time'),
        live: e.strStatus && !['Match Finished','FT','NS',''].includes(e.strStatus),
      }))
      .slice(0,10);
  } catch {
    return null;
  }
}

function renderScores(matches, isLive) {
  const grid = document.getElementById('scoresGrid');
  const meta = document.getElementById('scoreMeta');
  const pip = document.getElementById('apiPip');
  const label = document.getElementById('apiLabel');
  if (!grid) return;

  if (isLive) {
    pip.classList.add('live');
    label.textContent = 'Live data';
    meta.textContent = `${matches.length} matches · refreshed on load`;
  } else {
    pip.classList.add('dead');
    label.textContent = 'Cached data';
    meta.textContent = 'API unavailable — showing recent results';
  }

  grid.innerHTML = '';
  matches.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'mcard';
    card.style.transitionDelay = i*45+'ms';
    const liveClass = m.live ? 'is-live' : '';
    card.innerHTML = `
      <div class="mcard-status ${liveClass}">
        <span class="mpip"></span>
        ${m.date} · ${m.status}
      </div>
      <div class="mcard-teams">
        <div class="mcard-team">
          <span class="mcard-flag">${F(m.home)}</span>
          <span class="mcard-name">${isLive ? A(m.home) : m.home}</span>
        </div>
        <div class="mcard-score">
          <span class="mcard-score-num">${m.sH}</span>
          <span class="mcard-score-sep">–</span>
          <span class="mcard-score-num">${m.sA}</span>
        </div>
        <div class="mcard-team">
          <span class="mcard-flag">${F(m.away)}</span>
          <span class="mcard-name">${isLive ? A(m.away) : m.away}</span>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  buildTicker(matches);
}

// ── BRACKET ──────────────────────────────
function renderBracket() {
  const grid = document.getElementById('bracketGrid');
  if (!grid) return;
  BRACKET.forEach(m => {
    const el = document.createElement('div');
    el.className = 'b-match';
    const played = m.hScore !== null;
    const hWin = played && m.hScore > m.aScore;
    const aWin = played && m.aScore > m.hScore;
    el.innerHTML = `
      <div class="b-match-date">${m.date}</div>
      <div class="b-team">
        <div class="b-team-info">
          <span class="b-flag">${F(m.home)}</span>
          <span class="b-name">${m.home}</span>
        </div>
        <span class="b-score ${played&&!hWin?'loser':''}">${played?m.hScore:'–'}</span>
      </div>
      <div class="b-team">
        <div class="b-team-info">
          <span class="b-flag">${F(m.away)}</span>
          <span class="b-name">${m.away}</span>
        </div>
        <span class="b-score ${played&&!aWin?'loser':''}">${played?m.aScore:'–'}</span>
      </div>`;
    grid.appendChild(el);
  });
}

// ── GROUPS ───────────────────────────────
let activeGroup = 'A';
function renderGroupTabs() {
  const tabs = document.getElementById('groupTabs');
  if (!tabs) return;
  Object.keys(GROUPS).forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'gtab' + (letter===activeGroup?' active':'');
    btn.textContent = letter;
    btn.addEventListener('click', () => {
      activeGroup = letter;
      tabs.querySelectorAll('.gtab').forEach(t=>t.classList.remove('active'));
      btn.classList.add('active');
      renderGroupPanel();
    });
    tabs.appendChild(btn);
  });
}
function renderGroupPanel() {
  const panel = document.getElementById('groupPanel');
  if (!panel) return;
  const rows = GROUPS[activeGroup].map((t,i) => `
    <tr class="${i<2?'qual':''}">
      <td><div class="gt-team"><span class="gt-flag">${F(t.t)}</span><span class="gt-name">${t.t}</span></div></td>
      <td>${t.w}</td><td>${t.d}</td><td>${t.l}</td>
      <td class="gt-pts">${t.pts}</td>
    </tr>`).join('');
  panel.innerHTML = `
    <table class="gtable">
      <thead><tr><th>Team</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

// ── FIXTURES ─────────────────────────────
function renderFixtures() {
  const list = document.getElementById('fixturesList');
  if (!list) return;
  FIXTURES.forEach((f,i) => {
    const row = document.createElement('div');
    row.className = 'frow';
    row.style.transitionDelay = i*45+'ms';
    row.innerHTML = `
      <div class="fteam">
        <span class="fflag">${F(f.home)}</span>
        <span class="fname">${f.home}</span>
      </div>
      <div class="fcenter">
        <span class="fvs">vs</span>
        <span class="ftime">${f.time}</span>
        <div class="fprob">
          <span class="ph">${f.ph}%</span>
          <span>·</span>
          <span class="pa">${f.pa}%</span>
        </div>
      </div>
      <div class="fteam fteam-away">
        <span class="fflag">${F(f.away)}</span>
        <span class="fname">${f.away}</span>
      </div>`;
    list.appendChild(row);
  });
}

// ── STADIUMS ─────────────────────────────
function renderStadiums() {
  const grid = document.getElementById('stadiumsGrid');
  if (!grid) return;
  STADIUMS.forEach(s => {
    const card = document.createElement('div');
    card.className = 'stadium-card';
    card.innerHTML = `
      <div class="stadium-img">${s.icon}</div>
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

// ── BOOT ─────────────────────────────────
async function boot() {
  initLoaderCanvas();
  initThree();
  initCursor();
  initCardGlow();
  initNav();

  // Set data-count from data-count attr on hstat nums
  document.querySelectorAll('[data-count]').forEach(el => {
    el.textContent = '0';
  });

  renderBracket();
  renderGroupTabs();
  renderGroupPanel();
  renderFixtures();
  renderStadiums();

  // Attempt live fetch
  const live = await fetchScores();
  if (live && live.length) {
    renderScores(live, true);
  } else {
    // Build fallback with full names from abbrs
    const mapped = FALLBACK_SCORES.map(m => {
      const homeMap = {CPV:'Cape Verde',KSA:'Saudi Arabia',NZL:'New Zealand',BEL:'Belgium',EGY:'Egypt',IRN:'IR Iran',PAN:'Panama',ENG:'England',CRO:'Croatia',GHA:'Ghana',COL:'Colombia',POR:'Portugal',COD:'Congo DR',UZB:'Uzbekistan',JOR:'Jordan',ARG:'Argentina',DZA:'Algeria',AUT:'Austria',RSA:'South Africa',CAN:'Canada'};
      return {...m, home:homeMap[m.home]||m.home, away:homeMap[m.away]||m.away};
    });
    renderScores(mapped, false);
  }

  initReveal();

  // Hide loader
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
}

// Wait for Three.js to load
window.addEventListener('load', boot);
