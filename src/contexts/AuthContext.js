// src/contexts/AuthContext.js
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Ensure this is correct

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(() => {
    // Initialize from localStorage, or null if not present
    return localStorage.getItem('idToken') || null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const token = await currentUser.getIdToken(); // Retrieve the ID token
        setIdToken(token);
        localStorage.setItem('idToken', token); // Persist token to localStorage
      } else {
        setIdToken(null);
        localStorage.removeItem('idToken'); // Clear token on logout
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync `idToken` to localStorage when it changes
  useEffect(() => {
    if (idToken) {
      localStorage.setItem('idToken', idToken);
    } else {
      localStorage.removeItem('idToken');
    }
  }, [idToken]);

  return <AuthContext.Provider value={{ user, idToken }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
