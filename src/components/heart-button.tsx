"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "~/app/hooks/useFavourite";
import { SafeUser } from "~/app/types";

interface HeartButtonProps {
  recipeId: string;
  currentUser?: SafeUser | null;
}
const HeartButton = ({ recipeId, currentUser }: HeartButtonProps) => {
  const { isFavourite, toggleFavourite } = useFavourite({
    recipeId,
    currentUser,
  });
  return (
    <div
      className="relative cursor-pointer transition hover:opacity-80"
      onClick={toggleFavourite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={isFavourite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
