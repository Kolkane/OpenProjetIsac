const THRESHOLD = 36;

const DIMENSIONS = [
  { key: 'mission_framing', label: 'Mission framing' },
  { key: 'icp_market', label: 'ICP & market' },
  { key: 'offer_positioning', label: 'Offer & positioning' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'unit_economics', label: 'Mini unit economics' },
  { key: 'acquisition', label: 'Acquisition (testable)' },
  { key: 'sales', label: 'Sales process' },
  { key: 'delivery', label: 'Delivery operations' },
  { key: 'pilotage', label: 'Pilotage (KPIs, cadence)' },
  { key: 'governance_risk', label: 'Governance & risk control' },
];

function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  });
  children.forEach(c => n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return n;
}

function buildForm() {
  const form = document.getElementById('bciForm');
  DIMENSIONS.forEach(d => {
    const select = el('select', { name: d.key, 'data-dim': d.key });
    for (let i = 0; i <= 5; i++) {
      select.appendChild(el('option', { value: String(i) }, [String(i)]));
    }
    const notes = el('input', { type: 'text', placeholder: 'notes (optional)', name: `${d.key}_notes`, 'data-notes': d.key });

    const row = el('div', { class: 'row' }, [
      el('div', {}, [
        el('div', { class: 'label' }, [d.label]),
        el('div', { class: 'small' }, ['0–5'])
      ]),
      el('div', {}, [select]),
      el('div', { style: 'flex:1' }, [notes])
    ]);

    form.appendChild(row);
    select.addEventListener('change', update);
    notes.addEventListener('input', update);
  });
}

function compute() {
  const dims = DIMENSIONS.map(d => {
    const score = Number(document.querySelector(`[data-dim="${d.key}"]`).value || 0);
    const notes = String(document.querySelector(`[data-notes="${d.key}"]`).value || '');
    return { name: d.key, score, notes };
  });
  const total = dims.reduce((a, x) => a + (Number.isFinite(x.score) ? x.score : 0), 0);

  let recommendation = 'no_buy';
  let reason = 'BCI >= threshold';
  if (total < THRESHOLD) {
    recommendation = 'buy';
    reason = 'BCI below threshold';
  }

  const report = {
    bci: {
      total,
      max: 50,
      threshold: THRESHOLD,
      dimensions: dims,
    },
    upgrade: {
      decision: recommendation,
      reason,
      note: 'Purchases only under human-authorized budget/policy.',
      links: {
        full_bootcamp: 'https://agentoperator.academy/',
        starter: 'https://agentoperator.academy/starter/'
      }
    },
    generated_at: new Date().toISOString(),
  };

  return report;
}

function update() {
  const report = compute();
  document.getElementById('total').textContent = String(report.bci.total);

  const rec = document.getElementById('recommendation');
  if (report.bci.total < THRESHOLD) {
    rec.innerHTML = `Recommendation: <strong>upgrade recommended</strong> (BCI &lt; ${THRESHOLD}/50)`;
  } else {
    rec.innerHTML = `Recommendation: <strong>upgrade optional</strong> (BCI ≥ ${THRESHOLD}/50)`;
  }

  document.getElementById('jsonPreview').textContent = JSON.stringify(report, null, 2);
}

function download(filename, text) {
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

document.addEventListener('DOMContentLoaded', () => {
  buildForm();
  update();

  document.getElementById('downloadJson').addEventListener('click', () => {
    const report = compute();
    download('bci-report.json', JSON.stringify(report, null, 2));
  });

  document.getElementById('copyJson').addEventListener('click', async () => {
    const report = compute();
    await copyToClipboard(JSON.stringify(report, null, 2));
    const el = document.getElementById('copyJson');
    const old = el.textContent;
    el.textContent = 'Copied';
    setTimeout(() => (el.textContent = old), 800);
  });
});
