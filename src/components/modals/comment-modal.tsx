"use client";
import React, { useState, useEffect } from "react";
import Heading from "../heading";
import { Textarea } from "../ui/textarea";
import Rating from "react-rating-stars-component";
import { Button } from "../ui/button";
import axios from "axios";
import { useCurrentUser } from "~/app/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import useCommentsModal from "~/app/hooks/useCommentModal";
import Modal from "./modal";

interface RecipeCommentProps {
  recipeId: string;
}

const CommentModal = ({ recipeId }: RecipeCommentProps) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(3);
  const [commentId, setCommentId] = useState(null);
  const router = useRouter();
  const currentUser = useCurrentUser();
  const commentModal = useCommentsModal(); // Assuming you have a hook for the modal

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`/api/comment`, {
          params: { recipeId },
        });
        const existingComment = response.data.find(
          (comment) => comment.userId === currentUser?.id,
        );
        if (existingComment) {
          setContent(existingComment.content);
          setRating(existingComment.rating);
          setCommentId(existingComment.id);
        }
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchComment();
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "content") setContent(value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (commentId) {
        await axios.put(`/api/comment`, {
          commentId,
          content,
          rating,
        });
        commentModal.onClose();
        router.push("/");
        toast.success("Comment updated successfully");
      } else {
        await axios.post("/api/comment", { content, rating, recipeId });
        commentModal.onClose();
        router.push("/");
        toast.success("Comment submitted successfully");
      }

      setContent("");
      setRating(0);
      setCommentId(null);
    } catch (error) {
      commentModal.onClose();
      console.error("Failed to submit comment", error);
    }
  };

  const bodyContent = (
    <div className="pt-3">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-4">
          <Textarea
            name="content"
            value={content}
            onChange={handleChange}
            placeholder="Write your comment here"
            className="mt-4 resize-none"
            required
          />
          <div>
            <p className="text-center text-lg font-light">Rating: </p>
            <Rating
              id="rating"
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              size={30}
              activeColor="#ffd700"
              required
            />
          </div>
          <Button onClick={handleSubmit} className="m-auto mt-4 ">
            {commentId ? "Update Comment" : "Submit Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
  const footerContent = <></>;

  return (
    <Modal
      disabled={false}
      onClose={commentModal.onClose}
      isOpen={commentModal.isOpen}
      title="Leave a Comment"
      primaryButtonText={commentId ? "Update Comment" : "Submit Comment"}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default CommentModal;
