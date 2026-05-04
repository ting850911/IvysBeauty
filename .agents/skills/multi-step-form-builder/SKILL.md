---
name: multi-step-form-builder
description: 建立動態更新且依賴狀態的前端多步驟預約表單（由 Frontend Flow Agent 使用）
---

# multi-step-form-builder

## Goal
將系統邏輯轉為「可用且滑順的 User Flow」，建構一個漸進式 (stepper) 預約表單。

## Flow Spec 規定
* **Step 1** → 選擇分店 / 地點 (location)
* **Step 2** → 選擇服務 (service)
* **Step 3** → 選擇時間 (time)
* **Final Step** → 確認並上傳檔案 (confirm + upload)

## 實作重點
1. **強烈的狀態依賴**：每一步的 API 呼叫與可用資料，都必須依賴前一步的選擇（例如選了特定 service 才能給予對應的時段）。
2. **非同步狀態處理**：在呼叫 API 時要有良好的 loading states。
3. **不能自創邏輯**：必須完全遵從 Backend 定義好的 API response structure。
