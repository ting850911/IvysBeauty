import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@ivysbeauty/database";
import { createSession } from "@/lib/auth-session";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const error_description = searchParams.get("error_description");

    if (error) {
      console.error("LINE OAuth Error:", error, error_description);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error_description || "登入失敗")}`, req.url));
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL("/login?error=Invalid+Callback", req.url));
    }

    // Verify state
    const cookieStore = await cookies();
    const savedState = cookieStore.get("line_oauth_state")?.value;
    const savedNonce = cookieStore.get("line_oauth_nonce")?.value;

    if (!savedState || state !== savedState) {
      return NextResponse.redirect(new URL("/login?error=State+Mismatch", req.url));
    }

    // Clear OAuth cookies
    cookieStore.delete("line_oauth_state");
    cookieStore.delete("line_oauth_nonce");

    const clientId = process.env.LINE_CLIENT_ID;
    const clientSecret = process.env.LINE_CLIENT_SECRET;
    const redirectUri = process.env.LINE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error("Missing LINE env configuration");
    }

    // Exchange code for tokens
    const tokenResponse = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errTxt = await tokenResponse.text();
      console.error("LINE token exchange failed", errTxt);
      return NextResponse.redirect(new URL("/login?error=Token+Exchange+Failed", req.url));
    }

    const tokenData = await tokenResponse.json();
    const { id_token } = tokenData;

    if (!id_token) {
      return NextResponse.redirect(new URL("/login?error=Missing+ID+Token", req.url));
    }

    // Verify ID Token with LINE
    const verifyResponse = await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id_token,
        client_id: clientId,
        nonce: savedNonce || "",
      }).toString(),
    });

    if (!verifyResponse.ok) {
      const errTxt = await verifyResponse.text();
      console.error("LINE token verification failed", errTxt);
      return NextResponse.redirect(new URL("/login?error=Token+Verification+Failed", req.url));
    }

    const payload = await verifyResponse.json();
    
    // payload contains: sub, name, picture, email
    const providerId = payload.sub;
    const email = payload.email || null;
    const name = payload.name;
    
    // Find or create identity
    let user = await prisma.user.findFirst({
      where: {
        identities: {
          some: {
            provider: "LINE",
            providerUserId: providerId,
          }
        }
      }
    });

    if (!user) {
      // If no LINE identity, check if email matches an existing user
      if (email) {
        user = await prisma.user.findUnique({
          where: { email },
        });
      }

      if (user) {
        // Link identity
        await prisma.userIdentity.create({
          data: {
            userId: user.id,
            provider: "LINE",
            providerUserId: providerId,
            email: payload.email || null, // Save real provider email if available
          }
        });
      } else {
        // Create new user & identity
        user = await prisma.user.create({
          data: {
            email,
            name,
            role: "MEMBER",
            identities: {
              create: {
                provider: "LINE",
                providerUserId: providerId,
                email: payload.email || null, // Save real provider email if available
              }
            }
          }
        });
      }
    }

    // Create App Session
    await createSession(user.id, "LINE");

    // Redirect user to the app
    // Frontend AuthContext will catch incomplete profiles and push them to /complete-profile
    return NextResponse.redirect(new URL("/", req.url));
    
  } catch (error) {
    console.error("LINE Callback error:", error);
    return NextResponse.redirect(new URL("/login?error=Internal+Server+Error", req.url));
  }
}
