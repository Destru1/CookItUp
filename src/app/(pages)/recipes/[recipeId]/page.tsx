import ClientOnly from "~/components/client-only";
import RecipeClient from "./recipe-client";
import getRecipeById from "~/app/actions/getRecipeById";
import getCurrentUser from "~/app/actions/getCurrentUser";

interface IParams {
  recipeId: string;
}

const RecipePage = async ({ params }: { params: IParams }) => {
  const recipe = await getRecipeById(params);
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <RecipeClient recipe={recipe} currentUser={currentUser}  />
      
    </ClientOnly>
  );
};

export default RecipePage;
