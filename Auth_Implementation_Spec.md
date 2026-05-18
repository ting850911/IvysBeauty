# Auth Implementation Spec

## Goal

Implement a future-proof auth architecture with:

- Cognito for email/password and optional Google/Facebook/Apple login.
- Direct LINE Login, not through Cognito federation.
- One app-owned session for every login method.
- Server-side page/API authorization.
- Local DB ownership of app roles and business data.

All providers must normalize into the same app session:

```text
Cognito or LINE
  -> provider callback
  -> verify provider identity server-side
  -> create/find local user
  -> create app session
  -> set httpOnly app session cookie
```

## Core Decisions

- Do not expose Cognito or LINE tokens to browser JavaScript.
- Do not use `localStorage` or `sessionStorage` for auth tokens.
- Do not use `Authorization: Bearer` for browser page auth.
- Use an opaque `httpOnly` cookie, e.g. `ivys_session`, as the website login state.
- Use provider `sub` as the stable external identity key.
- Do not use email as the only identity key.
- Do not auto-merge accounts only because email matches.
- API routes must derive current user from the session, never from request body/query.
- Local DB remains source of truth for `role`, admin access, member status, and booking ownership.
- Profile completion is a separate app requirement, not part of the booking flow.

## Database

Replace custom password auth assumptions. No need to preserve `passwordHash`.

Recommended Prisma shape:

```prisma
model User {
  id                 String         @id @default(cuid())
  email              String?        @unique
  name               String?
  phone              String?
  birthday           String?
  role               Role           @default(MEMBER)
  status             String         @default("啟用中")
  level              String         @default("一般會員")
  memberNotes        String?
  points             Int            @default(0)
  prepaidBalance     Int            @default(0)
  cumulativeSpending Int            @default(0)
  visitCount         Int            @default(0)
  lastVisit          DateTime?
  createdAt          DateTime       @default(now())
  updatedAt          DateTime       @updatedAt

  identities         UserIdentity[]
  sessions           Session[]
  bookings           Booking[]
}

model UserIdentity {
  id             String   @id @default(cuid())
  userId         String
  provider       AuthProvider
  providerUserId String
  email          String?
  displayName    String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerUserId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expiresAt    DateTime
  revokedAt    DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
}

enum AuthProvider {
  COGNITO
  LINE
}
```

### Profile Data

Cognito may store:

- `email`
- `name`
- `phone_number`
- `birthdate`

Local DB may mirror these fields for app reads, but business logic must stay local.

Local only:

- `role`
- `status`
- `level`
- `points`
- `prepaidBalance`
- `memberNotes`
- booking relations
- sessions
- provider identities

## Required Routes

### Cognito

- `GET /api/auth/cognito/login`
  - Validate safe `redirect`.
  - Generate `state`, `nonce`, and PKCE values.
  - Redirect to Cognito authorize endpoint.

- `GET /api/auth/cognito/callback`
  - Validate `state`.
  - Exchange `code` for tokens.
  - Verify ID token server-side.
  - Use Cognito `sub` to find/create `UserIdentity`.
  - Find/create local `User`.
  - Create app `Session`.
  - Set `ivys_session`.
  - Redirect to safe target.

### LINE

- `GET /api/auth/line/login`
  - Validate safe `redirect`.
  - Generate `state`, `nonce`, and optional PKCE values.
  - Redirect to LINE authorization endpoint.

- `GET /api/auth/line/callback`
  - Validate `state`.
  - Exchange `code` for LINE tokens.
  - Verify LINE ID token server-side.
  - Use LINE `sub` to find/create `UserIdentity`.
  - Find/create local `User`.
  - Create app `Session`.
  - Set `ivys_session`.
  - Redirect to safe target.

### App Session

- `GET /api/me`
  - Read `ivys_session`.
  - Validate session exists, not expired, not revoked.
  - Return the current local user.

- `PATCH /api/me` or `PATCH /api/profile`
  - Require session.
  - Update profile fields.
  - If Cognito is profile source of truth, update Cognito attributes server-side.
  - Update local mirror fields if used.

- `POST /api/auth/logout`
  - Revoke current session.
  - Clear `ivys_session`.

## Profile Completion

Create a dedicated profile completion page:

```text
/complete-profile
```

Required fields:

- `name`
- `phone`
- `birthday`

Do not require email for profile completion because LINE may not provide email.

Profile completeness:

```ts
profileComplete = Boolean(user.name && user.phone && user.birthday)
```

