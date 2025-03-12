import { useState } from "react";
import { 
    signInWithPopup, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    UserCredential
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";

export const useFirebase = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sign in with Google
    const signInWithGoogle = async (): Promise<UserCredential | null> => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result;
        } catch (err: any) {
            setError(err.message || "Failed to sign in with Google");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Sign in with email and password
    const signInWithEmail = async (email: string, password: string): Promise<UserCredential | null> => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (err: any) {
            setError(err.message || "Failed to sign in with email/password");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Register with email and password
    const registerWithEmail = async (email: string, password: string): Promise<UserCredential | null> => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result;
        } catch (err: any) {
            setError(err.message || "Failed to register");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            await signOut(auth);
        } catch (err: any) {
            setError(err.message || "Failed to sign out");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        signInWithGoogle,
        signInWithEmail,
        registerWithEmail,
        logout,
    };
};