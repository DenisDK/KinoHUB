import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import NavBar from "@/components/navBar/NavBar";
import Search from "@/components/search/Search";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KinoHub",
  description: "KinoHub by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {/* <Search /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
