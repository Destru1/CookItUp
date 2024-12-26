import { db } from "~/server/db";

export interface IRecipesParams {
  title?: string;
  ingredients?: string | string[];
  category?: string;
  userId?: string;
  approved?: string;
}

export default async function getRecipes(params: IRecipesParams) {
  try {
    const {
      title = "",
      ingredients = [],
      category = "",
      userId = "",
      approved = "approved",
    } = params;

    const categories = category.split(",").filter(Boolean);

    const ingredientsList = Array.isArray(ingredients)
      ? ingredients
      : [ingredients];
    const cleanedIngredientsList = ingredientsList
      .flatMap((ing) => ing.split(/[,&]/))
      .filter(Boolean);

    const query: any = {};

    if (title) {
      query.title = { contains: title, mode: "insensitive" };
    }

    if (cleanedIngredientsList.length > 0) {
      query.AND = cleanedIngredientsList.map((ingredient) => ({
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

    if (approved === "all") {
      
    } else if (approved === "pending") {
      query.approved = false;
    } else if (approved === "approved") {
      query.approved = true;
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
    throw new Error(`Failed to fetch recipes: ${error.message}`);
  }
}
