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
// 기존 특징·상징·이야기 내용은 변경하지 않습니다.
function guardianFullDescription(guardian) {
  // 상징 목록은 모바일·PC 모두 하트와 일반 굵기 글자로 표시합니다.
  const symbolNames = guardian.items.map(([name]) =>
    `<p class="guardian-symbol-name"><span class="guardian-symbol-heart" aria-hidden="true">💗</span>${esc(name)}</p>`
  ).join('');
  return `
    <p class="guardian-card-full-tagline">${esc(guardian.tagline)}</p>
    <div class="guardian-mobile-summary">
      ${guardian.items.length ? `<div class="guardian-card-full-section"><h4>수호알과 캐릭터의 상징</h4><div class="guardian-symbol-list">${symbolNames}</div></div>` : ''}
    </div>
    <div class="guardian-desktop-detail">
      ${guardian.quote ? `<p class="guardian-card-full-quote">“${esc(guardian.quote)}”</p>` : ''}
      <p class="guardian-card-full-intro">${esc(guardian.intro)}</p>
      ${guardian.items.length ? `<div class="guardian-card-full-section"><h4>수호알과 캐릭터의 상징</h4><div class="guardian-symbol-list">${guardian.items.map(([name,desc])=>`<p class="guardian-symbol-detail"><span class="guardian-symbol-heart" aria-hidden="true">💗</span><span class="guardian-symbol-title">${esc(name)}</span> — ${esc(desc)}</p>`).join('')}</div></div>` : ''}
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
    body.innerHTML = `<div class="guardian-reading-heading">${esc(guardian.dept)} · ${esc(guardianDisplayName(guardian))}</div>${fullHtml}`;
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
