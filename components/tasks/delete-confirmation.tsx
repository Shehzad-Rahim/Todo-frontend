"use client";

import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmation({
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmationProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Delete this task?</span>
      <Button
        variant="danger"
        size="sm"
        onClick={onConfirm}
        isLoading={isDeleting}
        disabled={isDeleting}
      >
        Yes
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onCancel}
        disabled={isDeleting}
      >
        No
      </Button>
    </div>
  );
}
