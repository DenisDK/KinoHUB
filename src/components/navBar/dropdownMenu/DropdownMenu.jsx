import Image from "next/image";
import Link from "next/link";
import React from "react";

// Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { handleSignOut } from "@/lib/signOut";

const DropdownMenu = () => {
  return (
    <div className="relative group ">
      <div className="text-[#505050] dark:text-white duration-300 dark:bg-[#3a3a3a] bg-[#c7c7c7] px-3 py-2 rounded-md group-hover:bg-[#b9b9b9] dark:group-hover:bg-[#575757] flex items-center gap-3">
        <Image
          src="/noavatar.png"
          alt="User logo"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true} // {false} | {true}
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="font-bold">User Name</span>
        <span className="bg-[#ff5200] rounded-md">
          <MdKeyboardArrowDown size={24} />
        </span>
      </div>
      <div className="absolute hidden group-hover:block top-full right-0 bg-[#c7c7c7] dark:bg-[#3a3a3a] border border-[#a5a5a5] dark:border-[#181818] rounded-md shadow-lg">
        <ul className="w-[187px]">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 rounded-md duration-300 text-[#505050] dark:text-white hover:bg-[#a0a0a0] dark:hover:bg-[#575757]"
            >
              Lorem
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="block px-4 py-2 rounded-md duration-300 text-[#505050] dark:text-white hover:bg-[#a0a0a0] dark:hover:bg-[#575757]"
            >
              Lorem
            </Link>
          </li>

          <li>
            <span
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-md duration-300 text-[#505050] dark:text-white hover:bg-[#a0a0a0] dark:hover:bg-[#575757]"
            >
              <FaSignOutAlt />
              Вийти
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
