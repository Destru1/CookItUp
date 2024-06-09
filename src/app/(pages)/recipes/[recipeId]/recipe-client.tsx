"use client";

import { SafeRecipe, SafeUser } from "~/app/types";
import Container from "~/components/container";

interface RecipeClientProps {
  recipe: SafeRecipe & {
    user: SafeUser;
  };
}

const RecipeClient = ({ recipe }: RecipeClientProps) => {
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
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
    </Container>
  );
};

export default RecipeClient;
