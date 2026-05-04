---
name: edge-case-generator
description: 產生極端案例與迴歸測試檢查表（由 QA Validation Agent 使用）
---

# edge-case-generator

## Goal
作為系統防線，從最嚴苛的角度撰寫各種可能讓「預約系統崩潰」的場景清單與檢查表。

## 必測的 Edge Cases 指南
在產出 test matrix 或腳本時，必須涵蓋並驗證以下重點：

1. **Overlapping Booking**: 時間的完全重疊、頭尾相連等邊界情境。
2. **Expired Pending**: 過期未結帳 / 未確認的阻塞必須能順利放行。
3. **Double Booking Race Condition**: 兩人同時對同一時段發出 request 的並行寫入狀態。
4. **Invalid Duration**: 防禦惡意的服務時間（包含 0 分鐘或極大的時間區段）。

## 原則
只負責找出問題、回報 Bug Report 給 Product Orchestrator，不負責修改程式碼。
