---
name: error-handling-pattern
description: 統一錯誤發生時的回傳格式與處理邏輯（Shared Layer）
---

# error-handling-pattern

## Goal
避免各 Agent 或頁面自創隨意的「錯誤字串彈窗」，訂立一致的錯誤回報格式。

## Responsibilities
* 提供共用的 Error Payload Interface（如: `code`, `message`, `details`）。
* 制訂發生特定的 HTTP Error Status 或是 Business Logic Error 時，系統應出現的標準例外處理流程。
