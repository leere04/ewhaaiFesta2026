'use strict';
(() => {
  const section = document.getElementById('booth-map');
  const overlay = document.getElementById('map-highlights');
  const directory = section?.querySelector('.map-directory');
  const status = document.getElementById('map-selection-status');
  if (!section || !overlay || !directory) return;

  // Coordinates in the original 1229×1080 booth-map image.
  const locations = {
    commit: ['528,785 598,787 594,897 524,894'],
    click: ['517,669 586,664 594,774 524,778'],
    ewhale: ['496,553 565,543 583,650 513,661'],
    randomforest: ['597,532 643,479 728,553 679,605'],
    steady: ['679,605 728,553 773,590 726,642'],
    datascience: ['726,642 773,590 818,624 775,677'],
    likelion: ['775,677 818,624 911,681 873,741'],
    festival: ['891,748 915,682 1018,720 993,786', '702,872 754,862 767,930 715,940'],
    daily: ['643,883 695,872 709,942 656,952']
  };
  const namespace = 'http://www.w3.org/2000/svg';
  Object.entries(locations).forEach(([id, shapes]) => shapes.forEach(points => {
    const polygon = document.createElementNS(namespace, 'polygon');
    polygon.setAttribute('points', points);
    polygon.dataset.location = id;
    overlay.append(polygon);
  }));

  // Leave the row's existing '자세히 보기' button alone.
  // Only the booth name becomes a map-location button, without data-booth.
  const boothRows = [...directory.querySelectorAll(':scope > .map-booth-row')];
  boothRows.forEach(row => {
    const details = row.querySelector('button[data-booth]');
    const title = row.querySelector(':scope > span');
    const location = details?.dataset.booth || 'festival';
    row.dataset.mapLocation = location === 'likelion-dalpan' ? 'likelion' : location;
    if (title) {
      const locate = document.createElement('button');
      locate.type = 'button';
      locate.className = 'map-locate';
      locate.textContent = title.textContent;
      locate.setAttribute('aria-pressed', 'false');
      locate.setAttribute('aria-label', title.textContent + ' 지도에서 위치 확인');
      title.replaceWith(locate);
    }
  });
  const daily = directory.querySelector(':scope > .daily-booth');
  if (daily) daily.dataset.mapLocation = 'daily';
  const rows = daily ? [...boothRows, daily] : boothRows;
  let selected = null;
  const initialStatus = '부스명을 누르면 배치도에 위치가 표시돼요.';
  if (status) status.textContent = initialStatus;

  function highlight(row) {
    const id = row?.dataset.mapLocation;
    overlay.querySelectorAll('polygon').forEach(polygon => {
      polygon.classList.toggle('is-selected', polygon.dataset.location === id);
    });
    rows.forEach(item => {
      item.classList.toggle('map-active', item === row);
      const locate = item.querySelector(':scope > .map-locate');
      if (locate) locate.setAttribute('aria-pressed', String(item === selected));
    });
    if (status) status.textContent = row
      ? row.querySelector(':scope > .map-locate')?.textContent || initialStatus
      : initialStatus;
  }
  rows.forEach(row => {
    const locate = row.querySelector(':scope > .map-locate');
    // Hover previews a booth; a name click makes the location stay selected.
    row.addEventListener('pointerenter', () => highlight(row));
    row.addEventListener('pointerleave', () => highlight(selected));
    row.addEventListener('focusin', () => highlight(row));
    row.addEventListener('focusout', event => {
      if (!row.contains(event.relatedTarget)) highlight(selected);
    });
    locate?.addEventListener('click', () => {
      selected = row;
      highlight(row);
    });
  });
})();
