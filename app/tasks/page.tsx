"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTasks } from "@/hooks/use-tasks";
import { TaskList } from "@/components/tasks/task-list";
import { TaskForm } from "@/components/tasks/task-form";
import { CategoryCards } from "@/components/tasks/category-cards";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function TasksPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();

  // Enable task fetching only when we have a session
  const isAuthenticated = !!session?.user;
  const { tasks, isLoading, error, refetch } = useTasks(isAuthenticated);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  // Show loading while checking session
  if (isSessionPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-brand-purple" />
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // This shouldn't happen due to middleware, but handle it anyway
  if (!session?.user) {
    router.replace("/login");
    return null;
  }

  // Get user info for greeting
  const userName = session.user.name || session.user.email?.split("@")[0] || "there";
  const userEmail = session.user.email || "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:max-w-4xl">
          <div className="flex items-center justify-between">
            {/* Greeting */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hello, {userName}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                You have work today
              </p>
            </div>

            {/* Profile dropdown */}
            <ProfileDropdown
              name={userName}
              email={userEmail}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:max-w-4xl">
        {/* Category cards */}
        <CategoryCards tasks={tasks} />

        {/* Task creation form */}
        <TaskForm onTaskCreated={refetch} />

        {/* Task list */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          onRefresh={refetch}
        />
      </main>

      {/* Fixed bottom CTA (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-bottom sm:hidden">
        <button
          onClick={() => {
            // Scroll to and focus the task input
            const input = document.querySelector('input[aria-label="New task title"]') as HTMLInputElement;
            if (input) {
              input.scrollIntoView({ behavior: "smooth", block: "center" });
              setTimeout(() => input.focus(), 300);
            }
          }}
          className="w-full btn-primary"
        >
          Create new task
        </button>
      </div>

      {/* Bottom padding for fixed CTA on mobile */}
      <div className="h-24 sm:hidden" />
    </div>
  );
}
