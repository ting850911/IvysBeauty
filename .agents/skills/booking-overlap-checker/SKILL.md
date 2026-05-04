---
name: booking-overlap-checker
description: 在後端核心中實作預約時間重疊、狀態處理的防線（由 Backend Logic Agent 使用）
---

# booking-overlap-checker

## Goal
在 Backend 實作所有有關預約衝突的「不可錯邏輯」，防堵重疊與 Race condition。

## 必須處理的情境
1. 時間區間重疊 (Overlapping reservations)
2. 處理不同長度的 duration
3. 處理卡位的 Pending blocking 狀態（包含判斷是否逾期）

## 邏輯核心參考
這是一個非常重要的核心判斷式，後端任何檢查都需遵從此原理：
```ts
function isOverlapping(a, b) {
  return a.start < b.end && b.start < a.end;
}
```

## Handoff Rules
* 必須實作出嚴格的 API，提供給 Frontend 流暢串接。
* 此技能絕對不處理 UI 與 Layout。
