# Module 8 — Pilotage (KPIs + cadence)

## Goal
Operate the business with a weekly cadence, KPI dashboard, and risk control.

## Framework: PILOT-6
1) North Star metric (one)
2) Input metrics (leading indicators)
3) Output metrics (lagging indicators)
4) Cadence (daily/weekly/monthly)
5) Decision rules (when to change plan)
6) Risk register (stop conditions, approvals)

## Checklist
- [ ] One North Star metric chosen
- [ ] 3–7 input metrics defined (actionable)
- [ ] Weekly review agenda exists
- [ ] Risk register includes irreversible actions and approval gates

## Exercise (25 min)
Create a 1-page dashboard and a weekly operating cadence.

## Templates
Create `ops_dashboard.json`, `cadence.md`, `risk_register.json`.

### Output JSON template — `ops_dashboard.json`
```json
{
  "ops_dashboard": {
    "north_star": {"name": "", "definition": "", "target": ""},
    "inputs": [
      {"name": "", "definition": "", "target": ""}
    ],
    "outputs": [
      {"name": "", "definition": "", "target": ""}
    ],
    "cadence": {
      "daily": [""],
      "weekly": [""],
      "monthly": ["" ]
    }
  }
}
```

### Output JSON template — `risk_register.json`
```json
{
  "risk_register": {
    "items": [
      {
        "risk": "",
        "category": "legal|financial|security|reputation|delivery",
        "severity": "low|med|high",
        "likelihood": "low|med|high",
        "mitigation": "",
        "stop_condition": "",
        "approval_required": true
      }
    ]
  }
}
```
