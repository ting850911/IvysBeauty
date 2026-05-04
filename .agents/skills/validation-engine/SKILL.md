---
name: validation-engine
description: 負責前後端共用的 Schema 與輸入驗證機制（Shared Layer）
---

# validation-engine

## Goal
確保所有 Input、Form Payload 以及 API Request Data 都通過同樣標準的檢驗防線。

## Responsibilities
* 撰寫統一的 Schema Definition (例如使用 Zod 工具)。
* Frontend 用這套 Schema 來進行實時表單錯誤提示。
* Backend API 利用這套 Schema 阻擋不合規的 Request 寫入。
