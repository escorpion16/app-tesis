import firebaseApp from "../firebase/credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

async function loginEmailPassword(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export default loginEmailPassword;
