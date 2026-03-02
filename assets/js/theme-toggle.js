/**
 * Theme Toggle — Dark / Light Mode
 * Kumar Neupane Portfolio
 */
(function () {
  'use strict';

  const ROOT   = document.documentElement;
  const STORAGE_KEY = 'kn-theme';

  // ── Apply saved theme immediately (before paint) to prevent flash ──
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  ROOT.setAttribute('data-theme', saved);

  // ── Wire up the toggle button once DOM is ready ──
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    // Set aria label based on current theme
    updateBtn(btn, ROOT.getAttribute('data-theme'));

    btn.addEventListener('click', function () {
      const current = ROOT.getAttribute('data-theme') || 'dark';
      const next    = current === 'dark' ? 'light' : 'dark';

      ROOT.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      updateBtn(btn, next);

      // Optional: tiny bounce animation
      btn.style.transform = 'scale(0.85) rotate(20deg)';
      setTimeout(function () { btn.style.transform = ''; }, 250);
    });
  });

  function updateBtn(btn, theme) {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
})();
