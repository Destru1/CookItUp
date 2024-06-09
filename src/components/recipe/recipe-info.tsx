"use client";

import { IconType } from "react-icons/lib";
import {
  FaRegClock,
  FaUtensils,
  FaFire,
  FaList,
  FaFileAlt,
} from "react-icons/fa";
import RecipeCategory from "./recipe-category";

interface RecipeInfoProps {
  description: string;
  cookTime: number;
  servings: number;
  ingredients: string;
  calories: number;
  category: {
    icon: IconType;
    label: string;
  }[];
}

const RecipeInfo = ({
  description,
  cookTime,
  servings,
  ingredients,
  calories,
  category,
}: RecipeInfoProps) => {
  const caloriesPerServing = Math.round(calories / servings);
  return (
    <div className="flex flex-col items-start lg:flex-row">
      <div className="order-2 col-span-2 mr-4 flex w-full shrink-0 flex-col gap-6 lg:w-2/3">
        <div className="flex flex-col gap-2">
          <ul className="flex items-center gap-6 font-light text-neutral-800">
            <li className="flex items-center gap-1">
              <FaRegClock size={20} /> {cookTime} m.
            </li>
            <li className="flex items-center gap-1">
              <FaUtensils size={20} />
              {servings} servings
            </li>
            <li className="flex items-center gap-1">
              <FaFire size={20} />
              {calories} kcal
            </li>
            <li className="text-neutral-500">
              Calories per serving: {caloriesPerServing}
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-md font-semibold">Categories</div>

          <div className="flex items-center gap-6">
            {category?.length > 0 &&
              category.map((item) => (
                <RecipeCategory
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-md mb-3 flex items-center font-semibold ">
            <FaFileAlt size={20} className="mr-2" />
            Description
          </div>
          <div>{description}</div>
        </div>
      </div>
      <div className="order-1 mb-3 w-full lg:order-3">
        <h3 className="text-md mb-3 flex items-center text-center font-semibold">
          <FaList size={20} className="mr-2" />
          Ingredients
        </h3>
        <ul>
          {JSON.parse(ingredients).map((ingredient: any, index: number) => (
            <li
              className="mb-2 ml-4 list-disc last:mb-0"
              key={index}
            >{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.name}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeInfo;
