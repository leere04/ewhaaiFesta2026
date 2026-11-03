'use strict';
// 수호알 카드 선택: 제공된 프로필 카드의 오른쪽 테두리 안에 전체 설명을 표시합니다.
const guardianTabs = document.getElementById('guardian-tabs');
const guardianPanel = document.getElementById('guardian-panel');
const guardianProfileDesigns = {
  sei: 'assets/guardian-profile-sei.png',
  roke: 'assets/guardian-profile-roke.png',
  jini: 'assets/guardian-profile-jini.png',
  data: 'assets/guardian-profile-data.png',
  lumi: 'assets/guardian-profile-lumi.png'
};
const guardianDialog = document.createElement('dialog');
guardianDialog.className = 'guardian-reading-dialog';
guardianDialog.setAttribute('aria-label', '수호캐릭터 소개 크게 읽기');
guardianDialog.innerHTML = '<div class="guardian-reading-shell"><button type="button" class="guardian-reading-close" aria-label="닫기">×</button><div class="guardian-reading-body"></div></div>';
document.body.appendChild(guardianDialog);
guardianDialog.querySelector('.guardian-reading-close').addEventListener('click', () => guardianDialog.close());
guardianDialog.addEventListener('click', event => { if (event.target === guardianDialog) guardianDialog.close(); });

// 캐릭터 이름은 한글만 표시합니다. (예: DAMI · 다미 → 다미)
function guardianDisplayName(guardian) {
  return guardian.name.replace(/^[A-Za-z]+\s*[·\-–]\s*/, '');
}
// 카드에 표시할 상징의 뜻만 짧게 정리합니다. 원래 상세 설명은 유지합니다.
const guardianCompactSymbols = {
  sei: [['커서 꼬리', '호기심을 실행하는 힘'], ['회로', '생각과 가능성의 연결'], ['따옴표', '앞으로 써 내려갈 이야기']],
  roke: [['마스터 키', '올바른 길을 여는 힘'], ['가디언 실드', '소중한 것을 지키는 방패']],
  jini: [['AI 헤드셋', '배움과 연결'], ['홀로그램 패널', '학습과 발견'], ['데이터 오비트', '함께 만드는 가능성']],
  data: [['벚꽃과 분홍빛', '피어나는 데이터 이야기'], ['데이터 지팡이', '흩어진 데이터를 모으는 힘']],
  lumi: [['지도', '앞으로 선택할 길'], ['별', '꿈과 가능성']]
};
function guardianSymbolRows(items, expanded = false) {
  return items.map(([name,desc]) => `
    <p class="guardian-symbol-detail">
      <span class="guardian-symbol-heart" aria-hidden="true">♡</span>
      <span class="guardian-symbol-title">${esc(name)}</span><span class="guardian-symbol-meaning"> — ${esc(desc)}</span>
    </p>`).join('');
}
// 카드에 들어가는 짧은 소개 문구의 줄바꿈만 조정합니다. 원문과 상세 설명은 그대로 둡니다.
const guardianTaglineBreaks = {
  roke: '지켜야 할 것은 지키고,',
  jini: '함께 배우고 연결하며,',
  lumi: '수많은 가능성 속에서,',
  data: '흩어진 데이터 속에 숨은 이야기를'
};
function guardianTaglineDisplay(guardian) {
  const line = guardianTaglineBreaks[guardian.id];
  const tagline = esc(guardian.tagline);
  if (!line || !guardian.tagline.includes(line)) return tagline;
  return tagline.replace(esc(line), esc(line) + '<br class="guardian-tagline-break">');
}
function guardianFullDescription(guardian, expanded = false) {
  const briefItems = guardianCompactSymbols[guardian.id] || guardian.items.map(([name,desc])=>[name, desc]);
  const displayedItems = expanded ? (guardian.id === 'data' ? guardian.items.filter(item => ['벚꽃과 분홍빛', '데이터 지팡이'].includes(item[0])) : guardian.items) : briefItems;
  const symbolDetails = guardianSymbolRows(displayedItems);
  return `
    <p class="guardian-card-full-tagline">${guardianTaglineDisplay(guardian)}</p>
    <div class="guardian-mobile-summary">
      ${displayedItems.length ? `<div class="guardian-card-full-section"><div class="guardian-symbol-list">${symbolDetails}</div></div>` : ''}
    </div>
    <div class="guardian-desktop-detail">
      ${guardian.quote ? `<p class="guardian-card-full-quote">“${esc(guardian.quote)}”</p>` : ''}
      <p class="guardian-card-full-intro">${esc(guardian.intro)}</p>
      ${displayedItems.length ? `<div class="guardian-card-full-section"><div class="guardian-symbol-list">${symbolDetails}</div></div>` : ''}
      ${guardian.story.length ? `<details class="guardian-card-full-section guardian-card-full-story">
        <summary>수호 캐릭터 이야기 <span class="guardian-story-more-closed">더보기</span><span class="guardian-story-more-open">접기</span></summary>
        <div class="guardian-story-content">${guardian.story.map(([name,desc])=>`<h5>${esc(name)}</h5><p>${esc(desc)}</p>`).join('')}</div>
      </details>` : ''}
    </div>
  `;
}

