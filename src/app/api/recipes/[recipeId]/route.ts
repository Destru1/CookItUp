import { NextResponse } from "next/server";
import getCurrentUser from "~/app/actions/getCurrentUser";
import { db } from "~/server/db";

interface IParams {
  recipeId: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { recipeId } = params;

  if (!recipeId || typeof recipeId !== "string") {
    throw new Error("Invalid recipe Id");
  }
  const recipe = await db.recipe.findUnique({
    where: {
      id: recipeId,
    },
    include: {
      user: false,
    },
  });
  return NextResponse.json(recipe);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { recipeId } = params;

  if (!recipeId || typeof recipeId !== "string") {
    throw new Error("Invalid recipe Id");
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
    imageUrl,
  } = body;

  const recipe = await db.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      title,
      category,
      ingredients: JSON.stringify(ingredients),
      servings: servingsCount,
      calories,
      cookTime,
      content: description,
      imageUrl,
    },
  });
  return NextResponse.json(recipe);
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { recipeId } = params;

  if (!recipeId || typeof recipeId !== "string") {
    throw new Error("Invalid recipe Id");
  }
  const recipe = await db.recipe.deleteMany({
    where: {
      id: recipeId,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(recipe);
}
