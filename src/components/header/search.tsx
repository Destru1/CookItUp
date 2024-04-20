"use client";

import { useRef } from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
    console.log("clicked");
  };

  const handleSearch = () => {
    console.log("searched");
  };
  return (
    <div
      className=" flex w-72 cursor-text items-center justify-between rounded-md  border border-slate-600 p-2  "
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        className=" w-full text-gray-600 focus:outline-none  "
        placeholder="Search for ingredients"
      />

      <div
        className="cursor-pointer rounded-full bg-[#ff5f33] p-2 text-white"
        onClick={(e) => {
          e.stopPropagation();
          handleSearch();
        }}
      >
        <FiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;
