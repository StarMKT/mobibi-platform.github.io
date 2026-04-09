// src/mobibi/ensureUserDoc.ts
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { getFirebaseDb } from "./firebaseConfig";

export async function ensureUserDoc(user: User) {
  const db = getFirebaseDb();
  const ref = doc(db, "users", user.uid);

  // merge: true não sobrescreve role/admin se já existir
  await setDoc(
    ref,
    {
      email: user.email ?? null,
      provider: user.providerData?.[0]?.providerId ?? "unknown",
      active: true,
      // role padrão (se você já setou admin manualmente, merge preserva)
      role: "user",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}
