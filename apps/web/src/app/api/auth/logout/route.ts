import { NextResponse } from "next/server";
import { revokeSession } from "@/lib/auth-session";

import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const provider = cookieStore.get("ivys_auth_provider")?.value;

    await revokeSession();

    let redirectUrl: string | null = null;
    if (provider === "COGNITO") {
      const clientId = process.env.COGNITO_CLIENT_ID;
      const domain = process.env.COGNITO_DOMAIN;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      if (clientId && domain) {
        redirectUrl = `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(`${appUrl}/login`)}`;
      }
    }

    return NextResponse.json({ success: true, message: "Logged out successfully", redirectUrl });
  } catch (error) {
    console.error("[POST /api/auth/logout] Error:", error);
    return NextResponse.json({ success: false, error: { message: "Internal server error" } }, { status: 500 });
  }
}
