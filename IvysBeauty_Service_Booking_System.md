# **💄 Beauty Service Booking System \- Full-Stack Blueprint**

## **1\. 品牌視覺與調性 (Visual Identity)**

AI 在實作前端 UI 時，請嚴格遵守以下由 Design System 定義的規範：

### **視覺風格**

* 溫暖生活感（奶茶色系）、自然光感

### **品牌印象**

* Natural  
* Professional  
* Friendly

### **色彩系統 (Color System - HSL Tokens)**

*   **Background**: `hsl(40 47% 97%)` (#FBF9F4)
*   **Surface / Card**: `hsl(35 47% 92%)` (#F6EEE1)
*   **Primary / Accent (CTA)**: `hsl(22 55% 38%)` (暖焦糖色，高對比)
*   **Border / Input**: `hsl(36 16% 82%)` (#DAD5CA)
*   **Muted Foreground**: `hsl(0 0% 24%)` (深灰褐色)

### **UI 規範**

*   **字體**：
    *   標題 (Headings)：`Cormorant Garamond` (襯線體，優雅感)
    *   內文 (Body)：`Inter` (無襯線體，易讀性)
*   **形狀**：極致圓潤 (`border-radius: 5rem` / `rounded-full`)。
*   **佈局**：高留白 (High whitespace)、乾淨簡約。
*   **Admin 規範**：
    *   彈窗 (Modals) 需相對 `<main>` 內容區置中（扣除 80px Header 與 256px Sidebar 空間）。
    *   彈窗最大高度限制為 `max-h-[75vh]`。

---

## **2\. 資料庫模型 (Prisma Schema)**

```prisma
// 1. 全域店家資訊 (Store Info)
model StoreInfo {
  id          String   @id @default("global")
  phone       String?  // 主要聯絡手機
  line        String?  // Line 連結或 ID
  instagram   String?  // Instagram 連結
  facebook    String?  // Facebook 連結
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now()) @updatedAt
}

// 2. 店家與地點資訊 (Locations)
model Location {  
  id             String      @id @default(cuid())  
  name           String  
  address        String  
  imageUrls      String[]    @default([]) // 店內照片(多張)
  isPublished    Boolean     @default(true) // 是否上架/發佈
  openingHours   Json?       // 營業時間 JSON
  vacationDays   DateTime[]  // 休假日
  bookings       Booking[]  
  services       Service[]  
  portfolios     Portfolio[]  
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @default(now()) @updatedAt
}

// 3. 服務項目  
model Service {  
  id          String      @id @default(cuid())  
  name        String  
  price       Int  
  duration    Int         // 服務耗時 (分鐘)
  isPublished Boolean     @default(true) // 上架
  locations   Location[]  
  bookings    Booking[]  
  portfolios  Portfolio[]  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @default(now()) @updatedAt
}

// 4. 會員與使用者  
model User {  
  id            String    @id @default(cuid())  
  name          String?  
  email         String?   @unique  
  passwordHash  String?
  phone         String?  
  birthday      String?  
  role          Role      @default(MEMBER)  
  bookings      Booking[]  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @default(now()) @updatedAt
}

enum Role {  
  OWNER  
  MEMBER  
}

// 5. 預約紀錄  
model Booking {  
  id             String        @id @default(cuid())  
  status         BookingStatus @default(PENDING)  
  startTime      DateTime  
  endTime        DateTime  
  expiredAt      DateTime      // 輔助欄位：PENDING 狀態的付款期限
  locationId     String  
  location       Location      @relation(fields: [locationId], references: [id])  
  serviceId      String  
  service        Service       @relation(fields: [serviceId], references: [id])  
  customerId     String  
  customer       User          @relation(fields: [customerId], references: [id])  
  paymentProof   String?       // 上傳的轉帳證明
  notes          String?  
  createdAt      DateTime      @default(now())  
  updatedAt      DateTime      @default(now()) @updatedAt
}

enum BookingStatus {  
  PENDING
  CONFIRMED
  CANCELLED
  DONE
  MISSED
}

// 6. 作品集 (多維度篩選)  
model Portfolio {  
  id          String    @id @default(cuid())  
  title       String    @default("未命名作品")
  imageUrls   String[]  @default([]) // 多圖支持
  description String?
  tags        String[]  @default([])
  gender      Gender    @default(FEMALE)
  locationId  String?  
  location    Location? @relation(fields: [locationId], references: [id])
  serviceId   String?  
  service     Service?  @relation(fields: [serviceId], references: [id])
  createdAt   DateTime  @default(now())  
  updatedAt   DateTime  @default(now()) @updatedAt
}

enum Gender {  
  MALE  
  FEMALE  
  UNISEX  
}
```
---

## **3\. 功能需求與實作流程 (Requirements & Logic)**

### **🟢 客戶端 (Member Side)**

#### **1\. 首頁作品牆**

* 篩選條件：  
  * 時間（Time）  
  * 地點（Location）  
  * 項目（Service）  
  * 性別（Gender）  
* UI 需保持簡潔與高留白

#### **2\. 智慧預約流程（優先）**

* Step 1：選地點  
* Step 2：選服務（依地點）  
* Step 3：選時間  
  * API 必須排除：  
    * `CONFIRMED`  
    * 未過期 `PENDING`  
  * 並確保時間長度符合服務需求

#### **3\. 預約確認**

* 顯示匯款資訊  
* 上傳 `paymentProof`

---

### **🟣 商家端 (Owner Side)**

#### **1\. 儀表板**

* 可依地點查看今日預約

#### **2\. 審核機制**

* 手動將 `PENDING → CONFIRMED`

#### **3\. 作品上傳**

* 使用 Cloudinary Widget  
* 手動標記：  
  * 地點  
  * 項目  
  * 性別

---

### **🤖 自動化 (Automation)**

#### **定時任務**

* 每 10 分鐘：  
  * 釋出逾期未付款的 `PENDING`

#### **行銷提醒**

* 根據服務週期（例：霧眉 3 個月）  
* 推薦回訪名單  
* 串接 LINE Messaging API

---

## **4\. AI 開發執行令 (Prompt Guidance)**

請依據此 Blueprint 實作 Next.js 14 全端應用。

1\. UI 實作需遵循奶茶色系 (\#FBF9F4, \#F6EEE1, \#DAD5CA)、圓潤邊框與高留白設計。  
2\. 後端 API available-slots 需根據 locationId、serviceId 與 BookingStatus 進行精確的時間重疊檢查。  
3\. Portfolio 功能需實作多維度篩選 (Joint Query with Location and Service)。

