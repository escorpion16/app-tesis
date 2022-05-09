import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loginEmailPassword from "../functions/loginEmailPassword";
import styles from "../styles/login.module.css";

function Login() {
  async function submitHandler(e) {
    e.preventDefault();

    const correo = document.getElementById("formCorreo").value;
    const contra = e.target.formContra.value;

    await loginEmailPassword(correo, contra);
  }

  const navigate = useNavigate();

  const arrowBack = () => {
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <button onClick={arrowBack} className={styles.btnBack}>
        <i className="bi bi-arrow-left-circle-fill"></i>
      </button>
      <h2>Inicia sesión, por favor</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formCorreo" className={styles.formGroup}>
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className={styles.inputBox}
            required
          />
        </Form.Group>

        <Form.Group controlId="formContra" className={styles.formGroup}>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className={styles.inputBox}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="mt-3">
          Iniciar sesión
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
