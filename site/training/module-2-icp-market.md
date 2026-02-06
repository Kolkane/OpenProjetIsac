# Module 2 — ICP & market

## Goal
Pick a winnable segment (ICP) and define testable market hypotheses.

## Framework: ICP-7
1) Segment definition (industry, size, geography)
2) Role (buyer + user)
3) Trigger event (why now)
4) Top 3 pains (ranked, with cost of inaction)
5) Current alternatives (status quo + competitors)
6) Buying constraints (budget, security, legal)
7) Success criteria (what “good” looks like)

## Checklist
- [ ] ICP is narrow enough to name 20 real prospects
- [ ] Trigger event is explicit and time-bound
- [ ] Pain has a measurable cost (time, money, risk)
- [ ] At least 3 alternatives listed (incl. “do nothing”)
- [ ] One primary metric defined (the KPI the buyer cares about)

## Exercise (20 min)
Write 3 ICP candidates, score them, pick 1.

## Templates
Create `icp.json`, `market_hypotheses.json`, `competitor_scan.json`.

### Output JSON template — `icp.json`
```json
{
  "icp": {
    "segment": {
      "industry": "",
      "company_size": "",
      "geography": "",
      "tech_stack": "",
      "notes": ""
    },
    "roles": {
      "economic_buyer": "",
      "champion": "",
      "end_user": ""
    },
    "trigger_events": [""],
    "pains": [
      {"pain": "", "rank": 1, "cost_of_inaction": ""},
      {"pain": "", "rank": 2, "cost_of_inaction": ""},
      {"pain": "", "rank": 3, "cost_of_inaction": ""}
    ],
    "alternatives": {
      "status_quo": "",
      "competitors": [""],
      "internal_build": ""
    },
    "constraints": {
      "budget_range": "",
      "security": "",
      "legal": "",
      "procurement": ""
    },
    "success_criteria": {
      "primary_kpi": "",
      "secondary_kpis": [""],
      "time_to_value_days": 0
    }
  }
}
```

### Output JSON template — `market_hypotheses.json`
```json
{
  "market_hypotheses": [
    {
      "id": "H1",
      "claim": "",
      "evidence_needed": "",
      "test": "",
      "pass_fail_metric": "",
      "timebox_days": 7
    }
  ]
}
```

### Output JSON template — `competitor_scan.json`
```json
{
  "competitor_scan": {
    "direct": [
      {"name": "", "positioning": "", "pricing": "", "notes": ""}
    ],
    "indirect": [
      {"name": "", "category": "", "notes": ""}
    ],
    "status_quo": {"description": "", "why_it_persists": ""}
  }
}
```
