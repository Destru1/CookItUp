"use client";

import { useRouter } from "next/navigation";
import useIngredientsModal from "~/app/hooks/useIngredientsModal";
import Modal from "./modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const IngredientsModal = () => {
  const ingredientModal = useIngredientsModal();
  const router = useRouter();
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    axios.get("/api/ingredients").then((res) => {
      console.log(res.data);
      setIngredients(res.data);
    });
  }, []);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  const handleSearch = () => {
    router.push(`/?ingredients=${selectedIngredients.join("&")}`);
    setSelectedIngredients([]);
  };

  const bodyContent = (
    <div className="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
      {ingredients.map((ingredient, index) => (
        <Badge
          key={index}
          className={`cursor-pointer rounded-md border-2  p-2 text-slate-900 transition-all hover:border-slate-500 hover:bg-transparent ${
            selectedIngredients.includes(ingredient)
              ? " border-slate-500 bg-transparent text-slate-900 hover:text-slate-900 "
              : "bg-white "
          }`}
          onClick={() => handleIngredientClick(ingredient)}
        >
          {ingredient}
        </Badge>
      ))}
    </div>
  );

  const footerContent = (
    <Button
      className="mx-auto mt-4 "
      onClick={() => {
        ingredientModal.onClose();
        handleSearch();
      }}
    >
      Search
    </Button>
  );

  return (
    <Modal
      disabled={false}
      onClose={ingredientModal.onClose}
      isOpen={ingredientModal.isOpen}
      title="Search Ingredients"
      primaryButtonText="Search"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default IngredientsModal;
