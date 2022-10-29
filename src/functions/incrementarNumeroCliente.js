import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default async function incrementarNumeroCliente(numeroCliente) {
  const collectionRef = collection(db, "cliente");
  const docuRef = doc(collectionRef, "cliente");
  updateDoc(docuRef, { actual: numeroCliente + 1 });
}
