# 使用 Node.js 18 作為基礎鏡像
FROM node:18-alpine AS base

# 安裝 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- 階段 1: 安裝依賴 ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 複製 monorepo 的核心配置
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# 複製各個套件的 package.json 以便安裝依賴
COPY apps/web/package.json ./apps/web/
COPY packages/database/package.json ./packages/database/
COPY packages/shared/package.json ./packages/shared/
COPY packages/ui/package.json ./packages/ui/
COPY packages/core-logic/package.json ./packages/core-logic/

# 安裝所有依賴
RUN pnpm install --frozen-lockfile

# --- 階段 2: 編譯專案 ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 生成 Prisma Client (這步非常重要)
RUN pnpm --filter @ivysbeauty/database exec prisma generate

# 編譯 Web 應用程式
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm --filter web build

# --- 階段 3: 運行階段 ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 建立非 root 使用者以增加安全性
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 從編譯階段複製必要文件
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 啟動應用程式 (使用 Next.js 的 standalone 模式)
CMD ["node", "apps/web/server.js"]
