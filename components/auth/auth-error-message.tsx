"use client";

interface AuthErrorMessageProps {
  message?: string | null;
}

export function AuthErrorMessage({ message }: AuthErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
      <p className="text-sm font-medium text-red-600">{message}</p>
    </div>
  );
}

