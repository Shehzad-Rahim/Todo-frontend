"use client";

import type { Task } from "@/types/task";
import { TaskItem } from "./task-item";
import { EmptyState } from "./empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
}

export function TaskList({
  tasks,
  isLoading,
  error,
  onRefresh,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <LoadingSpinner size="lg" className="mx-auto text-brand-purple" />
        <p className="text-gray-500 mt-4">Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRefresh} />;
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Today&apos;s Tasks
        </h2>
        <span className="text-sm text-gray-500">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onRefresh}
          />
        ))}
      </div>
    </div>
  );
}
