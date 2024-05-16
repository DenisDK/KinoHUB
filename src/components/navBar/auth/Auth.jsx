"use client";

import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import SignIn from "../SignIn/SignIn";

const AuthComponent = () => {
  const auth = getAuth(app);

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [auth]);

  return <div>{user ? <DropdownMenu user={user} /> : <SignIn />}</div>;
};

export default AuthComponent;
