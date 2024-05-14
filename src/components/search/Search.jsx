"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";

// Icons
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  return (
    <div className="max-w-screen-md mx-auto my-10">
      <form
        action=""
        className="flex items-center justify-between"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-2">
          <label htmlFor="Search">
            <IoSearchSharp />
          </label>
          <input
            className="rounded-md bg-transparent  focus:border-gray-500 focus:outline-none"
            type="text"
            id="Search"
            placeholder="Назва фільму..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="text-[#ff5200] disabled:text-gray-400 duration-300"
          disabled={search === ""}
        >
          Пошук
        </button>
      </form>
    </div>
  );
};

export default Search;
