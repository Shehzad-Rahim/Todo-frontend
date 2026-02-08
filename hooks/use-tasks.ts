"use client";

import { useState, useEffect, useCallback } from "react";
import { tasksApi } from "@/lib/tasks";
import { getErrorMessage } from "@/lib/errors";
import type { Task } from "@/types/task";

interface UseTasksResult {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching and managing tasks.
 *
 * User identity is derived from the JWT token on the backend,
 * so this hook doesn't need a userId parameter.
 *
 * @param enabled - Whether to fetch tasks (set to false if user is not authenticated)
 */
export function useTasks(enabled: boolean = true): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await tasksApi.list();
      setTasks(response.tasks);
    } catch (err) {
      console.error("[useTasks] Failed to fetch tasks:", err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    isLoading,
    error,
    refetch: fetchTasks,
  };
}
