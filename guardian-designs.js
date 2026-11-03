'use strict';
const escapeText = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.querySelectorAll('.concept').forEach(section => {
  const deck = section.querySelector('.deck');
  const panel = section.querySelector('.reveal');
  panel.id = section.id + '-reveal';
  deck.innerHTML = guardians.map((g, i) => `<button class="egg-card" type="button" data-id="${escapeText(g.id)}" style="--tone:${g.color}" aria-pressed="false" aria-controls="${panel.id}" aria-label="${escapeText(g.dept)} 수호알 열기"><span class="card-meta"><span>No. 0${i + 1}</span><span aria-hidden="true">✦</span></span><span class="egg-window"><img src="${escapeText(g.egg)}" width="170" height="190" alt="" loading="lazy"></span><span class="egg-name">${escapeText(g.short)}의 수호알</span><span class="egg-dept">${escapeText(g.dept)}</span><span class="egg-action">수호알 열어보기 <span aria-hidden="true">↗</span></span><span class="seal" aria-hidden="true">♡</span></button>`).join('');
  deck.addEventListener('click', event => {
    const button = event.target.closest('[data-id]');
    if (!button) return;
    const guardian = guardians.find(g => g.id === button.dataset.id);
    deck.querySelectorAll('.egg-card').forEach(card => {
      const active = card === button;
      const item = guardians.find(g => g.id === card.dataset.id);
      card.setAttribute('aria-pressed', String(active));
      card.querySelector('img').src = active ? item.character : item.egg;
      card.querySelector('.egg-name').textContent = active ? (item.id === 'data' ? '데사 수호캐릭터' : item.name) : item.short + '의 수호알';
      card.querySelector('.egg-action').textContent = active ? '너의 가능성이 깨어났어 ♡' : '수호알 열어보기 ↗';
    });
    panel.hidden = false;
    panel.innerHTML = `<img src="${escapeText(guardian.character)}" width="160" height="160" alt="${escapeText(guardian.name)}"><div><p class="kicker">${escapeText(guardian.dept)}</p><h4>${escapeText(guardian.id === 'data' ? '데사 수호캐릭터' : guardian.name)}</h4><p>${escapeText(guardian.tagline)}</p><p class="profile-intro">${escapeText(guardian.intro)}</p></div>`;
  });
});
