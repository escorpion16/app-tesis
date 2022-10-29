import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Home from "../views/Home";
import Login from "../views/Login";
import { auth } from "../firebase/credenciales";
import { onAuthStateChanged } from "firebase/auth";

const Admin = () => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });
  return (
    <Container fluid>{user ? <Home usuario={user} /> : <Login />}</Container>
  );
};

export default Admin;
