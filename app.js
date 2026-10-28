'use strict';

const drawings = {
  tteok:'<path d="m47 27 8-13m13 16 6-16m13 16 5-12" fill="none" stroke="#bc8c80"/><path d="M22 64h116l-13 41c-5 15-84 15-90 0Z" fill="#ed7e7d"/><ellipse cx="80" cy="64" rx="58" ry="19" fill="#eea285"/><ellipse cx="80" cy="64" rx="49" ry="12" fill="#cf615e"/><g fill="#ffe5af" transform="rotate(-8 80 63)"><rect x="43" y="52" width="13" height="24" rx="5"/><rect x="65" y="47" width="13" height="26" rx="5"/><rect x="85" y="53" width="13" height="24" rx="5"/><rect x="105" y="47" width="13" height="24" rx="5"/></g><path d="m60 59 6 2m26 7 6-2m24-10 4-5" stroke="#62916c" stroke-width="4"/><circle cx="65" cy="93" r="2" fill="#49333d"/><circle cx="94" cy="93" r="2" fill="#49333d"/><path d="M75 98q5 5 10 0" fill="none"/>',
  croffle:'<ellipse cx="80" cy="112" rx="54" ry="9" fill="#d3ad6b" opacity=".2" stroke="none"/><path d="M40 43Q47 20 69 35q23-15 37 7 26 1 26 24 10 22-14 31-9 24-32 12-24 12-36-9-25 0-24-22-14-24 14-35Z" fill="#dfa050"/><path d="M48 48Q55 32 70 46q20-16 30 7 24-4 20 20 12 15-13 19-2 18-23 8-17 9-25-9-25 0-21-20-9-17 10-23Z" fill="#f7c578" stroke="#bf813d"/><g stroke="#c28a4a" stroke-width="3"><path d="m49 49 60 38M38 67l58 37M65 40l55 35M41 83l49-43M54 98l55-48M75 106l44-39"/></g><g fill="white" stroke="none"><circle cx="54" cy="57" r="2"/><circle cx="84" cy="48" r="2"/><circle cx="100" cy="75" r="2"/><circle cx="69" cy="86" r="2"/></g><path d="m123 28 4-6m3 15 7-1" stroke="#b88c4e"/>',
  fishcake:'<path d="m57 22 14 89M101 15l-8 97" fill="none" stroke="#9e7757" stroke-width="4"/><path d="m45 29 27-5 4 16-24 7 27 6-1 16-23-1 21 14-8 12-29-22 8-12-7-19Z" fill="#f0ca80"/><path d="m85 27 28 4-4 17-21-5 21 16-8 16-20-10 15 23-13 10-20-32 11-10-4-17Z" fill="#f4d698"/><path d="M30 86h100l-13 28q-37 14-74 0Z" fill="#faf5db"/><path d="M33 95h94" stroke="#a9c6aa" stroke-width="7"/><circle cx="68" cy="107" r="2" fill="#49333d"/><circle cx="91" cy="107" r="2" fill="#49333d"/>',
  whale:'<path d="M39 95C13 61 40 36 70 41c24-2 31 23 41 30 12-17 25-14 25-14s5 28-17 38C96 116 54 118 39 95Z" fill="#7dc4e2"/><path d="M35 90q40 9 68-5-7 26-35 21-22 1-33-16Z" fill="#e4f6fc" stroke="none"/><path d="m76 79 9 18q15-5 7-16" fill="#5ba7cb"/><circle cx="51" cy="70" r="3" fill="#49333d"/><ellipse cx="50" cy="80" rx="7" ry="4" fill="#f6afc0" stroke="none"/><path d="M63 38V24m0 4q-14-15-20-5m20 5q14-15 20-5" fill="none" stroke="#7dc4e2" stroke-width="5"/><path d="m113 30 4-5m4 10 7 2" fill="none" stroke="#74b0c8"/>',
  yarn:'<circle cx="80" cy="29" r="11" fill="none" stroke="#ba95b1" stroke-width="4"/><path d="M80 40v12" stroke="#ba95b1" stroke-width="4"/><circle cx="51" cy="56" r="15" fill="#e6b6a8"/><circle cx="109" cy="56" r="15" fill="#e6b6a8"/><circle cx="80" cy="81" r="40" fill="#f2d5bc"/><g stroke="#dbb99d" stroke-width="1.5"><path d="M48 62q30-13 65 2M43 76q37-13 73 2M45 90q34-9 70 2M53 105q26-8 54 0M65 45q-17 34-9 64M80 42q-13 39-4 77M93 46q-10 42 2 69" fill="none"/></g><circle cx="65" cy="79" r="3" fill="#49333d"/><circle cx="95" cy="79" r="3" fill="#49333d"/><ellipse cx="80" cy="92" rx="13" ry="10" fill="#fff5e7" stroke="none"/><path d="m77 88 3 3 3-3m-3 3v5" fill="none"/><ellipse cx="54" cy="89" rx="7" ry="4" fill="#eaa8b0" stroke="none"/><ellipse cx="106" cy="89" rx="7" ry="4" fill="#eaa8b0" stroke="none"/>',
  bookmark:'<path d="M44 21h67v98l-33-18-34 18Z" fill="#aec9ef"/><path d="M52 29h51v76L78 92l-26 13Z" fill="#e1edff" stroke="#7296c5" stroke-dasharray="3 4"/><path d="M69 61c-6-13-21-4-13 8l22 18 22-18c8-12-7-21-13-8-5-11-15-11-18 0Z" fill="#ed98b5" transform="translate(0,-7)"/><circle cx="78" cy="33" r="3" fill="#7296c5" stroke="none"/><path d="M78 31V16q2-13 14-6" fill="none" stroke="#dba4b9" stroke-width="4"/><path d="m122 48 4-10m-9 5 13 1" stroke="#a1b7d8"/>',
  lion:'<path d="M50 36q-8-22 16-16 13-20 27-1 25-6 23 16 23 2 12 25 17 21-3 32 1 27-24 23-16 20-34 1-26 5-25-20-22-11-8-33-10-22 16-27Z" fill="#eab16c"/><circle cx="58" cy="48" r="11" fill="#f5d19a"/><circle cx="105" cy="48" r="11" fill="#f5d19a"/><ellipse cx="82" cy="77" rx="34" ry="37" fill="#ffe3aa"/><circle cx="70" cy="72" r="3" fill="#49333d"/><circle cx="96" cy="72" r="3" fill="#49333d"/><ellipse cx="82" cy="86" rx="15" ry="11" fill="#fff5db" stroke="none"/><path d="m78 82 4 4 4-4m-4 4v6m-7-1q7 8 14 0" fill="none"/><ellipse cx="59" cy="84" rx="6" ry="4" fill="#eca8a0" stroke="none"/><ellipse cx="105" cy="84" rx="6" ry="4" fill="#eca8a0" stroke="none"/>',
  soup:'<path d="M55 29q-10-8 0-17m24 18q-9-8 1-19m22 19q-9-8 1-19" fill="none" stroke="#99ad9b"/><path d="M24 64h112l-11 38q-8 20-45 20t-45-20Z" fill="#657d6b"/><ellipse cx="80" cy="65" rx="56" ry="20" fill="#ced8bf"/><ellipse cx="80" cy="66" rx="46" ry="13" fill="#f2e6c4"/><g fill="#bc9070"><path d="m49 62 14-5 9 10-18 6Z"/><path d="m87 59 17 4-5 11-17-6Z"/></g><g stroke="#6e9b68" stroke-width="4"><path d="m71 60 6-6m30 13 5-4m-40 10 6 1"/></g><circle cx="65" cy="96" r="2" fill="#fff" stroke="none"/><circle cx="95" cy="96" r="2" fill="#fff" stroke="none"/><path d="M75 102q5 5 10 0" stroke="#fff" fill="none"/><path d="m132 45 7-24" stroke="#b89972" stroke-width="5"/>',
  sandwich:'<path d="m26 104 39-79q6-10 15-2l53 76q6 11-6 14H34q-14 0-8-9Z" fill="#e5a975"/><path d="m33 91 35-64q4-7 10 0l47 66Z" fill="#fff1cb"/><path d="m31 99 10-7 13 7 11-7 12 8 13-8 12 8 11-8 17 8" fill="none" stroke="#85a06b" stroke-width="7"/><path d="M34 106h91" stroke="#d56764" stroke-width="5"/><path d="m50 81 21-36 33 37Z" fill="#ffe7b4" stroke="#efce95"/><path d="m115 26 5-8m6 17 9-2" stroke="#d493a6"/><circle cx="70" cy="71" r="2" fill="#49333d"/><circle cx="86" cy="71" r="2" fill="#49333d"/><path d="M74 78q4 4 8 0" fill="none"/>',
  camera:'<path d="M43 44 51 30h55l9 14" fill="#f2b1cd"/><rect x="22" y="44" width="117" height="72" rx="14" fill="#f6c0d7"/><path d="M22 62h117v32H22Z" fill="#e896b7"/><circle cx="81" cy="80" r="28" fill="#fff5e9"/><circle cx="81" cy="80" r="20" fill="#93bdd0"/><path d="m70 69 8-2" fill="none" stroke="#fff" stroke-width="5"/><rect x="112" y="52" width="15" height="10" rx="3" fill="#fff7df"/><path d="M36 42v-8h14v10" fill="#d68aa9"/>',
  fishing:'<path d="M37 114 69 19q4-12 11-2" fill="none" stroke="#b6906d" stroke-width="6"/><path d="M80 17q39-2 39 33v23q-1 12-12 10-12-5-5-14" fill="none" stroke="#698d86"/><path d="M107 74c-16 0-29 24-29 38 0 18 14 25 29 25s28-7 28-25c0-14-12-38-28-38Z" fill="#b7dfd2" transform="translate(-11,-10)"/><path d="m73 102 12-6 12 7 12-6 12 6" fill="none" stroke="#f0f6cd" stroke-width="8"/><path d="M78 29c-4-8-14-2-9 5l9 7 9-7c5-7-5-13-9-5Z" fill="#ea9dbb" transform="translate(-28,25)"/>',
  egg:'<path d="M79 15c-24 0-48 45-48 72 0 29 21 43 48 43s48-14 48-43c0-27-24-72-48-72Z" fill="#f5bad2"/><path d="m35 85 15-9 14 10 15-10 16 10 14-10 15 9" fill="none" stroke="#fff0b9" stroke-width="12"/><path d="M79 47c-6-13-22-3-14 7l14 12 14-12c8-10-8-20-14-7Z" fill="#fff5df"/><path d="M52 59q-7 12-6 18" stroke="#fff2f5" stroke-width="5" fill="none"/><path d="m137 26 4-10m-10 5 15 1" stroke="#dba0bb"/>',
  fortune:'<path d="m46 43 22-21h29l22 21-38 44Z" fill="#d4c5f1"/><path d="m46 43 73 0M68 22l-5 21 18 44 19-44-3-21" fill="none" stroke="#8e77b7"/><path d="m15 52 7-10m-11 3 15 3m98 20 8-13m-14 6 18 4" stroke="#d4ad64"/><path d="m43 100 9-6 9 6 9-6 9 6 9-6 10 6 9-6 10 6v24H43Z" fill="#e3d7f4"/><path d="M54 113h52" stroke="#aa93c4"/>',
  cotton:'<path d="m68 93 13 41 14-41" fill="#f4d29a"/><path d="M46 86q-22-5-13-25-9-20 13-29 1-24 25-20 17-16 30 3 25-1 26 23 22 14 6 32 9 24-18 30-14 20-34 6-23 6-35-20Z" fill="#f6c0dc"/><path d="M46 45q-4-12 11-15m16-4q13-9 19 4" fill="none" stroke="#fff1f8" stroke-width="6"/><circle cx="67" cy="69" r="2.5" fill="#49333d"/><circle cx="96" cy="69" r="2.5" fill="#49333d"/><path d="M76 77q6 6 12 0" fill="none"/>',
  stamp:'<path d="M30 25h101v100H30Z" fill="#fffdf1"/><path d="M41 37h78" stroke="#d5b776" stroke-dasharray="4 5"/><path d="M49 47c-6-10-17-2-10 5l10 10 10-10c7-7-4-15-10-5Z" fill="#e390aa"/><path d="M78 47c-6-10-17-2-10 5l10 10 10-10c7-7-4-15-10-5Z" fill="#e390aa"/><path d="M108 47c-6-10-17-2-10 5l10 10 10-10c7-7-4-15-10-5Z" fill="#ffeab6" stroke="#d4b775"/><path d="M42 78h75m-75 11h52" stroke="#dbc8a3"/><path d="M73 102h43" stroke="#e1b1a0" stroke-width="5"/><path d="m96 100 6-20q-13-20 5-28 20-4 21 14 1 9-11 15l-2 22Z" fill="#bd8b9c" transform="rotate(18 108 83)"/><path d="M86 102h42v12H86Z" fill="#edb8c5" transform="rotate(18 108 106)"/>'
};

