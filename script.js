// PERSONALIZE THESE SETTINGS
const CONFIG = {
  password: '122026',
  startDate: '2026-02-01T00:00:00', // CHANGE to your real relationship start date
  musicUrl: "https://files.catbox.moe/xqzjbk.mp3",
  
photos: [
  'https://files.catbox.moe/3v8znj.jpg', 
  'https://files.catbox.moe/s97a6d.jpg', 
  'https://files.catbox.moe/qfhnt3.JPEG', 
  'https://files.catbox.moe/g2e1fn.jpg', 
  'https://files.catbox.moe/hvgbye.jpg'
],
captions: [
  'Our first memory ♡',
  'With memory♡',
  'That beautiful smile♡',
  'Just us ♡',
  'More memories to come ♡'
]
};
const sceneIds = ['welcome','intro','counter','gallery','letter','heart','stars','finale'];
const $ = id => document.getElementById(id);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let petalTimer;
function showScene(id){
  if(!sceneIds.includes(id))return;
  document.querySelectorAll('.scene').forEach(s=>s.classList.toggle('active',s.id===id));
  $('progress').querySelectorAll('span').forEach((dot,i)=>dot.classList.toggle('current',sceneIds[i]===id));
  window.scrollTo({top:0,behavior:'instant'});
  if(id==='intro'||id==='finale')burstPetals(35);
}
sceneIds.forEach(()=>{const dot=document.createElement('span');$('progress').appendChild(dot)});
showScene('welcome');
document.querySelectorAll('.next').forEach(b=>b.addEventListener('click',()=>showScene(b.dataset.next)));
function unlock(){
  if($('password').value.trim()!==CONFIG.password){$('error').textContent='Not quite, my love. Try again ♡';return;}
  $('error').textContent='';showScene('intro');startPetals();
  // Browser rules allow audio playback after a click, but some devices may still block it.
  if(CONFIG.musicUrl)playMusic();
}
$('unlockBtn').addEventListener('click',unlock);
$('password').addEventListener('keydown',e=>{if(e.key==='Enter')unlock()});
function makePetal(){if(reduceMotion)return;const p=document.createElement('span');p.className='petal';p.textContent=Math.random()>.45?'❀':'♥';p.style.left=Math.random()*100+'%';p.style.fontSize=(10+Math.random()*16)+'px';p.style.animationDuration=(5+Math.random()*5)+'s';$('petals').appendChild(p);p.addEventListener('animationend',()=>p.remove());}
function startPetals(){if(petalTimer||reduceMotion)return;petalTimer=setInterval(makePetal,850)}
function burstPetals(n){if(reduceMotion)return;for(let i=0;i<n;i++)setTimeout(makePetal,i*35)}
const audio=$('song');
if(CONFIG.musicUrl)audio.src=CONFIG.musicUrl;
function updateMusicButton(){$('musicBtn').textContent=audio.paused?'♫ Music Off':'♫ Music On'}
async function playMusic(){if(!audio.src)return;try{await audio.play()}catch(e){$('musicBtn').textContent='♫ Tap to Play'}updateMusicButton()}
$('musicBtn').addEventListener('click',()=>{if(!CONFIG.musicUrl){$('musicBtn').textContent='♫ Add song URL first';return;}audio.paused?playMusic():audio.pause()});
audio.addEventListener('play',updateMusicButton);audio.addEventListener('pause',updateMusicButton);
function updateCounter(){const start=new Date(CONFIG.startDate).getTime();const now=Date.now();if(!Number.isFinite(start)||start>now){$('counterNote').textContent='Set your relationship start date in script.js';return;}const elapsed=Math.floor((now-start)/1000);$('days').textContent=Math.floor(elapsed/86400).toLocaleString();$('hours').textContent=String(Math.floor(elapsed%86400/3600)).padStart(2,'0');$('minutes').textContent=String(Math.floor(elapsed%3600/60)).padStart(2,'0');$('seconds').textContent=String(elapsed%60).padStart(2,'0')}
updateCounter();setInterval(updateCounter,1000);
CONFIG.photos.forEach((url,i)=>{const b=document.createElement('button');b.className='photo-card';b.type='button';if(url){const img=document.createElement('img');img.src=url;img.alt=CONFIG.captions[i]||'Memory';img.loading='lazy';b.appendChild(img)}else{const placeholder=document.createElement('div');placeholder.className='photo-placeholder';placeholder.textContent='♡';b.appendChild(placeholder)}const caption=document.createElement('span');caption.textContent=CONFIG.captions[i]||`Memory ${i+1}`;b.appendChild(caption);b.addEventListener('click',()=>{if(!url){caption.textContent='Add photo URL in script.js';return;}$('lightboxImg').src=url;$('lightboxCaption').textContent=CONFIG.captions[i];$('lightbox').hidden=false});$('photoGrid').appendChild(b)});
function closeLightbox(){$('lightbox').hidden=true;$('lightboxImg').removeAttribute('src')}
$('closeLightbox').addEventListener('click',closeLightbox);
$('lightbox').addEventListener('click',e=>{if(e.target===$('lightbox'))closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
$('envelope').addEventListener('click',()=>{$('envelope').classList.add('open');$('letterPaper').hidden=false;$('letterHint').textContent='A letter written just for you ♡'});
const heartMessages=['Your smile makes ordinary days brighter.','You are my favorite notification.','I love the little things that make you, you.','Every moment with you is a memory worth keeping.','If I could choose again, I would still choose you.'];
let heartIndex=0;
$('touchHeart').addEventListener('click',()=>{$('heartMessage').textContent=heartMessages[heartIndex++%heartMessages.length];$('touchHeart').classList.remove('pulse');void $('touchHeart').offsetWidth;$('touchHeart').classList.add('pulse');burstPetals(12)});
const field=$('starfield');for(let i=0;i<85;i++){const s=document.createElement('span');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.animationDelay=Math.random()*3+'s';field.appendChild(s)}
const wishes=['May we always find reasons to smile together.','May our love grow with kindness and patience.','May we make a thousand more beautiful memories.'];let wishIndex=0;
$('wishBtn').addEventListener('click',()=>{$('wishMessage').textContent=wishes[wishIndex++%wishes.length];if(!reduceMotion){const s=document.createElement('span');s.className='shooting';s.style.left='10%';s.style.top='20%';field.appendChild(s);s.addEventListener('animationend',()=>s.remove())}});
$('gift').addEventListener('click',()=>{$('gift').classList.add('open');$('finalMessage').hidden=false;burstPetals(70)});
$('kissBtn').addEventListener('click',()=>{$('kissMessage').textContent='Mwah! 💋 Your kiss reached my heart!';burstPetals(50)});
$('restartBtn').addEventListener('click',()=>{showScene('welcome');$('gift').classList.remove('open');$('finalMessage').hidden=true;$('letterPaper').hidden=true;$('envelope').classList.remove('open');$('password').value='';$('kissMessage').textContent=''});

const letterSection = document.getElementById('letter');
const letterNext = letterSection?.querySelector('.next');
const letterPaper = document.querySelector('.letter-paper');

if (letterNext && letterPaper) {
  letterNext.style.display = 'none';

  const observer = new MutationObserver(() => {
    if (!letterPaper.hidden) {
      letterNext.style.display = 'inline-flex';
    }
  });

  observer.observe(letterPaper, {
    attributes: true,
    attributeFilter: ['hidden']
  });
}

function hideNextUntilTap(sceneId, targetSelector) {
  const scene = document.getElementById(sceneId);
  if (!scene) return;

  const nextBtn = scene.querySelector('.primary.next');
  const target = scene.querySelector(targetSelector);

  if (!nextBtn || !target) return;

  nextBtn.style.display = 'none';

  target.addEventListener('click', () => {
    nextBtn.style.display = '';
  });
}

// Heart section
hideNextUntilTap('heart', 'button:not(.next)');

// Stars section
hideNextUntilTap('stars', 'button:not(.next)');
