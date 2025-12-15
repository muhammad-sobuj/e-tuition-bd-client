import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userLogOut = () => {
    setLoading(true);
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const idToken = await currentUser.getIdToken();
        localStorage.setItem("token", idToken);

        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/users`,
            {
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
            },
            { headers: { authorization: `Bearer ${idToken}` } }
          );

          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/role`,
            {
              headers: { authorization: `Bearer ${idToken}` },
            }
          );
          setRole(res.data.role || "student");
        } catch (err) {
          console.error("Backend sync failed:", err);
          setRole("student");
        }
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    role,
    createUser,
    signIn,
    signInWithGoogle,
    userLogOut,
    updateUserProfile,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
