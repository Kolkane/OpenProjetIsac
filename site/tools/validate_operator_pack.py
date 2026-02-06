#!/usr/bin/env python3
"""Offline validator for Agent Business Operator outputs.

Usage:
  python3 validate_operator_pack.py /path/to/operator_pack

Exit codes:
  0 = OK
  2 = missing required files
  3 = invalid JSON / missing required keys

This is intentionally lightweight and dependency-free.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

REQUIRED_FILES = [
    "bci_pre.json",
    "risk_mode.json",
    "upgrade_decision.json",
    "mission_brief.md",
    "constraints.json",
    "icp_card.md",
    "market_assumptions.json",
    "offer_onepager.md",
    "positioning.json",
    "unit_econ.md",
    "pricing_floor.json",
    "acq_plan_30d.md",
    "sales_process.md",
    "delivery_sop.md",
    "weekly_ops.md",
    "bci_post.json",
    "delta_report.md",
]

JSON_KEY_RULES = {
    "bci_pre.json": [("bci",), ("bci", "total"), ("bci", "dimensions")],
    "risk_mode.json": [("risk_of_harm",), ("risk_of_harm", "enabled")],
    "upgrade_decision.json": [("upgrade",), ("upgrade", "decision")],
    "constraints.json": [],
    "market_assumptions.json": [],
    "positioning.json": [],
    "pricing_floor.json": [],
    "bci_post.json": [("bci",), ("bci", "total")],
}


def has_path(obj, path):
    cur = obj
    for key in path:
        if not isinstance(cur, dict) or key not in cur:
            return False
        cur = cur[key]
    return True


def main():
    if len(sys.argv) != 2:
        print("Usage: python3 validate_operator_pack.py /path/to/operator_pack")
        return 2

    base = Path(sys.argv[1]).expanduser().resolve()
    if not base.exists():
        print(f"ERROR: folder not found: {base}")
        return 2

    missing = [f for f in REQUIRED_FILES if not (base / f).exists()]
    if missing:
        print("MISSING FILES:")
        for f in missing:
            print(f"- {f}")
        return 2

    for filename, rules in JSON_KEY_RULES.items():
        p = base / filename
        try:
            obj = json.loads(p.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"INVALID JSON: {filename}: {e}")
            return 3
        for rule in rules:
            if not has_path(obj, rule):
                print(f"MISSING KEY PATH in {filename}: {'.'.join(rule)}")
                return 3

    print("OK: operator pack passes basic checks")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
