/* 인지상정 부스 카드뉴스 수정 · 컴공/사보/웨일/루덴스 (2026-11-03 v2)
   기존 data.js, app.js, 다른 부스 기능은 덮어쓰지 않습니다.
   index.html에서 app.js 다음에 이 파일을 한 번만 불러오면 됩니다.
   카드뉴스 이미지: assets/booth-*.jpg (assets 폴더 안에 업로드) */
'use strict';
(() => {
  if (window.__boothTeamsLoaded) return;
  window.__boothTeamsLoaded = true;
  if (typeof booths === 'undefined' || typeof openBooth !== 'function') return;

  const updates = {
    randomforest: {
      products: [
        '돼지국밥 4,000원',
        '고기 추가 1,000원',
        '매실차 2,000원',
        '세트메뉴 (돼지국밥 + 매실차) 5,500원'
      ],
      pricesConfirmed: true,
      extraGalleryTitle: '랜덤포레스트 메뉴·가격 안내',
      extraGalleryImages: ['assets/booth-randomforest-menu-20261103.png']
    },
    steady: {
      products: [
        '일반 어묵 2,000원',
        '마라 어묵 2,500원',
        'Steady Set 4,000원'
      ],
      pricesConfirmed: true,
      note: 'Steady Set: 일반 어묵 1개 + 마라 어묵 1개 (각각 따로 담아드려요).',
      extraGalleryTitle: '스테디 셀러 메뉴·가격 안내',
      extraGalleryImages: [
        'assets/booth-steady-01.png',
        'assets/booth-steady-02.png',
        'assets/booth-steady-03.png'
      ]
    },
    datascience: {
      description: '학점은 말랑하지 않아도 모찌는 말랑하니까.\n\n🫐 블베로 달콤하게!\n\n🍇 샤머로 청량하게!\n\n🍊 귤로 상큼하게!\n\n과제는 미뤄도 모찌는 못 미룸.\n오늘의 행복, 일단 먹고 생각하자 🍡',
      products: [
        '샤인머스캣 모찌 4,500원',
        '블루베리 모찌 5,000원',
        '귤 모찌 4,000원'
      ],
      hours: '10:00~17:00',
      location: '학생문화관 6번 부스',
      pricesConfirmed: true,
      note: '메뉴 사진은 아래 안내를 확인해 주세요.',
      extraGalleryTitle: '데이터사이언스 부스 메뉴·가격 안내',
      extraGalleryImages: ['assets/booth-datascience-menu-20261103.jpg?v=20261103-menu-final']
    },
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
      hours: '10:00~17:00',
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
    if (booth.id === 'click' && Array.isArray(booth.promoImages)) {
      booth.promoImages = booth.promoImages.map(src =>
        src.split('?')[0] === 'assets/booth-click-3.jpg'
          ? 'assets/booth-click-3.jpg?v=20261103-corrected'
          : src);
    }
  }
  const teamOne = {"id": "likelion", "number": 7, "name": "멋쟁이사자처럼 1팀 · WEE", "org": "이화여자대학교 멋쟁이사자처럼", "description": "오늘의 날씨를, 오늘의 행동으로! 날씨 맞춤 알림과 오늘의 운세를 제공하는 WEE를 만나보세요.", "categories": ["goods", "experience"], "days": ["wed", "thu"], "products": ["1일 운세 + 스티커 3종 1,000원", "7일 운세 + 커피 + 스티커 3종 + 아크릴 굿즈 5,900원", "14일 운세 + 커피 + 전체 종류 스티커 + NFC 굿즈 11,600원", "21일 운세 + 전체 구성품 16,000원", "날씨 프리미엄 21일 이용권 2,500원 (커피 1병 + 스티커 2종)", "학잠 WEE 키링 · 메시지 스티커 (개별 가격 현장 확인)"], "hours": "10:00~17:00", "location": "학생문화관 앞 7번 부스", "note": "인스타그램 스토리 인증 시 스티커 1종 무료 증정! 날씨 프리미엄과 운세 이용권은 별도입니다.", "art": "lion", "bg": "#e4f6fc", "accent": "#70b8cb", "extraGalleryTitle": "멋사 1팀 WEE 카드뉴스", "extraGalleryImages": ["assets/booth-wee-01.png", "assets/booth-wee-02.png", "assets/booth-wee-03.png", "assets/booth-wee-04.png", "assets/booth-wee-05.png", "assets/booth-wee-06.png"], "links": [{"label": "WEE 바로가기 ↗", "url": "https://weether.kr/"}]};
  const teamTwo = {"id": "likelion-dalpan", "number": 7, "name": "멋쟁이사자처럼 2팀 · 달판", "org": "이화여자대학교 멋쟁이사자처럼", "description": "대화 캡처를 바탕으로 인간관계 갈등을 판결해 주는 AI 재판소, 달판! 신촌 대학 연합 AI 창업 경진대회에 출품한 직접 만든 웹사이트를 소개합니다.", "categories": ["experience"], "days": ["wed", "thu"], "products": ["판결 체험 + 인스타 스토리 인증 → 토끼 말랑이 증정", "서비스 내 1,000원 결제 인증 → 토끼 모양 아몬드 쿠키 증정"], "hours": "11/4(수) 09:30~18:00 / 11/5(목) 12:30~18:00", "location": "학생문화관 앞 7번 부스", "note": "서비스에서 결제한 내역을 부스에서 인증해 주세요.", "steps": ["달판에 회원가입하고 AI 판결받기", "판결문 이미지를 저장하고 공유 링크 복사하기", "인스타그램 스토리에 업로드하고 부스에서 인증하기"], "art": "lion", "bg": "#ebe9f4", "accent": "#665574", "extraGalleryTitle": "멋사 2팀 달판 카드뉴스", "extraGalleryImages": ["assets/booth-dalpan-01.jpg", "assets/booth-dalpan-02.jpg", "assets/booth-dalpan-03.jpg"], "links": [{"label": "달판 바로가기 ↗", "url": "https://dalpan.vercel.app/"}]};
  const lionIndex = booths.findIndex(b => b.id === 'likelion');
  if (lionIndex !== -1) { Object.assign(booths[lionIndex], teamOne); if (!booths.some(b => b.id === teamTwo.id)) booths.splice(lionIndex + 1, 0, teamTwo); }
  // 부스 카드의 메뉴·검색 정보도 즉시 최신 내용으로 바꿉니다.
  if (typeof renderBooths === 'function') renderBooths();

  const stylesheet = document.createElement('style');
  stylesheet.textContent = `
    .extra-booth-gallery { margin: 0 0 24px; padding-top: 0; border-top: 0; }
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

    const save = body.querySelector('[data-dialog-save]');
    if (!save) return;

    if (booth.links) {
      const links = document.createElement('p');
      links.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap';
      booth.links.forEach(item => {
        const a = document.createElement('a');
        a.className = 'button button-dark';
        a.href = item.url; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = item.label; links.append(a);
      });
      body.appendChild(links);
    }
    // 사보크크의 기존 '펼치기 → 사진 세로 나열' UI만 제거합니다.
    // 이미지 배열은 data.js의 promoImages를 그대로 사용합니다.
    if (booth.promoImages) {
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
      body.appendChild(rewards);
    }

    const title = id === 'click' ? '사보크크 부스 카드뉴스' : booth.extraGalleryTitle || '부스 카드뉴스';
    const gallery = document.createElement('section');
    gallery.className = 'extra-booth-gallery';
    gallery.setAttribute('aria-label', title);
    // 카드뉴스 제목은 화면에 표시하지 않되, 접근성 이름은 유지합니다.
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
    body.appendChild(gallery);
  };
})();
