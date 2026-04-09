// src/mobibi/firebaseConfig.ts
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

console.log("ENV CHECK:", {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
});


// Lazy singletons
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

export function getFirebaseApp() {
  if (_app) return _app;
  _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return _app;
}

const app0 = getFirebaseApp();
console.log("FIREBASE APP OPTIONS", app0.options);



export function getFirebaseAuth() {
  if (_auth) return _auth;
  _auth = getAuth(getFirebaseApp());
  return _auth;
}

export function getFirebaseDb() {
  if (_db) return _db;
  _db = getFirestore(getFirebaseApp());
  return _db;
}

// (Opcional) exports compat com imports antigos
export const app = getFirebaseApp();
export const auth = getFirebaseAuth();
export const db = getFirebaseDb();
