import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import { type SafeUser } from "../types";
import axios from "axios";

interface IUseFavourite {
  recipeId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ recipeId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(recipeId);
  }, [currentUser, recipeId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (isFavourite) {
          request = () => axios.delete(`/api/favourites/${recipeId}`);
          //TODO: add toast
        } else {
          request = () => axios.post(`/api/favourites/${recipeId}`);
          //TODO: add toast
        }
        await request();
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    },
    [currentUser, isFavourite, loginModal, recipeId, router],
  );
  return { isFavourite, toggleFavourite };
};

export default useFavourite;
