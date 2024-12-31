"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { SafeRecipe } from "~/app/types";
import Container from "~/components/container";
import Heading from "~/components/heading";
import RecipeCard from "~/components/recipe/recipe-card";

interface RequestsClientProps {
  recipes: SafeRecipe[];
}

const RequestsClient = ({ recipes }: RequestsClientProps) => {
  const router = useRouter();
  const [approveId, setApproveId] = useState("");

  const onApprove = (id: string) => {
    setApproveId(id);
    console.log(id, "approve");

    axios
      .put(`/api/approve-recipe/${id}`, { action: "approve" })
      .then(() => {
        toast.success("Recipe approved successfully");
        router.refresh();
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setApproveId("");
      });
  };


  const onDecline = (id: string) => {
    setApproveId(id);
    console.log(id, "decline");

    axios
      .put(`/api/approve-recipe/${id}`, { action: "decline" })
      .then(() => {
        toast.success("Recipe declined successfully");
        router.refresh();
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setApproveId("");
      });
  };
  return (
    <Container>
      <div className="mt-6">
        <Heading
          title="Recipes Requests"
          subtitle="List of recipes waiting for approval"
        />

        <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                data={recipe}
                onAction={onDecline}
                actionLabel="Decline"
                onEdit={onApprove}
                editLabel="Approve"
                actionId={recipe.id}

              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default RequestsClient;
