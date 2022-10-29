// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyCELaW1tQeBi2Duc4NHgKp-nTnAvkaLYSs",
  authDomain: "admin-app-tesis.firebaseapp.com",
  projectId: "admin-app-tesis",
  storageBucket: "admin-app-tesis.appspot.com",
  messagingSenderId: "109855539653",
  appId: "1:109855539653:web:eea80b8d367d7133e68bac",
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
export { db, auth };
