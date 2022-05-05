import firebaseApp from '../firebase/credenciales';
import { getFirestore, deleteDoc, collection, doc } from 'firebase/firestore';
import escribirLog from './escribirLog';
const db = getFirestore(firebaseApp);

export default async function eliminarProductoHome(producto, usuario) {
	const coleccionRef = collection(db, 'devices');
	const docuRef = doc(coleccionRef, producto?.idFactura + '');
	const eliminado = await deleteDoc(docuRef);

	escribirLog('Eliminación', producto, usuario);

	return eliminado;
}
