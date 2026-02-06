# Module 5 — Acquisition (30-day test plan)

## Goal
Design a 30-day acquisition plan with small, measurable experiments.

## Framework: ACQ-5
1) Channel shortlist (3 max)
2) Message angles (3 max)
3) Offer hook (what you ask for first)
4) Experiment design (hypothesis → test → metric)
5) Learning loop (weekly review + decision)

## Checklist
- [ ] ≤ 3 channels selected
- [ ] Each experiment has a pass/fail metric
- [ ] One experiment can run without new assets
- [ ] Stop conditions defined (time, spend, reputational risk)

## Exercise (30 min)
Plan 6 experiments (2 per channel) with a weekly review cadence.

## Templates
Create `acquisition_plan.json` and `experiment_log.md`.

### Output JSON template — `acquisition_plan.json`
```json
{
  "acquisition_plan": {
    "timebox_days": 30,
    "icp_ref": "",
    "channels": [
      {
        "name": "",
        "why": "",
        "constraints": "",
        "experiments": [
          {
            "id": "E1",
            "hypothesis": "",
            "action": "",
            "metric": "",
            "pass_fail": "",
            "budget": 0,
            "risk_of_harm": {
              "enabled": true,
              "notes": "",
              "approval_required": false
            },
            "timebox_days": 7
          }
        ]
      }
    ],
    "weekly_review": {
      "cadence": "weekly",
      "questions": [
        "What worked?",
        "What failed and why?",
        "What will we change next week?"
      ],
      "decision_rules": [
        "Double down on experiments that pass",
        "Kill experiments that fail twice",
        "Escalate if reputational/legal risk appears"
      ]
    }
  }
}
```
