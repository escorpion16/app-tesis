import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loginEmailPassword from "../functions/loginEmailPassword";
import styles from "../styles/login.module.css";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    setValidated(true);

    try {
      await loginEmailPassword(email, password);
    } catch (error) {
      let message = "";
      if (error.code === "auth/user-not-found") {
        message = "El usuario no existe";
      } else if (error.code === "auth/wrong-password") {
        message = "La contraseña es incorrecta";
      } else {
        message = "Ocurrió un error inesperado";
      }

      setError(message);
    }
  }

  const arrowBack = () => {
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <button onClick={arrowBack} className={styles.btnBack}>
        <i className="bi bi-arrow-left-circle-fill"></i>
      </button>
      <h2>Inicia sesión, por favor</h2>
      <Form validated={validated} onSubmit={submitHandler}>
        <Form.Group controlId="formCorreo" className={styles.formGroup}>
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className={styles.inputBox}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formContra" className={styles.formGroup}>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className={styles.inputBox}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="mt-3">
          Iniciar sesión
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default Login;
