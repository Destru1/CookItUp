import ClientOnly from "~/components/client-only";
import MyRecipesClient from "./my-recipes-client";
import getCurrentUser from "~/app/actions/getCurrentUser";
import getRecipes from "~/app/actions/getRecipes";
import EmptyState from "~/components/empty-state";

const MyRecipesPage = async () => {
  const currentUser = await getCurrentUser();
  const recipes = await getRecipes({ userId: currentUser?.id });

  if (recipes.length === 0) {
    <ClientOnly>
      <EmptyState
        title="No recipes found."
        description="Your recipes will appear here."
      />
    </ClientOnly>;
  }
  return (
    <ClientOnly>
      <MyRecipesClient recipes={recipes} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyRecipesPage;
