---
name: date-time-engine
description: 提供系統層級的時間、時區、區間計算的核心函式庫（Shared Layer）
---

# date-time-engine

## Goal
為保障資料一致性，成為前端 (Frontend) 與後端 (Backend) 計算時區與轉換時間的共同依據。

## Responsibilities
* UTC 與 Local 時間的儲存與展示轉換（Date Formatting / Timezone）。
* `slot calculation` (時間段產生)。
* 日期比對與計算 (duration manipulation)。

## 原則
* 強烈建議依靠一套共用系統（如 `date-fns` 或 `dayjs`），並全面統一代碼寫法。
* 嚴禁專案的不同角落使用各自宣告的時間解析函式。
