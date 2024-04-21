import { NextResponse } from "next/server";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "~/data/user";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const isEmailTaken = await getUserByEmail(email);

  if (isEmailTaken) {
    return { error: "Email is already taken" };
  }
  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}

export async function GET(req: Request) {
  return NextResponse.json({ hello: "world" });
}
