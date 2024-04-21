import { BiLeaf, BiCake, BiDrink } from "react-icons/bi";
import { GiChickenOven, GiSandwich } from "react-icons/gi";
import { MdBreakfastDining, MdDinnerDining, MdLunchDining, MdFastfood } from "react-icons/md";
import { FaPizzaSlice, FaBreadSlice, FaPepperHot,FaFish } from "react-icons/fa";

export const categories = [
  { label: "Vegetarian", icon: BiLeaf },
  { label: "Bakery", icon: BiCake },
  { label: "Beverages", icon: BiDrink },
  { label: "Poultry", icon: GiChickenOven },
  { label: "Seafood", icon: FaFish },
  { label: "Fast Food", icon: MdFastfood },
  { label: "Pizza", icon: FaPizzaSlice },
  { label: "Bread", icon: FaBreadSlice },
  { label: "Spicy", icon: FaPepperHot },
  { label: "Breakfast", icon: MdBreakfastDining },
  { label: "Dinner", icon: MdDinnerDining },
  { label: "Lunch", icon: MdLunchDining },
];