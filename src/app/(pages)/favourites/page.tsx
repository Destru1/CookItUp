import ClientOnly from "~/components/client-only";
import FavouritesClient from "./favourites-client";
import getCurrentUser from "~/app/actions/getCurrentUser";
import getFavouriteRecipes from "~/app/actions/getFavouriteRecipes";

const FavourtiesPage = async () => {
  const currentUser = await getCurrentUser();
  const recipes = await getFavouriteRecipes();
  return (
    <ClientOnly>
      <FavouritesClient recipes={recipes} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavourtiesPage;
