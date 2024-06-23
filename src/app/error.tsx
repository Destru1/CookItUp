"use client";

import { useEffect } from "react";
import EmptyState from "~/components/empty-state";

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Error"
      description="An error occurred. Please try again later."
    />
  );
};

export default ErrorState;
