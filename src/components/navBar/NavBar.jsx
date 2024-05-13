import Image from "next/image";
import Link from "next/link";
import React from "react";
import DropdownMenu from "./dropdownMenu/DropdownMenu";
import Search from "./search/Search";

const NavBar = () => {
  return (
    <div className="p-5 bg-[#242424]">
      <nav className="flex items-center px-12 justify-between">
        <Link href="/" className="flex items-center">
          <Image
            width={40}
            height={40}
            src="/logo.png"
            alt="Logo image"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true} // {false} | {true}
          />
          <span className="font-bold ml-5">Kino</span>
          <span className="text-[#ff5200] font-bold">Hub</span>
        </Link>
        <div className="flex items-center gap-24">
          <Search />
          <DropdownMenu />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
