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
      console.error("Cognito OAuth Error:", error, error_description);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error_description || "登入失敗")}`, req.url));
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL("/login?error=Invalid+Callback", req.url));
    }

    // Verify state
    const cookieStore = await cookies();
    const savedState = cookieStore.get("cognito_oauth_state")?.value;

    if (!savedState || state !== savedState) {
      return NextResponse.redirect(new URL("/login?error=State+Mismatch", req.url));
    }

    cookieStore.delete("cognito_oauth_state");

    const clientId = process.env.COGNITO_CLIENT_ID;
    const clientSecret = process.env.COGNITO_CLIENT_SECRET;
    const redirectUri = process.env.COGNITO_REDIRECT_URI;
    const domain = process.env.COGNITO_DOMAIN;

    if (!clientId || !clientSecret || !redirectUri || !domain) {
      throw new Error("Missing Cognito env configuration");
    }

    // Exchange code for tokens
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenResponse = await fetch(`${domain}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${credentials}`
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errTxt = await tokenResponse.text();
      console.error("Cognito token exchange failed", errTxt);
      return NextResponse.redirect(new URL("/login?error=Token+Exchange+Failed", req.url));
    }

    const tokenData = await tokenResponse.json();
    const { access_token } = tokenData;

    // Fetch user info using access token
    const userInfoResponse = await fetch(`${domain}/oauth2/userInfo`, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    });

    if (!userInfoResponse.ok) {
      console.error("Failed to fetch Cognito UserInfo");
      return NextResponse.redirect(new URL("/login?error=UserInfo+Fetch+Failed", req.url));
    }

    const payload = await userInfoResponse.json();
    
    // payload contains: sub, email, email_verified
    const providerId = payload.sub;
    const email = payload.email;
    const name = payload.name || email.split("@")[0];
    
    // Find or create identity
    let user = await prisma.user.findFirst({
      where: {
        identities: {
          some: {
            provider: "COGNITO",
            providerUserId: providerId,
          }
        }
      }
    });

    if (!user) {
      // If no Cognito identity, check if email matches an existing user
      user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        // Link identity
        await prisma.userIdentity.create({
          data: {
            userId: user.id,
            provider: "COGNITO",
            providerUserId: providerId,
            email: email, // Save provider email here!
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
                provider: "COGNITO",
                providerUserId: providerId,
                email: email, // Save provider email here!
              }
            }
          }
        });
      }
    }

    // Create App Session
    await createSession(user.id, "COGNITO");

    return NextResponse.redirect(new URL("/", req.url));
    
  } catch (error) {
    console.error("Cognito Callback error:", error);
    return NextResponse.redirect(new URL("/login?error=Internal+Server+Error", req.url));
  }
}
