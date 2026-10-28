// 캐캐체 수호알 타로카드: 기존 data.js의 guardians와 esc() 사용.
// 기존 guardian-tabs / guardian-panel HTML, styles.css, theme.css는 변경하지 않습니다.

const guardianTabs = document.getElementById('guardian-tabs');
const guardianPanel = document.getElementById('guardian-panel');

if (!guardianTabs || !guardianPanel) {
  console.warn('guardian-tabs 또는 guardian-panel 요소를 찾지 못했습니다.');
} else {
  // CSS가 따로 적용되지 않아 앞·뒷면이 동시에 보이는 문제를 막기 위해
  // 이 기능의 전용 CSS를 여기서 함께 등록합니다.
  if (!document.getElementById('guardian-tarot-styles')) {
    const css = document.createElement('style');
    css.id = 'guardian-tarot-styles';
    css.textContent = `
/* ===== 캐캐체 수호알 타로카드 (기존 CSS보다 높은 우선순위) ===== */
#guardian-tabs.guardian-tarot-tabs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  max-width: 1030px;
  margin: 0 auto 34px;
  align-items: stretch;
}
#guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card,
#guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card.selected {
  display: block;
  position: relative;
  width: 100%;
  height: 306px;
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: 3px;
  background: transparent;
  box-shadow: none;
  transform: none;
  perspective: 1200px;
  overflow: visible;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}
#guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card:hover,
#guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card.selected:hover {
  transform: translateY(-5px);
  border: 0;
  box-shadow: none;
}
#guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card:focus-visible {
  outline: 3px solid var(--guardian-color);
  outline-offset: 5px;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: transform .72s cubic-bezier(.2,.76,.2,1);
}
#guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card.is-flipped .guardian-tarot-inner {
  transform: rotateY(180deg);
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-face {
  position: absolute;
  inset: 0;
  display: block;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: 2px solid #c99f77;
  border-radius: 4px;
  background: radial-gradient(ellipse at 50% 47%, #3c2a40 0%, #241b2a 70%, #17141d 100%);
  box-shadow: 0 8px 17px rgba(45,24,43,.22), inset 0 0 0 2px #19141e;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: rotateY(0deg);
  color: #f5dec1;
  isolation: isolate;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-back {
  transform: rotateY(180deg);
  background: radial-gradient(ellipse at 50% 44%, #423047 0%, #221927 75%, #17131b 100%);
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-etch {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-halo {
  position: absolute;
  left: 14%;
  right: 14%;
  top: 24%;
  height: 48%;
  border: 1px solid rgba(221,179,134,.46);
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(244,204,221,.10), rgba(255,255,255,0) 73%);
  pointer-events: none;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-glyph {
  position: absolute;
  top: 12px;
  left: 50%;
  z-index: 3;
  transform: translateX(-50%);
  width: 27px;
  height: 27px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid #d0a67d;
  background: #221922;
  color: var(--guardian-color);
  font-size: 16px;
  line-height: 1;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-art {
  position: absolute;
  top: 53px;
  bottom: 83px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-art img,
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-front img,
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-back img {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  object-fit: contain;
  filter: drop-shadow(0 4px 7px rgba(5,1,12,.40));
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-back .guardian-tarot-art {
  top: 48px;
  bottom: 76px;
  left: 8px;
  right: 8px;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-plaque {
  position: absolute;
  left: 13px;
  right: 13px;
  bottom: 42px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  background: #251c29;
  border: 1px solid #a98162;
  transform: rotate(-2deg);
  z-index: 4;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-plaque strong {
  display: block;
  max-width: 100%;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -.025em;
  line-height: 1.22;
  color: #f2d0b2;
  text-align: center;
  overflow-wrap: anywhere;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-back .guardian-tarot-plaque strong {
  color: #fff0d7;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-footer {
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
  display: block;
  margin: 0;
  z-index: 3;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: .08em;
  color: #d2b492;
  text-align: center;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-back .guardian-tarot-footer {
  color: var(--guardian-color);
  letter-spacing: 0;
}
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-plaque,
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-footer,
#guardian-tabs.guardian-tarot-tabs .guardian-tarot-glyph {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
/* 선택하지 않은 동안 공책형 상세 프로필은 표시하지 않음 */
#guardian-panel.guardian-notebook[hidden] { display: none !important; }
@media (max-width: 900px) {
  #guardian-tabs.guardian-tarot-tabs { grid-template-columns: repeat(3,minmax(0,1fr)); max-width:660px; }
}
@media (max-width: 600px) {
  #guardian-tabs.guardian-tarot-tabs { grid-template-columns:repeat(2,minmax(0,1fr)); gap:13px; }
  #guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card,
  #guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card.selected { height:270px; }
  #guardian-tabs.guardian-tarot-tabs .guardian-tarot-plaque strong { font-size:14px; }
  #guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card:last-child { grid-column:1/-1; width:calc((100% - 13px)/2); justify-self:center; }
}
@media (max-width: 360px) {
  #guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card,
  #guardian-tabs.guardian-tarot-tabs button.guardian-tarot-card.selected { height:240px; }
  #guardian-tabs.guardian-tarot-tabs .guardian-tarot-plaque strong { font-size:12px; }
}
@media (prefers-reduced-motion:reduce) {
  #guardian-tabs.guardian-tarot-tabs .guardian-tarot-inner { transition:none; }
}
`;
    document.head.appendChild(css);
  }

  const ornament = `
    <svg class="guardian-tarot-etch" viewBox="0 0 200 310" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="#b58b69" stroke-width=".85" opacity=".94">
        <rect x="7" y="7" width="186" height="296" rx="2"/>
        <path d="M11 58 L11 17 L60 17 M140 17 L189 17 L189 58 M11 252 L11 293 L60 293 M140 293 L189 293 L189 252"/>
        <path d="M18 62 Q22 29 65 19 M182 62 Q178 29 135 19 M18 247 Q22 278 65 292 M182 247 Q178 278 135 292"/>
        <path d="M17 35 L30 18 M183 35 L170 18 M17 275 L30 292 M183 275 L170 292"/>
        <path d="M47 20 L68 35 M153 20 L132 35 M47 290 L68 275 M153 290 L132 275"/>
        <path d="M56 18 L75 31 M144 18 L125 31 M56 292 L75 279 M144 292 L125 279"/>
      </g>
      <g fill="#c29a73" opacity=".8"><circle cx="17" cy="72" r="1.5"/><circle cx="183" cy="72" r="1.5"/></g>
    </svg>`;

  guardianTabs.classList.add('guardian-tarot-tabs');

  const safe = value => esc(String(value ?? ''));
  const cards = guardians.map(g => `
    <button
      type="button"
      class="guardian-tarot-card"
      data-guardian="${safe(g.id)}"
      style="--guardian-color:${safe(g.color)}"
      aria-pressed="false"
      aria-controls="guardian-panel"
      aria-label="${safe(g.dept)} 수호알 뒤집어 ${safe(g.name)} 만나기"
    >
      <span class="guardian-tarot-inner">
        <span class="guardian-tarot-face guardian-tarot-front">
          ${ornament}
          <span class="guardian-tarot-glyph" aria-hidden="true">✦</span>
          <span class="guardian-tarot-halo" aria-hidden="true"></span>
          <span class="guardian-tarot-art"><img src="${safe(g.egg)}" alt="" loading="lazy"></span>
          <span class="guardian-tarot-plaque"><strong>${safe(g.short)}</strong></span>
          <small class="guardian-tarot-footer">TOUCH TO REVEAL ✧</small>
        </span>
        <span class="guardian-tarot-face guardian-tarot-back">
          ${ornament}
          <span class="guardian-tarot-glyph" aria-hidden="true">♡</span>
          <span class="guardian-tarot-halo" aria-hidden="true"></span>
          <span class="guardian-tarot-art"><img src="${safe(g.character || g.egg)}" alt="" loading="lazy"></span>
          <span class="guardian-tarot-plaque"><strong>${safe(g.name)}</strong></span>
          <small class="guardian-tarot-footer">${safe(g.short)} · MY GUARDIAN</small>
        </span>
      </span>
    </button>`).join('');

  guardianTabs.innerHTML = cards;
  guardianPanel.hidden = true;

  // 원래 있던 캐릭터 프로필(사진·키워드·스토리·펼치기) 그대로 유지
  function showGuardianProfile(g) {
    guardianPanel.style.setProperty('--guardian-color', g.color);
    guardianPanel.innerHTML = `
      <div class="guardian-picture">
        <div class="portrait-frame">
          <img src="${safe(g.character || g.egg)}" alt="${safe(g.name)}${g.character ? ' 캐릭터' : '의 수호알'}" width="1254" height="1254">
          <span>${safe(g.name)}</span>
        </div>
        ${g.quote ? `<blockquote>“${safe(g.quote)}”</blockquote>` : ''}
        <div class="guardian-symbols" aria-hidden="true">♡ ✦ ♧ ◇</div>
      </div>
      <div class="guardian-story">
        <p class="eyebrow">${safe(g.dept)} / MY GUARDIAN</p>
        <h3 id="guardian-name">${safe(g.name)}</h3>
        <p class="guardian-tagline">${safe(g.tagline)}</p>
        <div class="guardian-keywords">${(g.keywords || []).map(w => `<span>#${safe(w)}</span>`).join('')}</div>
        <p>${safe(g.intro)}</p>
        ${(g.items || []).length ? `<dl class="guardian-items">${g.items.map(item => `<div><dt>${safe(item[0])}</dt> <dd>${safe(item[1])}</dd></div>`).join('')}</dl>` : ''}
        ${(g.story || []).length ? `<details class="guardian-more"><summary>수호캐릭터의 이야기 펼치기 <span aria-hidden="true">+</span></summary>${g.story.map(part => `<div><h4>${safe(part[0])}</h4><p>${safe(part[1])}</p></div>`).join('')}</details>` : ''}
        <p class="guardian-selected" role="status">${safe(g.short)}의 수호알을 열었어요 ♡</p>
      </div>`;
    guardianPanel.hidden = false;
  }

  let selectedGuardian = null;

  guardianTabs.addEventListener('click', event => {
    const button = event.target.closest('button[data-guardian]');
    if (!button || !guardianTabs.contains(button)) return;

    const id = button.dataset.guardian;
    const guardian = guardians.find(g => g.id === id);
    if (!guardian) return;

    // 클릭한 카드 하나만 뒤집히고, 다른 카드들은 수호알 앞면으로 복귀
    selectedGuardian = selectedGuardian === id ? null : id;
    guardianTabs.querySelectorAll('.guardian-tarot-card').forEach(card => {
      const active = card.dataset.guardian === selectedGuardian;
      card.classList.toggle('is-flipped', active);
      card.setAttribute('aria-pressed', String(active));
    });

    if (selectedGuardian) {
      showGuardianProfile(guardian);
    } else {
      guardianPanel.hidden = true;
    }
  });
}
