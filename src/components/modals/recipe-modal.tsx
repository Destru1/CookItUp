"use client";

import useRecipeModal from "~/app/hooks/useRecipeModal";
import Modal from "./modal";
import { useMemo, useState } from "react";
import Heading from "../heading";
import { categories } from "~/data/categories";
import CategoryInput from "../category-input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  CATEGORY = 0,
  NAME = 1,
  INFO = 2,
  DESCRIPTION = 3,
  IMAGES = 4,
}

const RecipeModal = () => {
  const recipeModal = useRecipeModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      categories: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };


  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };


  const actionLabel = useMemo(() => {
    if (step == STEPS.IMAGES) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step != STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Pick a category"
        subtitle="Select a category for your meal"
      />

      <div className="grid grid-cols-3 gap-1">
        {categories.map((item) => (
          <CategoryInput
            key={item.label}
            onClick={(category) => setCustomValue("category", category)}
            selected={category == item.label}
            icon={item.icon}
            label={item.label}
            
          />
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Create recipe"
      isOpen={recipeModal.isOpen}
      onClose={recipeModal.onClose}
      isLarge={isLarge}
      body={bodyContent}
    primaryButtonText={actionLabel}
    primaryButtonAction={() => {}}
    secondaryText={secondaryActionLabel}
    secondaryAction={step == STEPS.CATEGORY ? onBack : undefined}

    />
  );
};

export default RecipeModal;
