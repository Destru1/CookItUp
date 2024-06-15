"use client";

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback, useRef } from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = () => {
    inputRef.current?.focus();
    console.log("clicked");
  };

  const handleSearch = useCallback(async () => {
    console.log("searched");
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      title: inputRef.current?.value,
      // ingredients: inputRef.current?.value,
    };

    const url = queryString.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true, skipEmptyString: true },
    );
    router.push(url);
  }, [router, params]);

  return (
    <div
      className=" flex w-72 cursor-text items-center justify-between rounded-md  border border-slate-600 p-2  "
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        className=" w-full text-gray-600 focus:outline-none  "
        placeholder="Search for a recipe"
        onKeyDown={(e) => {
          
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
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
