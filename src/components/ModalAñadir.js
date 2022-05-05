import React, { useState } from "react";

import { Modal, Stack, Form, Button, InputGroup } from "react-bootstrap";
//import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import añadirProducto from "../functions/añadirProducto";
import getNumeroFactura from "../functions/getNumeroFactura";
import incrementarNumeroFactura from "../functions/incrementarNumeroFactura";

function ModalAñadir({
  isModalAñadir,
  setIsModalAñadir,
  actualizarEstadoProductos,
  usuario,
}) {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [numeroFactura, setNumeroFactura] = useState(
    randomIntFromInterval(1, 599)
  );

  React.useEffect(() => {
    getNumeroFactura().then((numeroFactura) => {
      setNumeroFactura(numeroFactura);
    });
  }, [isModalAñadir]);

  // función para añadir equipo
  function añadirProductoModal() {
    //obtener infor del formulario
    let infoProducto = {};
    infoProducto.equipo = document.getElementById("equipo").value;
    infoProducto.marca = document.getElementById("marca").value;
    infoProducto.serie = document.getElementById("serie").value;
    infoProducto.accesorios = document.getElementById("accesorios").value;
    infoProducto.estado = document.getElementById("estado").value;
    infoProducto.comentario = document.getElementById("comentario").value;
    infoProducto.precio = document.getElementById("precio").value;
    infoProducto.propietario = document.getElementById("propietario").value;
    infoProducto.cedula = document.getElementById("cedula").value;
    infoProducto.email = document.getElementById("email").value;
    infoProducto.telefono = document.getElementById("telefono").value;
    infoProducto.idFactura = numeroFactura;
    console.log(infoProducto);

    // enviar informacion a firebase
    añadirProducto(infoProducto, usuario?.email);
    incrementarNumeroFactura(numeroFactura);
    // cerrar modal
    actualizarEstadoProductos();
    setIsModalAñadir(false);
  }

  return (
    <Modal show={isModalAñadir} onHide={() => setIsModalAñadir(false)}>
      <Modal.Header>
        <Modal.Title>Añadir Equipo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack>
            <Form.Control
              id="factura"
              placeholder={`Factura #00${numeroFactura}`}
              type="text"
              className="mb-1"
              disabled
            />
            <Form.Select
              id="equipo"
              aria-label="Default select"
              className="mb-1"
            >
              <option>Seleccionar equipo</option>
              <option value="Impresora">Impresora</option>
              <option value="Laptop">Laptop</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Monitor">Monitor</option>
              <option value="PC Desktop">PC Desktop</option>
              <option value="Tablet">Tablet</option>
            </Form.Select>

            <Form.Select
              id="marca"
              aria-label="Default select"
              className="mb-1"
            >
              <option>Seleccionar marca</option>
              <option value="Apple">Apple</option>
              <option value="Dell">Dell</option>
              <option value="Lenovo">Lenovo</option>
              <option value="Lexmark">Lexmark</option>
              <option value="Canon">Canon</option>
              <option value="LG">LG</option>
              <option value="HP">HP</option>
              <option value="Asus">Asus</option>
              <option value="Acer">Acer</option>
              <option value="Alienware">Alienware</option>
              <option value="Razer">Razer</option>
              <option value="Samsung">Samsung</option>
              <option value="Xiaomi">Xiaomi</option>
            </Form.Select>

            <Form.Control
              id="serie"
              placeholder="serie"
              type="text"
              className="mb-1"
            />

            <Form.Control
              id="accesorios"
              placeholder="accesorios"
              type="text"
              className="mb-1"
            />

            <Form.Select
              id="estado"
              aria-label="Default select example"
              className="mb-1"
            >
              <option>Seleccionar estado</option>
              <option value="Ingresado">Ingresado</option>
              <option value="Diagnostico">Diagnostico</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Reparado">Reparado</option>
              <option value="Entregado">Entregado</option>
            </Form.Select>

            <Form.Control
              id="comentario"
              placeholder="comentario"
              type="text"
              className="mb-1"
            />

            <InputGroup className="mb-1">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                id="precio"
                aria-label="Amount (to the nearest dollar)"
              />
            </InputGroup>

            <Form.Control
              id="propietario"
              placeholder="propietario"
              type="text"
              className="mb-1"
            />

            <Form.Control
              id="cedula"
              placeholder="cedula"
              type="text"
              className="mb-1"
            />
            <Form.Control
              id="email"
              placeholder="email"
              type="email"
              className="mb-1"
            />
            <Form.Control id="telefono" placeholder="telefono" type="text" />
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalAñadir(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={añadirProductoModal}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAñadir;
