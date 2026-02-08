"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending, error } = useSession();

  useEffect(() => {
    // Redirect authenticated users to welcome screen (not directly to tasks)
    // The welcome screen will have the "Get Started" button
    if (!isPending && !error && session?.user) {
      router.replace("/welcome");
    }
  }, [session, isPending, error, router]);

  // Show loading while checking auth state (but not if there's an error)
  if (isPending && !error) {
    return (
      <div className="min-h-screen bg-gradient-welcome flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-white" />
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-welcome flex flex-col items-center justify-center px-6 py-12">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-32 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Logo / App name */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 shadow-soft">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            TodoHive
          </h1>
          <p className="text-xl text-white/80 font-light">
            Innovative, user-friendly, and easy.
          </p>
        </div>

        {/* Error message if auth service is down */}
        {error && (
          <div className="mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white/90 text-sm">
            Authentication service is temporarily unavailable. You can still sign in.
          </div>
        )}

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-white text-brand-purple font-semibold py-4 px-8 rounded-full shadow-soft hover:shadow-lg hover:bg-gray-50 transition-all duration-200 active:scale-95"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="block w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-200 active:scale-95"
          >
            Create account
          </Link>
        </div>

        {/* Footer text */}
        <p className="mt-12 text-white/60 text-sm">
          Organize your life, one task at a time.
        </p>
      </div>
    </div>
  );
}
