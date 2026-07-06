// ═══════════════════════════════════════════
// WORLD PULSE · app.js  ·  Updated Jul 6 2026
// Three.js 360° draggable football + live data
// ═══════════════════════════════════════════

const FLAGS={Mexico:'🇲🇽','South Africa':'🇿🇦','Korea Republic':'🇰🇷',Czechia:'🇨🇿',Switzerland:'🇨🇭',Canada:'🇨🇦','Bosnia and Herzegovina':'🇧🇦',Qatar:'🇶🇦',Brazil:'🇧🇷',Morocco:'🇲🇦',Scotland:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',Haiti:'🇭🇹',USA:'🇺🇸',Australia:'🇦🇺',Paraguay:'🇵🇾',Türkiye:'🇹🇷',Turkey:'🇹🇷',Germany:'🇩🇪','Ivory Coast':'🇨🇮',Ecuador:'🇪🇨','Curaçao':'🇨🇼',Netherlands:'🇳🇱',Japan:'🇯🇵',Sweden:'🇸🇪',Tunisia:'🇹🇳',Belgium:'🇧🇪',Egypt:'🇪🇬','IR Iran':'🇮🇷',Iran:'🇮🇷','New Zealand':'🇳🇿',Spain:'🇪🇸','Cape Verde':'🇨🇻',Uruguay:'🇺🇾','Saudi Arabia':'🇸🇦',France:'🇫🇷',Norway:'🇳🇴',Senegal:'🇸🇳',Iraq:'🇮🇶',Argentina:'🇦🇷',Austria:'🇦🇹',Algeria:'🇩🇿',Jordan:'🇯🇴',Colombia:'🇨🇴',Portugal:'🇵🇹','Congo DR':'🇨🇩',Uzbekistan:'🇺🇿',England:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',Croatia:'🇭🇷',Ghana:'🇬🇭',Panama:'🇵🇦'};
const F=n=>FLAGS[n]||'🏳';

// ── LIVE SCORES (Round of 16 — current as of Jul 6 2026) ──
const RECENT_SCORES=[
  // R16 confirmed results
  {home:'Morocco',away:'Canada',   sH:3,sA:0,date:'4 Jul',stage:'Round of 16',live:false},
  {home:'France', away:'Paraguay', sH:1,sA:0,date:'4 Jul',stage:'Round of 16',live:false},
  {home:'Norway', away:'Brazil',   sH:2,sA:1,date:'5 Jul',stage:'Round of 16',live:false},
  {home:'Mexico', away:'England',  sH:2,sA:3,date:'5 Jul',stage:'Round of 16',live:false},
  // Today Jul 6 — live/upcoming
  {home:'Portugal',away:'Spain',   sH:null,sA:null,date:'6 Jul · 3pm ET', stage:'Round of 16',live:true},
  {home:'USA',    away:'Belgium',  sH:null,sA:null,date:'6 Jul · 8pm ET', stage:'Round of 16',live:true},
  // Late R32 results
  {home:'England',away:'Congo DR', sH:2,sA:0,date:'1 Jul',stage:'Round of 32',live:false},
  {home:'USA',    away:'Bosnia and Herzegovina',sH:2,sA:0,date:'2 Jul',stage:'Round of 32',live:false},
  {home:'Belgium',away:'Senegal',  sH:3,sA:2,date:'2 Jul',stage:'Round of 32',live:false},
  {home:'Spain',  away:'Austria',  sH:3,sA:0,date:'3 Jul',stage:'Round of 32',live:false},
];

// ── UPCOMING FIXTURES ──
const FIXTURES=[
  {home:'Argentina',away:'Egypt',      time:'7 Jul · 12pm ET',ph:72,pa:12},
  {home:'Switzerland',away:'Colombia', time:'7 Jul · 4pm ET', ph:44,pa:33},
  {home:'France QF', away:'Morocco QF',time:'9 Jul · 4pm ET', ph:58,pa:22},
  {home:'USA/BEL QF',away:'ESP/POR QF',time:'10 Jul · 3pm ET',ph:null,pa:null},
  {home:'NOR/ENG QF',away:'ARG/EGY QF',time:'11 Jul · 5pm ET',ph:null,pa:null},
  {home:'Semifinal 1',away:'Semifinal 1',time:'14 Jul · 2pm ET',ph:null,pa:null},
  {home:'Semifinal 2',away:'Semifinal 2',time:'15 Jul · 6pm ET',ph:null,pa:null},
  {home:'3rd Place', away:'3rd Place',  time:'18 Jul · 5pm ET',ph:null,pa:null},
  {home:'🏆 FINAL',  away:'🏆 FINAL',  time:'19 Jul · 3pm ET · MetLife Stadium',ph:null,pa:null},
];

