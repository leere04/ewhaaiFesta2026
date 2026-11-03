/* 인지상정 부스 추가 안내 (2026-11-03)
   기존 data.js, app.js, 다른 부스 기능은 덮어쓰지 않습니다.
   index.html에서 app.js 다음에 이 파일을 한 번만 불러오면 됩니다. */
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

  // app.js가 이미 처리하는 기존 모달과 찜하기 이벤트를 그대로 사용합니다.
  const oldOpenBooth = openBooth;
  openBooth = function(id) {
    oldOpenBooth(id);
    const booth = booths.find(item => item.id === id);
    const body = document.querySelector('#dialog-content .dialog-body');
    if (!booth || !body || !booth.extraGalleryImages) return;
    const save = body.querySelector('.dialog-save');
    if (!save) return;

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

    const gallery = document.createElement('section');
    gallery.className = 'extra-booth-gallery';
    const heading = document.createElement('h3');
    heading.textContent = booth.extraGalleryTitle;
    gallery.appendChild(heading);
    const track = document.createElement('div');
    track.className = 'extra-booth-gallery-track';
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', booth.extraGalleryTitle + ' 이미지');
    track.tabIndex = 0;
    booth.extraGalleryImages.forEach((src, i) => {
      const link = document.createElement('a');
      link.className = 'extra-booth-gallery-slide';
      link.href = src;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', `${booth.extraGalleryTitle} ${i + 1}번 이미지 원본 크게 보기`);
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${booth.extraGalleryTitle} ${i + 1} / ${booth.extraGalleryImages.length}`;
      img.loading = i === 0 ? 'eager' : 'lazy';
      link.appendChild(img);
      track.appendChild(link);
    });
    gallery.appendChild(track);
    if (booth.extraGalleryImages.length > 1) {
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
        page = Math.max(0, Math.min(booth.extraGalleryImages.length - 1, Math.round(track.scrollLeft / Math.max(track.clientWidth, 1))));
        indicator.textContent = `${page + 1} / ${booth.extraGalleryImages.length}`;
        prev.disabled = page === 0;
        next.disabled = page === booth.extraGalleryImages.length - 1;
      };
      prev.addEventListener('click', () => track.scrollTo({left: track.clientWidth * Math.max(0, page - 1), behavior: 'smooth'}));
      next.addEventListener('click', () => track.scrollTo({left: track.clientWidth * Math.min(booth.extraGalleryImages.length - 1, page + 1), behavior: 'smooth'}));
      track.addEventListener('scroll', update, {passive: true});
      controls.append(prev, indicator, next);
      gallery.appendChild(controls);
      update();
      const hint = document.createElement('p');
      hint.className = 'extra-booth-gallery-hint';
      hint.textContent = '옆으로 넘겨 보거나 이미지를 눌러 크게 볼 수 있어요.';
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
