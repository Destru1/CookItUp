import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: Request) {
  try {
    const recipes = await db.recipe.findMany({
      select: {
        ingredients: true,
      },
    });
    const ingredientNames = recipes.flatMap((recipe) => {
      const ingredientsArray = JSON.parse(recipe.ingredients);

      return ingredientsArray.map(
        (ingredient: { name: string }) => ingredient.name,
      );
    });

    const uniqueIngredientNames = [...new Set(ingredientNames)];

    return new Response(JSON.stringify(uniqueIngredientNames), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch ingredient names:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch ingredient names" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }
}
