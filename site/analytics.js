// Lightweight, dependency-free client-side event logger.
// V1: stores events locally so we can inspect intent without a backend.
// Upgrade later: replace with Plausible/GA/Worker endpoint.

(function () {
  const KEY = 'agentoperator_events_v1';

  function now() { return new Date().toISOString(); }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  }

  function save(events) {
    try { localStorage.setItem(KEY, JSON.stringify(events.slice(-200))); } catch {}
  }

  function track(name, props) {
    const evt = { name, props: props || {}, at: now(), path: location.pathname };
    const events = load();
    events.push(evt);
    save(events);
    // keep it quiet but observable
    if (window.__AO_DEBUG_EVENTS) console.log('[AO:event]', evt);
  }

  function bindClicks() {
    document.addEventListener('click', (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.includes('buy.stripe.com')) {
        if (href.includes('28E9AT5LCdCt8F0dzYcV205')) track('click_buy_bootcamp', { href });
        else if (href.includes('4gM00jca07e508u8fEcV206')) track('click_buy_starter', { href });
        else track('click_buy_stripe', { href });
      }
    }, { capture: true });
  }

  window.AO = window.AO || {};
  window.AO.track = track;
  window.AO.eventsExport = function () {
    const events = load();
    return JSON.stringify({ exported_at: now(), events }, null, 2);
  };

  // auto-init
  bindClicks();
  track('page_view', { ref: document.referrer || null });
})();
