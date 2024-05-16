import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeSwitcher from "@/components/navBar/themeSwither/ThemeSwitcher";
import AuthComponent from "./auth/Auth";

// bg-[#242424]

const NavBar = () => {
  return (
    <div className="p-5 bg-[#F5F5F5] dark:bg-[#242424] duration-300">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            width={40}
            height={40}
            src="/logo.png"
            alt="Logo image"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true} // {false} | {true}
          />
          <span className="font-bold ml-5 text-black dark:text-white">
            Kino
          </span>
          <span className="text-[#ff5200] font-bold">Hub</span>
        </Link>
        <div className="flex items-center gap-10">
          <ThemeSwitcher />
          <AuthComponent />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
