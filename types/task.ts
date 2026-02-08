/**
 * Task entity as returned from the API
 * Matches Spec 2 Task schema
 */
export interface Task {
  /** Unique task identifier (UUID) */
  id: string;

  /** Owner's user ID (from JWT sub claim) */
  user_id: string;

  /** Task description (1-255 characters) */
  title: string;

  /** Whether the task is completed */
  is_completed: boolean;

  /** Creation timestamp (ISO 8601 UTC) */
  created_at: string;

  /** Last update timestamp (ISO 8601 UTC) */
  updated_at: string;
}

/**
 * Payload for creating a new task
 * POST /api/v1/users/{user_id}/tasks
 */
export interface TaskCreate {
  /** Task description (required, 1-255 characters) */
  title: string;
}

/**
 * Payload for updating a task (partial update)
 * PUT /api/v1/users/{user_id}/tasks/{task_id}
 */
export interface TaskUpdate {
  /** Updated task description (optional, 1-255 characters if provided) */
  title?: string;
}

/**
 * Response from task list endpoint
 * GET /api/v1/users/{user_id}/tasks
 */
export interface TaskListResponse {
  /** Array of user's tasks */
  tasks: Task[];
}
