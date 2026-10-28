'use strict';

(() => {
  const pages = [
    ...document.querySelectorAll('#main > section[id]')
  ];

  const ribbon = document.querySelector('.festival-ribbon');
  const closing = document.querySelector('#main > .closing');
  const navLinks = document.querySelectorAll('.site-header nav a');

  function showPage() {
    const requested = location.hash.slice(1);

    const activePage =
      pages.find(page => page.id === requested) ||
      pages.find(page => page.id === 'home');

    if (!activePage) return;

    pages.forEach(page => {
      page.hidden = page !== activePage;
    });

    const isHome = activePage.id === 'home';

    if (ribbon) ribbon.hidden = !isHome;
    if (closing) closing.hidden = !isHome;

    navLinks.forEach(link => {
      const active = link.hash === '#' + activePage.id;

      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }

  window.addEventListener('hashchange', showPage);
  showPage();
})();
