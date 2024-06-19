"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { type SafeRecipe, type SafeUser } from "~/app/types";
import Container from "~/components/container";
import Heading from "~/components/heading";
import RecipeCard from "~/components/recipe/RecipeCard";

interface MyRecipesClientProps {
  recipes: SafeRecipe[];
  currentUser: SafeUser | null;
}

const MyRecipesClient = ({ recipes, currentUser }: MyRecipesClientProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);
      console.log(id, "delete");
      axios
        .delete(`/api/recipes/${id}`)
        .then(() => {
          //TODO add toast
          console.log("deleted");
          router.refresh();
        })
        .catch((error) => {
          console.error(error);

          //TODO add toast
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router],
  );
  const onEdit = useCallback((id: string) => {
    setEditId(id);
    router.push(`/recipes/edit/${id}`);

    //TODO Implement edit
  }, []);
  return (
    <Container>
      <div className="mt-6">
        <Heading
          title="My Recipes"
          subtitle="List of recipes you have created"
        />

        <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                currentUser={currentUser}
                key={recipe.id}
                data={recipe}
                onAction={onCancel}
                actionLabel="Delete"
                onEdit={onEdit}
                editLabel="Edit"
                actionId={recipe.id}
                disabled={deleteId === recipe.id}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default MyRecipesClient;
