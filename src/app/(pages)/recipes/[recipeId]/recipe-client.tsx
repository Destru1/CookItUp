"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { SafeRecipe, SafeUser, SafeComment } from "~/app/types";
import Container from "~/components/container";
import RecipeHead from "~/components/recipe/recipe-head";
import RecipeInfo from "~/components/recipe/recipe-info";
import { useMemo } from "react";
import { categories } from "~/data/categories";
import RecipeComment from "~/components/recipe/recipe-comment";
import RecipeCommentList from "~/components/recipe/recipe-comment-list";
import { Button } from "~/components/ui/button";
import useCommentsModal from "~/app/hooks/useCommentModal";
import CommentModal from "~/components/modals/comment-modal";

interface RecipeClientProps {
  recipe: SafeRecipe & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const RecipeClient = ({ recipe, currentUser }: RecipeClientProps) => {
  const [comments, setComments] = useState<[]>([]);
  const commentModal = useCommentsModal();

  const category = useMemo(() => {
    return categories.filter(
      (item) =>
        item.label === recipe.category.find((cat) => cat === item.label),
    );
  }, [categories, recipe.category]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comment`, {
          params: {
            recipeId: recipe.id,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchComments();
  }, [recipe.id]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg pb-10 pt-4">
        <div className="flex flex-col gap-6">
          <RecipeHead
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl || "images/placeholder.jpg"}
            userImg={recipe.user.image}
            userName={recipe.user.name}
            currentUser={currentUser}
          />
          <div className="gird mt-4 grid-cols-1 md:grid-cols-7 md:gap-8 ">
            <RecipeInfo
              description={recipe.content}
              cookTime={recipe.cookTime}
              servings={recipe.servings}
              ingredients={recipe.ingredients}
              calories={recipe.calories}
              category={category}
            />
          </div>
        </div>
        <RecipeCommentList comments={comments} />
        {/* <RecipeComment recipeId={recipe.id} /> */}
        <Button onClick={commentModal.onOpen}>Add Comment</Button>
        <CommentModal recipeId={recipe.id} />
      </div>
    </Container>
  );
};

export default RecipeClient;
