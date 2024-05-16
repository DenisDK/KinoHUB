import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const handleSingIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).catch((error) => {
    console.log(error);
  });
};
