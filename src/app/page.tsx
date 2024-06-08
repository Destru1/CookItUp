"use client ";
import Link from "next/link";
import Container from "~/components/container";
import ClientOnly from "~/components/client-only";
import { Button } from "~/components/ui/button";
import { ingredients } from "~/data/ingredients";
import Modal from "~/components/modals/modal";
import RegisterModal from "~/components/modals/register-modal";
import Categories from "~/components/categories";
import RecipeCard from "~/components/recipe/RecipeCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getRecipes, { IRecipesParams } from "./actions/getRecipes";

interface HomePageProps {
  searchParams: IRecipesParams;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const recipes = await getRecipes(searchParams);
  console.log(recipes);
  //const recipes = await getRecipes()
  return (
    <ClientOnly>
      <Categories />
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} data={recipe} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