function selectGuardian(id) {
  const guardian = guardians.find(item => item.id === id);
  if (!guardian) return;
  guardianTabs.querySelectorAll('button').forEach(button => {
    const active = button.dataset.guardian === id;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('selected', active);
    const item = guardians.find(g => g.id === button.dataset.guardian);
    button.querySelector('.guardian-reveal-character').src = active ? (item.character || item.egg) : item.egg;
  });
  if (guardianDialog.open) guardianDialog.close();
  guardianPanel.hidden = false;
  guardianPanel.dataset.guardian = id;
  guardianPanel.style.setProperty('--guardian-color',guardian.color);
  guardianPanel.classList.add('guardian-poster-profile');
  const fullHtml = guardianFullDescription(guardian);
  guardianPanel.innerHTML = `
    <div class="guardian-poster-stage">
      <img class="guardian-poster-template" src="${esc(guardianProfileDesigns[id])}" alt="" width="1703" height="991" loading="lazy">
      <img class="guardian-poster-person" src="${esc(guardian.character || guardian.egg)}" alt="${esc(guardianDisplayName(guardian))} 캐릭터" loading="lazy">
      <section class="guardian-poster-description" aria-label="${esc(guardianDisplayName(guardian))} 캐릭터의 전체 설명" tabindex="0">${fullHtml}</section>
      <button type="button" class="guardian-poster-enlarge" aria-label="${esc(guardianDisplayName(guardian))} 캐릭터 설명 크게 보기">설명 크게 보기</button>
    </div>`;
  guardianPanel.querySelector('.guardian-poster-enlarge').addEventListener('click', () => {
    const body = guardianDialog.querySelector('.guardian-reading-body');
    body.innerHTML = `<div class="guardian-reading-heading">${esc(guardian.dept)} · ${esc(guardianDisplayName(guardian))}</div>${guardianFullDescription(guardian, true)}`;
    guardianDialog.dataset.guardian = id;
    guardianDialog.style.setProperty('--guardian-color', guardian.color);
    guardianDialog.showModal();
  });
}
// 기존 카드 뒤집기/선택 구조 유지
if (guardianTabs && guardianPanel) {
  guardianTabs.classList.add('planet-cards');
  guardianTabs.innerHTML = guardians.map(guardian => `<button type="button" data-guardian="${guardian.id}" aria-controls="guardian-panel" aria-pressed="false" aria-label="${esc(guardian.dept)} ${esc(guardianDisplayName(guardian))} 소개 보기" style="--guardian-color:${guardian.color}"><img class="guardian-card-design" src="assets/guardian-card-${guardian.id}.png" alt="" width="330" height="640"><img class="guardian-reveal-character" src="${esc(guardian.egg)}" alt=""></button>`).join('');
  guardianTabs.addEventListener('click', event => {
    const button = event.target.closest('[data-guardian]');
    if (button) selectGuardian(button.dataset.guardian);
  });
  guardianPanel.hidden = true;
}
