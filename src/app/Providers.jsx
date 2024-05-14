"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <div className="bg-[#E0E0E0] text-[#353535] dark:text-white dark:bg-[#202020] min-h-screen select-none transition-colors duration-300">
        {children}
      </div>
    </ThemeProvider>
  );
}
