# Module 7 — Delivery

## Goal
Deliver the promised outcome reliably with SOPs, quality control, and support.

## Framework: DELIVER-7
1) Onboarding (inputs required + timeline)
2) Service blueprint (steps, owners, artifacts)
3) SOPs (repeatable procedures)
4) QA gates (definition of done)
5) Communication cadence (updates, escalations)
6) Support model (SLA, triage)
7) Retention loop (value reports, renewals)

## Checklist
- [ ] Onboarding checklist exists (what must be provided)
- [ ] Definition of Done is explicit
- [ ] Escalation path defined (human approval gates)
- [ ] Support triage rules exist

## Exercise (30 min)
Write a service blueprint + onboarding checklist for your core offer.

## Templates
Create `service_blueprint.json`, `onboarding_checklist.md`, `definition_of_done.md`.

### Output JSON template — `service_blueprint.json`
```json
{
  "service_blueprint": {
    "offer_ref": "",
    "onboarding": {
      "inputs_required": [""],
      "timebox_days": 7
    },
    "delivery_steps": [
      {"step": "", "owner": "agent|human|system", "artifact": "", "qa_gate": ""}
    ],
    "communication": {
      "cadence": "weekly|twice_weekly",
      "channels": [""],
      "escalation_rules": ["" ]
    },
    "support": {
      "sla": "",
      "triage_levels": [
        {"level": "P0", "definition": "", "response_time": ""}
      ]
    }
  }
}
```
