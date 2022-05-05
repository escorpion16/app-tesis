import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default async function getDeviceStatus(cedula) {
  if (!cedula) return;
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "devices");
  const cedulaQuery = query(collectionRef, where("cedula", "==", cedula));

  const facturaQuery = query(collectionRef, where("idFactura", "==", +cedula));

  const arraySnapshots = await Promise.all([
    getDocs(cedulaQuery),
    getDocs(facturaQuery),
  ]);

  /* const snapshot = await getDocs(cedulaQuery);
   */
  if (arraySnapshots.empty) {
    return "No existe el dispositivo";
  } else {
    /* const docRef = doc(collectionRef, snapshot.docs[0].id);
		const docu = await getDoc(docRef);
		console.log(docu.data().propietario);
		console.log(docu.data().equipo);
		console.log(docu.data().estado);
		return docu.data().estado; */
    const docusFiltrado = [];
    arraySnapshots.forEach((snapshot) => {
      snapshot.forEach((doc) => {
        docusFiltrado.push(doc.data());
      });
    });

    if (docusFiltrado.length === 0) return null;
    // limpiamos los duplicados
    const docusFiltradoSinDuplicados = [...new Set(docusFiltrado)];
    // devolvemos los datos filtrados
    return docusFiltradoSinDuplicados[0];
  }
}
