import { betterAuth } from "better-auth";
import { Pool } from "@neondatabase/serverless";

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  console.error("[Better Auth] DATABASE_URL environment variable is required");
}

if (!process.env.BETTER_AUTH_SECRET) {
  console.error(
    "[Better Auth] BETTER_AUTH_SECRET environment variable is required"
  );
}

// Create Neon serverless pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  // NO JWT plugin - use session cookies instead
  // For cross-origin API calls, we'll generate tokens manually
});
