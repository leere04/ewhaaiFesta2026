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
  const directory = section.querySelector('.map-directory');
  directory.querySelectorAll('.map-booth-row').forEach(row => {
    const details = row.querySelector('[data-booth]');
    const link = row.querySelector('a');
    const name = row.querySelector(':scope > span, .map-locate');
    const description = row.querySelector('small');
    const control = document.createElement(details ? 'button' : 'a');
    control.className = 'map-booth-row';
    control.dataset.mapLocation = details ? details.dataset.booth : 'festival';
    if (details) {
      control.type = 'button';
      control.dataset.booth = details.dataset.booth;
      control.setAttribute('aria-haspopup', 'dialog');
    } else control.href = link.href;
    const title = document.createElement('span');
    title.textContent = name.textContent;
    const small = document.createElement('small');
    small.textContent = description.textContent;
    const action = document.createElement('b');
    action.textContent = details ? details.textContent : link.textContent;
    control.append(title, small, action);
    row.replaceWith(control);
  });
  const daily = directory.querySelector('.daily-booth');
  const dailyTitle = daily.querySelector('.map-locate');
  const heading = document.createElement('strong');
  heading.textContent = dailyTitle.textContent;
  dailyTitle.replaceWith(heading);
  daily.querySelectorAll('[data-booth]').forEach(button => {
    button.dataset.mapLocation = 'daily';
    button.classList.add('map-daily-row');
  });
  const rows = [...directory.querySelectorAll('[data-map-location]')];
  const status = document.getElementById('map-selection-status');
  const initialStatus = status.textContent;
  function highlight(row) {
    const id = row?.dataset.mapLocation;
    overlay.querySelectorAll('polygon').forEach(polygon => {
      polygon.classList.toggle('is-selected', polygon.dataset.location === id);
    });
    rows.forEach(item => item.classList.toggle('map-active', item === row));
    status.textContent = row ? row.querySelector('span')?.textContent || row.textContent : initialStatus;
  }
  rows.forEach(row => {
    row.addEventListener('pointerenter', () => highlight(row));
    row.addEventListener('pointerleave', () => highlight(null));
    row.addEventListener('focus', () => highlight(row));
    row.addEventListener('blur', () => highlight(null));
    // The app's existing delegated data-booth handler opens the introduction.
    row.addEventListener('click', () => highlight(row));
  });
})();
