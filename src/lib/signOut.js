import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const handleSignOut = async () => {
  await signOut(auth).catch((error) => {
    console.log(error);
  });
};
