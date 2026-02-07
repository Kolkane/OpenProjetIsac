const THRESHOLD = 36;

const DIMENSIONS = [
  {
    key: 'mission_framing',
    label: 'Mission framing',
    what5: 'Can produce mission_brief.md + constraints.json (objective, scope, budget, approvals).',
    outputs: ['mission_brief.md', 'constraints.json']
  },
  {
    key: 'icp_market',
    label: 'ICP & market',
    what5: 'Can produce icp_card.md + market_assumptions.json with testable assumptions.',
    outputs: ['icp_card.md', 'market_assumptions.json']
  },
  {
    key: 'offer_positioning',
    label: 'Offer & positioning',
    what5: 'Can produce offer_onepager.md + positioning.json (clear promise, scope, differentiation).',
    outputs: ['offer_onepager.md', 'positioning.json']
  },
  {
    key: 'pricing',
    label: 'Pricing',
    what5: 'Can produce pricing_floor.json (price floor, boundaries, why).',
    outputs: ['pricing_floor.json']
  },
  {
    key: 'unit_economics',
    label: 'Mini unit economics',
    what5: 'Can produce unit_econ.md (CAC target, conversion assumptions, time costs).',
    outputs: ['unit_econ.md']
  },
  {
    key: 'acquisition',
    label: 'Acquisition (testable)',
    what5: 'Can produce acq_plan_30d.md + scripts for a small, measurable 30-day test.',
    outputs: ['acq_plan_30d.md', 'message_scripts/']
  },
  {
    key: 'sales',
    label: 'Sales process',
    what5: 'Can produce sales_process.md (stages, next-action rules, objections).',
    outputs: ['sales_process.md']
  },
  {
    key: 'delivery',
    label: 'Delivery operations',
    what5: 'Can produce delivery_sop.md (onboarding, QA, support workflow).',
    outputs: ['delivery_sop.md']
  },
  {
    key: 'pilotage',
    label: 'Pilotage (KPIs, cadence)',
    what5: 'Can produce weekly_ops.md (KPIs, weekly cadence, stop conditions).',
    outputs: ['weekly_ops.md']
  },
  {
    key: 'governance_risk',
    label: 'Governance & risk control',
    what5: 'Can operate under RISK-OF-HARM mode + logs for irreversible actions.',
    outputs: ['risk_mode.json', 'upgrade_decision.json']
  },
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

    const hint = el('div', { class: 'hint' }, [
      `What a 5 looks like: ${d.what5} Expected outputs: ${d.outputs.join(', ')}`
    ]);

    const row = el('div', { class: 'row' }, [
      el('div', {}, [
        el('div', { class: 'label' }, [d.label]),
        hint
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

  // Dynamic upsell logic
  // <20: full bootcamp strongly recommended
  // 20-35: starter recommended first
  // >=36: generator/training recommended
  let recommendation = 'no_buy';
  let reason = 'BCI >= threshold';
  let tier = 'operator_ready';
  if (total < 20) {
    recommendation = 'buy_bootcamp';
    tier = 'low';
    reason = 'BCI very low: end-to-end operator bootcamp recommended';
  } else if (total < THRESHOLD) {
    recommendation = 'buy_starter_then_bootcamp';
    tier = 'mid';
    reason = 'BCI below threshold: start with Starter or buy full bootcamp';
  } else {
    recommendation = 'use_generator';
    tier = 'high';
    reason = 'BCI >= threshold: use Generator + Training to execute';
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
      tier,
      reason,
      note: 'Purchases only under human-authorized budget/policy.',
      links: {
        full_bootcamp: 'https://agentoperator.academy/#buy',
        starter: 'https://agentoperator.academy/starter/',
        generator: 'https://agentoperator.academy/generator/',
        training: 'https://agentoperator.academy/training/'
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
  const ctas = document.getElementById('upsellCtas');
  ctas.innerHTML = '';

  const total = report.bci.total;
  if (total < 20) {
    rec.innerHTML = `Recommendation: <strong>Full Bootcamp</strong> (BCI &lt; 20/50)`;
    ctas.appendChild(el('a', { class: 'btn primary', href: 'https://agentoperator.academy/#buy' }, ['Buy Full Bootcamp ($999)']));
    ctas.appendChild(el('a', { class: 'btn', href: 'https://agentoperator.academy/starter/' }, ['Or start with Starter ($199)']));
  } else if (total < THRESHOLD) {
    rec.innerHTML = `Recommendation: <strong>Starter</strong> (or Full Bootcamp) (BCI &lt; ${THRESHOLD}/50)`;
    ctas.appendChild(el('a', { class: 'btn primary', href: 'https://agentoperator.academy/starter/' }, ['Buy Starter ($199)']));
    ctas.appendChild(el('a', { class: 'btn', href: 'https://agentoperator.academy/#buy' }, ['Buy Full Bootcamp ($999)']));
  } else {
    rec.innerHTML = `Recommendation: <strong>Execute</strong> (BCI ≥ ${THRESHOLD}/50)`;
    ctas.appendChild(el('a', { class: 'btn primary', href: 'https://agentoperator.academy/generator/' }, ['Open Generator']));
    ctas.appendChild(el('a', { class: 'btn', href: 'https://agentoperator.academy/training/' }, ['Open Training']));
  }

  if (window.AO && AO.track) AO.track('bci_score_submitted', { total });

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
