"use client";

import useRecipeModal from "~/app/hooks/useRecipeModal";
import Modal from "./modal";
import { use, useMemo, useState } from "react";
import Heading from "../heading";
import axios from "axios";
import { categories } from "~/data/categories";
import CategoryInput from "../category-input";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { Input } from "../ui/input";
import { ingredients } from "~/data/ingredients";
import { Button } from "../ui/button";
import Counter from "../counter";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../uploadthing/image-upload";
import { useRouter } from "next/navigation";
import { IoMdTrash } from "react-icons/io";

enum STEPS {
  CATEGORY = 0,
  NAME = 1,
  INFO = 2,
  DESCRIPTION = 3,
  IMAGES = 4,
}

const RecipeModal = () => {
  const router = useRouter();
  const recipeModal = useRecipeModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [ingredients, setIngredients] = useState<
    { quantity: string; measurement: string; name: string }[]
  >([]);
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("gr");
  const [ingredient, setIngredient] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: [],
      title: "",
      ingredients: [],
      servingsCount: 1,
      calories: 1,
      cookTime: 1,
      description: "",
      imageSrc: "",
    },
  });

  //const category = watch("category");

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
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.IMAGES) {
      return onNext();
    }
    setIsLoading(true);
    axios.post("/api/recipes", data).then(() => {
      setIsLoading(false);
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      setIngredients([]);
      recipeModal.onClose();
    });
    console.log(data);
  };
  const handleAddIngredient = (newIngredient: string) => {
    if (!newIngredient) return;
    setIngredients([
      ...ingredients,
      { quantity, measurement, name: newIngredient },
    ]);
    setQuantity("");
    setMeasurement(measurement);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const servingsCount = watch("servingsCount");
  const cookTime = watch("cookTime");
  const calories = watch("calories");
  const description = watch("description");
  const imageSrc = watch("imageSrc");

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Pick a category"
        subtitle="Select a category for your meal"
      />

      <div className="grid grid-cols-3 gap-1">
        {categories.map((item) => (
          <Controller
            control={control}
            name="category"
            key={item.label}
            render={({ field }) => (
              <CategoryInput
                key={item.label}
                onClick={() => {
                  const isAlreadySelected = field.value.includes(item.label);
                  const newValue = isAlreadySelected
                    ? field.value.filter(
                        (category: string) => category !== item.label,
                      )
                    : [...field.value, item.label];
                  field.onChange(newValue);
                }}
                selected={field.value.includes(item.label)}
                icon={item.icon}
                label={item.label}
              />
            )}
          />
        ))}
      </div>
    </div>
  );
  if (step == STEPS.NAME) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Name your recipe" subtitle="Give your recipe a name" />
        <Input
          className="input"
          placeholder="Recipe name"
          {...register("title", { required: true })}
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input
              className="input w-[60px]"
              placeholder="Qnt."
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
            />
            <select
              className="input h-[48px] w-[80px] rounded-md border border-gray-300"
              value={measurement}
              onChange={(event) => setMeasurement(event.target.value)}
              defaultValue={"gr"}
            >
              <option value="grams">gr</option>
              <option value="tbs">tbs</option>
              <option value="tsp">tsp</option>
              <option value="ml">ml</option>
              <option value="qty">qty</option>
            </select>
            <Input
              className="input"
              placeholder="Add ingredient"
              onKeyDown={(event) => {
                if (event.key === "Enter" && event.currentTarget.value) {
                  handleAddIngredient(event.currentTarget.value);
                  event.currentTarget.value = "";
                }
              }}
              onChange={(event) => setIngredient(event.target.value)}
              required
              value={ingredient}
            />
            <Button
              className="button h-[48px] w-[60px]"
              variant="outline"
              onClick={() => {
                handleAddIngredient(ingredient);
                setIngredient("");
                console.log(ingredients);
                append({ quantity, measurement, name: ingredient });
              }}
            >
              Add
            </Button>
          </div>
          <ul className="flex max-h-[400px] flex-col gap-2 overflow-auto">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center justify-between ">
                <div>{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.name}`}</div>
                <button
                  onClick={() => {
                    const newIngredients = [...ingredients];
                    newIngredients.splice(index, 1);
                    setIngredients(newIngredients);
                    remove(index);
                  }}
                >
                  <IoMdTrash size={24} className="mr-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Recipe info" subtitle="Add additional information" />

        <Counter
          title="Servings"
          subtitle="Number of servings"
          value={servingsCount}
          onChange={(value) => {
            setCustomValue("servingsCount", value);
          }}
        />
        <Counter
          title="Cook time"
          subtitle="Time to cook in minutes"
          value={cookTime}
          onChange={(value) => {
            setCustomValue("cookTime", value);
          }}
        />
        <Counter
          title="Calories"
          subtitle="Number of calories per serving"
          value={calories}
          valueIncrement={10}
          onChange={(value) => {
            setCustomValue("calories", value);
          }}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Recipe description"
          subtitle="Add a description for your recipe"
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              className="h-[200px] resize-none"
              {...field}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          )}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Add images" subtitle="Add images for your recipe" />
        {/* <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            setImageUrl(res[0].url);
            setCustomValue("imageSrc", res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        {imageUrl && (
          <Image
            alt="Image"
            src={imageUrl}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
          />
        )} */}
        <ImageUpload setCustomValue={setCustomValue} />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      title="Create recipe"
      isOpen={recipeModal.isOpen}
      onClose={recipeModal.onClose}
      isLarge={isLarge}
      body={bodyContent}
      primaryButtonText={actionLabel}
      primaryButtonAction={handleSubmit(onSubmit)}
      secondaryText={secondaryActionLabel}
      secondaryAction={step != STEPS.CATEGORY ? onBack : undefined}
    />
  );
};

export default RecipeModal;
