import { create } from "zustand";

interface RecipeModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRecipeModal = create<RecipeModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRecipeModal;
