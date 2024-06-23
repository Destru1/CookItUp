import { db } from "~/server/db";
import { NextResponse } from "next/server";
import getCurrentUser from "~/app/actions/getCurrentUser";

interface IParams {
  recipeId: string;
}

export async function POST(
  req: Request,
  { params }: { params: { recipeId: string } },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { content, rating, recipeId } = body;

  if (!recipeId || typeof recipeId !== "string") {
    throw new Error("Invalid recipe Id");
  }

  const comment = await db.comment.create({
    data: {
      content,
      rating,
      recipeId,
      userId: currentUser.id,
    },
  });
  const recipe = await db.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      timesRated: {
        increment: 1,
      },
      totalRating: {
        increment: rating,
      },
    },
  });
  return NextResponse.json(comment);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const recipeId = url.searchParams.get("recipeId");

  if (!recipeId || typeof recipeId !== "string") {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  try {
    const comments = await db.comment.findMany({
      where: {
        recipeId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { commentId, content, rating, recipeId } = body;
  

  if (!commentId || typeof commentId !== "string") {
    return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
  }

  try {
    const existingComment = await db.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (existingComment.userId !== currentUser.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updatedComment = await db.comment.update({
      where: { id: commentId },
      data: { content, rating },
    });

    const ratingDifference = rating - existingComment.rating;

    const recipe = await db.recipe.update({
      where: {
        id: updatedComment.recipeId,
      },
      data: {
        totalRating: ratingDifference > 0 ? 
          { increment: ratingDifference } : 
          { decrement: Math.abs(ratingDifference) },
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.error("Failed to update comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
