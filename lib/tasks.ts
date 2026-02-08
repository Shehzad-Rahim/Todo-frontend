import { api } from "./api-client";
import type { Task, TaskCreate, TaskUpdate, TaskListResponse } from "@/types/task";

/**
 * Task API methods for interacting with the backend.
 *
 * IMPORTANT: User identity is derived from the JWT token, NOT from URL parameters.
 * This ensures secure authorization - users cannot access others' tasks.
 *
 * All methods require authentication (JWT attached automatically via api-client)
 */
export const tasksApi = {
  /**
   * List all tasks for the authenticated user
   * GET /api/v1/tasks
   */
  list: (): Promise<TaskListResponse> =>
    api.get<TaskListResponse>("/api/v1/tasks"),

  /**
   * Create a new task
   * POST /api/v1/tasks
   */
  create: (data: TaskCreate): Promise<Task> =>
    api.post<Task>("/api/v1/tasks", data),

  /**
   * Update a task (partial update)
   * PUT /api/v1/tasks/{task_id}
   */
  update: (taskId: string, data: TaskUpdate): Promise<Task> =>
    api.put<Task>(`/api/v1/tasks/${taskId}`, data),

  /**
   * Delete a task
   * DELETE /api/v1/tasks/{task_id}
   */
  delete: (taskId: string): Promise<void> =>
    api.delete<void>(`/api/v1/tasks/${taskId}`),

  /**
   * Toggle task completion status
   * PATCH /api/v1/tasks/{task_id}/complete
   */
  toggleComplete: (taskId: string): Promise<Task> =>
    api.patch<Task>(`/api/v1/tasks/${taskId}/complete`),
};
