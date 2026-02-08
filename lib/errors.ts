import { ApiError } from "./api-client";

/**
 * Transform API errors into user-friendly messages
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return "Please check your input and try again.";
      case 401:
        return "Please sign in to continue.";
      case 403:
        return "You don't have permission to access this resource.";
      case 404:
        return "This item no longer exists.";
      case 500:
      case 502:
      case 503:
      case 504:
        return "Something went wrong on our end. Please try again.";
      default:
        return "Something went wrong. Please try again.";
    }
  }

  if (error instanceof TypeError && error.message.includes("fetch")) {
    return "Unable to connect. Please check your internet connection.";
  }

  if (error instanceof Error) {
    // Don't expose technical error messages to users
    return "An unexpected error occurred. Please try again.";
  }

  return "An unexpected error occurred.";
}

/**
 * Title validation constants and functions
 */
export const MAX_TITLE_LENGTH = 255;

export function validateTitle(title: string): string | null {
  const trimmed = title.trim();

  if (!trimmed) {
    return "Title is required";
  }

  if (trimmed.length > MAX_TITLE_LENGTH) {
    return `Title must be ${MAX_TITLE_LENGTH} characters or less`;
  }

  return null; // Valid
}

export function isValidTitle(title: string): boolean {
  return validateTitle(title) === null;
}