function art(name) { return `<svg viewBox="0 0 160 145" fill="none" stroke="#654c50" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[name] || drawings.egg}</svg>`; }
function esc(value) { return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character])); }
const labels = {food:'먹거리',goods:'굿즈',experience:'체험·이벤트'};
const dayLabel = booth => booth.days.length === 2 ? '수 · 목' : booth.days[0] === 'wed' ? '수요일 ONLY' : '목요일 ONLY';
const fullDayLabel = booth => booth.days.length === 2 ? '수요일 · 목요일 (양일)' : booth.days[0] === 'wed' ? '수요일' : '목요일';
const state = {day:'all',category:'all',search:'',savedOnly:false};
const storageKey = 'ingisangjeong-favorite-booths-v1';
let favoriteIds = new Set();
let storageAvailable = true;
try {
  const previous = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(previous)) favoriteIds = new Set(previous.filter(id => booths.some(booth => booth.id === id)));
} catch { storageAvailable = false; }
const grid = document.getElementById('booth-grid');
const dialog = document.getElementById('detail-dialog');
let dialogBoothId = null;
let toastTimer;

function card(booth) {
  const saved = favoriteIds.has(booth.id);
  const subtitle = booth.id === 'ewhale' ? '체험하고 굿즈 받기' : '자세히 보기';
  return `<article class="booth-card" style="--card-bg:${booth.bg};--card-accent:${booth.accent}">
    <div class="card-art"><span class="day-label">${dayLabel(booth)}</span>${art(booth.art)}<span class="art-spark" aria-hidden="true">✦</span><span class="art-dot" aria-hidden="true"></span></div>
    <button class="favorite-btn" data-save="${booth.id}" aria-pressed="${saved}" aria-label="${esc(booth.name)} 찜 ${saved ? '해제' : '하기'}">${saved ? '♥' : '♡'}</button>
    <div class="card-body"><div class="card-meta"><span class="booth-number">BOOTH ${String(booth.number).padStart(2,'0')}</span><span class="meta-dot"></span><span>${booth.categories.map(category => labels[category]).join(' · ')}</span></div>
    <h3><button class="card-open" data-booth="${booth.id}" aria-haspopup="dialog">${esc(booth.name)}</button></h3><p class="card-org">${esc(booth.org)}</p><p class="card-description">${esc(booth.description)}</p>
    <div class="card-products">${booth.products.slice(0,3).map(product => `<span class="product-chip">${esc(product)}</span>`).join('')}${booth.products.length>3 ? `<span class="product-chip">+${booth.products.length-3}</span>` : ''}</div>
    <div class="card-footer"><span>${subtitle}</span><span aria-hidden="true">↗</span></div></div></article>`;
}

