"use client";
import { handleSingIn } from "@/lib/signIn";
import React from "react";

const SignIn = () => {
  return (
    <button
      className="dark:bg-[#3a3a3a] bg-[#c7c7c7] py-2 px-5 rounded-xl hover:bg-[#b9b9b9] dark:hover:bg-[#575757] duration-300"
      onClick={handleSingIn}
    >
      Увійти через Google!
    </button>
  );
};

export default SignIn;
