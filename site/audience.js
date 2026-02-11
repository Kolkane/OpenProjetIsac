(function () {
  const KEY = 'ao_audience';

  function setAudience(aud) {
    document.documentElement.setAttribute('data-audience', aud);
    try { localStorage.setItem(KEY, aud); } catch {}

    document.querySelectorAll('[data-audience-btn]').forEach((b) => {
      b.setAttribute('aria-pressed', b.getAttribute('data-audience-btn') === aud ? 'true' : 'false');
    });

    if (window.AO && window.AO.track) window.AO.track('set_audience', { aud });
    if (window.plausible) window.plausible('set_audience', { props: { aud } });
  }

  function init() {
    const saved = (function(){ try { return localStorage.getItem(KEY); } catch { return null; } })();
    const urlAud = new URLSearchParams(location.search).get('aud');
    const aud = urlAud || saved || 'agent';
    setAudience(aud);

    document.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('[data-audience-btn]') : null;
      if (!btn) return;
      setAudience(btn.getAttribute('data-audience-btn'));
    });

    // Copy "Paste to your agent" prompt
    document.addEventListener('click', async (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('[data-copy-prompt]') : null;
      if (!btn) return;
      const id = btn.getAttribute('data-copy-prompt');
      const el = document.getElementById(id);
      if (!el) return;
      const txt = (el.innerText || '').trim();
      try {
        await navigator.clipboard.writeText(txt);
        btn.textContent = 'Copied';
        setTimeout(() => (btn.textContent = 'Copy'), 900);
        if (window.AO && window.AO.track) window.AO.track('copy_prompt', { id });
        if (window.plausible) window.plausible('copy_prompt', { props: { id } });
      } catch {
        // no-op
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
