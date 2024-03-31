"use client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./avatar";
import MenuItem from "./menu-item";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log("isOpen", isOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu size={20} />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-14 w-48  rounded-md bg-white shadow-lg">
          <div className="flex cursor-pointer flex-col">
            <MenuItem label="Profile" onClick={() => console.log("profile")} />
            <MenuItem
              label="Favourites"
              onClick={() => console.log("profile")}
            />
            <MenuItem label="Profile" onClick={() => console.log("profile")} />
            <MenuItem label="Logout" onClick={() => console.log("profile")} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
