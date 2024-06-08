import { NextResponse } from "next/server";

import { db } from "~/server/db";

import { auth } from "auth";
import getCurrentUser from "~/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.log("no user");
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    category,
    ingredients,
    servingsCount,
    calories,
    cookTime,
    description,
    imageSrc,
  } = body;

  Object.keys(body).forEach((key) => {
    if (!body[key]) {
      console.log("missing field: ", key);
      return NextResponse.error();
    }
  });

  const recipe = await db.recipe.create({
    data: {
      title,
      category,
      ingredients: JSON.stringify(ingredients),
      servings: servingsCount,
      calories,
      cookTime,
      content: description,
      imageUrl: imageSrc,
      userId: currentUser.id,
    },
  });
  console.log("recipe: ", recipe);
  return NextResponse.json(recipe);
}
