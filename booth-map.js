'use strict';
(() => {
  const section = document.getElementById('booth-map');
  const overlay = document.getElementById('map-highlights');
  if (!section || !overlay) return;
  // Polygon corners in the original 1229 x 1080 map, shared across all screen sizes.
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
  section.querySelectorAll('.map-booth-row').forEach(row => {
    const details = row.querySelector('[data-booth]');
    const name = row.querySelector(':scope > span');
    if (!details || !name) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'map-locate';
    button.dataset.mapLocation = details.dataset.booth;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = name.textContent;
    name.replaceWith(button);
  });
  function selectLocation(id, label) {
    if (!locations[id]) return;
    overlay.querySelectorAll('polygon').forEach(polygon => {
      polygon.classList.toggle('is-selected', polygon.dataset.location === id);
    });
    section.querySelectorAll('[data-map-location]').forEach(button => {
      const selected = button.dataset.mapLocation === id;
      button.setAttribute('aria-pressed', String(selected));
      button.closest('.map-booth-row, .daily-booth')?.classList.toggle('map-row-selected', selected);
    });
    document.getElementById('map-selection-status').textContent = label + ' 위치를 표시했어요.';
    if (matchMedia('(max-width: 760px)').matches) {
      section.querySelector('.map-figure').scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }
  }
  section.addEventListener('click', event => {
    const row = event.target.closest('.map-booth-row, .daily-booth');
    const locate = event.target.closest('[data-map-location]') || row?.querySelector('[data-map-location]');
    if (locate) selectLocation(locate.dataset.mapLocation, locate.textContent.trim());
    const details = event.target.closest('[data-booth]');
    if (details) {
      const id = details.dataset.booth;
      const target = id === 'animal-farm' || id === 'ludens' ? 'daily' : id;
      const label = section.querySelector(`[data-map-location="${target}"]`)?.textContent.trim();
      selectLocation(target, label || details.textContent.trim());
    }
  });
})();
