# 預約流程時間區段邏輯實作需求

## 目標

讓使用者只能選到真正可預約的日期與時間。所有不可選項目都要 disabled，並在 UI 上反灰顯示。

時間處理必須避免受到 server region、開發者所在地、資料庫所在地影響。

## 核心時間策略

採用：

```text
UTC instant + IANA timeZoneId
```

原則：

- 實際發生的時間點存 UTC+0。
- 營業時間、休假日、排班規則以店家所在地 local wall time 表示。
- 每個 location 必須有 `timeZoneId`。
- 台灣店預設 `Asia/Taipei`。
- AWS region 可放 `us-east-2`，開發者人在 Toronto，也不應影響預約邏輯。
- 不可依賴 server local timezone。

禁止在業務邏輯中使用未指定時區的 local formatting，例如：

```ts
date.toLocaleString()
new Date().getHours()
```

格式化或轉換時必須明確帶入 `timeZoneId`。

## 資料庫設計建議

### Location

每個地點應保存自己的時區：

```prisma
model Location {
  id         String @id @default(cuid())
  name       String
  timeZoneId String @default("Asia/Taipei")
}
```

### Booking

Booking 應同時保存 UTC instant 與成立當下的 local time snapshot：

```prisma
model Booking {
  id             String   @id @default(cuid())
  startTime      DateTime // UTC instant
  endTime        DateTime // UTC instant
  timeZoneId     String   // copied from Location at booking time
  localDate      String   // yyyy-MM-dd, e.g. 2026-05-17
  localStartTime String   // HH:mm, e.g. 14:30
  localEndTime   String   // HH:mm, e.g. 15:30
}
```

`timeZoneId` 要複製到 booking 上，不要只依賴 `Location.timeZoneId`。原因是預約成立當下的時間語意要固定，避免未來 location 設定變更影響舊預約。

### Schedule

營業時間與 break time 應存 local wall time，不要先轉成 UTC 存規則。

範例：

```json
{
  "weekday": 1,
  "open": "10:00",
  "close": "19:00",
  "breaks": [
    { "start": "13:00", "end": "14:00" }
  ]
}
```

產生可預約時段時，再用 `Location.timeZoneId` 把 local date/time 轉成 UTC instant。

## 日期規則

- 休假日 holiday 不可選，以 location local date 判斷。
- 不可選日期要保留在月曆中，但 disabled、不可選。
- 預設時區為 `Asia/Taipei`，但實作上應從 `Location.timeZoneId` 讀取。
- 最小預約置前時間可先保留設計，例如 `minLeadMinutes`，但若未啟用不影響流程。

## 時間規則

- 時間區塊以 30 分鐘為單位。
- 只顯示營業時間範圍內的可用時段。
- 超出營業時間的區段不要顯示。
- break time 不可選，並以 disabled 顯示。
- 已被占用的時間不可選：
  - `CONFIRMED`
  - `PENDING` 且 `expiredAt > now`
- 時段 overlap 判斷需以資料庫中的 UTC `startTime` / `endTime` 為準。

## 服務時長計算

- 需讀取資料庫中的服務時長。
- 以 30 分鐘為基準計算占用區塊。
- 判斷可用性時，若候選時段與既有預約區塊重疊，則不可選。
- 計算方式：

```text
occupiedBlocks = ceil(duration / 30)
```

候選時段：

```text
candidateStart = local date + local time + location timeZoneId -> UTC
candidateEnd = candidateStart + service.duration
```

Overlap 判斷：

```ts
candidateStart < existing.endTime && existing.startTime < candidateEnd
```

## 建立 Booking 規則

建立預約時：

1. 取得 `Location.timeZoneId`。
2. 使用使用者選擇的 local date/time 產生 UTC `startTime`。
3. 根據 service duration 算出 UTC `endTime`。
4. 寫入：
   - `startTime`
   - `endTime`
   - `timeZoneId`
   - `localDate`
   - `localStartTime`
   - `localEndTime`
5. 用 UTC interval 查詢既有 booking 並做 overlap check。

## 查詢可用時段規則

查詢某 location 某 local date 的可用時段時：

1. 讀取 `Location.timeZoneId`。
2. 讀取該 local date 的營業規則、休假日與 break time。
3. 以 local wall time 產生 30 分鐘候選時段。
4. 將每個候選時段轉成 UTC interval。
5. 查詢該 UTC 範圍內的既有 booking。
6. 依 service duration 與 overlap 規則標記 disabled。

## UI 要求

- 不可選日期與時間都要反灰。
- holiday 日期 disabled。
- break time disabled。
- 已被占用的時間 disabled。
- 非營業時間不顯示。
- UI 顯示時間時，使用 booking/location 的 `timeZoneId` 格式化。

## 驗收標準

- holiday 不能選。
- break time 不能選。
- `PENDING` 且未過期會阻擋同時段。
- `CONFIRMED` 會阻擋同時段。
- 已過期 `PENDING` 不阻擋同時段。
- 非營業時間不顯示。
- 不可選項目在 UI 上清楚呈現為 disabled。
- Booking 寫入資料庫時 `startTime` / `endTime` 是 UTC instant。
- Booking 同時保存 `timeZoneId`、`localDate`、`localStartTime`、`localEndTime`。
- AWS region 與開發者所在地時區不會改變可用時段計算結果。

