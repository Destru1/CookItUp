import { type SafeRecipe, type SafeUser } from "~/app/types";
import Container from "~/components/container";
import Heading from "~/components/heading";
import RecipeCard from "~/components/recipe/recipe-card";

interface FavouritesClientProps {
  recipes: SafeRecipe[];
  currentUser?: SafeUser | null;
}
const FavouritesClient = ({ recipes, currentUser }: FavouritesClientProps) => {
  return (
    <Container>
      <div className="mt-6">
        <Heading title="Favourites" subtitle="List of recipes you have liked" />

        <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                currentUser={currentUser}
                key={recipe.id}
                data={recipe}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default FavouritesClient;
