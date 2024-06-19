"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SafeRecipe, SafeUser } from "~/app/types";
import HeartButton from "../heart-button";
import { Badge } from "../ui/badge";
import { FaRegClock, FaUtensils } from "react-icons/fa";
import { Button } from "../ui/button";
import { FaRegStar } from "react-icons/fa";

interface RecipeCardProps {
  data: SafeRecipe;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
  onEdit?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
  editLabel?: string;
}
const RecipeCard = ({
  data,
  currentUser,
  onAction,
  actionLabel,
  actionId = "",
  disabled,
  editLabel,
  onEdit,
}: RecipeCardProps) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        console.log("disabled");
        return;
      }
      console.log("actionId", actionId);
      onAction?.(actionId);
    },
    [onAction, actionId, disabled],
  );
  const handleUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        console.log("disabled");
        return;
      }

      onEdit?.(actionId);
    },
    [onEdit, actionId, disabled],
  );

  return (
    <>
      <div
        onClick={() => router.push(`/recipes/${data.id}`)}
        key={data.id}
        className="group col-span-1 cursor-pointer rounded-lg"
      >
        <div className="mb-4 flex w-full flex-col gap-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl">
            <Image
              fill
              alt="Listing"
              src={data.imageUrl}
              className="h-full w-full object-cover transition group-hover:scale-110"
            />
            <div className="absolute right-3 top-3">
              <HeartButton recipeId={data.id} currentUser={currentUser} />
            </div>
            <div className="absolute bottom-2 left-2 flex gap-1">
              <Badge variant="default">
                <div className="flex items-center gap-1">
                  <FaRegClock size={14} />
                  {data.cookTime} m.
                </div>
              </Badge>
              <Badge variant="default">
                <div className="flex items-center gap-1">
                  <FaUtensils size={14} />
                  {data.servings}
                </div>
              </Badge>
            </div>
          </div>
          <div className=" pb-2">
            <div className="text-lg font-semibold">{data.title}</div>
            <div className="font-light text-neutral-500">
              {Array.isArray(data.category)
                ? data.category.join(", ")
                : data.category}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-md text-slate-500 ">
                {data.likeCount === 1 ? "Like " : "Likes "}
                {data.likeCount}
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <FaRegStar size={20} /> 0
              </div>
            </div>
          </div>
        </div>

        {onEdit && editLabel && (
          <Button
            disabled={disabled}
            size="sm"
            onClick={handleUpdate}
            variant="secondary"
            className="mx-auto mb-4 flex w-[80%] rounded-b-lg transition hover:bg-neutral-300/80"
          >
            {editLabel}
          </Button>
        )}

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            size="sm"
            onClick={handleCancel}
            variant="destructive"
            className="mx-auto mb-4 flex w-[80%] rounded-b-lg transition hover:bg-rose-500/80"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </>
  );
};

export default RecipeCard;
