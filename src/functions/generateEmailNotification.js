import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function generateEmailNotification(to, nombre, equipo) {
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "mail");

  addDoc(collectionRef, {
    to,
    message: {
      subject: "Tu equipo está listo, Fixmyphone",
      text: `Hola, ${nombre}. Puedes pasar a recoger tu ${equipo}.`,
      html: `Hola, <strong>${nombre}</strong>. Puedes pasar a recoger tu <strong>${equipo}</strong>. <br> <br> <strong>¡Muchas gracias!</strong>`,
    },
  });
}

export default generateEmailNotification;
