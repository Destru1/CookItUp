import { Recipe } from "@prisma/client";

export type SafeRecipe = Omit<Recipe, "createdAt"> & {
    createdAt: string;
  };