import { NextResponse } from "next/server";
import getCurrentUser from "~/app/actions/getCurrentUser";
import { db } from "~/server/db";

interface IParams {
  recipeId: string;
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
