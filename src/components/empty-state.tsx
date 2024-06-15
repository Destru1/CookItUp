"use client";

import { useRouter } from "next/navigation";
import Heading from "./heading";
import { Button } from "./ui/button";

interface EmptyState {
  title?: string;
  description?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "No exact matches",
  description = "Try changing filters",
  showReset,
}: EmptyState) => {
  const router = useRouter();
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={description} />
      <div className="mt-4 w-48">
        {showReset && (
          <Button variant="outline" onClick={() => router.push("/")}>
            Remove all filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
