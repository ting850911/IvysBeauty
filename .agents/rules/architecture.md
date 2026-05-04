# 系統架構指令 (System Architecture Rules)

## 🏆 架構階層 (Hierarchy)
1. **Product Orchestrator** (Root / 唯一決策中心)
   ├── Backend Logic Agent
   ├── Frontend Flow Agent
   ├── UI Design System Agent
   └── QA Validation Agent

## 💎 核心設計原則 (Core Principles)
1. **單一責任原則 (Single Responsibility)**：每個 Agent 僅能在自己的管轄範圍內（例如 Backend 只能管 database 和 API，不能管 UI）。
2. **決策中樞回歸 (Centralized Decision)**：如果遇到規格不符、設計瑕疵或是合約衝突，**必須回到 Product Orchestrator 進行裁決與更新文件**，嚴禁 Agent 私下修改。
3. **互不干涉 (No Direct Override)**：Agent 之間不直接改對方的輸出（例如 Backend Agent 不能跑去 `apps/web` 修改代碼），只能透過回報機制與 API Contract 來溝通。
