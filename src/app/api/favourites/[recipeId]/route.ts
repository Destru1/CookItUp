import { NextResponse } from "next/server";
import getCurrentUser from "~/app/actions/getCurrentUser";
import { db } from "~/server/db";

interface IParams {
  recipeId: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { recipeId } = params;

  if (!recipeId || typeof recipeId !== "string") {
    throw new Error("Invalid recipe Id");
  }

  let favouritesIds = [...(currentUser.favouriteIds || [])];

  favouritesIds.push(recipeId);

  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds: favouritesIds,
    },
  });
  const recipe = await db.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      likeCount: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(user);
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

  let favouritesIds = [...(currentUser.favouriteIds || [])];

  favouritesIds = favouritesIds.filter((id) => id !== recipeId);

  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds: favouritesIds,
    },
  });

  const recipe = await db.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      likeCount: {
        decrement: 1,
      },
    },
  });
  return NextResponse.json(user);
}
