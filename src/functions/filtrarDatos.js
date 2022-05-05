//import firebaseApp from '../firebase/credenciales';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
const db = getFirestore();

async function filtrarDatos(stringBusqueda) {
  const docusFiltrado = [];

  const collecionRef = collection(db, "devices");

  const queryIdFactura = query(
    collecionRef,
    where("idFactura", "==", +stringBusqueda)
  );
  const queryEquipo = query(
    collecionRef,
    where("equipo", "==", stringBusqueda)
  );
  const queryMarca = query(collecionRef, where("marca", "==", stringBusqueda));
  const querySerie = query(collecionRef, where("serie", "==", stringBusqueda));

  const queryEstado = query(
    collecionRef,
    where("estado", "==", stringBusqueda)
  );

  const queryPropietario = query(
    collecionRef,
    where("propietario", "==", stringBusqueda)
  );
  const queryCedula = query(
    collecionRef,
    where("cedula", "==", stringBusqueda)
  );
  const queryEmail = query(collecionRef, where("email", "==", stringBusqueda));

  // realizamos las consultas
  const arraySnapshots = await Promise.all([
    getDocs(queryIdFactura),
    getDocs(queryEquipo),
    getDocs(queryMarca),
    getDocs(querySerie),

    getDocs(queryEstado),

    getDocs(queryPropietario),
    getDocs(queryCedula),
    getDocs(queryEmail),
  ]);

  // recorremos los resultados de las consultas
  arraySnapshots.forEach((snapshot) => {
    snapshot.forEach((doc) => {
      docusFiltrado.push(doc.data());
    });
  });

  // limpiamos los duplicados
  const docusFiltradoSinDuplicados = [...new Set(docusFiltrado)];
  // devolvemos los datos filtrados
  return docusFiltradoSinDuplicados;
}

export default filtrarDatos;
