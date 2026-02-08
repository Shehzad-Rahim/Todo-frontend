import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  // No JWT client plugin - we generate tokens via custom API route
});

export const { signIn, signUp, signOut, useSession } = authClient;

/**
 * Get JWT token for backend API authorization.
 *
 * Since we removed the JWT plugin from Better Auth (to avoid JWKS issues),
 * we generate tokens via a custom API route that signs with the shared secret.
 */
export async function getJwtToken(): Promise<string | null> {
  try {
    console.log("[Auth] Fetching JWT token...");

    const response = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include", // Include session cookie
    });

    if (!response.ok) {
      console.error("[Auth] Token fetch failed:", response.status);
      return null;
    }

    const data = await response.json();

    if (data.token) {
      console.log("[Auth] JWT token obtained successfully");
      return data.token;
    }

    console.warn("[Auth] No token in response");
    return null;
  } catch (err) {
    console.error("[Auth] Exception fetching token:", err);
    return null;
  }
}
