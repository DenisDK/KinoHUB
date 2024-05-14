"use client";

// Icons
import { MdLightMode, MdDarkMode } from "react-icons/md";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;
  useEffect(() => setMounted(true), []);
  return (
    <div>
      {mounted &&
        (currentTheme === "dark" ? (
          <MdLightMode
            size={22}
            onClick={() => setTheme("light")}
            className="text-xl cursor-pointer hover:text-[#ff5200] duration-200"
          />
        ) : (
          <MdDarkMode
            size={22}
            onClick={() => setTheme("dark")}
            className="text-xl cursor-pointer hover:text-[#ff5200] duration-200"
          />
        ))}
    </div>
  );
}