function renderBooths() {
  const query = state.search.toLocaleLowerCase().replace(/\s+/g,'');
  const visible = booths.filter(booth => (state.day === 'all' || booth.days.includes(state.day)) && (state.category === 'all' || booth.categories.includes(state.category)) && (!state.savedOnly || favoriteIds.has(booth.id)) && (!query || [booth.name,booth.org,booth.description,...booth.products].join(' ').toLocaleLowerCase().replace(/\s+/g,'').includes(query)));
  grid.innerHTML = visible.map(card).join('');
  document.getElementById('result-count').textContent = `${state.savedOnly ? '찜한 부스' : '총'} ${visible.length}개${state.savedOnly ? '' : '의 부스'}`;
  document.getElementById('saved-count').textContent = favoriteIds.size;
  document.getElementById('saved-nav').setAttribute('aria-label',`찜한 부스 ${favoriteIds.size}개 보기`);
  const savedFilter = document.getElementById('saved-filter');
  savedFilter.setAttribute('aria-pressed',state.savedOnly);
  savedFilter.querySelector('span').textContent = state.savedOnly ? '♥' : '♡';
  document.getElementById('empty-state').hidden = visible.length > 0;
  document.querySelector('#empty-state h3').textContent = state.savedOnly && !favoriteIds.size ? '아직 찜한 부스가 없어요' : '조건에 맞는 부스가 없어요';
  document.getElementById('empty-copy').textContent = state.savedOnly && !favoriteIds.size ? '마음에 드는 부스의 하트를 눌러 나만의 목록을 만들어봐요.' : '다른 검색어나 필터로 찾아볼까요?';
  document.querySelectorAll('[data-day]').forEach(button => { const active = button.dataset.day === state.day; button.classList.toggle('active',active); button.setAttribute('aria-pressed',active); });
  document.querySelectorAll('[data-category]').forEach(button => { const active = button.dataset.category === state.category; button.classList.toggle('active',active); button.setAttribute('aria-pressed',active); });
}

