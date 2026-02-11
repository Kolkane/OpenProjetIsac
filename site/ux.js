// UX helpers: track accordion opens (Plausible + local logger)
(function(){
  function onToggle(e){
    const d = e.target;
    if (!d || d.tagName !== 'DETAILS') return;
    const name = d.getAttribute('data-track-open');
    if (!name) return;
    const evt = d.open ? name : (name + '_close');
    try { if (window.AO && window.AO.track) window.AO.track(evt, {}); } catch {}
    try { if (window.plausible) window.plausible(evt, { props: {} }); } catch {}
  }
  document.addEventListener('toggle', onToggle, true);
})();
