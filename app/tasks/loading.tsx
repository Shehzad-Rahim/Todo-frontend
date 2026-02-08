import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function TasksLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading your tasks...</p>
      </div>
    </div>
  );
}
