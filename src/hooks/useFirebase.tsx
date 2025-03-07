import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";

export const useFirebase = () => {
  const signWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  return { signWithGoogle };
};
