"use client";
import { handleSingIn } from "@/lib/signIn";
import React from "react";

const SignIn = () => {
  return (
    <button className="" onClick={handleSingIn}>
      Увійти через Google!
    </button>
  );
};

export default SignIn;
