# 系統交接合約 (Handoff Contracts)

這是一份強制執行的協作指引，所有 Agent 必須嚴格遵守。

## 1. Product Orchestrator → 其他 Agents
* **任務格式約束**：所有的任務派發必須提供明確的 Task Spec（JSON 格式），包含 `task`, `owner`, `rules`, `acceptance` criteria。
* **絕對服從**：開發的 Agent 必須依據該 Spec 實作，不可自行更改 Business Rule。

## 2. Backend Logic Agent ↔ Frontend Flow Agent
* **API 是唯一橋樑**：前後端的互動必須依賴 `packages/shared` 定義好的 API Contract。
* **Backend 責任**：API Contract 必須詳盡且精確，不可負責 UI / Layout 開發。
* **Frontend 責任**：不允許修改 API response structure 客製化給前端，必須去處理 Backend 給予的正確資料結構。禁止自創 Business Logic。

## 3. UI Design System Agent → Frontend Flow Agent
* **Token 的權威性**：UI Agent 負責產出 Design Tokens 與元件。
* **Frontend 的禁令**：Frontend 必須使用 UI Agent 提供好的 Component（如 `<Button>`, `<Card>`）來組裝。**嚴禁使用 inline style (e.g., `style={{color: "xxx"}}`) 自幹樣式。**

## 4. QA Validation Agent → Product Orchestrator
* **測試回報機制**：QA 負責驗證系統的極端案例，發現 Bug 時只能回報給 Orchestrator 或記錄 Bug Report。
* **不動手原則**：QA Agent 絕對不可碰代碼或試圖修復 Bug。
