"use client";

import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div
      className="flex w-72 cursor-pointer items-center justify-between rounded-md border  border-slate-600 p-2 "
      onClick={() => {
        console.log("sad");
      }}
    >
      <div className="text-gray-600 ">Search for ingredients</div>
      <div className="rounded-full bg-[#ff5f33] p-2 text-white">
        <FiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;
