import { db } from "~/server/db";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteRecipes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }
    const favourites = await db.recipe.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });
    const safeFavourites = favourites.map((recipe) => ({
      ...recipe,
      createdAt: recipe.createdAt.toISOString(),
    }));
    return safeFavourites;
  } catch (error: any) {
    throw new Error(error);
  }
}
