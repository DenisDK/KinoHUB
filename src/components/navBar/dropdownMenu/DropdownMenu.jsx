import Image from "next/image";
import Link from "next/link";
import React from "react";

// Icons
import { MdKeyboardArrowDown } from "react-icons/md";

const DropdownMenu = () => {
  return (
    <div className="relative group ">
      <div className="text-white duration-300 bg-[#3a3a3a] px-3 py-2 rounded-md group-hover:bg-[#575757] flex items-center gap-3">
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
      <div className="absolute hidden group-hover:block top-full right-0 bg-[#3a3a3a] border border-[#181818] rounded-md shadow-lg">
        <ul className="w-[187px]">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 rounded-md duration-300 text-white hover:bg-[#575757]"
            >
              Профіль
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="block px-4 py-2 rounded-md duration-300 text-white hover:bg-[#575757]"
            >
              Преміум
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="block px-4 py-2 rounded-md duration-300 text-white hover:bg-[#575757]"
            >
              Налаштування
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="block px-4 py-2 rounded-md duration-300 text-white hover:bg-[#575757]"
            >
              Вихід
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
