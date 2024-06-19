import { db } from "~/server/db";

export interface IRecipesParams {
  title?: string;
  ingredients?: string;
  category?: string;
  userId?: string;
}

export default async function getRecipes(params: IRecipesParams) {
  try {
    // const { title, ingredients, category } = params;

    const categories = params.category ? params.category.split(",") : [];
    const title = params.title || "";
    const ingredients = params.ingredients ? params.ingredients.split("&") : [];
    const userId = params.userId || "";
    const query: any = {};

    if (title) {
      query.title = { contains: title, mode: "insensitive" };
    }

    if (ingredients.length > 0) {
      query.AND = ingredients.map((ingredient) => ({
        ingredients: {
          contains: ingredient.trim(),
          mode: "insensitive",
        },
      }));
    }
    if (categories.length > 0) {
      query.category = { hasSome: categories };
    }
    if (userId) {
      query.userId = userId;
    }
    const recipes = await db.recipe.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeRecipes = recipes.map((recipe) => ({
      ...recipe,
      createdAt: recipe.createdAt.toISOString(),
    }));

    return safeRecipes;
  } catch (error: any) {
    throw new Error(error);
  }
}
