import ClientOnly from "~/components/client-only";
import RecipeClient from "../../[recipeId]/recipe-client";
import getCurrentUser from "~/app/actions/getCurrentUser";
import getRecipeById from "~/app/actions/getRecipeById";
import EditRecipeClient from "./edit-recipe-client";
import Container from "~/components/container";


interface IParams {
  recipeId: string;
}

const EditRecipe = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const recipe = await getRecipeById(params);
  return (
    <ClientOnly>
        <Container>

      <EditRecipeClient recipe={recipe} currentUser={currentUser} />
        </Container>
    </ClientOnly>
  );
};

export default EditRecipe;
