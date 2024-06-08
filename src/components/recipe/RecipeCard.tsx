"use client";
import { useState, useEffect } from "react";
import { Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SafeRecipe } from "~/app/types";

interface RecipeCardProps {
  data: SafeRecipe;
}
const RecipeCard = ({ data }: RecipeCardProps) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`/listings/${data.id}`)}
        key={data.id}
        className="group col-span-1 cursor-pointer"
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
              {/* //   <HeartButton listingId={data.id} currentUser={currentUser} /> */}
            </div>
          </div>
          <div className="text-lg font-semibold">{data.title}</div>
          <div className="font-light text-neutral-500">{data.category}</div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">${data.calories}</div>
            {data.cookTime}
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
