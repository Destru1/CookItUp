import ClientOnly from "~/components/client-only";
import FavouritesClient from "./favourites-client";
import getCurrentUser from "~/app/actions/getCurrentUser";
import getFavouriteRecipes from "~/app/actions/getFavouriteRecipes";
import EmptyState from "~/components/empty-state";

const FavourtiesPage = async () => {
  const currentUser = await getCurrentUser();
  const recipes = await getFavouriteRecipes();

  if (recipes.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found."
          description="Looks like you have no favourite recipes."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavouritesClient recipes={recipes} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavourtiesPage;
