'use strict';

(() => {
  const pages = [
    ...document.querySelectorAll('#main > section[id]')
  ];

  const ribbon = document.querySelector('.festival-ribbon');
  const closing = document.querySelector('#main > .closing');
  const navLinks = document.querySelectorAll('.site-header nav a');
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileViewport = matchMedia('(max-width: 760px)');
  function closeMenu() {
    header.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    header.classList.toggle('nav-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    closeMenu();
    if (mobileViewport.matches) menuToggle.focus({preventScroll:true});
  }));
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      menuToggle.focus({preventScroll:true});
    }
  });
  mobileViewport.addEventListener('change', closeMenu);

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
        document.getElementById('mobile-page-name').textContent = link.textContent.replace('✦', '').trim();
      } else {
        link.removeAttribute('aria-current');
      }
    });
    closeMenu();

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }

  window.addEventListener('hashchange', showPage);
  showPage();
})();
