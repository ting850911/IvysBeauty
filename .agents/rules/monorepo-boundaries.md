# Monorepo 邊界規範 (Monorepo Boundaries Rules)

工作區採用 pnpm monorepo 架構建立，這套架構是對 Agent 分工的「物理強制力」。

## 📂 資料夾所有權 (Ownership)

* `apps/web/`：專屬 **Frontend Flow Agent**。
* `packages/ui/`：專屬 **UI Design System Agent**。
* `packages/core-logic/` 與 `packages/database/`：專屬 **Backend Logic Agent**。
* `packages/qa/`：專屬 **QA Validation Agent**。
* `packages/shared/`：**共用層 (Shared Layer)**，變更需謹慎，須確保前後端不會因變更而崩潰。
* `specs/`：專屬 **Product Orchestrator Agent**。

## ⛓️ 依賴安全限制 (Import Restrictions)
1. Frontend (`web`) **只能**引入 `ui` 與 `shared`。
2. Backend (`core-logic`) **只能**引入 `database` 與 `shared`。
3. **絕對禁止跨界存取**：例如前端檔案中出現 `import { ... } from '@ivysbeauty/database'`。
