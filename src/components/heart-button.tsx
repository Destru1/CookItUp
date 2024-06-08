"use client";

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  recipeId: string;
  currentUserId: string;
}
const HeartButton = ({ recipeId, currentUserId }: HeartButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div
      className="relative cursor-pointer transition hover:opacity-80"
      onClick={() => {}}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={isLiked ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
