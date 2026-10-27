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
  });
  guardianPanel.style.setProperty('--guardian-color',guardian.color);
  guardianPanel.innerHTML = `<div class="guardian-picture"><div class="portrait-frame"><img src="${esc(guardian.character || guardian.egg)}" alt="${esc(guardian.name)}${guardian.character ? ' 캐릭터' : '의 수호알'}" width="1254" height="1254"><span>${esc(guardian.character ? guardian.name : '세이의 수호알')}</span></div>${guardian.quote ? `<blockquote>“${esc(guardian.quote)}”</blockquote>` : ''}<div class="guardian-symbols" aria-hidden="true">♡ ✦ ♧ ◇</div></div><div class="guardian-story"><p class="eyebrow">${esc(guardian.dept)} / MY GUARDIAN</p><h3 id="guardian-name">${esc(guardian.name)}</h3><p class="guardian-tagline">${esc(guardian.tagline)}</p><div class="guardian-keywords">${guardian.keywords.map(word => `<span>#${esc(word)}</span>`).join('')}</div><p>${esc(guardian.intro)}</p>${guardian.items.length ? `<dl class="guardian-items">${guardian.items.map(item => `<div><dt>${esc(item[0])}</dt> <dd>${esc(item[1])}</dd></div>`).join('')}</dl>` : ''}${guardian.story.length ? `<details class="guardian-more"><summary>수호캐릭터의 이야기 펼치기 <span aria-hidden="true">+</span></summary>${guardian.story.map(part => `<div><h4>${esc(part[0])}</h4><p>${esc(part[1])}</p></div>`).join('')}</details>` : ''}<p class="guardian-selected" role="status">${esc(guardian.short)}의 수호알을 열었어요 ♡</p></div>`;
}
guardianTabs.innerHTML = guardians.map(guardian => `<button type="button" data-guardian="${guardian.id}" aria-controls="guardian-panel" aria-pressed="false" aria-label="${esc(guardian.dept)} ${esc(guardian.name)} 소개 보기" style="--guardian-color:${guardian.color}"><img src="${esc(guardian.egg)}" alt="" width="100" height="110" loading="lazy"><span>${esc(guardian.short)}</span><small>${guardian.id === 'data' ? '수호알' : esc(guardian.name)}</small></button>`).join('');
guardianTabs.addEventListener('click',event => {
  const button = event.target.closest('[data-guardian]');
  if (button) selectGuardian(button.dataset.guardian);
});
selectGuardian('jini');
