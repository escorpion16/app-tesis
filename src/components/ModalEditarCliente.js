import CustomModal from "./CustomModal";
import { Form, Stack } from "react-bootstrap";

import { useEffect, useState } from "react";
import { editarCliente } from "../functions/clienteCRUD";

const ModalEditarCliente = ({
  mostrarModal,
  setMostrarModal,
  cliente,
  setClienteAEditar,
  usuarioAutor,
}) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  // Información del cliente

  const [clienteActual, setClienteActual] = useState(cliente);

  const [idCliente] = useState(cliente.id);
  const [nombre, setNombre] = useState(cliente.nombre);
  const [apellidos, setApellidos] = useState(cliente.apellidos);
  const [email, setEmail] = useState(cliente.email);
  const [telefono, setTelefono] = useState(cliente.telefono);

  useEffect(() => {
    setClienteActual(cliente);
    console.log(clienteActual);
  }, [cliente, clienteActual]);

  if (!cliente) return null;

  async function submitHandler(e) {
    e.preventDefault();
    setError("");
    setValidated(false);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    setValidated(true);

    try {
      let nuevoDocumento = {
        id: idCliente,
        nombre,
        apellidos,
        email,
        telefono,
      };

      await editarCliente(nuevoDocumento, usuarioAutor?.email);

      console.log("Final info: ", nuevoDocumento);

      setMostrarModal(false);
      setClienteAEditar(null);
    } catch (error) {
      setError(error?.message);
    }
  }

  return (
    <CustomModal
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      tipo="Cliente"
      operacion="Editar"
      submitHandler={submitHandler}
      error={error}
      cancel={() => {
        setClienteActual(null);
        setClienteAEditar(null);
      }}
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

export default ModalEditarCliente;
