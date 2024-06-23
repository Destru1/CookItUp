"use client";
import React, { useState } from "react";
import Heading from "../heading";
import { Textarea } from "../ui/textarea";
import Rating from "react-rating-stars-component";
import { Button } from "../ui/button";
import axios from "axios";

interface RecipeCommentProps {
  recipeId: string;
}

const RecipeComment = ({ recipeId }: RecipeCommentProps) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(3);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "content") setContent(value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit comment and rating here. For example, call an API to save the comment and rating
    axios.post("/api/comment", { content, rating, recipeId });
    console.log({ content, rating, recipeId });
    // Reset form
    setContent("");
    setRating(0);
  };

  return (
    <div className="pt-3">
      <Heading title="Leave a comment" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-4">
          <Textarea
            name="content"
            value={content}
            onChange={handleChange}
            placeholder="Write your comment here"
            className="mt-4"
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
        </div>
        <Button type="submit" className="m-auto mt-4 ">
          Submit Comment
        </Button>
      </form>
    </div>
  );
};

export default RecipeComment;