// ── GROUP STANDINGS (final, group stage complete) ──
const GROUPS={
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

// ── R16 BRACKET (updated Jul 6) ──
const BRACKET=[
  {home:'Morocco',hS:3,away:'Canada',aS:0,date:'4 Jul · R16'},
  {home:'France',hS:1,away:'Paraguay',aS:0,date:'4 Jul · R16'},
  {home:'Norway',hS:2,away:'Brazil',aS:1,date:'5 Jul · R16'},
  {home:'England',hS:3,away:'Mexico',aS:2,date:'5 Jul · R16'},
  {home:'Portugal',hS:null,away:'Spain',aS:null,date:'6 Jul · R16 — TODAY'},
  {home:'USA',hS:null,away:'Belgium',aS:null,date:'6 Jul · R16 — TODAY'},
  {home:'Argentina',hS:null,away:'Egypt',aS:null,date:'7 Jul · R16'},
  {home:'Switzerland',hS:null,away:'Colombia',aS:null,date:'7 Jul · R16'},
];

const STADIUMS=[
  {name:'MetLife Stadium',city:'New Jersey, USA',cap:'82,500',matches:'8',role:'FINAL — 19 JUL'},
  {name:'AT&T Stadium',city:'Dallas, USA',cap:'94,000',matches:'9',role:'MOST MATCHES'},
  {name:'Estadio Azteca',city:'Mexico City, MX',cap:'83,000',matches:'5',role:'OPENING MATCH'},
  {name:'SoFi Stadium',city:'Los Angeles, USA',cap:'70,000',matches:'7',role:'SEMI FINAL'},
  {name:'BC Place',city:'Vancouver, CAN',cap:'54,000',matches:'6',role:'QUARTER FINAL'},
  {name:'Hard Rock Stadium',city:'Miami, USA',cap:'65,000',matches:'6',role:'QUARTER FINAL'},
];

// ── THREE.JS 360° DRAGGABLE FOOTBALL ──
function initThree(){
  const canvas=document.getElementById('threeCanvas');
  if(!canvas||!window.THREE){console.warn('THREE not loaded');return;}
  const W=()=>canvas.clientWidth,H=()=>canvas.clientHeight;
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(W(),H(),false);
  renderer.setClearColor(0,0);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(45,W()/H(),0.1,100);
  camera.position.set(0,0,6);
  scene.add(new THREE.AmbientLight(0xffffff,0.5));
  const key=new THREE.PointLight(0x00d97e,4,25);key.position.set(5,5,5);scene.add(key);
  const fill=new THREE.PointLight(0x4299ff,2,20);fill.position.set(-5,-3,4);scene.add(fill);
  scene.add(Object.assign(new THREE.PointLight(0xffffff,1.5,20),{position:{set:(x,y,z)=>{fill.position.set(0,-5,-4)}}}).position&&new THREE.PointLight(0xffffff,1.5,20));
  const rim=new THREE.PointLight(0xffffff,1.5,20);rim.position.set(0,-5,-4);scene.add(rim);
  const ballGroup=new THREE.Group();scene.add(ballGroup);
  const ball=new THREE.Mesh(new THREE.SphereGeometry(1.6,64,64),new THREE.MeshPhongMaterial({color:0xf0f0f0,shininess:90,specular:new THREE.Color(0.25,0.25,0.25)}));
  ballGroup.add(ball);
  const pMat=new THREE.MeshPhongMaterial({color:0x0a0a0a,shininess:30});
  [[0,1,0],[0,-1,0],[1,0.5,0],[-1,0.5,0],[1,-0.5,0],[-1,-0.5,0],[0,0.5,1],[0,-0.5,1],[0,0.5,-1],[0,-0.5,-1],[0.9,0,0.9],[-0.9,0,0.9],[0.9,0,-0.9],[-0.9,0,-0.9]].forEach(([x,y,z])=>{
    const p=new THREE.Mesh(new THREE.CircleGeometry(0.32,5),pMat);
    const d=new THREE.Vector3(x,y,z).normalize();
    p.position.copy(d.clone().multiplyScalar(1.62));p.lookAt(d.clone().multiplyScalar(10));
    ballGroup.add(p);
  });
  const rMat1=new THREE.MeshBasicMaterial({color:0x00d97e,transparent:true,opacity:0.2});
  const rMat2=new THREE.MeshBasicMaterial({color:0x4299ff,transparent:true,opacity:0.12});
  const ring1=new THREE.Mesh(new THREE.TorusGeometry(2.1,0.04,16,100),rMat1);ring1.rotation.x=Math.PI/2;
  const ring2=new THREE.Mesh(new THREE.TorusGeometry(2.5,0.025,16,100),rMat2);ring2.rotation.x=Math.PI/3;
  scene.add(ring1,ring2);
  const pCount=250,pos=new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){const r=2.4+Math.random()*3,t=Math.random()*Math.PI*2,phi=Math.acos(2*Math.random()-1);pos[i*3]=r*Math.sin(phi)*Math.cos(t);pos[i*3+1]=r*Math.sin(phi)*Math.sin(t);pos[i*3+2]=r*Math.cos(phi);}
  const pGeo=new THREE.BufferGeometry();pGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const particles=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0x00d97e,size:0.022,transparent:true,opacity:0.5}));
  scene.add(particles);
  ballGroup.position.set(2.2,0,0);
  let drag=false,prev={x:0,y:0},velX=0,velY=0,auto=true;
  canvas.addEventListener('mousedown',e=>{drag=true;auto=false;prev={x:e.clientX,y:e.clientY};document.body.style.cursor='grabbing';});
  window.addEventListener('mousemove',e=>{if(!drag)return;velY=(e.clientX-prev.x)*0.012;velX=(e.clientY-prev.y)*0.012;ballGroup.rotation.y+=velY;ballGroup.rotation.x+=velX;prev={x:e.clientX,y:e.clientY};});
  window.addEventListener('mouseup',()=>{drag=false;document.body.style.cursor='';setTimeout(()=>{auto=true;},2000);});
  canvas.addEventListener('touchstart',e=>{drag=true;auto=false;prev={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
  window.addEventListener('touchmove',e=>{if(!drag)return;velY=(e.touches[0].clientX-prev.x)*0.012;velX=(e.touches[0].clientY-prev.y)*0.012;ballGroup.rotation.y+=velY;ballGroup.rotation.x+=velX;prev={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
  window.addEventListener('touchend',()=>{drag=false;setTimeout(()=>{auto=true;},2000);});
  window.addEventListener('resize',()=>{renderer.setSize(W(),H(),false);camera.aspect=W()/H();camera.updateProjectionMatrix();});
  const clock=new THREE.Clock();
  (function anim(){
    requestAnimationFrame(anim);
    const t=clock.getElapsedTime();
    if(auto){ballGroup.rotation.y+=0.006;ballGroup.rotation.x+=0.002;}
    else if(!drag){velX*=0.92;velY*=0.92;ballGroup.rotation.x+=velX;ballGroup.rotation.y+=velY;}
    ballGroup.position.y=Math.sin(t*0.7)*0.1;
    ring1.rotation.z=t*0.35;ring2.rotation.z=-t*0.2;ring2.rotation.x=Math.PI/3+Math.sin(t*0.4)*0.08;
    particles.rotation.y=t*0.06;particles.rotation.x=t*0.03;
    rMat1.opacity=0.15+Math.sin(t*1.4)*0.07;key.intensity=3.5+Math.sin(t*0.8)*0.8;
    renderer.render(scene,camera);
  })();
}

function initLoader(){
  const c=document.getElementById('loaderCanvas');if(!c)return;
  const ctx=c.getContext('2d');let a=0;
  (function draw(){ctx.clearRect(0,0,100,100);ctx.strokeStyle='#1a2236';ctx.lineWidth=5;ctx.beginPath();ctx.arc(50,50,38,0,Math.PI*2);ctx.stroke();const g=ctx.createLinearGradient(0,0,100,100);g.addColorStop(0,'#00d97e');g.addColorStop(1,'#4299ff');ctx.strokeStyle=g;ctx.lineCap='round';ctx.beginPath();ctx.arc(50,50,38,a,a+Math.PI*1.4);ctx.stroke();a+=0.06;requestAnimationFrame(draw);})();
}

function initCursor(){
  const dot=document.getElementById('cursor'),trail=document.getElementById('cursorTrail');
  if(!dot||!trail)return;
  let cx=-100,cy=-100,tx=-100,ty=-100;
  document.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;dot.style.left=tx+'px';dot.style.top=ty+'px';});
  (function l(){cx+=(tx-cx)*0.13;cy+=(ty-cy)*0.13;trail.style.left=cx+'px';trail.style.top=cy+'px';requestAnimationFrame(l);})();
  document.addEventListener('mousedown',()=>document.body.classList.add('clicking'));
  document.addEventListener('mouseup',()=>document.body.classList.remove('clicking'));
  document.querySelectorAll('a,button,.mcard,.b-match,.stadium-card,.gtab').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('hovered'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('hovered'));
  });
}

function initCardGlow(){
  document.addEventListener('mousemove',e=>{
    document.querySelectorAll('.mcard').forEach(c=>{
      const r=c.getBoundingClientRect();
      c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });
}

function initNav(){
  const nav=document.getElementById('nav');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20),{passive:true});
}

function countUp(el){
  if(el.dataset.done)return;el.dataset.done='1';
  const target=parseInt(el.dataset.count),dur=1400,start=performance.now();
  const ease=t=>t===1?1:1-Math.pow(2,-10*t);
  (function tick(now){const p=Math.min((now-start)/dur,1);el.textContent=Math.floor(ease(p)*target);if(p<1)requestAnimationFrame(tick);else el.textContent=target;})(performance.now());
}

function initReveal(){
  const cardObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.querySelectorAll('.mcard,.b-match,.frow,.stadium-card').forEach((el,i)=>setTimeout(()=>el.classList.add('in'),i*55));
      cardObs.unobserve(e.target);
    });
  },{threshold:0.08});
  ['scoresGrid','bracketGrid','fixturesList','stadiumsGrid'].forEach(id=>{const el=document.getElementById(id);if(el)cardObs.observe(el);});
  new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('[data-count]').forEach(countUp);});
  },{threshold:0.5}).observe(document.querySelector('.hero-stats')||document.body);
}

