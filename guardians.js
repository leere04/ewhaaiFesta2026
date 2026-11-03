'use strict';
// 학과별 수호알 선택 → 프로필 전환. data.js의 guardians 내용을 사용합니다.
const guardianTabs = document.getElementById('guardian-tabs');
const guardianPanel = document.getElementById('guardian-panel');
function selectGuardian(id) {
  const guardian = guardians.find(item => item.id === id);
  if (!guardian) return;
  guardianTabs.querySelectorAll('button').forEach(button => {
    const active = button.dataset.guardian === id;
    button.setAttribute('aria-pressed',String(active));
    button.classList.toggle('selected',active);
    const item = guardians.find(g => g.id === button.dataset.guardian);
    button.querySelector('.guardian-reveal-character').src = active ? (item.character || item.egg) : item.egg;
  });
  guardianPanel.hidden = false;
  guardianPanel.style.setProperty('--guardian-color',guardian.color);
  guardianPanel.classList.add('guardian-poster-profile');
  const profileDesigns = {
    sei: 'assets/guardian-profile-sei.png',
    roke: 'assets/guardian-profile-roke.png',
    jini: 'assets/guardian-profile-jini.png',
    data: 'assets/guardian-profile-data.png',
    lumi: 'assets/guardian-profile-lumi.png'
  };
  const design = profileDesigns[id] || profileDesigns.sei;
  guardianPanel.innerHTML = `
    <div class="guardian-poster-stage">
      <img class="guardian-poster-template" src="${esc(design)}" alt="${esc(guardian.name)} 테마의 수호캐릭터 소개 카드" width="1703" height="991" loading="lazy">
      <img class="guardian-poster-person" src="${esc(guardian.character || guardian.egg)}" alt="${esc(guardian.name)} 수호캐릭터" loading="lazy">
      <div class="guardian-poster-summary">
        <strong>${esc(guardian.tagline)}</strong>
        <p>${esc(guardian.intro)}</p>
      </div>
    </div>
    <div class="guardian-poster-info">
      <div class="guardian-poster-tags">${guardian.keywords.map(word => `<span>#${esc(word)}</span>`).join('')}</div>
      ${guardian.items.length ? `<dl class="guardian-poster-symbols">${guardian.items.map(item => `<div><dt>${esc(item[0])}</dt><dd>${esc(item[1])}</dd></div>`).join('')}</dl>` : ''}
      ${guardian.story.length ? `<details class="guardian-poster-story"><summary>수호캐릭터의 이야기 펼치기 <span aria-hidden="true">+</span></summary>${guardian.story.map(part => `<section><h4>${esc(part[0])}</h4><p>${esc(part[1])}</p></section>`).join('')}</details>` : ''}
    </div>`;
}
guardianTabs.classList.add('planet-cards');
guardianTabs.innerHTML = guardians.map(guardian => `<button type="button" data-guardian="${guardian.id}" aria-controls="guardian-panel" aria-pressed="false" aria-label="${esc(guardian.dept)} ${esc(guardian.name)} 소개 보기" style="--guardian-color:${guardian.color}"><img class="guardian-card-design" src="assets/guardian-card-${guardian.id}.png" alt="" width="330" height="640"><img class="guardian-reveal-character" src="${esc(guardian.egg)}" alt=""></button>`).join('');
guardianTabs.addEventListener('click',event => {
  const button = event.target.closest('[data-guardian]');
  if (button) selectGuardian(button.dataset.guardian);
});
guardianPanel.hidden = true;
