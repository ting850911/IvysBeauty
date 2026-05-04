---
name: task-planner
description: 解析 Blueprint 並拆解可執行的任務（由 Product Orchestrator Agent 使用）
---

# task-planner

## Goal
將給定的 blueprint 和需求徹底解析，轉為具體的、有負責人且有驗收標準的 JSON 格式清單。

## Responsibilities
* 分析系統架構與相依性。
* 產出每個任務的 Business Rules 和 Acceptance Criteria。

## Output Format Example
```json
{
  "task": "implement_available_slots",
  "owner": "Backend Logic Agent",
  "rules": [
    "exclude CONFIRMED bookings",
    "exclude non-expired PENDING bookings",
    "respect service duration"
  ],
  "acceptance": [
    "no overlapping slots",
    "correct slot length"
  ]
}
```

## Rules
- 必須始終定義清晰的邊界，指派給特定的 Agent (Frontend Flow, Backend Logic, UI Design, QA)。
- 不可派發跨足兩個 Agent 管轄範圍的單一模糊任務。