function notify(message) {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'),2600);
}

function toggleFavorite(id) {
  if (!booths.some(booth => booth.id === id)) return;
  const focusedId = document.activeElement?.dataset.save;
  const added = !favoriteIds.has(id);
  if (added) favoriteIds.add(id); else favoriteIds.delete(id);
  try { localStorage.setItem(storageKey,JSON.stringify([...favoriteIds])); storageAvailable = true; }
  catch { storageAvailable = false; }
  renderBooths();
  if (focusedId && !dialog.open) {
    const newFocus = [...grid.querySelectorAll('[data-save]')].find(button => button.dataset.save === focusedId);
    (newFocus || document.getElementById('saved-filter')).focus({preventScroll:true});
  }
  updateDialogSave();
  notify(storageAvailable ? (added ? '가고 싶은 부스에 담았어요 ♡' : '찜한 부스에서 해제했어요') : '이 브라우저에서는 현재 화면에만 저장돼요.');
}

function updateDialogSave() {
  const button = dialog.querySelector('[data-dialog-save]');
  if (!button || !dialogBoothId) return;
  const saved = favoriteIds.has(dialogBoothId);
  button.setAttribute('aria-pressed',saved);
  button.innerHTML = saved ? '♥ 찜한 부스에 담았어요 · 해제' : '♡ 가고 싶은 부스로 찜하기';
}

