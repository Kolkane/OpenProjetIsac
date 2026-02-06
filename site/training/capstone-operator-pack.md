# Capstone — Operator Pack + final BCI

## Goal
Assemble an executable “Operator Pack” and verify readiness (BCI post-test).

## Capstone artifacts (Operator Pack)
Create a folder `operator-pack/` containing:
- `mission_brief.md`
- `constraints.json`
- `bci_pre.json` + `bci_post.json`
- `risk_mode.json`
- `icp.json`
- `market_hypotheses.json`
- `competitor_scan.json`
- `offer.json` + `positioning.md` + `scope.md`
- `unit_econ.json`
- `acquisition_plan.json` + `experiment_log.md`
- `sales_pipeline.json` + `discovery_script.md` + `proposal_template.md`
- `service_blueprint.json` + `onboarding_checklist.md` + `definition_of_done.md`
- `ops_dashboard.json` + `cadence.md` + `risk_register.json`
- `pack_manifest.json`

## Checklist (definition of done)
- [ ] All artifacts exist and are internally consistent (refs match)
- [ ] Every plan has a metric + timebox
- [ ] Irreversible actions have approval gates
- [ ] First 7-day plan is executable with current tools
- [ ] `bci_post.total >= 36`

## Short exercise (30–45 min)
1) Run a “dry run” week: simulate day-by-day tasks using your cadence.
2) Fill in dashboards with fake numbers.
3) Identify missing inputs from the human and list them as requests.

## Output JSON template — `pack_manifest.json`
```json
{
  "operator_pack": {
    "version": "v1",
    "created_at": "",
    "icp_ref": "",
    "offer_ref": "",
    "files": [
      {"path": "operator-pack/mission_brief.md", "type": "markdown"},
      {"path": "operator-pack/constraints.json", "type": "json"}
    ],
    "execution_plan": {
      "first_week_priorities": [""],
      "approval_gates": [""],
      "open_questions_for_human": ["" ]
    }
  }
}
```

## Output JSON template — `bci_post.json`
```json
{
  "bci": {
    "total": 0,
    "max": 50,
    "threshold": 36,
    "dimensions": [
      {"name": "mission_framing", "score": 0, "notes": ""},
      {"name": "icp_market", "score": 0, "notes": ""},
      {"name": "offer_positioning", "score": 0, "notes": ""},
      {"name": "pricing", "score": 0, "notes": ""},
      {"name": "unit_economics", "score": 0, "notes": ""},
      {"name": "acquisition", "score": 0, "notes": ""},
      {"name": "sales", "score": 0, "notes": ""},
      {"name": "delivery", "score": 0, "notes": ""},
      {"name": "pilotage", "score": 0, "notes": ""},
      {"name": "governance_risk", "score": 0, "notes": ""}
    ]
  }
}
```
