import ClientOnly from "~/components/client-only";
import MyRecipesClient from "./my-recipes-client";
import getCurrentUser from "~/app/actions/getCurrentUser";
import getRecipes from "~/app/actions/getRecipes";

const MyRecipesPage = async () => {
  const currentUser = await getCurrentUser();
  const recipes = await getRecipes({ userId: currentUser?.id });
  return (
    <ClientOnly>
      <MyRecipesClient recipes={recipes} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyRecipesPage;
