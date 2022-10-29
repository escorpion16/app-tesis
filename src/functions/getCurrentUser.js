import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default async function getCurrentUser() {
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  const collectionRef = collection(db, "users");
  const userQuery = query(
    collectionRef,
    where("email", "==", auth.currentUser.email)
  );

  const snapshot = await getDocs(userQuery);

  if (snapshot.empty) {
    return "No existe el usuario actual en la base de datos";
  } else {
    return snapshot.docs[0].data();
  }
}
