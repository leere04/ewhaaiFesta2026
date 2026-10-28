'use strict';

// 학과별 수호알 → 캐릭터 카드 뒤집기
// 기존 data.js의 guardians 데이터 사용

const guardianTabs = document.getElementById('guardian-tabs');
const guardianPanel = document.getElementById('guardian-panel');

let openedGuardian = null;

// 캐릭터 소개 표시
function showGuardianProfile(guardian) {
  guardianPanel.style.setProperty('--guardian-color', guardian.color);

  guardianPanel.innerHTML = `
    <div class="guardian-picture">
      <div class="portrait-frame">
        <img
          src="${esc(guardian.character || guardian.egg)}"
          alt="${esc(guardian.name)} 캐릭터"
          width="1254"
          height="1254"
        >
        <span>${esc(guardian.name)}</span>
      </div>

      ${guardian.quote
        ? `<blockquote>“${esc(guardian.quote)}”</blockquote>`
        : ''}

      <div class="guardian-symbols" aria-hidden="true">
        ♡ ✦ ♧ ◇
      </div>
    </div>

    <div class="guardian-story">
      <p class="eyebrow">
        ${esc(guardian.dept)} / MY GUARDIAN
      </p>

      <h3 id="guardian-name">${esc(guardian.name)}</h3>

      <p class="guardian-tagline">
        ${esc(guardian.tagline)}
      </p>

      <div class="guardian-keywords">
        ${guardian.keywords.map(word =>
          `<span>#${esc(word)}</span>`
        ).join('')}
      </div>

      <p>${esc(guardian.intro)}</p>

      ${guardian.items.length ? `
        <dl class="guardian-items">
          ${guardian.items.map(item => `
            <div>
              <dt>${esc(item[0])}</dt>
              <dd>${esc(item[1])}</dd>
            </div>
          `).join('')}
        </dl>
      ` : ''}

      ${guardian.story.length ? `
        <details class="guardian-more">
          <summary>
            수호캐릭터의 이야기 펼치기
            <span aria-hidden="true">+</span>
          </summary>

          ${guardian.story.map(part => `
            <div>
              <h4>${esc(part[0])}</h4>
              <p>${esc(part[1])}</p>
            </div>
          `).join('')}
        </details>
      ` : ''}

      <p class="guardian-selected" role="status">
        ${esc(guardian.short)}의 수호알을 열었어요 ♡
      </p>
    </div>
  `;
}

// 카드 선택 및 뒤집기
function selectGuardian(id) {
  const guardian = guardians.find(item => item.id === id);
  if (!guardian) return;

  // 같은 카드를 다시 누르면 원래 수호알로 돌아가기
  openedGuardian = openedGuardian === id ? null : id;

  guardianTabs.querySelectorAll('button').forEach(button => {
    const active = button.dataset.guardian === openedGuardian;

    button.classList.toggle('selected', active);
    button.classList.toggle('is-flipped', active);
    button.setAttribute('aria-pressed', String(active));
  });

  if (openedGuardian) {
    showGuardianProfile(guardian);
  } else {
    guardianPanel.innerHTML = `
      <p class="guardian-start-message">
        ✨ 수호알을 선택하면 캐릭터를 만날 수 있어요! ✨
      </p>
    `;
  }
}

// 수호알 카드 5개 생성
guardianTabs.innerHTML = guardians.map(guardian => `
  <button
    type="button"
    class="guardian-flip-card"
    data-guardian="${esc(guardian.id)}"
    aria-pressed="false"
    aria-controls="guardian-panel"
    aria-label="${esc(guardian.dept)} 수호알 뒤집기"
    style="--guardian-color:${guardian.color}"
  >
    <span class="guardian-flip-inner">

      <!-- 앞면 : 수호알 -->
      <span class="guardian-flip-face guardian-flip-front">
        <img
          src="${esc(guardian.egg)}"
          alt=""
          loading="lazy"
        >

        <strong>${esc(guardian.short)}</strong>
        <small>TOUCH TO REVEAL ✦</small>
      </span>

      <!-- 뒷면 : 수호캐릭터 -->
      <span class="guardian-flip-face guardian-flip-back">
        <span class="guardian-card-sparkle">✦</span>

        <img
          src="${esc(guardian.character || guardian.egg)}"
          alt=""
          loading="lazy"
        >

        <strong>${esc(guardian.name)}</strong>
        <small>${esc(guardian.short)}의 수호캐릭터 ♡</small>
      </span>

    </span>
  </button>
`).join('');

// 카드 클릭 이벤트
guardianTabs.addEventListener('click', event => {
  const button = event.target.closest('button[data-guardian]');

  if (button) {
    selectGuardian(button.dataset.guardian);
  }
});

// 첫 화면 : 모든 카드가 수호알 상태
guardianPanel.innerHTML = `
  <p class="guardian-start-message">
    ✨ 수호알을 선택하면 캐릭터를 만날 수 있어요! ✨
  </p>
`;
