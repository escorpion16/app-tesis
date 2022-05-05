import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default async function incrementarNumeroFactura(numeroFactura) {
  const collectionRef = collection(db, "factura");
  const docuRef = doc(collectionRef, "factura");
  updateDoc(docuRef, { actual: numeroFactura + 1 });
}
