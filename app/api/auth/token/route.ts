import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { SignJWT } from "jose";

/**
 * Custom JWT token endpoint.
 *
 * This endpoint:
 * 1. Validates the session using Better Auth
 * 2. Generates a JWT signed with HS256 using BETTER_AUTH_SECRET
 * 3. Returns the token for use with the backend API
 *
 * This avoids the JWKS requirement of Better Auth's JWT plugin.
 */
export async function GET(request: NextRequest) {
  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Generate JWT with HS256
    const secret = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET);

    const token = await new SignJWT({
      sub: session.user.id,
      email: session.user.email,
      name: session.user.name,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("[Token API] Error generating token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
