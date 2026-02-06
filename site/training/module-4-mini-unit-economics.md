# Module 4 — Mini unit economics

## Goal
Ensure the offer can be profitable and scalable under realistic constraints.

## Framework: ECON-6
1) Price (what you charge)
2) Variable costs (COGS: labor, tools, infra)
3) Gross margin (price − COGS)
4) Acquisition cost (CAC) assumption
5) Payback period (CAC / gross margin per period)
6) Capacity constraint (bottleneck) + scaling plan

## Checklist
- [ ] Price and COGS in the same unit (per month / per project)
- [ ] Gross margin % computed
- [ ] One conservative CAC scenario included
- [ ] Bottleneck identified (sales time, onboarding time, compute, support)

## Exercise (20 min)
Compute unit economics for 3 pricing options and pick the safest.

## Templates
Create `unit_econ.json`.

### Output JSON template — `unit_econ.json`
```json
{
  "unit_economics": {
    "currency": "EUR",
    "unit": "per_customer_per_month|per_project",
    "pricing": {
      "price": 0,
      "pricing_model": "subscription|one_off|hybrid",
      "notes": ""
    },
    "cogs": {
      "labor_hours": 0,
      "labor_cost": 0,
      "tools_cost": 0,
      "infra_cost": 0,
      "other_cost": 0
    },
    "gross_margin": {
      "absolute": 0,
      "percent": 0
    },
    "cac": {
      "assumption": 0,
      "method": "paid|outbound|partners|content|unknown",
      "notes": ""
    },
    "payback": {
      "periods": 0,
      "notes": ""
    },
    "capacity": {
      "bottleneck": "",
      "max_units_per_period": 0,
      "scaling_levers": ["" ]
    }
  }
}
```
