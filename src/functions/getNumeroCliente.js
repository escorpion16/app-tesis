import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default async function getNumeroCliente() {
  const collectionRef = collection(db, "cliente");
  const docRef = doc(collectionRef, "cliente");
  const docCliente = await getDoc(docRef);
  const numeroCliente = docCliente.data().actual;
  return numeroCliente;
}
