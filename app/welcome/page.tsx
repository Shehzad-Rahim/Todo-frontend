"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function WelcomePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    // Redirect unauthenticated users to login
    if(isPending) return;
    if (!session?.user) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  // Show loading while checking session
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-welcome flex items-center justify-center">
        <LoadingSpinner size="lg" className="text-white" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const handleGetStarted = () => {
    router.push("/tasks");
  };

  // Get first name or email prefix for greeting
  const userName = session.user.name || session.user.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen bg-gradient-welcome flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute top-40 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-5 w-28 h-28 bg-white/10 rounded-full blur-2xl" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8 shadow-soft">
          <svg
            className="w-12 h-12 text-white"
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

        {/* App name */}
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          TodoHive
        </h1>

        {/* Welcome message */}
        <p className="text-xl text-white/80 mb-2">
          Welcome back, <span className="font-semibold">{userName}</span>!
        </p>
        <p className="text-lg text-white/70 mb-12">
          Innovative, user-friendly, and easy.
        </p>

        {/* Get Started button */}
        <button
          onClick={handleGetStarted}
          className="inline-flex items-center justify-center bg-white text-brand-purple font-semibold text-lg py-4 px-10 rounded-full shadow-soft hover:shadow-lg hover:bg-gray-50 transition-all duration-200 active:scale-95 group"
        >
          Get started
          <svg
            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        {/* Footer */}
        <p className="mt-16 text-white/50 text-sm">
          Organize your life, one task at a time.
        </p>
      </div>
    </div>
  );
}