function showDialog(html) {
  document.getElementById('dialog-content').innerHTML = html;
  document.body.style.overflow = 'hidden';
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}

function openBooth(id) {
  const booth = booths.find(item => item.id === id);
  if (!booth) return;
  dialogBoothId = id;
  showDialog(`<div class="dialog-art" style="--card-bg:${booth.bg}">${art(booth.art)}</div><div class="dialog-body"><p class="dialog-label">BOOTH ${String(booth.number).padStart(2,'0')} / ${booth.categories.map(category => labels[category]).join(' · ')}</p><h2 id="detail-title">${esc(booth.name)}</h2><p class="dialog-org">${esc(booth.org)}</p><p class="dialog-description">${esc(booth.description)}</p><dl class="detail-info"><dt>운영 요일</dt><dd>${fullDayLabel(booth)}</dd><dt>${booth.id === 'ewhale' ? '체험·혜택' : '판매 품목'}</dt><dd class="detail-products">${booth.products.map(product => `<span class="product-chip">${esc(product)}</span>`).join('')}</dd>${booth.note ? `<dt>참고 사항</dt><dd>${esc(booth.note)}</dd>` : ''}</dl><p class="dialog-note">축제: 2026년 11월 4일(수)–5일(목).<br>ECC 인지대 라운지 및 학생문화관 야외부스.<br>야외부스 위치는 페이지의 부스 배치도를 확인해 주세요.<br>운영시간은 추후 안내해요.${booth.id !== 'ewhale' ? '<br>가격과 결제 방법은 현재 안내 전이에요.' : ''}</p><button class="button button-dark dialog-save" data-dialog-save="${booth.id}"></button></div>`);
  updateDialogSave();
}

