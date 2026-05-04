import { PrismaClient } from './src/generated';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// 這是 Backend Agent 與其他依賴 DB 的層的唯一出口
// 確保在開發環境 (Next.js HMR) 下不會產生過多的資料庫連線
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Re-export 所有 Type 定義檔給其他套件（例如 Shared）使用
export * from './src/generated';
export * from './src/pii-encryption';
