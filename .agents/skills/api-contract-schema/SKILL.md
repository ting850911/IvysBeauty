---
name: api-contract-schema
description: 定義前後端對接的嚴格請求與回應格式合約（Shared Layer）
---

# api-contract-schema

## Goal
維護系統唯一的 API 交換標準文件 / 定義檔，這是 Frontend Agent 與 Backend Agent 合作的溝通橋樑。

## 原則
* 它是 Request Types 與 Response Types 的事實來源。
* 當資料結構需要改動時，一律由這裡先行變更，其餘 Agent 再進行適配。
* 必須對每個 endpoint 的 Payload 進行嚴謹定義。