function openProgram(id) {
  const program = programs.find(item => item.id === id);
  if (!program) return;
  dialogBoothId = null;
  const guide = (program.groups || []).map(([title,steps]) => `<section class="program-steps"><h3>${esc(title)}</h3><ol>${steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol></section>`).join('');
  const rules = program.rules ? `<section class="program-rules"><h3>함께 지켜 주세요</h3><ul>${program.rules.map(rule => `<li>${esc(rule)}</li>`).join('')}</ul></section>` : '';
  showDialog(`<div class="dialog-art" style="--card-bg:${program.bg}">${art(program.art)}</div><div class="dialog-body"><p class="dialog-label">FESTIVAL PROGRAM ${String(programs.indexOf(program)+1).padStart(2,'0')}</p><h2 id="detail-title">${esc(program.name)}</h2><p class="dialog-description">${esc(program.detail)}</p>${guide}${rules}<dl class="detail-info"><dt>운영 안내</dt><dd>축제는 11월 4–5일에 열려요. 프로그램별 운영일과 시간, 상세 위치는 현장 안내를 확인해 주세요.</dd><dt>참여 안내</dt><dd>${program.groups ? '참여 비용은 현장에서 확인해 주세요.' : program.id === 'stamp' ? '참여 방법, 도장 획득 조건, 선물은 추후 안내해요.' : '참여 방법과 비용은 추후 안내해요.'}</dd></dl>${program.id === 'stamp' ? '<p class="dialog-note">웹페이지의 ‘찜한 부스’는 개인 방문 계획을 위한 기능이며, 도장판 이벤트 참여 기록으로 사용되지 않아요.</p>' : ''}</div>`);
}

document.getElementById('program-grid').innerHTML = programs.map((program,index) => `<article class="program-card" style="--program-bg:${program.bg}"><div class="program-top"><span class="program-no">PLAY ${String(index+1).padStart(2,'0')}</span><div class="program-art">${art(program.art)}</div></div><h3>${esc(program.name)}</h3><p class="program-desc">${esc(program.description)}</p><button class="program-link" data-program="${program.id}" aria-haspopup="dialog" aria-label="${esc(program.name)} 자세히 보기">프로그램 알아보기 <span aria-hidden="true">↗</span></button></article>`).join('');

document.addEventListener('click',event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.save) toggleFavorite(button.dataset.save);
  else if (button.dataset.booth) openBooth(button.dataset.booth);
  else if (button.dataset.program) openProgram(button.dataset.program);
  else if (button.dataset.dialogSave) toggleFavorite(button.dataset.dialogSave);
  else if (button.dataset.day) { state.day = button.dataset.day; renderBooths(); }
  else if (button.dataset.category) { state.category = button.dataset.category; renderBooths(); }
});

document.getElementById('search').addEventListener('input',event => { state.search = event.target.value; renderBooths(); });
document.getElementById('saved-filter').addEventListener('click',() => { state.savedOnly = !state.savedOnly; renderBooths(); });
function resetFilters() { Object.assign(state,{day:'all',category:'all',search:'',savedOnly:false}); document.getElementById('search').value = ''; }
document.getElementById('reset-filters').addEventListener('click',() => { resetFilters(); renderBooths(); document.querySelector('[data-day="all"]').focus({preventScroll:true}); });
document.getElementById('saved-nav').addEventListener('click',() => { resetFilters(); state.savedOnly = true; renderBooths(); document.getElementById('booths').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); document.getElementById('saved-filter').focus({preventScroll:true}); });
document.getElementById('dialog-close').addEventListener('click',() => dialog.close());
dialog.addEventListener('close',() => { document.body.style.overflow = ''; dialogBoothId = null; });
dialog.addEventListener('click',event => { const bounds = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close(); });
window.addEventListener('storage',event => { if (event.key !== storageKey && event.key !== null) return; try { const next = JSON.parse(event.newValue || '[]'); if (Array.isArray(next)) favoriteIds = new Set(next.filter(id => booths.some(booth => booth.id === id))); renderBooths(); updateDialogSave(); } catch { /* Ignore unrelated or malformed browser data. */ } });
renderBooths();
