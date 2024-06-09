import { db } from "~/server/db";

interface IParams {
  recipeId: string;
}

export default async function getRecipeById(params: IParams) {
  try {
    const { recipeId } = params;

    const recipe = await db.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        user: true,
      },
    });
    if (!recipe) {
      throw new Error("Recipe not found");
    }
    return {
      ...recipe,
      createdAt: recipe.createdAt.toISOString(),
      user: {
        ...recipe.user,
        createdAt: recipe.user.createdAt.toISOString(),
        updatedAt: recipe.user.updatedAt.toISOString(),
        emailVerified: recipe.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
