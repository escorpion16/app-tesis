import { deleteDoc, collection, doc, setDoc } from "firebase/firestore";
import escribirLog from "./escribirLog";
import { db } from "../firebase/credenciales";

export const nuevaFactura = async (factura, autor) => {
  const docRef = doc(db, "invoices", factura.idFactura.toString());
  await setDoc(docRef, factura);

  escribirLog("Creación", factura, autor);
};

export async function editarFactura(factura, autor) {
  const docRef = doc(db, "invoices", factura.idFactura.toString());
  await setDoc(docRef, factura);

  escribirLog("Edición", factura, autor);
}

export async function eliminarFactura(factura, autor) {
  const coleccionRef = collection(db, "invoices");
  const docRef = doc(coleccionRef, factura.idFactura.toString());

  await deleteDoc(docRef);

  escribirLog("Eliminación", factura, autor);
}
