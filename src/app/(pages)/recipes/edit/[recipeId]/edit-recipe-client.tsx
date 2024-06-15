"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SafeRecipe, SafeUser } from "~/app/types";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Heading from "~/components/heading";
import { Textarea } from "~/components/ui/textarea";
import Counter from "~/components/counter";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import CategoryInput from "~/components/category-input";
import { categories } from "~/data/categories";
import { UploadButton } from "~/utils/uploadthing";
import Image from "next/image";

interface EditRecipeClientProps {
  recipe: SafeRecipe;
  currentUser: SafeUser | null;
}

const EditRecipeClient = ({ recipe, currentUser }: EditRecipeClientProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("gr");
  const [ingredient, setIngredient] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
      return;
    }

    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${recipe.id}`);
        if (res.data.userId !== currentUser?.id) {
          router.push("/");
        } else {
          const recipeData = res.data;
          reset(recipeData); // Populate the form with fetched data
          setValue("description", recipeData.content);
          setValue("servingsCount", recipeData.servings);
          setImageUrl(recipeData.imageUrl);

          console.log(recipeData);
          let ingredientsData = recipeData.ingredients;
          if (typeof ingredientsData === "string") {
            try {
              ingredientsData = JSON.parse(ingredientsData); // Parse the ingredients string into an array
            } catch (error) {
              console.error("Error parsing ingredients string:", error);
              ingredientsData = [];
            }
          }

          if (Array.isArray(ingredientsData)) {
            ingredientsData.forEach((ingredient) => append(ingredient)); // Append ingredients
          } else {
            console.error(
              "Expected ingredients to be an array or a stringified array",
            );
          }
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    if (recipe.id) {
      fetchRecipe();
    }
  }, [recipe.id, currentUser, router, reset, setValue, append]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/recipes/${recipe.id}`, data);
      console.log("Recipe updated successfully");
      router.push(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleAddIngredient = (newIngredient) => {
    if (!newIngredient) return;
    const newIng = { quantity, measurement, name: newIngredient };
    append(newIng);
    setQuantity("");
    setMeasurement("gr");
    setIngredient("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-4">
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
                          (category) => category !== item.label,
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

        <Heading title="Name your recipe" subtitle="Give your recipe a name" />
        <Input
          className="input"
          placeholder="Recipe name"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input
              className="input w-[60px]"
              placeholder="Qnt."
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <select
              className="input h-[48px] w-[80px] rounded-md border border-gray-300"
              value={measurement}
              onChange={(event) => setMeasurement(event.target.value)}
            >
              <option value="grams">gr</option>
              <option value="tbs">tbs</option>
              <option value="tsp">tsp</option>
              <option value="ml">ml</option>
            </select>
            <Input
              className="input"
              placeholder="Add ingredient"
              value={ingredient}
              onChange={(event) => setIngredient(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && event.currentTarget.value) {
                  handleAddIngredient(event.currentTarget.value);
                  event.currentTarget.value = "";
                }
              }}
            />
            <Button
              className="button h-[48px] w-[60px]"
              variant="outline"
              onClick={() => handleAddIngredient(ingredient)}
            >
              Add
            </Button>
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center justify-between gap-2"
            >
              <div>{`${field.quantity} ${field.measurement} ${field.name}`}</div>
              <button
                onClick={() => {
                  remove(index);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <Heading title="Recipe info" subtitle="Add additional information" />
        <Counter
          title="Servings"
          subtitle="Number of servings"
          value={watch("servingsCount")}
          onChange={(value) => setValue("servingsCount", value)}
        />
        <Counter
          title="Cook time"
          subtitle="Time to cook in minutes"
          value={watch("cookTime")}
          onChange={(value) => setValue("cookTime", value)}
        />
        <Counter
          title="Calories"
          subtitle="Number of calories per serving"
          value={watch("calories")}
          valueIncrement={10}
          onChange={(value) => setValue("calories", value)}
        />

        <Heading
          title="Recipe description"
          subtitle="Add a description for your recipe"
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <Textarea className="h-[200px] resize-none" {...field} />
          )}
        />
        {errors.description && <span>{errors.description.message}</span>}

        <Heading title="Add images" subtitle="Add images for your recipe" />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setImageUrl(res[0].url);
            setValue("imageSrc", res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        {imageUrl && (
          <Image
            className="mx-auto"
            alt="Image"
            src={imageUrl}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
          />
        )}

        <button type="submit">Update Recipe</button>
      </div>
    </form>
  );
};

export default EditRecipeClient;