function buildTicker(){
  const el=document.getElementById('ticker');if(!el)return;
  const played=RECENT_SCORES.filter(m=>m.sH!==null);
  const html=played.map(m=>`<span class="ticker-item">${F(m.home)} ${m.home} <span class="ticker-score">${m.sH}–${m.sA}</span> ${m.away} ${F(m.away)} · ${m.stage}</span>`).join('');
  el.innerHTML=html+html;
}

// ── LIVE API FETCH ──
async function fetchScores(){
  const today=new Date();
  const days=Array.from({length:5},(_,i)=>{const d=new Date(today);d.setDate(d.getDate()-i);return d.toISOString().split('T')[0];});
  try{
    const all=await Promise.all(days.map(async d=>{
      const res=await fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${d}&s=Soccer`);
      if(!res.ok)return[];
      const json=await res.json();
      return(json.events||[]).filter(e=>(e.strLeague||'').toLowerCase().includes('world cup'));
    }));
    const events=all.flat().filter(e=>e.intHomeScore!==null&&e.intHomeScore!==undefined);
    if(!events.length)return null;
    return events.map(e=>({
      home:e.strHomeTeam,away:e.strAwayTeam,
      sH:e.intHomeScore,sA:e.intAwayScore,
      date:new Date(e.dateEvent).toLocaleDateString('en-GB',{day:'numeric',month:'short'}),
      stage:'Match',
      live:!!e.strStatus&&!['Match Finished','FT','NS',''].includes(e.strStatus),
    })).slice(0,10);
  }catch{return null;}
}

function renderScores(matches,fromAPI){
  const grid=document.getElementById('scoresGrid');
  const meta=document.getElementById('scoreMeta');
  const pip=document.getElementById('apiPip');
  const lbl=document.getElementById('apiLabel');
  if(!grid)return;
  pip.className='pip '+(fromAPI?'live':'dead');
  lbl.textContent=fromAPI?'Live data · auto-refreshed':'Latest known results · Jul 6 2026';
  if(meta)meta.textContent=fromAPI?`${matches.length} matches · refreshed on load`:'Round of 16 underway';
  grid.innerHTML='';
  matches.forEach((m,i)=>{
    const div=document.createElement('div');
    div.className='mcard';div.style.transitionDelay=(i*45)+'ms';
    const upcoming=m.sH===null;
    div.innerHTML=`
      <div class="mcard-status${m.live||upcoming?' live-now':''}">
        <span class="mpip"></span>${m.date} · ${m.stage||'Full Time'} ${upcoming?'· UPCOMING':''}
      </div>
      <div class="mcard-teams">
        <div class="mcard-team"><span class="mcard-flag">${F(m.home)}</span><span class="mcard-name">${m.home}</span></div>
        <div class="mcard-score">
          <span class="msnum">${upcoming?'?':m.sH}</span>
          <span class="mssep">–</span>
          <span class="msnum">${upcoming?'?':m.sA}</span>
        </div>
        <div class="mcard-team"><span class="mcard-flag">${F(m.away)}</span><span class="mcard-name">${m.away}</span></div>
      </div>`;
    grid.appendChild(div);
  });
}

function renderBracket(){
  const grid=document.getElementById('bracketGrid');if(!grid)return;
  BRACKET.forEach(m=>{
    const played=m.hS!==null;
    const today=m.date.includes('TODAY');
    const div=document.createElement('div');div.className='b-match';
    if(today)div.style.borderColor='rgba(0,217,126,0.4)';
    div.innerHTML=`
      <div class="b-date" style="${today?'color:var(--green)':''}">${m.date}</div>
      <div class="b-team">
        <div class="b-info"><span class="b-flag">${F(m.home)}</span><span class="b-name">${m.home}</span></div>
        <span class="b-score${played&&m.hS<m.aS?' lost':''}">${played?m.hS:'–'}</span>
      </div>
      <div class="b-team">
        <div class="b-info"><span class="b-flag">${F(m.away)}</span><span class="b-name">${m.away}</span></div>
        <span class="b-score${played&&m.aS<m.hS?' lost':''}">${played?m.aS:'–'}</span>
      </div>`;
    grid.appendChild(div);
  });
}

let activeGroup='A';
function renderGroupTabs(){
  const tabs=document.getElementById('groupTabs');if(!tabs)return;
  Object.keys(GROUPS).forEach(letter=>{
    const btn=document.createElement('button');
    btn.className='gtab'+(letter===activeGroup?' active':'');btn.textContent=letter;
    btn.addEventListener('click',()=>{activeGroup=letter;tabs.querySelectorAll('.gtab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');renderGroupPanel();});
    tabs.appendChild(btn);
  });
}
function renderGroupPanel(){
  const panel=document.getElementById('groupPanel');if(!panel)return;
  panel.innerHTML=`<table class="gtable"><thead><tr><th>Team</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr></thead><tbody>${GROUPS[activeGroup].map((t,i)=>`<tr class="${i<2?'q':''}"><td><div class="gt-team"><span class="gt-flag">${F(t.t)}</span><span class="gt-name">${t.t}</span></div></td><td>${t.w}</td><td>${t.d}</td><td>${t.l}</td><td class="gt-pts">${t.pts}</td></tr>`).join('')}</tbody></table>`;
}

function renderFixtures(){
  const list=document.getElementById('fixturesList');if(!list)return;
  FIXTURES.forEach((f,i)=>{
    const row=document.createElement('div');row.className='frow';row.style.transitionDelay=(i*45)+'ms';
    const tbd=!f.ph;
    row.innerHTML=`
      <div class="fteam"><span class="fflag">${F(f.home)}</span><span class="fname">${f.home}</span></div>
      <div class="fcenter">
        <span class="fvs">vs</span><span class="ftime">${f.time}</span>
        ${!tbd?`<div class="fprob"><span class="ph">${f.ph}%</span><span>·</span><span class="pa">${f.pa}%</span></div>`:''}
      </div>
      <div class="fteam fteam-away"><span class="fflag">${F(f.away)}</span><span class="fname">${f.away}</span></div>`;
    list.appendChild(row);
  });
}

function renderStadiums(){
  const grid=document.getElementById('stadiumsGrid');if(!grid)return;
  STADIUMS.forEach(s=>{
    const card=document.createElement('div');card.className='stadium-card';
    card.innerHTML=`<div class="stadium-img">🏟️</div><div class="stadium-body"><div class="stadium-name">${s.name}</div><div class="stadium-city">${s.city} · ${s.role}</div><div class="stadium-stats"><div class="sstat"><strong>${s.cap}</strong><span>Capacity</span></div><div class="sstat"><strong>${s.matches}</strong><span>Matches</span></div></div></div>`;
    grid.appendChild(card);
  });
}

// ── BOOT ──
(async function boot(){
  initLoader();initNav();initCardGlow();
  renderBracket();renderGroupTabs();renderGroupPanel();renderFixtures();renderStadiums();
  initThree();initCursor();initReveal();
  buildTicker();

  // Try live API, fall back to current known results
  const live=await fetchScores();
  renderScores(live||RECENT_SCORES,!!live);

  setTimeout(()=>document.getElementById('loader').classList.add('out'),1000);
})();
