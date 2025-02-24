import { NextResponse } from "next/server";

import { db } from "~/server/db";

import { auth } from "auth";
import getCurrentUser from "~/app/actions/getCurrentUser";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.getAll("category");
  const title = searchParams.get("title");
  const ingredients = searchParams.get("ingredients");

  const where: any = {};

  if (category.length > 0) {
    where.category = { hasSome: category };
  }

  if (title) {
    where.title = { contains: title, mode: "insensitive" };
  }

  // if (ingredients) {
  //   where.ingredients = {
  //     some: {
  //       name: { contains: ingredients, mode: "insensitive" },
  //     },
  //   };
  // }

  const recipes = await db.recipe.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(recipes);
}
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.log("no user");
    return NextResponse.json('Unauthenticated', { status: 401 });
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


  if (
    title === undefined ||
    title === null ||
    category === undefined ||
    category === null ||
    ingredients === undefined ||
    ingredients === null ||
    servingsCount === undefined ||
    servingsCount === null ||
    calories === undefined ||
    calories === null ||
    cookTime === undefined ||
    cookTime === null ||
    description === undefined ||
    description === null ||
    imageSrc === undefined ||
    imageSrc === null
  ) {
    console.log("missing field");
    return NextResponse.json({ error: "Missing field" }, { status: 400 });
  }

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
