"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { tasksApi } from "@/lib/tasks";
import { getErrorMessage, validateTitle } from "@/lib/errors";

interface TaskItemProps {
  task: Task;
  onUpdate: () => Promise<void>;
}

export function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    setError(null);
    try {
      await tasksApi.toggleComplete(task.id);
      await onUpdate();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsToggling(false);
    }
  };

  const handleEdit = () => {
    setEditValue(task.title);
    setIsEditing(true);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditValue(task.title);
    setIsEditing(false);
    setError(null);
  };

  const handleSaveEdit = async () => {
    const trimmedValue = editValue.trim();
    const validationError = validateTitle(trimmedValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (trimmedValue === task.title) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      await tasksApi.update(task.id, { title: trimmedValue });
      await onUpdate();
      setIsEditing(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await tasksApi.delete(task.id);
      await onUpdate();
    } catch (err) {
      setError(getErrorMessage(err));
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`group bg-white rounded-2xl p-4 shadow-card hover:shadow-soft transition-all duration-200 ${
        task.is_completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Custom checkbox */}
        <button
          onClick={handleToggle}
          disabled={isToggling || isEditing}
          className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.is_completed
              ? "bg-brand-purple border-brand-purple"
              : "border-gray-300 hover:border-brand-purple"
          }`}
          aria-label={task.is_completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {isToggling ? (
            <LoadingSpinner size="sm" />
          ) : task.is_completed ? (
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : null}
        </button>

        {/* Task content */}
        <div className="flex-grow min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                setTimeout(() => {
                  if (!isSaving) handleCancelEdit();
                }, 150);
              }}
              className="input-modern text-base"
              autoFocus
              disabled={isSaving}
            />
          ) : (
            <>
              <p
                className={`font-medium text-gray-900 ${
                  task.is_completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {task.is_completed ? "Completed" : "Pending"}
              </p>
            </>
          )}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {showDeleteConfirm ? (
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5">
              <span className="text-sm text-gray-600">Delete?</span>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                {isDeleting ? "..." : "Yes"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                No
              </button>
            </div>
          ) : isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="btn-ghost text-brand-purple"
              >
                {isSaving ? <LoadingSpinner size="sm" /> : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="btn-ghost"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="btn-ghost"
                aria-label="Edit task"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn-ghost text-red-400 hover:text-red-600 hover:bg-red-50"
                aria-label="Delete task"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
