import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { encryptField } from "../src/pii-encryption";

const prisma = new PrismaClient();

// Taiwan local dates → UTC (UTC+8)
const tw = (iso: string) => new Date(iso + "+08:00");

async function main() {
  // ─── 0. Clear existing data (FK order) ───────────────────────────────────
  console.log("Clearing existing data...");
  await prisma.booking.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.service.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();
  await prisma.storeInfo.deleteMany();
  await prisma.homeContent.deleteMany();

  // ─── 1. Locations ────────────────────────────────────────────────────────
  console.log("Seeding locations...");

  const banqiao = await prisma.location.create({
    data: {
      name: "板橋工作室",
      address: "新埔捷運站 1 號出口・步行 3 分鐘",
      openingHours: [{"label":"週一","isOpen":false,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":1},{"label":"週二","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":2},{"label":"週三","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":3},{"label":"週四","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":4},{"label":"週五","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":5},{"label":"週六","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":6},{"label":"週日","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":0}],
      imageUrls: ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1777843322/ivys-beauty/hzssj5c8wyfbz9vgtca6.png", "https://res.cloudinary.com/dvkajiqyy/image/upload/v1777843278/ivys-beauty/cmfvomh59wxgn3plop50.png"]
    },
  });

  const yilan = await prisma.location.create({
    data: {
      name: "宜蘭工作室",
      address: "宜蘭縣壯圍鄉永美路",
      openingHours: [{"label":"週一","isOpen":false,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":1},{"label":"週二","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":2},{"label":"週三","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":3},{"label":"週四","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":4},{"label":"週五","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":5},{"label":"週六","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":6},{"label":"週日","isOpen":true,"hasBreak":false,"openTime":"11:00","closeTime":"20:00","dayOfWeek":0}],
    },
  });

  // ─── 2. Services (connect to both locations) ──────────────────────────────
  console.log("Seeding services...");

  const bothLocations = {
    connect: [{ id: banqiao.id }, { id: yilan.id }],
  };

  const brows = await prisma.service.create({
    data: {
      name: "漸層妝柔霧眉",
      duration: 210,
      price: 15000,
      locations: bothLocations,
    },
  });
  const browsRefill = await prisma.service.create({
    data: {
      name: "霧眉補色",
      duration: 150,
      price: 5000,
      locations: bothLocations,
    },
  });
  const lips = await prisma.service.create({
    data: {
      name: "漸變絲絨霧唇",
      duration: 210,
      price: 12000,
      locations: bothLocations,
    },
  });
  const lipsRefill = await prisma.service.create({
    data: {
      name: "霧唇補色",
      duration: 150,
      price: 5000,
      locations: bothLocations,
    },
  });
  const colorCorrection = await prisma.service.create({
    data: {
      name: "唇部淡色",
      duration: 120,
      price: 0,
      locations: bothLocations,
    },
  });

  // ─── 3. Users ─────────────────────────────────────────────────────────────
  console.log("Seeding users...");

  const ownerHash = await bcrypt.hash("owner1234", 10);
  const memberHash = await bcrypt.hash("test1234", 10);

  await prisma.user.create({
    data: {
      email: "ivy@ivysbeauty.com",
      passwordHash: ownerHash,
      name: "Ivy Hong",
      phone: encryptField("0987654321"),
      birthday: encryptField("1990-05-20"),
      role: "OWNER",
    },
  });

  const alice = await prisma.user.create({
    data: {
      email: "alice@test.com",
      passwordHash: memberHash,
      name: "陳小美",
      phone: encryptField("0912345678"),
      birthday: encryptField("1995-03-15"),
      role: "MEMBER",
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: "bob@test.com",
      passwordHash: memberHash,
      name: "林志偉",
      phone: encryptField("0923456789"),
      birthday: encryptField("1988-07-22"),
      role: "MEMBER",
    },
  });

  const carol = await prisma.user.create({
    data: {
      email: "carol@test.com",
      passwordHash: memberHash,
      name: "王小華",
      phone: encryptField("0934567890"),
      birthday: encryptField("1992-11-30"),
      role: "MEMBER",
    },
  });

  const david = await prisma.user.create({
    data: {
      email: "david@test.com",
      passwordHash: memberHash,
      name: "李小明",
      phone: encryptField("0945678901"),
      birthday: encryptField("1990-09-15"),
      role: "MEMBER",
    },
  });

  // ─── 3.5 StoreInfo ────────────────────────────────────────────────────────
  console.log("Seeding store info...");
  await prisma.storeInfo.create({
    data: {
      phone: "0912345678",
      line: "https://line.me/R/ti/p/@016qduiu",
      instagram: "https://www.instagram.com/honppe/",
      threads: "https://www.threads.com/@honppe",
      bankCode: "822",
      bankName: "中國信託",
      bankAccount: "123456789012",
      bankAccountName: "艾微美學工作室",
    }
  });

  // ─── 4. Bookings ──────────────────────────────────────────────────────────
  console.log("Seeding bookings...");

  // Past CONFIRMED — banqiao
  await prisma.booking.create({
    data: {
      status: "CONFIRMED",
      createdAt: tw("2026-03-01T10:00:00"),
      startTime: tw("2026-03-15T10:00:00"),
      endTime: tw("2026-03-15T13:30:00"),
      expiredAt: tw("2026-03-02T10:00:00"),
      locationId: banqiao.id,
      serviceId: brows.id,
      customerId: alice.id,
      notes: "第一次做霧眉，有點緊張",
    },
  });

  await prisma.booking.create({
    data: {
      status: "CONFIRMED",
      createdAt: tw("2026-03-10T10:00:00"),
      startTime: tw("2026-04-01T11:00:00"),
      endTime: tw("2026-04-01T13:30:00"),
      expiredAt: tw("2026-03-11T10:00:00"),
      locationId: banqiao.id,
      serviceId: browsRefill.id,
      customerId: carol.id,
    },
  });

  // Past CONFIRMED — yilan
  await prisma.booking.create({
    data: {
      status: "CONFIRMED",
      createdAt: tw("2026-03-01T10:00:00"),
      startTime: tw("2026-03-20T14:00:00"),
      endTime: tw("2026-03-20T17:30:00"),
      expiredAt: tw("2026-03-02T10:00:00"),
      locationId: yilan.id,
      serviceId: lips.id,
      customerId: bob.id,
    },
  });

  await prisma.booking.create({
    data: {
      status: "CONFIRMED",
      createdAt: tw("2026-03-20T10:00:00"),
      startTime: tw("2026-04-10T10:00:00"),
      endTime: tw("2026-04-10T12:30:00"),
      expiredAt: tw("2026-03-21T10:00:00"),
      locationId: yilan.id,
      serviceId: lipsRefill.id,
      customerId: alice.id,
      notes: "補色效果很好",
    },
  });

  // Upcoming CONFIRMED — banqiao
  await prisma.booking.create({
    data: {
      status: "CONFIRMED",
      createdAt: tw("2026-04-01T10:00:00"),
      startTime: tw("2026-04-25T10:00:00"),
      endTime: tw("2026-04-25T13:30:00"),
      expiredAt: tw("2026-04-02T10:00:00"),
      locationId: banqiao.id,
      serviceId: brows.id,
      customerId: alice.id,
    },
  });

  await prisma.booking.create({
    data: {
      status: "CONFIRMED",
      createdAt: tw("2026-04-05T10:00:00"),
      startTime: tw("2026-04-28T14:00:00"),
      endTime: tw("2026-04-28T16:30:00"),
      expiredAt: tw("2026-04-06T10:00:00"),
      locationId: banqiao.id,
      serviceId: browsRefill.id,
      customerId: bob.id,
    },
  });

  // Upcoming CONFIRMED — yilan
  await prisma.booking.create({
    data: {
      status: "CONFIRMED",
      createdAt: tw("2026-04-10T10:00:00"),
      startTime: tw("2026-05-02T10:00:00"),
      endTime: tw("2026-05-02T13:30:00"),
      expiredAt: tw("2026-04-11T10:00:00"),
      locationId: yilan.id,
      serviceId: lips.id,
      customerId: carol.id,
      notes: "對自然色調有興趣",
    },
  });

  // Upcoming PENDING — banqiao
  await prisma.booking.create({
    data: {
      status: "PENDING",
      createdAt: tw("2026-04-20T10:00:00"),
      startTime: tw("2026-04-23T10:00:00"),
      endTime: tw("2026-04-23T13:30:00"),
      expiredAt: tw("2026-04-21T10:00:00"),
      locationId: banqiao.id,
      serviceId: brows.id,
      customerId: david.id,
    },
  });

  // Upcoming PENDING — yilan
  await prisma.booking.create({
    data: {
      status: "PENDING",
      createdAt: tw("2026-04-22T14:00:00"),
      startTime: tw("2026-04-26T14:00:00"),
      endTime: tw("2026-04-26T17:30:00"),
      expiredAt: tw("2026-04-23T14:00:00"),
      locationId: yilan.id,
      serviceId: lips.id,
      customerId: david.id,
    },
  });

  // CANCELLED — banqiao
  await prisma.booking.create({
    data: {
      status: "CANCELLED",
      createdAt: tw("2026-01-15T10:00:00"),
      startTime: tw("2026-02-15T10:00:00"),
      endTime: tw("2026-02-15T12:00:00"),
      expiredAt: tw("2026-01-16T10:00:00"),
      locationId: banqiao.id,
      serviceId: colorCorrection.id,
      customerId: alice.id,
    },
  });

  await prisma.booking.create({
    data: {
      status: "CANCELLED",
      createdAt: tw("2026-02-01T10:00:00"),
      startTime: tw("2026-03-01T10:00:00"),
      endTime: tw("2026-03-01T13:30:00"),
      expiredAt: tw("2026-02-02T10:00:00"),
      locationId: banqiao.id,
      serviceId: lips.id,
      customerId: carol.id,
    },
  });

  // ─── 5. Portfolio ─────────────────────────────────────────────────────────
  console.log("Seeding portfolio...");

  const portfolioItems = [
    {
      imageUrls: ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856267/ivys-beauty/ognykcebrk6ojwliiqgg.jpg"],
      gender: "MALE" as const,
      locationId: banqiao.id,
      serviceId: brows.id,
      description: "男生霧眉｜自然型",
    },
    {
      imageUrls: ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856256/ivys-beauty/bio33z603vso6afz7eg5.jpg"],
      gender: "FEMALE" as const,
      locationId: yilan.id,
      serviceId: brows.id,
      description: "漸層柔霧眉｜深棕",
    },
    {
      imageUrls: ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856242/ivys-beauty/wcend5mzkpagfndq1jue.jpg"],
      gender: "FEMALE" as const,
      locationId: banqiao.id,
      serviceId: lips.id,
      description: "漸變絲絨霧唇｜豆沙色",
    },
    {
      imageUrls: ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856223/ivys-beauty/ukurhfyjhrrr1eiuyfum.jpg"],
      gender: "FEMALE" as const,
      locationId: yilan.id,
      serviceId: browsRefill.id,
      description: "霧眉補色｜一年後補色效果",
    },
  ];

  for (const item of portfolioItems) {
    await prisma.portfolio.create({
      data: {
        imageUrls: item.imageUrls,
        gender: item.gender,
        description: item.description,
        ...(item.locationId ? { locationId: item.locationId } : {}),
        serviceId: item.serviceId,
      },
    });
  }

  // ─── 6. Home Content ─────────────────────────────────────────────────────
  console.log("Seeding home content...");
  await prisma.homeContent.create({
    data: {
      id: "singleton",
      hero: {
        eyebrow: "Natural · Professional · Joyful",
        title: "在日常裡\n看見更好的自己",
        description: "Ivy's Beauty 透過拋棄式針具與檢驗合格色乳，專注技術與美感，找到最適合的微妝感。",
        imageUrls: ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1777841375/samples/upscale-face-1.jpg"],
        buttonText: "開始預約"
      },
      about: {
        eyebrow: "About Us",
        title: "拒絕套板，量身打造",
        description: "滿滿的自信感從愛自己開始，不為誰而改變，只想對自己更好一點💗\n我們致力於修飾臉型、提升氣質，讓您擁有最穩定的留色與極短的修復期。"
      },
      notice: {
        eyebrow: "Notice",
        title: "預約須知",
        description: "為保障您的權益及維持高品質服務，請務必詳閱以下約定。",
        rules: [
          { 
            title: "預約", 
            content: "<ul><li>預約時需先支付訂金 <strong>2,000 元</strong>，當日到店後補齊尾款。</li><li>並於 1 日內完成網路轉帳。</li></ul>" 
          },
          { 
            title: "退改須知", 
            content: "<ul><li>預約完成後如需取消預約，訂金恕不退還。</li><li>若需更改時間請提前 <strong>48 小時</strong>告知，訂金可為您保留 3 個月。</li><li>為避免影響後續客人權益，當日遲到超過 15 分鐘視同取消，訂金恕不退還。</li></ul>" 
          }
        ]
      }
    }
  });

  console.log("Seeding complete!");
  console.log("");
  console.log("Accounts:");
  console.log("  Owner  → ivy@ivysbeauty.com  / owner1234");
  console.log("  Alice  → alice@test.com       / test1234");
  console.log("  Bob    → bob@test.com         / test1234");
  console.log("  Carol  → carol@test.com       / test1234");
  console.log("  David  → david@test.com       / test1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