Flow rules:

- After any provider callback creates an app session, check `profileComplete`.
- If incomplete, redirect to `/complete-profile?redirect={safeTarget}`.
- If complete, redirect to the safe target.
- Protected pages should use two-step gating:
  - unauthenticated -> `/login?redirect={currentPath}`
  - authenticated but incomplete profile -> `/complete-profile?redirect={currentPath}`
  - authenticated and complete -> allow
- `/complete-profile` itself requires login.
- `/complete-profile` should redirect away if the profile is already complete.

Implementation scope:

- Add `app/complete-profile/page.tsx`.
- Reuse or move `CompleteProfileForm` under this page.
- Form submits to `PATCH /api/me` or `PATCH /api/profile`.
- Form must only send profile fields, not user identity.
- Server derives the user from `ivys_session`.

## Cookie Rules

Main session cookie:

```text
name=ivys_session
httpOnly=true
secure=true in production
sameSite=lax
path=/
```

OAuth temporary cookies:

```text
httpOnly=true
secure=true in production
sameSite=lax
maxAge=5-10 minutes
```

Use temporary cookies or server-side temp storage for `state`, `nonce`, PKCE verifier, and safe redirect.

## Frontend Changes

Auth context:

- Hydrate user from `/api/me`.
- Keep only `user`, `isInitializing`, `refreshUser`, and `logout`.
- Remove token state.
- Remove JWT localStorage/sessionStorage behavior.

Login page:

- Trigger provider redirects:
  - `/api/auth/cognito/login`
  - `/api/auth/line/login`
- Preserve safe `redirect` query.
- Never receive provider tokens.

Profile completion:

- Call `PATCH /api/me` or `PATCH /api/profile`.
- Do not send email or user id as identity.
- Server must derive user from session.
- Convert Taiwan phone input `09xxxxxxxx` to Cognito `+8869xxxxxxxx` if saving to Cognito.
- On success, redirect to safe `redirect` query; fallback to `/`.

Navbar/admin/client guards:

- Use `/api/me` user state for UX.
- Do not treat client guards as security.

## Server Authorization

Add shared server helpers:

```ts
getSessionUser(): Promise<AuthUser | null>
requireUser(): Promise<AuthUser>
requireOwner(): Promise<AuthUser>
createSession(userId: string): Promise<string>
revokeSession(sessionToken: string): Promise<void>
```

Protected pages:

- `/booking`
- `/history`
- `/admin`
- `/complete-profile`

Protected APIs:

- `/api/bookings`
- `/api/history`
- `/api/admin/*`
- `/api/upload`

Rules:

- Unauthenticated page request redirects to `/login?redirect={currentPath}`.
- Authenticated page request with incomplete profile redirects to `/complete-profile?redirect={currentPath}` unless already on `/complete-profile`.
- Unauthenticated API request returns `401`.
- Non-OWNER admin page request redirects to `/`.
- Non-OWNER admin API request returns `403`.
- Admin route handlers must call `requireOwner()`.
- Member route handlers must call `requireUser()`.

## Critical API Fixes

- Booking creation must use session user id as `customerId`.
- History lookup must use session user id.
- Profile update must use session user id.
- Admin APIs must use `requireOwner()`.
- Do not trust `customerId`, `email`, `role`, or `userId` from client payloads.

## Account Linking

First version:

- Existing provider identity logs into its linked user.
- New provider identity creates a new local user when no user is logged in.
- If a user is already logged in, provider callback may link that provider to the current user.

Do not auto-link LINE and Cognito accounts only by matching email.

Future optional features:

- "Link LINE" in member settings.
- "Add email login" for LINE-first users.
- Manual admin merge tool.

## Implementation Order

1. Add `UserIdentity` and `Session`.
2. Add app session helpers and `/api/me`.
3. Change frontend auth state to `/api/me`.
4. Fix API identity trust issues.
5. Implement LINE login.
6. Implement Cognito login.
7. Remove legacy password/JWT-localStorage auth.
8. Add account linking UI only after login flows are stable.

## Acceptance Criteria

- LINE login creates/reuses a local user and app session.
- Cognito login creates/reuses a local user and app session.
- `/api/me` works for both providers.
- Browser JavaScript cannot read auth tokens.
- `/booking` and `/history` require login.
- `/admin` requires local `OWNER` role.
- Booking/history/profile APIs derive identity from session.
- Logout revokes session and clears cookie.
- Unsafe redirects fall back to `/`.
