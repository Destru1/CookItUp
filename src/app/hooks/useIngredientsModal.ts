import { create } from "zustand";

interface IngredientsModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useIngredientsModal = create<IngredientsModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useIngredientsModal;