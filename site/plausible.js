// Plausible analytics loader (privacy-friendly)
// Uses Seb's project-specific Plausible script.

(function () {
  // Load plausible script
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://plausible.io/js/pa-AyUj0vM75GYWlCkpPQNRe.js';
  document.head.appendChild(s);

  // Minimal init shim (as provided)
  window.plausible = window.plausible || function () {
    (plausible.q = plausible.q || []).push(arguments);
  };
  plausible.init = plausible.init || function (i) {
    plausible.o = i || {};
  };
  plausible.init();
})();
