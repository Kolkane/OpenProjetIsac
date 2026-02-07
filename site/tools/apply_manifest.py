#!/usr/bin/env python3
"""Apply an operator_pack_manifest.json to the Operator Pack template.

Goal: make /generator V2 work without a backend and without JS zip dependencies.

Usage:
  python3 apply_manifest.py operator_pack_manifest.json ./operator_pack_out

It will create files and prefill some fields. Then you can zip the folder.

No external dependencies.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

TEMPLATE_FILES = [
    'bci_pre.json','risk_mode.json','upgrade_decision.json','mission_brief.md','constraints.json',
    'icp_card.md','market_assumptions.json','offer_onepager.md','positioning.json','unit_econ.md','pricing_floor.json',
    'acq_plan_30d.md','sales_process.md','delivery_sop.md','weekly_ops.md','bci_post.json','delta_report.md'
]


def main():
    if len(sys.argv) != 3:
        print('Usage: python3 apply_manifest.py operator_pack_manifest.json ./operator_pack_out')
        return 2

    manifest_path = Path(sys.argv[1]).expanduser().resolve()
    out_dir = Path(sys.argv[2]).expanduser().resolve()

    if not manifest_path.exists():
        print(f'ERROR: manifest not found: {manifest_path}')
        return 2

    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    inputs = manifest.get('inputs', {})

    out_dir.mkdir(parents=True, exist_ok=True)

    # Prefill markdown files with minimal headers
    prefill = {
        'mission_brief.md': f"# Mission Brief\n\nObjective: {inputs.get('objective','')}\n\nTarget customer: {inputs.get('target_customer','')}\n\nOffer: {inputs.get('offer','')}\n\nPrimary channel: {inputs.get('primary_channel','')}\n",
        'icp_card.md': f"# ICP Card\n\nTarget customer (1 sentence): {inputs.get('target_customer','')}\n",
        'offer_onepager.md': f"# Offer One-pager\n\nOffer (1 line): {inputs.get('offer','')}\n",
        'acq_plan_30d.md': f"# Acquisition Plan (30 days)\n\nPrimary channel: {inputs.get('primary_channel','')}\n\nBudget cap (USD): {inputs.get('budget_cap_usd','')}\n",
        'weekly_ops.md': "# Weekly Ops\n\n- KPIs:\n- Cadence:\n- Stop conditions:\n",
        'sales_process.md': "# Sales Process\n\nStages:\n- Lead\n- Contacted\n- Qualified\n- Call booked\n- Proposal\n- Closed\n\nNext action rules:\n",
        'delivery_sop.md': "# Delivery SOP\n\nOnboarding steps:\n-\n\nQuality checklist:\n-\n",
        'delta_report.md': "# Delta Report\n\nBCI pre: \nBCI post: \n\nWhat changed:\n-\n\nNext actions (7d):\n-\n",
    }

    for f in TEMPLATE_FILES:
        p = out_dir / f
        if f.endswith('.json'):
            if not p.exists():
                p.write_text('{\n}\n', encoding='utf-8')
        else:
            p.write_text(prefill.get(f, f"# {f}\n"), encoding='utf-8')

    # Also store manifest copy
    (out_dir / 'operator_pack_manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')

    print(f'OK: wrote operator pack to {out_dir}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
