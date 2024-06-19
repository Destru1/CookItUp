"use client";

import { type IconType } from "react-icons/lib";

interface RecipeCategoryProps {
  label: string;
  icon: IconType;
}
const RecipeCategory = ({ label, icon: Icon }: RecipeCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={26} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className=" text-lg font-semibold">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCategory;
