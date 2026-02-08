"use client";

interface EmptyStateProps {
  className?: string;
}

export function EmptyState({ className = "" }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      {/* Illustration */}
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 flex items-center justify-center mb-6">
        <svg
          className="h-12 w-12 text-brand-purple"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No tasks yet
      </h3>
      <p className="text-gray-500 max-w-xs">
        Start fresh! Add your first task above and begin organizing your day.
      </p>

      {/* Decorative dots */}
      <div className="flex items-center gap-2 mt-8">
        <div className="w-2 h-2 rounded-full bg-brand-purple/30" />
        <div className="w-2 h-2 rounded-full bg-brand-pink/30" />
        <div className="w-2 h-2 rounded-full bg-brand-yellow/30" />
      </div>
    </div>
  );
}
