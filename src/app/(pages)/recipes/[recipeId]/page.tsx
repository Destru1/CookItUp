import ClientOnly from "~/components/client-only";
import RecipeClient from "./recipe-client";
import getRecipeById from "~/app/actions/getRecipeById";

interface IParams {
  recipeId: string;
}

const RecipePage = async ({ params }: { params: IParams }) => {
  const recipe = await getRecipeById(params);
  return (
    <ClientOnly>
      <RecipeClient recipe={recipe} />
    </ClientOnly>
  );
};

export default RecipePage;
