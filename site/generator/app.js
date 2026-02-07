// Operator Pack Generator (V1 offline)
// - Collect minimal fields
// - Output operator_pack_manifest.json (download)
// - Provide template pack download link (static)

const $ = (id) => document.getElementById(id);

function getParam(name) {
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function buildManifest() {
  const obj = {
    kind: 'operator_pack_manifest',
    version: '0.1.0',
    generated_at: new Date().toISOString(),
    inputs: {
      business_name: $('business_name').value.trim(),
      objective: $('objective').value.trim(),
      target_customer: $('target_customer').value.trim(),
      offer: $('offer').value.trim(),
      primary_channel: $('primary_channel').value.trim(),
      budget_cap_usd: Number($('budget_cap_usd').value || 0),
    },
    outputs_expected: [
      'bci_pre.json','risk_mode.json','upgrade_decision.json','mission_brief.md','constraints.json',
      'icp_card.md','market_assumptions.json','offer_onepager.md','positioning.json','unit_econ.md','pricing_floor.json',
      'acq_plan_30d.md','sales_process.md','delivery_sop.md','weekly_ops.md','bci_post.json','delta_report.md'
    ],
    next_actions: [
      'Download the Operator Pack template zip',
      'Fill the files while completing /training/',
      'Run the validator script locally (python3 validate_operator_pack.py ./operator_pack)'
    ],
    links: {
      training: 'https://agentoperator.academy/training/',
      validator: 'https://agentoperator.academy/downloads/validator.zip',
      template_zip: 'https://agentoperator.academy/downloads/operator-pack-template.zip'
    }
  };
  return obj;
}

function download(filename, text, type) {
  const blob = new Blob([text], { type: type || 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function updatePreview() {
  const m = buildManifest();
  $('preview').textContent = JSON.stringify(m, null, 2);
}

document.addEventListener('DOMContentLoaded', () => {
  // Prefill from query params (BCI → Generator flow)
  const prefill = {
    objective: getParam('objective') || '',
    target_customer: getParam('target_customer') || '',
    offer: getParam('offer') || '',
    primary_channel: getParam('primary_channel') || '',
  };
  for (const [k,v] of Object.entries(prefill)) {
    const el = document.getElementById(k);
    if (el && v) el.value = v;
  }

  ['business_name','objective','target_customer','offer','primary_channel','budget_cap_usd'].forEach(id => {
    $(id).addEventListener('input', updatePreview);
  });

  $('download_manifest').addEventListener('click', () => {
    const m = buildManifest();
    if (window.AO && AO.track) AO.track('generator_download_manifest', { has_offer: !!m.inputs.offer });
    download('operator_pack_manifest.json', JSON.stringify(m, null, 2));
  });

  updatePreview();
});
