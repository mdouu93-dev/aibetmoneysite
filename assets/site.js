/* Progressive enhancement: navigation and filters work without a framework. */
(() => {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-navigation');
  if (header && toggle && nav) {
    const closeMenu = () => {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Открыть меню');
    };
    header.classList.add('nav-ready');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && header.classList.contains('menu-open')) {
        closeMenu();
        toggle.focus();
      }
    });
    const desktop = window.matchMedia('(min-width: 801px)');
    desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });
  }

  const filters = document.querySelector('[data-analysis-filters]');
  const grid = document.querySelector('[data-analysis-grid]');
  const empty = document.querySelector('[data-filter-empty]');
  if (filters && grid) {
    const buttons = [...filters.querySelectorAll('button[data-filter]')];
    const cards = [...grid.querySelectorAll('[data-sport]')];
    filters.hidden = false;
    filters.addEventListener('click', event => {
      const selected = event.target.closest('button[data-filter]');
      if (!selected || !filters.contains(selected)) return;
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
      let visible = 0;
      cards.forEach(card => {
        card.hidden = selected.dataset.filter !== 'ALL' && card.dataset.sport !== selected.dataset.filter;
        if (!card.hidden) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  }
})();
