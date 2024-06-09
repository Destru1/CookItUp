"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SafeRecipe, SafeUser } from "~/app/types";
import HeartButton from "../heart-button";
import { Badge } from "../ui/badge";
import { FaRegClock, FaUtensils } from "react-icons/fa";

interface RecipeCardProps {
  data: SafeRecipe;
  currentUser?: SafeUser | null;
}
const RecipeCard = ({ data, currentUser }: RecipeCardProps) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`/recipes/${data.id}`)}
        key={data.id}
        className="group col-span-1 cursor-pointer rounded-lg shadow-lg"
      >
        <div className="flex w-full flex-col gap-2">
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
            <div className="absolute bottom-1 left-2 flex gap-1">
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
          <div className="px-2 pb-2">
          <div className="font-light text-neutral-500">
            {Array.isArray(data.category)
              ? data.category.join(", ")
              : data.category}
          </div>
          <div className="text-lg font-semibold">{data.title}</div>
     
          </div>
          {/* {onAction && actionLabel && (
              <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
              />
            )} */}
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
