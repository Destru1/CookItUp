"use client";
import Link from "next/link";
import Container from "../container";
import Search from "./search";
import UserMenu from "./user-menu";
import useLoginModal from "~/app/hooks/useLoginModal";
import useRecipeModal from "~/app/hooks/useRecipeModal";
import { useCurrentUser } from "~/app/hooks/useCurrentUser";
import { useCallback } from "react";
import Image from "next/image";

export default function Header() {
  const loginModal = useLoginModal();
  const recipeModal = useRecipeModal();
  const user = useCurrentUser();

  const onRecipe = useCallback(() => {
    if (!user) {
      return loginModal.onOpen();
    }

    recipeModal.onOpen();
    console.log("Create recipe");
  }, [user, loginModal, recipeModal]);

  return (
    <header className="w-full bg-white shadow">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                alt="Logo"
                src={"/logo.png"}
                width={50}
                height={50}
                className="object-cover"
              />
              <h3>CookItUp</h3>
            </Link>
          </div>
          <Search />
          <UserMenu />
        </div>
        <div className="flex items-center justify-center gap-2">
          <div
            className="rouded-full hidden cursor-pointer px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
            onClick={onRecipe}
          >
            Create recipe
          </div>
        </div>
      </Container>
    </header>
  );
}
