import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@ivysbeauty/database";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // 1. 驗證權限 (只允許 OWNER 或是本人修改)
    // proxy.ts 已經幫我們驗證過 Token 並把身分塞入 Header 中了！
    const userId = req.headers.get("x-user-id");
    const role = req.headers.get("x-user-role");

    if (!userId) {
      return NextResponse.json({ success: false, error: { message: "未授權的請求" } }, { status: 401 });
    }

    // 2. 獲取要更新的狀態
    const body = await req.json();
    const { status } = body;
    if (!["PENDING", "CONFIRMED", "CANCELLED", "DONE", "MISSED"].includes(status)) {
      return NextResponse.json({ success: false, error: { message: "無效的狀態值" } }, { status: 400 });
    }

    // 3. 確保預約存在，且如果是 MEMBER，不能隨便改別人的
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: { message: "找不到該預約紀錄" } }, { status: 404 });
    }

    if (role !== "OWNER") {
      return NextResponse.json({ success: false, error: { message: "權限不足，只有管理員可以修改訂單狀態" } }, { status: 403 });
    }

    // 4. 更新狀態
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (err) {
    console.error("Update booking status error:", err);
    return NextResponse.json({ success: false, error: { message: "更新預約狀態失敗" } }, { status: 500 });
  }
}
