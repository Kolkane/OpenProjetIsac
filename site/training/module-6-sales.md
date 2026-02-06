# Module 6 — Sales

## Goal
Convert interested prospects into paying customers with a repeatable pipeline.

## Framework: SALES-6
1) Qualification (who is a “yes”?)
2) Pipeline stages (clear entry/exit)
3) Discovery script (questions + notes)
4) Proposal format (scope, timeline, price, risk)
5) Objection handling (pre-written)
6) Close + next steps (contract, invoice, kickoff)

## Checklist
- [ ] Definition of a qualified lead exists
- [ ] Each pipeline stage has an owner + metric
- [ ] Proposal includes explicit exclusions
- [ ] Approval gates for discounts + custom work

## Exercise (25 min)
Write a discovery script and a 1-page proposal template.

## Templates
Create `sales_pipeline.json`, `discovery_script.md`, `proposal_template.md`.

### Output JSON template — `sales_pipeline.json`
```json
{
  "sales_pipeline": {
    "currency": "EUR",
    "stages": [
      {"name": "lead", "entry": "new contact", "exit": "qualified", "metric": "leads"},
      {"name": "qualified", "entry": "meets ICP+trigger", "exit": "discovery_done", "metric": "qualified_leads"},
      {"name": "proposal", "entry": "discovery done", "exit": "accepted_or_lost", "metric": "proposals_sent"},
      {"name": "won", "entry": "payment received", "exit": "onboarded", "metric": "new_customers"}
    ],
    "qualification": {
      "must_have": [""],
      "disqualifiers": [""],
      "budget_floor": 0
    },
    "pricing_rules": {
      "discount_requires_approval": true,
      "max_discount_percent": 0
    }
  }
}
```
