"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type SafeRecipe, type SafeUser } from "~/app/types";
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
import { IoMdTrash } from "react-icons/io";
import Loader from "~/components/Loader";
import {toast} from "react-hot-toast";

interface EditRecipeClientProps {
  recipe: SafeRecipe;
  currentUser: SafeUser | null;
}

interface Ingredient {
  quantity: string;
  measurement: string;
  name: string;
}

interface FormData {
  category: string[];
  title: string;
  ingredients: Ingredient[];
  servingsCount: number;
  calories: number;
  cookTime: number;
  description: string;
  imageSrc: string;
}

const EditRecipeClient = ({ recipe, currentUser }: EditRecipeClientProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<string>("");
  const [measurement, setMeasurement] = useState<string>("gr");
  const [ingredient, setIngredient] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
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
      setIsLoading(true);
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
            ingredientsData.forEach((ingredient: Ingredient) =>
              append(ingredient),
            ); // Append ingredients
          } else {
            console.error(
              "Expected ingredients to be an array or a stringified array",
            );
          }
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (recipe.id) {
      fetchRecipe();
    }
  }, [recipe.id, currentUser, router, reset, setValue, append]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`/api/recipes/${recipe.id}`, data);
      toast.success("Recipe updated successfully");
      console.log("Recipe updated successfully");
      router.push(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleAddIngredient = (newIngredient: string) => {
    if (!newIngredient) return;
    const newIng: Ingredient = { quantity, measurement, name: newIngredient };
    append(newIng);
    setQuantity("");
    setMeasurement("gr");
    setIngredient("");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
          <div className="flex grid-cols-2 flex-col gap-6 md:grid ">
            <div className="flex flex-col gap-2 pr-2">
              <Heading
                title="Categories"
                subtitle="Select a categories for your meal"
              />
              <div className="grid grid-cols-3 gap-4">
                {categories.map((item) => (
                  <Controller
                    control={control}
                    name="category"
                    key={item.label}
                    render={({ field }) => (
                      <CategoryInput
                        key={item.label}
                        onClick={() => {
                          const isAlreadySelected = field.value.includes(
                            item.label,
                          );
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

            <div className="flex flex-col gap-3">
              <Heading
                title="Name and ingredients"
                subtitle="Name of your recipe and your ingredients"
              />
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
                    <option value="qty">qty</option>
                  </select>
                  <Input
                    className="input"
                    placeholder="Add ingredient"
                    value={ingredient}
                    onChange={(event) => setIngredient(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && event.currentTarget.value) {
                        event.preventDefault();
                        handleAddIngredient(ingredient);
                        event.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    className="button h-[48px] w-[60px]"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddIngredient(ingredient);
                    }}
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
                      <IoMdTrash size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pr-4">
              <Heading
                title="Recipe info"
                subtitle="Additional information for your recipe"
              />
              <Counter
                title="Servings"
                subtitle="Number of servings"
                value={watch("servingsCount")}
                onChange={(value: number) => setValue("servingsCount", value)}
              />
              <Counter
                title="Cook time"
                subtitle="Time to cook in minutes"
                value={watch("cookTime")}
                onChange={(value: number) => setValue("cookTime", value)}
              />
              <Counter
                title="Calories"
                subtitle="Number of calories per serving"
                value={watch("calories")}
                valueIncrement={10}
                onChange={(value: number) => setValue("calories", value)}
              />
            </div>

            <div>
              <Heading
                title="Recipe description"
                subtitle="Describe steb by step your recipe"
              />
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <Textarea className="mt-4 h-[200px] resize-none" {...field} />
                )}
              />
              {errors.description && <span>{errors.description.message}</span>}
            </div>

            <div className="col-span-2 mt-6 flex flex-col items-center">
              <Heading
                title="Image"
                subtitle="You can change the image for your recipe"
              />
              <UploadButton
                className="mt-6"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  const uniqueImageUrl = `${res[0]?.url}?t=${new Date().getTime()}`;
                  setImageUrl(uniqueImageUrl);
                  setValue("imageSrc", uniqueImageUrl);
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
                  width={300}
                  height={300}
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>

            <div className="col-span-2 flex justify-center">
              <Button type="submit" className="mt-3 w-4/5">
                Update Recipe
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EditRecipeClient;
