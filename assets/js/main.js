/**
 * Main JavaScript — Kumar Neupane Portfolio
 * Fully responsive, accessible, production-ready
 * Features: mobile nav (ESC, outside-click, scroll-lock, ARIA),
 *           scroll-to-top, AOS, Swiper, Isotope, GLightbox, PureCounter
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. SCROLL CLASS ON BODY
  ────────────────────────────────────────── */
  function toggleScrolled() {
    const body   = document.querySelector('body');
    const header = document.querySelector('#header');
    if (!header) return;
    if (
      !header.classList.contains('scroll-up-sticky') &&
      !header.classList.contains('sticky-top') &&
      !header.classList.contains('fixed-top')
    ) return;
    window.scrollY > 100
      ? body.classList.add('scrolled')
      : body.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* ──────────────────────────────────────────
     2. MOBILE NAV — full-featured
  ────────────────────────────────────────── */
  const navToggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu      = document.querySelector('#navmenu');
  const body         = document.body;

  function openMobileNav() {
    if (!navMenu) return;
    body.classList.add('mobile-nav-active');
    navMenu.classList.add('navmenu-open');
    body.style.overflow = 'hidden'; // lock background scroll
    if (navToggleBtn) {
      navToggleBtn.classList.replace('bi-list', 'bi-x');
      navToggleBtn.setAttribute('aria-expanded', 'true');
      navToggleBtn.setAttribute('aria-label', 'Close navigation');
    }
  }

  function closeMobileNav() {
    if (!navMenu) return;
    body.classList.remove('mobile-nav-active');
    navMenu.classList.remove('navmenu-open');
    body.style.overflow = ''; // restore scroll
    if (navToggleBtn) {
      navToggleBtn.classList.replace('bi-x', 'bi-list');
      navToggleBtn.setAttribute('aria-expanded', 'false');
      navToggleBtn.setAttribute('aria-label', 'Open navigation');
    }
  }

  function toggleMobileNav() {
    body.classList.contains('mobile-nav-active') ? closeMobileNav() : openMobileNav();
  }

  if (navToggleBtn) {
    navToggleBtn.addEventListener('click', toggleMobileNav);
  }

  /* Close on nav link click */
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) closeMobileNav();
    });
  });

  /* Close on ESC key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('mobile-nav-active')) {
      closeMobileNav();
      if (navToggleBtn) navToggleBtn.focus(); // return focus for a11y
    }
  });

  /* Close when clicking outside (on the dark backdrop) */
  document.addEventListener('click', (e) => {
    if (!body.classList.contains('mobile-nav-active')) return;
    const menuList = navMenu && navMenu.querySelector(':scope > ul');
    const clickedInsideNav    = menuList && menuList.contains(e.target);
    const clickedOnToggle     = navToggleBtn && navToggleBtn.contains(e.target);
    if (!clickedInsideNav && !clickedOnToggle) closeMobileNav();
  });

  /* ──────────────────────────────────────────
     3. DROPDOWN TOGGLE (mobile sub-menus)
  ────────────────────────────────────────── */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /* ──────────────────────────────────────────
     4. PRELOADER
  ────────────────────────────────────────── */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /* ──────────────────────────────────────────
     5. SCROLL-TO-TOP BUTTON
  ────────────────────────────────────────── */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    function toggleScrollTop() {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /* ──────────────────────────────────────────
     6. AOS ANIMATION INIT
  ────────────────────────────────────────── */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
  window.addEventListener('load', aosInit);

  /* ──────────────────────────────────────────
     7. SKILLS PROGRESS BAR ANIMATION
  ────────────────────────────────────────── */
  document.querySelectorAll('.skills-animation').forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        item.querySelectorAll('.progress .progress-bar').forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      },
    });
  });

  /* ──────────────────────────────────────────
     8. PURECOUNTER
  ────────────────────────────────────────── */
  new PureCounter();

  /* ──────────────────────────────────────────
     9. SWIPER SLIDERS
  ────────────────────────────────────────── */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(function (swiperEl) {
      const config = JSON.parse(
        swiperEl.querySelector('.swiper-config').innerHTML.trim()
      );
      if (swiperEl.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(swiperEl, config);
      } else {
        new Swiper(swiperEl, config);
      }
    });
  }
  window.addEventListener('load', initSwiper);

  /* ──────────────────────────────────────────
     10. GLIGHTBOX
  ────────────────────────────────────────── */
  const glightbox = GLightbox({ selector: '.glightbox' });

  /* ──────────────────────────────────────────
     11. ISOTOPE LAYOUT + FILTERS
  ────────────────────────────────────────── */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    const layout = isotopeItem.getAttribute('data-layout')       ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort   = isotopeItem.getAttribute('data-sort')          ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter,
        sortBy: sort,
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterBtn) {
      filterBtn.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      }, false);
    });
  });

  /* ──────────────────────────────────────────
     12. ACTIVE NAV LINK ON SCROLL
         Uses IntersectionObserver for single-page
         scroll-spy behavior
  ────────────────────────────────────────── */
  const sections    = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('#navmenu a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${entry.target.id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach((sec) => sectionObserver.observe(sec));
  }

})();