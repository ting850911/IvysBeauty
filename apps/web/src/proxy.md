# IvysBeauty 轉址與認證執行準則

## 1. 核心分工原則

**Server / Proxy 負責 Access Control，Client 負責 User Flow。**

### Server / Proxy / API 負責

- protected route guard
- API 401 / 403
- admin role blocking
- redirect safety validation
- invalid token handling
- logout cookie cleanup

### Client 負責

- login / register UI state
- profile completion flow
- booking process flow

Agent 不得把所有 redirect 無差別搬到 server，也不得把 client guard 當成唯一安全防線。

---

## 2. 轉址與權限分層架構

| 類型 | 建議位置 | 執行規則 |
|---|---|---|
| 未登入保護 | Server / Proxy | `/booking`, `/history`, `/admin` 未登入時導向 `/login?redirect={currentPath}` |
| Admin 權限檢查 | Server 優先，Client 補強 | 進入 `/admin` 前檢查 `user.role === OWNER` |
| API 保護 | API Layer | 未登入回 `401`，權限不足回 `403`，不得 redirect 到 `/login` |
| Redirect 參數驗證 | Shared helper，Server 必做 | 所有 `redirect` query 必須經過 `getSafeRedirectPath()` |
| UI 流程導向 | Client | 登入、註冊、補資料、預約成功後導向由 client 處理 |

Client side guard 只能用於 loading、避免 UI 閃爍、UX 補強，不可作為唯一權限判斷。

---

## 3. Redirect Safety 規則

所有 `redirect` query 都必須經過 shared helper 驗證，禁止直接使用原始 query string。

建議統一使用：

```ts
getSafeRedirectPath()
````

### 驗證規則

* 無值時回傳 `/`
* 禁止外部 URL
* 禁止 `//` 開頭的 protocol-relative URL
* 禁止 unknown path
* 僅允許站內與白名單內相對路徑
  預設 allowlist: `/`, `/booking`, `/history`, `/admin`

### 必須使用 shared helper 的位置

* `proxy.ts`
* login flow
* logout flow
* protected route redirect
* AuthForm 相關流程

---

## 4. Login / Register / Profile Flow 規則

### `/login` 有兩種入口

| 入口                              | 語意                         | 登入成功後                           |
| ------------------------------- | -------------------------- | ------------------------------- |
| `/login?redirect={currentPath}` | protected route login flow | profile 完整且權限符合後，導回 redirect 目標 |
| `/login`                        | general login flow         | 回到登入前頁面，若無則回 `/`                |

`/login` 不應預設導向 `/booking`。

### 登入成功後流程

`auth_token` 只有在登入成功後才會寫入。

登入成功後才能：

1. 取得 current user
2. 檢查 user role
3. 檢查 profile 是否完整
4. 若有 `redirect` query，必須等 profile 補完後，決定最終導向

必要 profile 欄位：
- name
- phone
- birthday

### 註冊流程

註冊 UI 位於 `/login`，由 client state 控制。
**註冊成功不等於登入成功。**

登入時若 email 不存在：

* 不得自動建立帳號
* 應顯示錯誤提示
* 不得自動切換註冊表單
* 由 user 自行點擊「立即註冊」

註冊成功後：

* 切回登入畫面
* 清空密碼欄位
* 可保留 email
* 讓 user 手動重新登入


---

## 5. Agent 執行紅線

Agent 不得：

* 將所有 redirect 無差別搬到 server
* 只在 client 檢查 protected route 權限
* 只在 client 檢查 admin role
* 讓 API redirect 到 `/login`
* 直接信任 `redirect` query
* 將 `/login` 等同於 `/login?redirect=/booking`
* 使用者進入 `/login` 就清 token
* 在登入前判斷 user role
* email 不存在時自動建立帳號
* email 不存在時自動切換註冊表單
* 註冊成功後直接寫入 `auth_token`
* 註冊成功後直接導向 protected route
* profile 不完整時直接進入 protected route

已登入使用者進入 `/login` 時，應導回 `/`。只有明確登出、切換帳號、token 無效或 token 過期時，才可以清除 token。