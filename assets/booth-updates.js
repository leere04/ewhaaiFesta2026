/* 인지상정 부스 카드뉴스 수정 · 컴공/사보/웨일/루덴스 (2026-11-03 v2)
   기존 data.js, app.js, 다른 부스 기능은 덮어쓰지 않습니다.
   index.html에서 app.js 다음에 이 파일을 한 번만 불러오면 됩니다.
   카드뉴스 이미지: assets/booth-*.jpg (assets 폴더 안에 업로드) */
'use strict';
(() => {
  if (typeof booths === 'undefined' || typeof openBooth !== 'function') return;

  const updates = {
    commit: {
      products: [
        '마라로제컴볶이 3,800원',
        '리무버블 찌라시 스티커 8종 4,000원',
        '다이노 멀티클리너 4,000원',
        '컴공다이노 티셔츠 16,000원(학생회비 납부) / 18,000원(미납부)'
      ],
      note: '음식과 굿즈를 함께 판매해요. 제품 사진과 가격은 카드뉴스를 확인해 주세요.',
      extraGalleryTitle: '컴퓨터공학과 Commit 카드뉴스',
      extraGalleryImages: [
        'assets/booth-commit-01.jpg',
        'assets/booth-commit-02.jpg',
        'assets/booth-commit-03.jpg',
        'assets/booth-commit-04.jpg',
        'assets/booth-commit-05.jpg'
      ]
    },
    ludens: {
      products: [
        '오타쿠 무한굴레 티셔츠 19,000원',
        '오타쿠 스티커 2,500원',
        '찌라시 스티커 1,000원',
        '자수책갈피 9,000원'
      ],
      hours: '11/5(목) 10:00–17:00',
      location: '학생문화관 10번 부스',
      note: '11월 5일 목요일 하루만 운영해요. 각 굿즈의 디자인은 카드뉴스에서 확인할 수 있어요.',
      extraGalleryTitle: '루덴스 부스 카드뉴스',
      extraGalleryImages: [
        'assets/booth-ludens-01.jpg',
        'assets/booth-ludens-02.jpg',
        'assets/booth-ludens-03.jpg',
        'assets/booth-ludens-04.jpg',
        'assets/booth-ludens-05.jpg',
        'assets/booth-ludens-06.jpg'
      ]
    },
    ewhale: {
      description: '🐳 네이버 웨일을 체험하고 부스 미션을 완료하면 귀여운 웨일 굿즈를 받을 수 있어요!',
      products: [
        '웨일 브라우저 체험',
        '이화인 확장앱 안내',
        '미션 완료 시 무료 리워드 증정 (판매 X)'
      ],
      steps: [
        '네이버 웨일 다운로드',
        '추천인 코드 ewha02 입력',
        '이화인 확장앱 설명 듣기',
        '미션 완료 후 리워드 받기'
      ],
      note: '굿즈는 판매 상품이 아닙니다. 부스 미션을 완료한 참여자에게 무료로 증정합니다.',
      extraGalleryTitle: '네이버 웨일 미션 참여 안내',
      extraGalleryImages: ['assets/booth-ewhale-01.jpg'],
      extraRewards: [
        '네이버 웨일 스트레스볼 키링',
        '네이버 웨일 키캡 키링',
        '네이버 웨일 스티커 2종'
      ],
      extraRewardNote: '키링 2종 중 택 1 + 스티커 2장 · 미션 완료 시 무료 증정 (판매 X)'
    }
  };

  for (const booth of booths) {
    if (updates[booth.id]) Object.assign(booth, updates[booth.id]);
  }
  // 부스 카드의 메뉴·검색 정보도 즉시 최신 내용으로 바꿉니다.
  if (typeof renderBooths === 'function') renderBooths();

  const stylesheet = document.createElement('style');
  stylesheet.textContent = `
    .extra-booth-gallery { margin: 20px 0 24px; padding-top: 15px; border-top: 1px solid var(--line, #eadfe7); }
    .extra-booth-gallery h3, .extra-booth-rewards h3 { font-size: 16px; font-weight: 800; margin: 0 0 12px; color: #733d69; }
    .extra-booth-gallery-track { display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scrollbar-width: none; border-radius: 13px; background: #fff4fa; border: 1px solid #eadce6; overscroll-behavior-x: contain; }
    .extra-booth-gallery-track::-webkit-scrollbar { display: none; }
    .extra-booth-gallery-slide { flex: 0 0 100%; min-width: 0; display: flex; justify-content: center; align-items: center; scroll-snap-align: start; background: #fff; }
    .extra-booth-gallery-slide img { display: block; width: 100%; height: min(58dvh, 550px); object-fit: contain; }
    .extra-booth-gallery-slide { position:relative; }
    .extra-booth-gallery-slide:focus-visible { outline:3px solid #bc79a2; outline-offset:-3px; }
    .extra-booth-gallery-error { display:none; margin:20px; padding:20px; text-align:center; color:#874d65; background:#fff1f4; font-size:13px; line-height:1.8; border-radius:12px; }
    .extra-booth-gallery-slide.is-broken img { display:none; }
    .extra-booth-gallery-slide.is-broken .extra-booth-gallery-error { display:block; }
    .extra-booth-gallery-controls { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 12px; }
    .extra-booth-gallery-controls button { border: 1px solid #ead2df; border-radius: 10px; padding: 7px 13px; background: #fff5fa; font-weight: 750; font-size: 12px; }
    .extra-booth-gallery-controls button:disabled { color: #bba9b3; opacity: .65; }
    .extra-booth-gallery-index { font-size: 12px; color: #68516a; font-variant-numeric: tabular-nums; }
    .extra-booth-gallery-hint { color: #957b8a; font-size: 11px; margin: 7px 0 0; text-align: center; }
    .extra-booth-rewards { padding: 15px 17px; margin: 0 0 20px; background: #f0f7ff; border: 1px solid #cfe4f8; border-radius: 14px; }
    .extra-booth-rewards h3 { color: #206b96; }
    .extra-booth-rewards ul { margin: 0 0 10px; padding-left: 19px; font-size: 13px; line-height: 1.9; }
    .extra-booth-rewards p { margin: 0; font-weight: 750; font-size: 12px; line-height: 1.7; color: #16628a; }
    @media(max-width:430px) {
      .extra-booth-gallery-slide img { height: min(56dvh, 480px); }
      .extra-booth-gallery h3, .extra-booth-rewards h3 { font-size: 14px; }
    }
  `;
  document.head.appendChild(stylesheet);

  // app.js의 기존 모달/찜하기는 유지하고, 모든 카드뉴스만 동일한 슬라이더로 표시합니다.
  const oldOpenBooth = openBooth;
  openBooth = function(id) {
    oldOpenBooth(id);
    const booth = booths.find(item => item.id === id);
    const body = document.querySelector('#dialog-content .dialog-body');
    const images = booth && (booth.promoImages || booth.extraGalleryImages);
    if (!booth || !body || !Array.isArray(images) || !images.length) return;

    const save = body.querySelector('.dialog-save');
    if (!save) return;

    // 사보크크의 기존 '펼치기 → 사진 세로 나열' UI만 제거합니다.
    // 이미지 배열은 data.js의 promoImages를 그대로 사용합니다.
    if (id === 'click') {
      const oldDetails = body.querySelector('details');
      if (oldDetails) oldDetails.remove();
    }

    if (booth.extraRewards) {
      const rewards = document.createElement('section');
      rewards.className = 'extra-booth-rewards';
      const heading = document.createElement('h3');
      heading.textContent = '🎁 미션 완료 리워드 · 판매 X';
      const list = document.createElement('ul');
      booth.extraRewards.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
      });
      const note = document.createElement('p');
      note.textContent = booth.extraRewardNote;
      rewards.append(heading, list, note);
      save.before(rewards);
    }

    const title = id === 'click' ? '사보크크 부스 카드뉴스' : booth.extraGalleryTitle || '부스 카드뉴스';
    const gallery = document.createElement('section');
    gallery.className = 'extra-booth-gallery';
    gallery.setAttribute('aria-label', title);
    const heading = document.createElement('h3');
    heading.textContent = title;
    gallery.appendChild(heading);

    if (id === 'click') {
      const correction = document.createElement('p');
      correction.className = 'extra-booth-gallery-hint';
      correction.textContent = '※ 실제 축제 운영일은 11/4(수)–11/5(목)입니다. 카드뉴스의 목·금 표기는 오기입니다.';
      gallery.appendChild(correction);
    }

    const track = document.createElement('div');
    track.className = 'extra-booth-gallery-track';
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', title + ' 슬라이드');
    track.tabIndex = 0;

    images.forEach((raw, i) => {
      const src = String(raw);
      const link = document.createElement('a');
      link.className = 'extra-booth-gallery-slide';
      link.href = src;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', `${title} ${i + 1}번 이미지 원본 크게 보기`);
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${title} ${i + 1} / ${images.length}`;
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';

      // 이미지를 저장소 루트에 잘못 업로드한 경우 한 번 더 찾아봅니다.
      let triedRoot = false;
      img.addEventListener('error', () => {
        if (!triedRoot && src.startsWith('assets/')) {
          triedRoot = true;
          const rootSrc = src.slice('assets/'.length);
          img.src = rootSrc;
          link.href = rootSrc;
          return;
        }
        link.classList.add('is-broken');
        link.removeAttribute('href');
      });
      const error = document.createElement('span');
      error.className = 'extra-booth-gallery-error';
      error.textContent = `이미지를 불러올 수 없어요 (${src.split('/').pop()}). GitHub의 assets 폴더에 해당 파일을 업로드했는지 확인해 주세요.`;
      link.append(img, error);
      track.appendChild(link);
    });
    gallery.appendChild(track);

    if (images.length > 1) {
      const controls = document.createElement('div');
      controls.className = 'extra-booth-gallery-controls';
      const prev = document.createElement('button');
      prev.type = 'button';
      prev.textContent = '← 이전';
      prev.setAttribute('aria-label', '이전 카드뉴스 보기');
      const next = document.createElement('button');
      next.type = 'button';
      next.textContent = '다음 →';
      next.setAttribute('aria-label', '다음 카드뉴스 보기');
      const indicator = document.createElement('span');
      indicator.className = 'extra-booth-gallery-index';
      indicator.setAttribute('aria-live', 'polite');
      let page = 0;
      const update = () => {
        page = Math.max(0, Math.min(images.length - 1,
          Math.round(track.scrollLeft / Math.max(track.clientWidth, 1))));
        indicator.textContent = `${page + 1} / ${images.length}`;
        prev.disabled = page === 0;
        next.disabled = page === images.length - 1;
      };
      const go = delta => {
        const nextPage = Math.max(0, Math.min(images.length - 1, page + delta));
        track.scrollTo({left: track.clientWidth * nextPage, behavior:'smooth'});
        page = nextPage;
        indicator.textContent = `${page + 1} / ${images.length}`;
        prev.disabled = page === 0;
        next.disabled = page === images.length - 1;
      };
      prev.addEventListener('click', () => go(-1));
      next.addEventListener('click', () => go(1));
      track.addEventListener('scroll', update, {passive:true});
      track.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
      });
      controls.append(prev, indicator, next);
      gallery.appendChild(controls);
      update();
      const hint = document.createElement('p');
      hint.className = 'extra-booth-gallery-hint';
      hint.textContent = '화면을 옆으로 밀거나 버튼으로 넘겨 보세요. 이미지를 누르면 크게 볼 수 있어요.';
      gallery.appendChild(hint);
    } else {
      const hint = document.createElement('p');
      hint.className = 'extra-booth-gallery-hint';
      hint.textContent = '이미지를 누르면 원본을 크게 볼 수 있어요.';
      gallery.appendChild(hint);
    }
    save.before(gallery);
  };
})();
