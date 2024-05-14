import React from "react";

// Icons
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  return (
    <div>
      <form action="" className="flex items-center gap-2">
        <label htmlFor="Search">
          <IoSearchSharp />
        </label>
        <input
          className="rounded-md bg-transparent  focus:border-gray-500 focus:outline-none"
          type="text"
          id="Search"
          placeholder="Пошук..."
        />
      </form>
    </div>
  );
};

export default Search;
