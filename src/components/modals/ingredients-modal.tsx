"use client";

import { useRouter } from "next/navigation";
import useIngredientsModal from "~/app/hooks/useIngredientsModal";
import Modal from "./modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "../ui/badge";

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
          className={`cursor-pointer rounded-md border-2 p-2 transition-all ${
            selectedIngredients.includes(ingredient)
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-900"
          }`}
          onClick={() => handleIngredientClick(ingredient)}
        >
          {ingredient}
        </Badge>
      ))}
    </div>
  );

  const footerContent = (
    <button
      onClick={() => {
        ingredientModal.onClose();
        handleSearch();
      }}
    >
      Search
    </button>
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
