import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default async function getDeviceStatus(id) {
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "invoices");
  const queryRef = query(collectionRef, where("idFactura", "==", +id));
  const docs = await getDocs(queryRef);

  if (docs.empty) {
    return null;
  } else {
    return docs.docs[0].data();
  }
}
