import { db } from "../firebase/credenciales";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import escribirLog from "./escribirLog";

export const nuevoCliente = async (cliente, autor) => {
  const docRef = doc(db, "clients", cliente.id.toString());
  await setDoc(docRef, cliente);

  escribirLog("Creación", cliente, autor);
};

export const editarCliente = async (cliente, autor) => {
  const docRef = doc(db, "clients", cliente.id.toString());
  await setDoc(docRef, cliente);

  escribirLog("Edición", cliente, autor);
};

export const eliminarCliente = async (cliente, autor) => {
  const coleccionRef = collection(db, "clients");
  const docRef = doc(coleccionRef, cliente.id.toString());

  await deleteDoc(docRef);

  escribirLog("Eliminación", cliente, autor);
};
