import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";

export async function GET() {
  const clientId = process.env.LINE_CLIENT_ID;
  const redirectUri = process.env.LINE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: "LINE OAuth configuration is missing" }, { status: 500 });
  }

  // Generate state and nonce
  const state = randomBytes(32).toString("hex");
  const nonce = randomBytes(32).toString("hex");

  // Store state and nonce in httpOnly cookies (valid for 10 minutes)
  const cookieStore = await cookies();
  cookieStore.set("line_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookieStore.set("line_oauth_nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  // Construct LINE authorization URL
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: "profile openid email",
    nonce,
    prompt: "consent"
  });

  const url = `https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`;

  // Redirect user to LINE Login
  return NextResponse.redirect(url);
}
