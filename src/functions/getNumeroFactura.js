import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default async function getNumeroFactura() {
  const collectionRef = collection(db, "factura");
  const docuRef = doc(collectionRef, "factura");
  const docuFactura = await getDoc(docuRef);
  const numeroFactura = docuFactura.data().actual;
  return numeroFactura;
}
