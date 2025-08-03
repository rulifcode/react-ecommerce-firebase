// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";

// 1. Buat context
const AuthContext = createContext();

// 2. Hook custom untuk akses context dengan mudah
export const useAuth = () => useContext(AuthContext);

// 3. Provider utama
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // untuk render anak-anak hanya saat auth siap

  // 🔐 Register
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Login dengan email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🚪 Logout
  const logout = () => {
    return signOut(auth);
  };

  // 🔐 Login dengan Google - versi aman & stabil
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); // opsional

    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Login dengan Google gagal:", error);

      // Tangani popup error yang umum agar tidak crash
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error("Popup login ditutup sebelum selesai.");
      }

      throw error;
    }
  };

  // 📌 Pantau perubahan login/logout user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // render anak-anak saat sudah tahu siapa yang login
    });

    return unsubscribe; // cleanup saat komponen dilepas
  }, []);

  // Nilai yang dibagikan ke komponen lain
  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
