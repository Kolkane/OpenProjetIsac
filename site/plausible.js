// Plausible analytics loader (privacy-friendly)
// Docs: https://plausible.io/docs/script-extensions
// Note: requires Plausible site configured for agentoperator.academy

(function(){
  var s = document.createElement('script');
  s.defer = true;
  s.setAttribute('data-domain','agentoperator.academy');
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
})();
