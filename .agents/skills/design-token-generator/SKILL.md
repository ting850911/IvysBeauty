---
name: design-token-generator
description: 維護核心設計系統的顏色、間距、圓角等 Tokens（由 UI Design System Agent 使用）
---

# design-token-generator

## Goal
負責提供所有 Frontend Components 會用到的統一設計變數 (Design Tokens)，確保產品外觀具備奶茶色般的質感與一致的精緻度。

## 🎯 品牌核心 Design Tokens 規範
請將下列數值映射至 Tailwind CSS 或 Vanilla CSS 系統中：

```ts
const colors = {
  background: "#FBF9F4",  // 主背景底色
  surface: "#F6EEE1",     // 面板/卡片顏色
  border: "#DAD5CA"       // 邊框或分隔線
};

const radius = "rounded-xl";
const spacing = "high whitespace"; // 留白需大方
```

## Handoff Rules
* 禁止在元件內使用隨機色碼！必須使用這些 Token 生成的 Class (e.g. `bg-surface`, `border-border`)。
* Frontend 開發人員只能引用此系統產出的成品，不可自行定義覆蓋。
