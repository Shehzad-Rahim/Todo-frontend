"use client";

import { useState, FormEvent } from "react";
import { tasksApi } from "@/lib/tasks";
import { getErrorMessage, validateTitle, MAX_TITLE_LENGTH } from "@/lib/errors";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface TaskFormProps {
  onTaskCreated: () => Promise<void>;
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const validationError = validateTitle(trimmedTitle);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await tasksApi.create({ title: trimmedTitle });
      setTitle("");
      await onTaskCreated();
    } catch (err) {
      console.error("[TaskForm] Create task failed:", err);
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-white rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-3">
          {/* Plus icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-brand-purple"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>

          {/* Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Add a new task..."
            className="flex-grow bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-base sm:w-full w-[140px]"
            disabled={isSubmitting}
            maxLength={MAX_TITLE_LENGTH}
            aria-label="New task title"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-600 transition-colors duration-200"
            aria-label="Add task"
          >
            {isSubmitting ? (
              <LoadingSpinner size="sm" className="text-white" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-500 mt-3 pl-13">{error}</p>
        )}

        {/* Character count */}
        <div className="flex justify-end mt-2">
          <span className="text-xs text-gray-400">
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>
      </div>
    </form>
  );
}
