"use client";

import { SafeRecipe, SafeUser } from "~/app/types";
import Container from "~/components/container";
import RecipeHead from "~/components/recipe/recipe-head";

interface RecipeClientProps {
  recipe: SafeRecipe & {
    user: SafeUser;
  };
  currentUser? : SafeUser | null;
}

const RecipeClient = ({ recipe,currentUser }: RecipeClientProps) => {
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg mt-3">
        <div className="flex flex-col gap-6">
          <RecipeHead
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            userImg={recipe.user.image}
            userName={recipe.user.name}
            currentUser={currentUser}
            
          />
          <ul>
            <li>{recipe.title}</li>
            <li>{recipe.content}</li>
            <li>{recipe.createdAt}</li>
            <li>{recipe.category}</li>
            <li>{recipe.cookTime}</li>
            <li>{recipe.servings}</li>
            <li>{recipe.ingredients}</li>
            <li>{recipe.imageUrl}</li>
            <li>{recipe.user.name}</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default RecipeClient;
