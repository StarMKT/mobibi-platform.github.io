import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { User, UserRole } from "../types";
import { auth, db } from "../firebaseConfig";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  role: UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        // Fetch profile from Firestore: users/{uid}
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          // Auth exists but Firestore doc missing
          console.error("User authenticated but no profile found in Firestore (users/{uid}).");
          setUser(null);
          return;
        }

        const data = snap.data() as Omit<User, "uid">;

        setUser({
          uid: firebaseUser.uid,
          ...data,
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will fetch Firestore profile
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // Create user profile in Firestore
    // Default role: client
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      role: "client",
      status: "active",
      // Use server time for consistency
      createdAt: serverTimestamp(),
    });

    // onAuthStateChanged will trigger and load the profile
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
      role: user?.role || null,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
