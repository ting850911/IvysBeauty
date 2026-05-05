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

  // ─── 1. Locations ────────────────────────────────────────────────────────
  console.log("Seeding locations...");

  const banqiao = await prisma.location.create({
    data: {
      name: "板橋工作室",
      address: "新埔捷運站 1 號出口・步行 3 分鐘",
      openingHours: {
        Monday: "10:00-20:00",
        Tuesday: "10:00-20:00",
        Wednesday: "10:00-20:00",
        Thursday: "10:00-20:00",
        Friday: "10:00-20:00",
        Saturday: "10:00-20:00",
        Sunday: "休息",
      },
      imageUrls: ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1777843322/ivys-beauty/hzssj5c8wyfbz9vgtca6.png", "https://res.cloudinary.com/dvkajiqyy/image/upload/v1777843278/ivys-beauty/cmfvomh59wxgn3plop50.png"]
    },
  });

  const yilan = await prisma.location.create({
    data: {
      name: "宜蘭工作室",
      address: "宜蘭縣壯圍鄉永美路",
      openingHours: {
        Monday: "休息",
        Tuesday: "10:00-19:00",
        Wednesday: "10:00-19:00",
        Thursday: "10:00-19:00",
        Friday: "10:00-19:00",
        Saturday: "10:00-19:00",
        Sunday: "10:00-19:00",
      },
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
      line: "ivysbeauty_line",
      instagram: "ivysbeauty_ig",
      facebook: "ivysbeauty_fb",
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
