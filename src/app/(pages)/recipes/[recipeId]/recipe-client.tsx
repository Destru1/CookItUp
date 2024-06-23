"use client";

import { type SafeRecipe, type SafeUser } from "~/app/types";
import Container from "~/components/container";
import RecipeHead from "~/components/recipe/recipe-head";
import RecipeInfo from "~/components/recipe/recipe-info";
import { useMemo } from "react";
import { categories } from "~/data/categories";

interface RecipeClientProps {
  recipe: SafeRecipe & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const RecipeClient = ({ recipe, currentUser }: RecipeClientProps) => {
  const category = useMemo(() => {
    return categories.filter(
      (item) =>
        item.label === recipe.category.find((cat) => cat === item.label),
    );
  }, [categories, recipe.category]);
  console.log(category);
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg pb-10 pt-4">
        <div className="flex flex-col gap-6">
          <RecipeHead
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl || "images/placeholder.jpg"}
            userImg={recipe.user.image}
            userName={recipe.user.name}
            currentUser={currentUser}
          />
          <div className="gird mt-4 grid-cols-1 md:grid-cols-7 md:gap-8 ">
            <RecipeInfo
              description={recipe.content}
              cookTime={recipe.cookTime}
              servings={recipe.servings}
              ingredients={recipe.ingredients}
              calories={recipe.calories}
              category={category}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RecipeClient;
