"use client";
import { use, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./avatar";
import MenuItem from "./menu-item";
import useRegisterModal from "~/app/hooks/useRegisterModal";
import useLoginModal from "~/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "~/app/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import useIngredientsModal from "~/app/hooks/useIngredientsModal";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const ingredientsModal = useIngredientsModal();
  const menuRef = useRef(null);
  const user = useCurrentUser();
  const router = useRouter();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log("isOpen", isOpen);
  };
  const handleSignOut = () => {
    signOut();
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className="relative z-20" ref={menuRef}>
      <div className="flex items-center">
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu size={20} />
          <div className="hidden md:block">
            <Avatar src={user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-14 w-48  rounded-md bg-white shadow-lg">
          <div className="flex cursor-pointer flex-col">
            {user ? (
              <>
                {/* <MenuItem
                  label="Profile"
                  onClick={() => {
                    console.log("profile");
                    setIsOpen(false);
                  }}
                /> */}
                <MenuItem
                  label="What to eat"
                  onClick={() => {
                    ingredientsModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="My recipes"
                  onClick={() => {
                    router.push("/my-recipes");
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="Favourites"
                  onClick={() => {
                    router.push("/favourites");
                    setIsOpen(false);
                  }}
                />
                <MenuItem label="Logout" onClick={handleSignOut} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="Register"
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
