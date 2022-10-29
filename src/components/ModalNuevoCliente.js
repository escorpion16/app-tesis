import CustomModal from "./CustomModal";
import { Form, Stack } from "react-bootstrap";

import { useState, useEffect } from "react";
import getNumeroCliente from "../functions/getNumeroCliente";
import { nuevoCliente } from "../functions/clienteCRUD";
import incrementarNumeroCliente from "../functions/incrementarNumeroCliente";

const ModalNuevoCliente = ({ mostrarModal, setMostrarModal, usuarioAutor }) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  // Información de factura
  const [idCliente, setIdCliente] = useState(-1);
  const [dni, setDNI] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    getNumeroCliente().then(setIdCliente);
  }, [mostrarModal]);

  async function submitHandler(e) {
    e.preventDefault();
    setError("");
    setValidated(false);

    setDNI("");
    setNombre("");
    setApellidos("");
    setEmail("");
    setTelefono("");

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    setValidated(true);

    try {
      let nuevoDocumento = {
        id: idCliente,
        dni,
        nombre,
        apellidos,
        email,
        telefono,
      };

      await nuevoCliente(nuevoDocumento, usuarioAutor.email);
      await incrementarNumeroCliente(idCliente).then(() => {
        setIdCliente((prev) => prev + 1);
      });

      console.log("Final info: ", nuevoDocumento);

      setMostrarModal(false);
      setValidated(false);
    } catch (error) {
      setError(error?.message);
    }
  }

  return (
    <CustomModal
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      tipo="Cliente"
      operacion="Nuevo"
      submitHandler={submitHandler}
      error={error}
    >
      <Form validated={validated} onSubmit={submitHandler}>
        <Stack>
          <Form.Control
            id="idCliente"
            placeholder={`Cliente #00${idCliente}`}
            type="text"
            className="mb-1"
            disabled
          />

          <Form.Control
            id="dni"
            placeholder="cedula"
            type="text"
            className="mb-1"
            value={dni}
            onChange={(e) => setDNI(e.target.value)}
          />

          <Form.Control
            id="nombre"
            placeholder="nombre"
            type="text"
            className="mb-1"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <Form.Control
            id="apellidos"
            placeholder="apellidos"
            type="text"
            className="mb-1"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />

          <Form.Control
            id="email"
            placeholder="email"
            type="text"
            className="mb-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Control
            id="telefono"
            placeholder="telefono"
            type="text"
            className="mb-1"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Stack>
      </Form>
    </CustomModal>
  );
};

export default ModalNuevoCliente;
