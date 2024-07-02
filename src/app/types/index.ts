import { type Comment, type Recipe, type User } from "@prisma/client";

export type SafeRecipe = Omit<Recipe, "createdAt"> & {
  createdAt: string;
};
export type SafeComment = Omit<Comment, "createdAt"> & {
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
