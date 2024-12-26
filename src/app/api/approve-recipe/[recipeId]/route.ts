import { NextResponse } from "next/server";
import { db } from "~/server/db";
import getCurrentUser from "~/app/actions/getCurrentUser";
import { Role } from "@prisma/client";

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

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return NextResponse.error();
  }

  const { recipeId } = params;

  if (!recipeId || typeof recipeId !== "string") {
    throw new Error("Invalid recipe Id");
  }

  const body = await request.json();
  const { action } = body;

  if (action === "approve") {
    const recipe = await db.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        approved: true,
      },
    });
    return NextResponse.json(recipe);
  } else if (action === "decline") {
    const recipe = await db.recipe.delete({
      where: {
        id: recipeId,
      },
    });
    return NextResponse.json(recipe);
  } else {
    throw new Error("Invalid action");
  }
}
