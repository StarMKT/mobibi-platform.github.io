// src/services/authActions.ts
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebaseConfig";
import { ensureUserDoc } from "../ensureUserDoc";

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await ensureUserDoc(cred.user);
  return cred.user;
}

export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(cred.user);
  return cred.user;
}

export async function registerWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(cred.user);
  return cred.user;
}

export async function logout() {
  await signOut(auth);
}
